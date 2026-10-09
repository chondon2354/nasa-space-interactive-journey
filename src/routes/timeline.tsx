import { createFileRoute, Link } from "@tanstack/react-router";
import { DESTINATION_META, MISSIONS, OUTCOME_META } from "../data/missions";
import { Starfield } from "../components/Starfield";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — NASA Space Exploration Archive" },
      { name: "description", content: "Six decades of exploration, from Luna 2 in 1959 to the missions flying today — Moon, Mars, and deep space in chronological order." },
      { property: "og:title", content: "Timeline — NASA Space Exploration Archive" },
      { property: "og:description", content: "Six decades of space exploration in chronological order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  const sorted = [...MISSIONS].sort((a, b) => a.year - b.year);

  return (
    <div className="relative min-h-screen py-16">
      <Starfield density={0.00005} />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <p className="font-tech text-xs uppercase tracking-[0.3em] text-cyan">1959 → Present</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">The Timeline</h1>
        <p className="mt-4 max-w-2xl text-secondary-custom">
          Six decades of exploration, in the order it happened. Watch the destinations move outward — Moon, then Mars, then the edge of the solar system.
        </p>

        <div className="relative mt-16 border-l border-border pl-8">
          {sorted.map((m) => {
            const meta = OUTCOME_META[m.outcome];
            const dest = DESTINATION_META[m.destination];
            return (
              <div key={m.slug} className="relative pb-12">
                <span className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-background ${meta.dot}`} />
                <span className="font-display text-4xl font-bold text-nasa/25">{m.year}</span>
                <Link
                  to="/missions/$slug"
                  params={{ slug: m.slug }}
                  className="card-hover mt-2 block rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl font-bold">{m.name}</h2>
                    <span className="font-tech text-xs text-muted-foreground">{dest.icon} {dest.label}</span>
                    <span className={`ml-auto font-tech text-xs ${meta.color}`}>● {meta.label}</span>
                  </div>
                  <p className="mt-2 text-sm text-secondary-custom">{m.oneLiner}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
