import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { OUTCOME_META, getMission, type StageStatus } from "../data/missions";
import { Starfield } from "../components/Starfield";

export const Route = createFileRoute("/missions/$slug")({
  loader: ({ params }) => {
    const mission = getMission(params.slug);
    if (!mission) throw notFound();
    return mission;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Mission"} — NASA Space Exploration Archive` },
      { name: "description", content: loaderData?.oneLiner ?? "Mission story" },
      { property: "og:title", content: `${loaderData?.name ?? "Mission"} — NASA Space Exploration Archive` },
      { property: "og:description", content: loaderData?.oneLiner ?? "Mission story" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionDetail,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-4xl font-bold">Mission not found</h1>
        <p className="mt-3 text-muted-foreground">This mission isn't in the archive yet.</p>
        <Link to="/missions" className="mt-6 inline-block font-tech text-sm text-cyan hover:underline">← Back to the archive</Link>
      </div>
    </div>
  ),
});

const STAGE_ICON: Record<StageStatus, string> = {
  success: "✅",
  problem: "⚠️",
  failure: "❌",
  ongoing: "⏳",
};

const STAGE_COLOR: Record<StageStatus, string> = {
  success: "border-success/50 text-success",
  problem: "border-warning/50 text-warning",
  failure: "border-failure/50 text-failure",
  ongoing: "border-nasa/50 text-nasa",
};

function MissionDetail() {
  const mission = Route.useLoaderData();
  const meta = OUTCOME_META[mission.outcome];
  const [openStage, setOpenStage] = useState<number | null>(null);
  const [openPart, setOpenPart] = useState<number | null>(null);

  return (
    <div className="relative">
      <Starfield density={0.00005} />
      {/* Header */}
      <section className="relative border-b border-border py-16">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Link to="/missions" className="font-tech text-xs uppercase tracking-widest text-muted-foreground hover:text-cyan">
            ← Mission Archive
          </Link>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div>
              <span className="font-display text-7xl font-bold text-nasa/20 sm:text-8xl">{mission.year}</span>
              <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">{mission.name}</h1>
              <p className="mt-4 max-w-xl text-lg text-secondary-custom">{mission.oneLiner}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 font-tech text-xs">
              <dl className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div><dt className="uppercase tracking-widest text-muted-foreground">Launch</dt><dd className="mt-1 text-foreground">{mission.launchDate}</dd></div>
                <div><dt className="uppercase tracking-widest text-muted-foreground">Destination</dt><dd className="mt-1 text-foreground">{mission.destinationLabel}</dd></div>
                <div><dt className="uppercase tracking-widest text-muted-foreground">Type</dt><dd className="mt-1 text-foreground">{mission.type}</dd></div>
                <div><dt className="uppercase tracking-widest text-muted-foreground">Agency</dt><dd className="mt-1 text-foreground">{mission.agency}</dd></div>
                <div className="col-span-2">
                  <dt className="uppercase tracking-widest text-muted-foreground">Status</dt>
                  <dd className={`mt-1 flex items-center gap-2 ${meta.color}`}>
                    <span className={`h-2 w-2 rounded-full ${meta.dot}`} /> {meta.label}
                    {mission.international && <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">INTERNATIONAL</span>}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {/* Section A — The Mission */}
        <section>
          <h2 className="font-display text-3xl font-bold"><span className="text-cyan">A.</span> The Mission</h2>
          <p className="mt-2 font-tech text-xs uppercase tracking-widest text-muted-foreground">What was this mission trying to do?</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold text-nasa">The Goal</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-custom">{mission.goal}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold text-nasa">Why It Matters</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-custom">{mission.importance}</p>
            </div>
          </div>
        </section>

        {/* Journey bar */}
        <section className="mt-20">
          <h2 className="font-display text-3xl font-bold">Mission Journey</h2>
          <p className="mt-2 font-tech text-xs uppercase tracking-widest text-muted-foreground">Click a stage to see what happened</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {mission.journey.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setOpenStage(openStage === i ? null : i)}
                className={`rounded-lg border px-4 py-3 text-left transition-colors ${STAGE_COLOR[s.status]} ${openStage === i ? "bg-card" : "bg-card/50 hover:bg-card"}`}
              >
                <span className="text-base" aria-hidden>{STAGE_ICON[s.status]}</span>
                <span className="ml-2 font-tech text-xs uppercase tracking-wider">{s.name}</span>
              </button>
            ))}
          </div>
          {openStage !== null && (
            <div className="mt-4 animate-fade-up rounded-xl border border-border bg-card p-6">
              <p className="font-display font-semibold">
                {STAGE_ICON[mission.journey[openStage].status]} {mission.journey[openStage].name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-secondary-custom">{mission.journey[openStage].detail}</p>
            </div>
          )}
        </section>

        {/* Section B — Hardware */}
        <section className="mt-20">
          <h2 className="font-display text-3xl font-bold"><span className="text-cyan">B.</span> The Hardware</h2>
          <p className="mt-2 font-tech text-xs uppercase tracking-widest text-muted-foreground">Click a part to learn how it works</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {mission.hardware.map((h, i) => (
              <details
                key={h.name}
                open={openPart === i}
                className="card-hover group rounded-xl border border-border bg-card p-6 open:border-nasa/40"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenPart(openPart === i ? null : i);
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold [&::-webkit-details-marker]:hidden">
                  {h.name}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-secondary-custom">
                  <p><span className="font-tech text-xs uppercase tracking-widest text-cyan">What is this? </span>{h.what}</p>
                  <p><span className="font-tech text-xs uppercase tracking-widest text-cyan">How does it work? </span>{h.how}</p>
                  <p><span className="font-tech text-xs uppercase tracking-widest text-cyan">Why was it important? </span>{h.why}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Failure story */}
        {mission.failureStory && (
          <section className="mt-20 rounded-2xl border border-failure/30 bg-failure/5 p-8">
            <h2 className="font-display text-3xl font-bold text-failure">What Went Wrong?</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                { t: "What happened?", v: mission.failureStory.what },
                { t: "Why did it happen?", v: mission.failureStory.why },
                { t: "What was the consequence?", v: mission.failureStory.consequence },
                { t: "What did engineers learn?", v: mission.failureStory.lesson },
              ].map((x, i) => (
                <div key={x.t} className="rounded-xl border border-border bg-card p-6">
                  <p className="font-tech text-xs text-muted-foreground">0{i + 1}</p>
                  <h3 className="mt-1 font-display font-semibold">{x.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-custom">{x.v}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* What did we learn */}
        <section className="mt-20">
          <h2 className="font-display text-3xl font-bold">What Did We Learn?</h2>
          <ul className="mt-8 space-y-4">
            {mission.learned.map((l, i) => (
              <li key={i} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <span className="font-display text-xl font-bold text-solar">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed text-secondary-custom">{l}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Legacy */}
        <section className="mt-20 rounded-2xl border border-nasa/30 bg-nasa/5 p-8">
          <h2 className="font-display text-2xl font-bold text-nasa">Legacy</h2>
          <p className="mt-4 leading-relaxed text-secondary-custom">{mission.legacy}</p>
        </section>

        <div className="mt-16 flex justify-between font-tech text-sm">
          <Link to="/missions" className="text-muted-foreground hover:text-cyan">← All missions</Link>
          <Link to="/timeline" className="text-muted-foreground hover:text-cyan">See the timeline →</Link>
        </div>
      </div>
    </div>
  );
}
