import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArenaApp } from "@/components/arena/arena-app";
import { fromRouteSegment } from "@/game/names";

interface FightPageProps {
  params: Promise<{ fighterA: string; fighterB: string }>;
}

export async function generateMetadata({ params }: FightPageProps): Promise<Metadata> {
  const route = await params;
  const fighterA = fromRouteSegment(route.fighterA);
  const fighterB = fromRouteSegment(route.fighterB);

  return {
    title: `${fighterA} vs ${fighterB}`,
    description: `Watch ${fighterA} and ${fighterB} settle it in Blob Arena.`,
  };
}

export default async function FightPage({ params }: FightPageProps) {
  const route = await params;
  const fighterA = fromRouteSegment(route.fighterA);
  const fighterB = fromRouteSegment(route.fighterB);

  if (!fighterA || !fighterB) notFound();

  return <ArenaApp initialNames={[fighterA, fighterB]} autoStart />;
}
