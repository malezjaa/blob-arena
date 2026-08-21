"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowCounterClockwise,
  Copy,
  FastForward,
  Shuffle,
  Trophy,
} from "@phosphor-icons/react";
import { simulateBattle } from "@/game/battle";
import { createFighter } from "@/game/fighter";
import type { BattleEvent, BattleTurn, Fighter } from "@/types/game";
import { FighterCard } from "./fighter-card";

interface BattlePlaybackProps {
  names: [string, string];
  onReplay: () => void;
}

type Slot = "left" | "right";

function isMirror(left: Fighter, right: Fighter) {
  return left.seed === right.seed;
}

function eventSlot(
  seed: string,
  left: Fighter,
  right: Fighter,
): Slot | undefined {
  if (isMirror(left, right)) {
    if (seed === "a") return "left";
    if (seed === "b") return "right";
  }
  if (seed === left.seed) return "left";
  if (seed === right.seed) return "right";
  return undefined;
}

function hpAtPlayhead(
  events: BattleEvent[],
  playhead: number,
  left: Fighter,
  right: Fighter,
) {
  const current = { left: left.hp, right: right.hp };
  events.slice(0, playhead + 1).forEach((event) => {
    if (event.kind !== "attack") return;
    const slot = eventSlot(event.defenderSeed, left, right);
    if (slot) current[slot] = event.defenderHp;
  });
  return current;
}

export function BattlePlayback({ names, onReplay }: BattlePlaybackProps) {
  const reduceMotion = useReducedMotion();
  const left = useMemo(() => createFighter(names[0]), [names]);
  const right = useMemo(() => createFighter(names[1]), [names]);
  const result = useMemo(() => simulateBattle(left, right), [left, right]);
  const [playhead, setPlayhead] = useState(-1);
  const [copyStatus, setCopyStatus] = useState("");
  const complete = playhead >= result.events.length - 1;
  const currentEvent = playhead >= 0 ? result.events[playhead] : undefined;
  const currentAttack = currentEvent?.kind === "attack" ? currentEvent : undefined;
  const hp = hpAtPlayhead(result.events, playhead, left, right);

  useEffect(() => {
    if (complete) return;
    const delay = reduceMotion ? 180 : playhead < 0 ? 480 : 650;
    const timer = window.setTimeout(() => {
      setPlayhead((value) => Math.min(value + 1, result.events.length - 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [complete, playhead, reduceMotion, result.events.length]);

  const getFighterState = (slot: Slot) => {
    const fighter = slot === "left" ? left : right;
    if (complete) {
      if (hp[slot] <= 0) return "defeated" as const;
      if (fighter.seed === result.winner.seed) return "winner" as const;
      return "idle" as const;
    }
    if (!currentAttack) return "idle" as const;
    if (eventSlot(currentAttack.attackerSeed, left, right) === slot) return "attacking" as const;
    if (eventSlot(currentAttack.defenderSeed, left, right) === slot && !currentAttack.missed) {
      return "hit" as const;
    }
    return "idle" as const;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("Link copied");
    } catch {
      setCopyStatus("Copy failed");
    }
    window.setTimeout(() => setCopyStatus(""), 1800);
  };

  const recentEvents = result.events.slice(Math.max(0, playhead - 1), playhead + 1);

  return (
    <section
      className={`battle-stage ${complete ? "battle-stage-complete" : ""}`}
      aria-label={`${left.name} versus ${right.name}`}
    >
      <div className="arena-topline">
        <span>{complete ? "FINAL RESULT" : "BATTLE IN PROGRESS"}</span>
        {!complete && (
          <button
            className="quiet-button"
            type="button"
            onClick={() => setPlayhead(result.events.length - 1)}
          >
            <FastForward size={18} weight="fill" />
            Skip
          </button>
        )}
      </div>

      <div className="fighters-grid">
        <FighterCard
          fighter={left}
          hp={hp.left}
          side="left"
          state={getFighterState("left")}
          turnKey={playhead}
          damage={currentAttack?.damage ?? 0}
          critical={currentAttack?.critical ?? false}
          missed={
            currentAttack?.missed && eventSlot(currentAttack.attackerSeed, left, right) === "left"
              ? true
              : false
          }
        />

        <div className="arena-center" aria-hidden="true">
          <span>VS</span>
        </div>

        <FighterCard
          fighter={right}
          hp={hp.right}
          side="right"
          state={getFighterState("right")}
          turnKey={playhead}
          damage={currentAttack?.damage ?? 0}
          critical={currentAttack?.critical ?? false}
          missed={
            currentAttack?.missed && eventSlot(currentAttack.attackerSeed, left, right) === "right"
              ? true
              : false
          }
        />
      </div>

      <div className="battle-console" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="popLayout" initial={false}>
          {recentEvents.length === 0 ? (
            <motion.p key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              The blobs are considering their options.
            </motion.p>
          ) : (
            recentEvents.map((event, index) => (
              <motion.p
                key={`${event.index}-${event.message}`}
                className={index === recentEvents.length - 1 ? "current-message" : "previous-message"}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                exit={{ opacity: 0, transform: "translateY(-10px)" }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              >
                {event.message}
                {event.kind === "attack" && !event.missed && (
                  <strong>
                    {event.critical ? " Critical hit!" : ""} -{event.damage} HP
                  </strong>
                )}
              </motion.p>
            ))
          )}
        </AnimatePresence>
      </div>

      {complete && (
        <motion.div
          className="result-panel"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(18px) scale(.97)" }}
          animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
          transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
        >
          <Trophy size={30} weight="fill" aria-hidden="true" />
          <div className="result-copy">
            <p>{result.winner.personality}</p>
            <h1>{result.winner.name} WINS</h1>
            <span>{result.winnerHp} HP remaining</span>
          </div>
          <div className="result-actions">
            <button className="clay-button" type="button" onClick={onReplay}>
              <ArrowCounterClockwise size={20} weight="bold" />
              Replay
            </button>
            <button className="clay-button secondary-button" type="button" onClick={copyLink}>
              <Copy size={20} weight="bold" />
              Copy link
            </button>
            <Link className="icon-button" href="/" aria-label="Start a new matchup">
              <Shuffle size={22} weight="bold" />
            </Link>
          </div>
          <span className="copy-status" role="status">{copyStatus}</span>
        </motion.div>
      )}

      {complete && (
        <details className="full-log">
          <summary>Full battle log ({result.events.length})</summary>
          <ol>
            {result.events.map((event) => (
              <li key={`log-${event.index}`}>{formatLogEvent(event)}</li>
            ))}
          </ol>
        </details>
      )}
    </section>
  );
}

function formatLogEvent(event: BattleEvent) {
  if (event.kind === "flavor") return event.message;
  const attack = event as BattleTurn;
  if (attack.missed) return attack.message;
  return `${attack.message} ${attack.critical ? "Critical hit. " : ""}-${attack.damage} HP.`;
}
