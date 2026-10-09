import { createFileRoute, Link } from "@tanstack/react-router";
import { Starfield } from "../components/Starfield";
import { MISSIONS, OUTCOME_META, type Outcome } from "../data/missions";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NASA Space Exploration Archive" },
      { name: "description", content: "About this archive: its scope, its outcome categories, and why failure stories matter as much as success stories." },
      { property: "og:title", content: "About — NASA Space Exploration Archive" },
      { property: "og:description", content: "The scope and method of the NASA Space Exploration Archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative min-h-screen py-16">
      <Starfield density={0.00005} />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <p className="font-tech text-xs uppercase tracking-[0.3em] text-cyan">About the archive</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">A Digital Museum in Space</h1>

        <div className="mt-10 space-y-8 text-secondary-custom leading-relaxed">
          <p>
            The NASA Space Exploration Archive is an interactive educational museum of robotic and human space
            exploration. Its scope: <strong className="text-foreground">major exploration missions to the Moon, Mars,
            and deep space, with emphasis on NASA and major international missions.</strong> It does not attempt to
            catalog every mission ever launched — it curates the missions whose stories changed what we know.
          </p>
          <p>
            The archive currently holds <strong className="text-foreground">{MISSIONS.length} mission files</strong>,
            each with its journey, hardware, discoveries, and legacy. It is designed to grow: new missions are added
            as new entries in the archive's catalog.
          </p>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">How We Grade Outcomes</h2>
            <p className="mt-3 text-sm">
              Real missions rarely fit "success" or "failure." A spacecraft can launch perfectly, survive cruise,
              and fail at landing — or fail its primary goal and still transform science. Every mission here is
              graded honestly:
            </p>
            <ul className="mt-6 space-y-3">
              {(Object.keys(OUTCOME_META) as Outcome[]).map((o) => (
                <li key={o} className="flex items-center gap-3 text-sm">
                  <span className={`h-2.5 w-2.5 rounded-full ${OUTCOME_META[o].dot}`} />
                  <span className={`font-tech text-xs uppercase tracking-wider ${OUTCOME_META[o].color}`}>
                    {OUTCOME_META[o].label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Why Failure Stories Matter</h2>
            <p className="mt-3 text-sm">
              Mars Climate Orbiter was lost to a unit-conversion error. Mars Polar Lander fell silent over a sensor
              timing bug. Apollo 13 never landed — and became NASA's greatest lesson in crisis engineering. In this
              archive, failures are presented scientifically: what happened, why, what it cost, and what it taught.
              Failure, studied honestly, is how exploration moves forward.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            This is an independent educational project and is not affiliated with or endorsed by NASA. Mission
            information is drawn from public NASA and agency archives.
          </p>
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/missions"
            className="inline-block rounded-lg bg-primary px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105"
          >
            Enter the Archive →
          </Link>
        </div>
      </div>
    </div>
  );
}
