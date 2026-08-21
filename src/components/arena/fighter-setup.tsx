"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Blobatar } from "@blobatar/react";
import { ArrowRight, Lightning } from "@phosphor-icons/react";
import { createFighter } from "@/game/fighter";
import { sanitizeName, toRouteSegment } from "@/game/names";

interface FighterSetupProps {
  initialNames: [string, string];
}

function FighterPreview({ name, side }: { name: string; side: "left" | "right" }) {
  const safeName = sanitizeName(name) || `mystery blob ${side}`;
  const fighter = useMemo(() => createFighter(safeName), [safeName]);

  return (
    <div className={`setup-fighter setup-fighter-${side}`}>
      <div className="preview-blob blob-idle">
        <Blobatar
          name={fighter.normalizedName}
          background={false}
          title={`${fighter.name}, ${fighter.personality}`}
        />
      </div>
      <p className="personality-label">{fighter.personality}</p>
      <div className="mini-stats" aria-label={`${fighter.name} preview stats`}>
        <span>HP {fighter.hp}</span>
        <span>STR {fighter.strength}</span>
        <span>CHAOS {fighter.chaos}</span>
      </div>
    </div>
  );
}

export function FighterSetup({ initialNames }: FighterSetupProps) {
  const router = useRouter();
  const [fighterA, setFighterA] = useState(initialNames[0]);
  const [fighterB, setFighterB] = useState(initialNames[1]);
  const [error, setError] = useState("");

  const handleFight = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const left = sanitizeName(fighterA);
    const right = sanitizeName(fighterB);

    if (!left || !right) {
      setError("Both blobs need a name before they can fight.");
      return;
    }

    setError("");
    router.push(`/fight/${toRouteSegment(left)}/${toRouteSegment(right)}`);
  };

  return (
    <section className="setup-stage" aria-labelledby="setup-title">
      <div className="setup-copy">
        <p className="eyebrow">Deterministic blob combat</p>
        <h1 id="setup-title">
          WHO WOULD
          <span>WIN?</span>
        </h1>
        <p className="setup-intro">Type two names. The blobs will handle the disagreement.</p>
      </div>

      <form className="matchup-form" onSubmit={handleFight} noValidate>
        <div className="fighter-column">
          <FighterPreview name={fighterA} side="left" />
          <label htmlFor="fighter-a">First fighter</label>
          <input
            id="fighter-a"
            name="fighterA"
            value={fighterA}
            onChange={(event) => setFighterA(event.target.value)}
            maxLength={24}
            autoComplete="off"
            aria-describedby={error ? "matchup-error" : undefined}
          />
        </div>

        <div className="versus-badge" aria-hidden="true">
          VS
        </div>

        <div className="fighter-column">
          <FighterPreview name={fighterB} side="right" />
          <label htmlFor="fighter-b">Second fighter</label>
          <input
            id="fighter-b"
            name="fighterB"
            value={fighterB}
            onChange={(event) => setFighterB(event.target.value)}
            maxLength={24}
            autoComplete="off"
            aria-describedby={error ? "matchup-error" : undefined}
          />
        </div>

        <div className="fight-action">
          {error ? (
            <p className="form-error" id="matchup-error" role="alert">
              {error}
            </p>
          ) : (
            <p className="form-helper">Names decide the fighter and the result.</p>
          )}
          <button className="clay-button fight-button" type="submit">
            <Lightning size={26} weight="fill" />
            FIGHT
            <ArrowRight size={24} weight="bold" />
          </button>
        </div>
      </form>
    </section>
  );
}
