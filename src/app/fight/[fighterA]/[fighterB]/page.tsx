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
  const pagePath = `/fight/${route.fighterA}/${route.fighterB}`;
  const imagePath = `${pagePath}/opengraph-image`;
  const title = `${fighterA} vs ${fighterB}`;
  const description = `Watch ${fighterA} and ${fighterB} settle it in Blob Arena. Share the replay and see who wins this ridiculous blob battle.`;

  return {
    title,
    description,
    alternates: { canonical: pagePath },
    openGraph: {
      title,
      description,
      url: pagePath,
      siteName: "Blob Arena",
      type: "website",
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: `Blob Arena fight: ${fighterA} versus ${fighterB}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}

export default async function FightPage({ params }: FightPageProps) {
  const route = await params;
  const fighterA = fromRouteSegment(route.fighterA);
  const fighterB = fromRouteSegment(route.fighterB);

  if (!fighterA || !fighterB) notFound();

  return <ArenaApp initialNames={[fighterA, fighterB]} autoStart />;
}
