import { Link } from "@tanstack/react-router";
import { missionsByDestination, type Destination } from "../data/missions";
import { MissionCard } from "./MissionCard";
import { Starfield } from "./Starfield";

interface Props {
  destination: Destination;
  image: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  facts: { label: string; value: string }[];
  accent: string;
}

export function DestinationPage({ destination, image, icon, title, tagline, description, facts, accent }: Props) {
  const missions = missionsByDestination(destination).sort((a, b) => a.year - b.year);

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" width={1600} height={912} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <Starfield />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6">
          <p className="text-4xl" aria-hidden>{icon}</p>
          <h1 className={`mt-2 font-display text-6xl font-bold sm:text-8xl ${accent}`}>{title}</h1>
          <p className="mt-4 max-w-xl text-xl text-secondary-custom">{tagline}</p>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="max-w-3xl text-lg leading-relaxed text-secondary-custom">{description}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-card p-5">
                <p className="font-tech text-xs uppercase tracking-widest text-muted-foreground">{f.label}</p>
                <p className="mt-2 font-display text-xl font-bold">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-navy/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold">Missions to {title}</h2>
            <Link to="/missions" className="font-tech text-sm text-cyan hover:underline">Open full archive →</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((m) => (
              <MissionCard key={m.slug} mission={m} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
