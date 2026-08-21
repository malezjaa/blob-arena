# Blob Arena MVP plan

## Product goal

Validate one question: is it fun enough to watch two deterministic blobs fight
that people want to try names and share the result?

The first release is a fast internet toy. It is not an RPG, social network, or
live multiplayer game.

## Core promise

The same normalized pair of names always creates the same fighters, combat
events, and winner. Reversing the two names only changes their screen positions.

The simulation canonically sorts the fighters before any battle random values
are assigned. Sorting only the seed is not sufficient because input order could
otherwise change which fighter receives each random value.

## MVP scope

- Two labeled name inputs with live Blobatar previews
- Deterministic stats, personality, and four-move loadout per name
- A deterministic battle engine that is independent from React
- Approximately 12 polished moves with misses and critical hits
- Rare, seeded flavor events
- An animated battle lasting approximately 6-12 seconds in normal cases
- Health, current action, recent messages, and a clear winner state
- Replay, skip, new matchup, and one clear copy-link control
- Shareable `/fight/[fighterA]/[fighterB]` routes
- Per-matchup Open Graph image generation
- Responsive layout, keyboard operation, and reduced-motion support
- Light and dark color tokens that respect the system preference

## Explicit behavior

- Trim names, normalize Unicode, collapse whitespace, and compare in lowercase.
- Remove URL-breaking control characters and replace slashes with hyphens.
- Limit display names to 24 characters.
- Reject empty names in the setup form with an inline error.
- Allow mirror matches.
- Cap combat at 24 turns and use a deterministic sudden-death result if needed.
- Keep the complete battle log after the result, but show only recent messages
  during playback.
- Reduced-motion mode keeps state fades and health changes but removes lunges,
  shakes, idle motion, and winner bounce.

## Visual direction

Blob Arena uses an original arcade-poster layout with clay-like controls. The
reference direction comes from 1st-Pouf: rounded display type, cushioned surfaces,
inset highlights, and physical button depth. Blob Arena uses one lilac interface
accent. Blobatar artwork supplies character color.

Design dials:

- Design variance: 9/10
- Motion intensity: 7/10
- Visual density: 3/10

Shape rule: large surfaces use 28px corners, fields use 18px corners, and
buttons use 16px corners. Pills are reserved for compact status labels.

## Animation decisions

Battle motion is infrequent and communicates feedback, state, and impact.

- CSS handles idle breathing, button presses, and health transitions.
- Motion handles the programmatic attack, recoil, damage, and victory sequence.
- Combat motion changes only `transform` and `opacity`.
- UI feedback uses the shared strong ease-out and ease-in-out curves.
- All position and perpetual motion is removed for reduced-motion users.

## Architecture

```text
src/
  app/                 Next.js routes and metadata
  components/arena/    Client-side setup and battle playback
  game/                Pure deterministic generator and simulator
  types/               Shared game types
```

`simulateBattle(fighterA, fighterB)` produces the complete event list before
playback. React only reveals that immutable list and never decides battle logic.

## Acceptance criteria

1. Generating a fighter twice from the same normalized name produces equal data.
2. Simulating a matchup twice produces equal events and the same winner.
3. Reversing fighter input preserves the winner and event sequence semantics.
4. Every simulation ends in at most 24 combat turns.
5. A shared route can be refreshed and replayed without stored server data.
6. The setup and result actions work with keyboard navigation.
7. The production build and deterministic-engine tests pass.
8. Desktop and mobile layouts have no clipped controls or horizontal overflow.

## Deferred until the core loop proves itself

- Accounts, database, rankings, inventory, progression, currency, matchmaking
- Tournament, three-way battles, daily bosses, and user-created moves
- Sound design and generated social art beyond the first OG card
- Analytics beyond basic traffic and share-action measurement
