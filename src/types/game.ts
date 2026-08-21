export type Personality =
  | "The Menace"
  | "The Coward"
  | "The Intellectual"
  | "The Creature"
  | "The Goblin"
  | "The Professional"
  | "The Problem"
  | "The Suspicious One"
  | "The Ancient Blob"
  | "The Intern";

export type MoveType = "normal" | "internet" | "programming" | "strange";

export interface Move {
  id: string;
  name: string;
  power: number;
  accuracy: number;
  type: MoveType;
  message: string;
}

export interface Fighter {
  name: string;
  normalizedName: string;
  seed: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
  luck: number;
  chaos: number;
  personality: Personality;
  moves: Move[];
}

export interface BattleTurn {
  index: number;
  kind: "attack";
  attackerSeed: string;
  defenderSeed: string;
  move: Move;
  damage: number;
  critical: boolean;
  missed: boolean;
  defenderHp: number;
  message: string;
}

export interface FlavorEvent {
  index: number;
  kind: "flavor";
  message: string;
}

export type BattleEvent = BattleTurn | FlavorEvent;

export interface BattleResult {
  fighters: [Fighter, Fighter];
  winner: Fighter;
  loser: Fighter;
  winnerHp: number;
  events: BattleEvent[];
  combatTurns: number;
  battleSeed: string;
}
