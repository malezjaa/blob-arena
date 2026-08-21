import { hashHex } from "./hash";
import { FLAVOR_EVENTS } from "./moves";
import { createRng } from "./rng";
import type {
  BattleEvent,
  BattleResult,
  BattleTurn,
  Fighter,
} from "@/types/game";

export const MAX_COMBAT_TURNS = 24;

function canonicalFighters(a: Fighter, b: Fighter): [Fighter, Fighter] {
  const fighters = [a, b].sort((left, right) => {
    const bySeed = left.seed.localeCompare(right.seed);
    return bySeed || left.normalizedName.localeCompare(right.normalizedName);
  });
  return [fighters[0], fighters[1]];
}

function fillMessage(template: string, attacker: Fighter): string {
  return template.replaceAll("{attacker}", attacker.name);
}

export function simulateBattle(a: Fighter, b: Fighter): BattleResult {
  const fighters = canonicalFighters(a, b);
  const battleSeed = hashHex(
    `battle:${fighters.map((fighter) => fighter.seed).join(":")}`,
  );
  const rng = createRng(battleSeed);
  const hp = new Map(fighters.map((fighter) => [fighter.seed, fighter.hp]));
  const events: BattleEvent[] = [];
  let eventIndex = 0;
  let combatTurns = 0;

  const initiative = [...fighters].sort((left, right) => {
    const speedDifference = right.speed - left.speed;
    if (speedDifference !== 0) return speedDifference;
    return rng.chance(0.5) ? -1 : 1;
  });

  while (
    combatTurns < MAX_COMBAT_TURNS &&
    fighters.every((fighter) => (hp.get(fighter.seed) ?? 0) > 0)
  ) {
    for (const attacker of initiative) {
      if (combatTurns >= MAX_COMBAT_TURNS) break;
      const defender = fighters.find((fighter) => fighter.seed !== attacker.seed);

      if (!defender) {
        // A mirror match uses the same fighter seed. Slots preserve two combatants.
        const slotHp = new Map<string, number>();
        slotHp.set("a", fighters[0].hp);
        slotHp.set("b", fighters[1].hp);
        return simulateMirrorBattle(fighters, battleSeed, slotHp);
      }

      if ((hp.get(attacker.seed) ?? 0) <= 0 || (hp.get(defender.seed) ?? 0) <= 0) {
        break;
      }

      if (rng.chance(0.04)) {
        events.push({
          index: eventIndex,
          kind: "flavor",
          message: rng.pick(FLAVOR_EVENTS),
        });
        eventIndex += 1;
      }

      const move = rng.pick(attacker.moves);
      const missed = !rng.chance(Math.min(0.99, move.accuracy + attacker.luck * 0.008));
      const critical = !missed && rng.chance(0.04 + attacker.luck * 0.018);
      const variation = rng.int(-2, 3);
      const rawDamage =
        move.power + attacker.strength * 1.35 - defender.defense * 0.72 + variation;
      const damage = missed ? 0 : Math.max(4, Math.round(rawDamage * (critical ? 1.65 : 1)));
      const defenderHp = Math.max(0, (hp.get(defender.seed) ?? defender.hp) - damage);
      hp.set(defender.seed, defenderHp);

      const turn: BattleTurn = {
        index: eventIndex,
        kind: "attack",
        attackerSeed: attacker.seed,
        defenderSeed: defender.seed,
        move,
        damage,
        critical,
        missed,
        defenderHp,
        message: missed
          ? `${attacker.name} attempted ${move.name}. It failed.`
          : fillMessage(move.message, attacker),
      };
      events.push(turn);
      eventIndex += 1;
      combatTurns += 1;

      if (defenderHp <= 0) break;
    }
  }

  const ranked = [...fighters].sort((left, right) => {
    const hpDifference = (hp.get(right.seed) ?? 0) - (hp.get(left.seed) ?? 0);
    return hpDifference || right.speed - left.speed || left.seed.localeCompare(right.seed);
  });
  const winner = ranked[0];
  const loser = ranked[1];

  if (fighters.every((fighter) => (hp.get(fighter.seed) ?? 0) > 0)) {
    const knockoutDamage = hp.get(loser.seed) ?? 0;
    hp.set(loser.seed, 0);
    events.push({
      index: eventIndex,
      kind: "attack",
      attackerSeed: winner.seed,
      defenderSeed: loser.seed,
      move: winner.moves[0],
      damage: knockoutDamage,
      critical: false,
      missed: false,
      defenderHp: 0,
      message: `${winner.name} won sudden death. The judges looked nervous.`,
    });
  }

  return {
    fighters,
    winner,
    loser,
    winnerHp: hp.get(winner.seed) ?? winner.hp,
    events,
    combatTurns,
    battleSeed,
  };
}

function simulateMirrorBattle(
  fighters: [Fighter, Fighter],
  battleSeed: string,
  hp: Map<string, number>,
): BattleResult {
  const rng = createRng(`${battleSeed}:mirror`);
  const events: BattleEvent[] = [];
  let combatTurns = 0;
  let eventIndex = 0;
  const slots = ["a", "b"] as const;

  while (combatTurns < MAX_COMBAT_TURNS && slots.every((slot) => (hp.get(slot) ?? 0) > 0)) {
    for (const attackerSlot of slots) {
      const defenderSlot = attackerSlot === "a" ? "b" : "a";
      if ((hp.get(defenderSlot) ?? 0) <= 0) break;
      const attacker = fighters[attackerSlot === "a" ? 0 : 1];
      const defender = fighters[defenderSlot === "a" ? 0 : 1];
      const move = rng.pick(attacker.moves);
      const missed = !rng.chance(Math.min(0.99, move.accuracy + attacker.luck * 0.008));
      const critical = !missed && rng.chance(0.04 + attacker.luck * 0.018);
      const damage = missed
        ? 0
        : Math.max(
            4,
            Math.round(
              (move.power + attacker.strength - defender.defense * 0.65 + rng.int(-2, 3)) *
                (critical ? 1.65 : 1),
            ),
          );
      const defenderHp = Math.max(0, (hp.get(defenderSlot) ?? defender.hp) - damage);
      hp.set(defenderSlot, defenderHp);
      events.push({
        index: eventIndex,
        kind: "attack",
        attackerSeed: attackerSlot,
        defenderSeed: defenderSlot,
        move,
        damage,
        critical,
        missed,
        defenderHp,
        message: missed
          ? `${attacker.name} attempted ${move.name}. It failed.`
          : fillMessage(move.message, attacker),
      });
      eventIndex += 1;
      combatTurns += 1;
      if (combatTurns >= MAX_COMBAT_TURNS || defenderHp <= 0) break;
    }
  }

  const winnerSlot = (hp.get("a") ?? 0) >= (hp.get("b") ?? 0) ? "a" : "b";
  const loserSlot = winnerSlot === "a" ? "b" : "a";
  return {
    fighters,
    winner: fighters[winnerSlot === "a" ? 0 : 1],
    loser: fighters[loserSlot === "a" ? 0 : 1],
    winnerHp: hp.get(winnerSlot) ?? 0,
    events,
    combatTurns,
    battleSeed,
  };
}
