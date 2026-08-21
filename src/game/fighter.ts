import { hashHex } from "./hash";
import { MOVES } from "./moves";
import { displayName, normalizeName } from "./names";
import { createRng } from "./rng";
import type { Fighter, Move, MoveType, Personality } from "@/types/game";

const PERSONALITIES: readonly Personality[] = [
  "The Menace",
  "The Coward",
  "The Intellectual",
  "The Creature",
  "The Goblin",
  "The Professional",
  "The Problem",
  "The Suspicious One",
  "The Ancient Blob",
  "The Intern",
];

const MOVE_TYPES: readonly MoveType[] = [
  "normal",
  "internet",
  "programming",
  "strange",
];

function movesByType(type: MoveType): Move[] {
  return MOVES.filter((move) => move.type === type);
}

export function createFighter(input: string): Fighter {
  const normalizedName = normalizeName(input);
  const name = displayName(input);

  if (!normalizedName) {
    throw new Error("A fighter needs a name");
  }

  const seed = hashHex(`fighter:${normalizedName}`);
  const rng = createRng(seed);
  const chaos = rng.int(1, 10);
  const preferredType = chaos >= 8 ? "strange" : rng.pick(MOVE_TYPES);
  const selectedTypes: MoveType[] = [
    "normal",
    preferredType,
    rng.pick(MOVE_TYPES),
    rng.pick(MOVE_TYPES),
  ];
  const chosen = new Map<string, Move>();

  for (const type of selectedTypes) {
    const pool = movesByType(type).filter((move) => !chosen.has(move.id));
    const fallback = MOVES.filter((move) => !chosen.has(move.id));
    const move = rng.pick(pool.length > 0 ? pool : fallback);
    chosen.set(move.id, move);
  }

  while (chosen.size < 4) {
    const move = rng.pick(MOVES.filter((candidate) => !chosen.has(candidate.id)));
    chosen.set(move.id, move);
  }

  return {
    name,
    normalizedName,
    seed,
    hp: rng.int(84, 112),
    strength: rng.int(1, 10),
    defense: rng.int(1, 10),
    speed: rng.int(1, 10),
    luck: rng.int(1, 10),
    chaos,
    personality: rng.pick(PERSONALITIES),
    moves: [...chosen.values()],
  };
}
