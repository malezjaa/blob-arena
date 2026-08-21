"use client";

import { useState } from "react";
import Link from "next/link";
import { Drop } from "@phosphor-icons/react";
import { BattlePlayback } from "./battle-playback";
import { FighterSetup } from "./fighter-setup";

interface ArenaAppProps {
  initialNames?: [string, string];
  autoStart?: boolean;
}

export function ArenaApp({
  initialNames = ["Tabs", "Spaces"],
  autoStart = false,
}: ArenaAppProps) {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Blob Arena home">
          <span className="brand-mark" aria-hidden="true">
            <Drop weight="fill" size={23} />
          </span>
          <span>BLOB ARENA</span>
        </Link>
        <span className="header-rule">Same names. Same winner.</span>
      </header>

      {autoStart ? (
        <BattlePlayback
          key={replayKey}
          names={initialNames}
          onReplay={() => setReplayKey((value) => value + 1)}
        />
      ) : (
        <FighterSetup initialNames={initialNames} />
      )}

      <footer className="site-footer">
        <span>No accounts. No rankings. Just blobs.</span>
        <a href="https://github.com/Alain00/blobatar" target="_blank" rel="noreferrer">
          Fighters by Blobatar
        </a>
      </footer>
    </main>
  );
}
