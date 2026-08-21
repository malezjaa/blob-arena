import { describe, expect, it } from "vitest";
import { simulateBattle, MAX_COMBAT_TURNS } from "./battle";
import { createFighter } from "./fighter";
import { normalizeName, sanitizeName } from "./names";

describe("fighter generation", () => {
  it("normalizes equivalent names", () => {
    expect(normalizeName("  Tabs  ")).toBe("tabs");
    expect(sanitizeName("Ada/Lovelace")).toBe("Ada-Lovelace");
  });

  it("creates the same fighter for the same normalized name", () => {
    expect(createFighter(" Tabs ")).toEqual(createFighter("tabs"));
  });
});

describe("battle simulation", () => {
  const tabs = createFighter("Tabs");
  const spaces = createFighter("Spaces");

  it("replays an identical battle", () => {
    expect(simulateBattle(tabs, spaces)).toEqual(
      simulateBattle(tabs, spaces),
    );
  });

  it("preserves the winner when input order changes", () => {
    const forward = simulateBattle(tabs, spaces);
    const reverse = simulateBattle(spaces, tabs);

    expect(reverse.winner.seed).toBe(forward.winner.seed);
    expect(reverse.events).toEqual(forward.events);
  });

  it("always ends within the combat turn cap", () => {
    for (let index = 0; index < 100; index += 1) {
      const result = simulateBattle(
        createFighter(`fighter ${index}`),
        createFighter(`opponent ${index}`),
      );
      expect(result.combatTurns).toBeLessThanOrEqual(MAX_COMBAT_TURNS);
    }
  });

  it("supports mirror matches", () => {
    const result = simulateBattle(createFighter("Greg"), createFighter("Greg"));
    expect(result.events.length).toBeGreaterThan(0);
    expect(result.combatTurns).toBeLessThanOrEqual(MAX_COMBAT_TURNS);
  });
});
