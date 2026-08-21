"use client";

import { Blobatar } from "@blobatar/react";
import { motion, useReducedMotion } from "motion/react";
import type { Fighter } from "@/types/game";
import { HealthBar } from "./health-bar";

interface FighterCardProps {
  fighter: Fighter;
  hp: number;
  side: "left" | "right";
  state: "idle" | "attacking" | "hit" | "defeated" | "winner";
  turnKey: number;
  damage: number;
  critical: boolean;
  missed: boolean;
}

export function FighterCard({
  fighter,
  hp,
  side,
  state,
  turnKey,
  damage,
  critical,
  missed,
}: FighterCardProps) {
  const reduceMotion = useReducedMotion();
  const direction = side === "left" ? 1 : -1;
  const attackTransform = [
    "translateX(0) scale(1, 1)",
    `translateX(${direction * 52}px) scale(1.08, .92)`,
    "translateX(0) scale(1, 1)",
  ];
  const hitTransform = [
    "translateX(0) rotate(0deg)",
    `translateX(${direction * -15}px) rotate(${direction * -3}deg)`,
    `translateX(${direction * 8}px) rotate(${direction * 2}deg)`,
    "translateX(0) rotate(0deg)",
  ];

  const transform = reduceMotion
    ? "translateX(0)"
    : state === "attacking"
      ? attackTransform
      : state === "hit"
        ? hitTransform
        : state === "defeated"
          ? "translateY(30px) scale(1.15, .3)"
          : state === "winner"
            ? ["translateY(0) scale(1)", "translateY(-12px) scale(1.04)", "translateY(0) scale(1)"]
            : "translateX(0) scale(1)";

  return (
    <article className={`battle-fighter battle-fighter-${side}`}>
      <div className="fighter-heading">
        <div>
          <h2>{fighter.name}</h2>
          <p>{fighter.personality}</p>
        </div>
        <HealthBar current={hp} maximum={fighter.hp} align={side} />
      </div>

      <motion.div
        key={`${fighter.seed}-${turnKey}-${state}`}
        className={`combat-blob ${state === "idle" ? "blob-idle" : ""}`}
        initial={false}
        animate={{ transform, opacity: state === "defeated" ? 0.58 : 1 }}
        transition={
          state === "winner"
            ? { type: "spring", duration: 0.5, bounce: 0.2 }
            : state === "hit"
              ? { duration: 0.5, ease: [0.77, 0, 0.175, 1], times: [0, 0.28, 0.62, 1] }
              : { duration: 0.5, ease: [0.77, 0, 0.175, 1], times: [0, 0.44, 1] }
        }
      >
        <Blobatar
          name={fighter.normalizedName}
          background={false}
          title={`${fighter.name}, ${fighter.personality}`}
        />
      </motion.div>

      {(state === "hit" || (state === "attacking" && missed)) && (
        <motion.span
          key={`damage-${turnKey}-${fighter.seed}`}
          className={`damage-number ${critical ? "damage-critical" : ""}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px) scale(.95)" }}
          animate={{ opacity: 1, transform: "translateY(-20px) scale(1)" }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          {missed ? "MISS" : `-${damage}`}
        </motion.span>
      )}

      <div className="fighter-stats" aria-label={`${fighter.name} stats`}>
        <span>STR {fighter.strength}</span>
        <span>DEF {fighter.defense}</span>
        <span>SPD {fighter.speed}</span>
        <span>LUCK {fighter.luck}</span>
      </div>
    </article>
  );
}
