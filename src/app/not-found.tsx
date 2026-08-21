import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <p className="eyebrow">Arena unavailable</p>
      <h1>THE BLOBS LEFT.</h1>
      <p>This matchup does not have two valid fighter names.</p>
      <Link className="clay-button" href="/">Start a fight</Link>
    </main>
  );
}
