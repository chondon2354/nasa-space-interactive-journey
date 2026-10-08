import { createFileRoute, Link } from "@tanstack/react-router";
import { Starfield } from "../components/Starfield";
import { SolarSystemMap } from "../components/SolarSystemMap";
import { MissionCard } from "../components/MissionCard";
import { MISSIONS } from "../data/missions";
import heroImg from "../assets/hero-space.jpg";
import moonImg from "../assets/moon.jpg";
import marsImg from "../assets/mars.jpg";
import deepSpaceImg from "../assets/deep-space.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NASA Space Exploration Archive — Every Mission Has a Story" },
      {
        name: "description",
        content:
          "Explore the machines, people, discoveries, failures, and unexpected victories that changed what we know about space. An interactive digital museum of Moon, Mars, and deep-space missions.",
      },
      { property: "og:title", content: "NASA Space Exploration Archive — Every Mission Has a Story" },
      {
        property: "og:description",
        content: "An interactive digital museum of lunar, Mars, and deep-space exploration missions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WORLDS = [
  {
    to: "/moon" as const,
    img: moonImg,
    icon: "🌕",
    title: "THE MOON",
    text: "Humanity's first great destination beyond Earth.",
    cta: "Explore Moon Missions",
    accent: "text-lunar",
  },
  {
    to: "/mars" as const,
    img: marsImg,
    icon: "🔴",
    title: "MARS",
    text: "A world of ancient water, dust, rocks, and unanswered questions.",
    cta: "Explore Mars Missions",
    accent: "text-mars",
  },
  {
    to: "/deep-space" as const,
    img: deepSpaceImg,
    icon: "🌌",
    title: "DEEP SPACE",
    text: "Where explorers travel beyond the worlds we can reach easily.",
    cta: "Explore Deep Space",
    accent: "text-nasa",
  },
];

const HAZARDS = [
  { icon: "🚀", name: "Launch Failure", text: "Rockets are controlled explosions. A single failed valve, sensor, or seal in the first minutes can end a mission before it begins." },
  { icon: "🔥", name: "Atmospheric Entry", text: "Arriving at Mars means surviving 1,600°C plasma while slowing from 20,000 km/h to zero in about seven minutes." },
  { icon: "🧭", name: "Navigation Errors", text: "Over hundreds of millions of kilometers, a fraction of a degree of error becomes a missed planet. Mars Climate Orbiter was lost to a unit-conversion bug." },
  { icon: "📡", name: "Communication Loss", text: "Signals weaken with the square of distance. From Voyager, a whisper of energy takes over 22 hours to reach Earth." },
  { icon: "⚡", name: "Power Failure", text: "Solar panels degrade, dust accumulates, RTGs decay. Every mission is a slow negotiation with its own energy budget." },
  { icon: "💻", name: "Software Problems", text: "A spacecraft computer can't be rebooted by hand. Engineers have fixed frozen memory and corrupted code from hundreds of millions of km away." },
  { icon: "🛢️", name: "Propulsion Problems", text: "Stuck valves, leaking thrusters, frozen fuel lines — propulsion failures have quietly ended many missions." },
  { icon: "🌪️", name: "Dust Storms", text: "Martian dust storms can engulf the entire planet for months, starving solar-powered spacecraft of light — as happened to Opportunity in 2018." },
  { icon: "🥶", name: "Extreme Cold", text: "A lunar night drops to −170°C for 14 days. Electronics, batteries, and lubricants must survive it or sleep through it." },
  { icon: "☀️", name: "Radiation", text: "Beyond Earth's magnetic shield, cosmic rays and solar storms flip bits, degrade solar cells, and threaten crews." },
  { icon: "🛰️", name: "Orbital Insertion", text: "Arriving too fast means flying past forever; too slow means falling in. One burn, no second chances." },
  { icon: "🪂", name: "Parachute Failure", text: "A parachute must deploy perfectly at supersonic speed after months of vacuum and cold. It is tested for years for a few seconds of use." },
];

function Index() {
  const featured = [MISSIONS.find((m) => m.slug === "apollo-11")!, MISSIONS.find((m) => m.slug === "perseverance")!, MISSIONS.find((m) => m.slug === "voyager-1")!];

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img src={heroImg} alt="The solar system seen from deep space" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1088} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
        <Starfield />
        <div className="animate-drift pointer-events-none absolute top-1/4 text-3xl opacity-70" aria-hidden>🛰️</div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl animate-fade-up">
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-cyan">A digital museum in space</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-7xl">
              Every Mission<br />Has a <span className="text-nasa glow-nasa">Story.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary-custom">
              Explore the machines, people, discoveries, failures, and unexpected victories that changed what we know about space.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/missions"
                className="rounded-lg bg-primary px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105"
              >
                Enter the Archive →
              </Link>
              <a
                href="#solar-system"
                className="rounded-lg border border-input px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-cyan hover:text-cyan"
              >
                Explore the Solar System
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOLAR SYSTEM MAP */}
      <section id="solar-system" className="relative border-t border-border py-24">
        <Starfield density={0.00006} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-cyan">Interactive map</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">The Solar System</h2>
          <p className="mt-4 max-w-2xl text-secondary-custom">
            Trace the trajectories humanity has flown — from Earth to the Moon, Mars, the giant planets, and interstellar space. Hover a path to see the mission; click to open its story.
          </p>
          <div className="mt-12">
            <SolarSystemMap />
          </div>
        </div>
      </section>

      {/* THREE WORLDS */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-cyan">Choose your destination</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Three Worlds of Exploration</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WORLDS.map((w) => (
              <Link key={w.to} to={w.to} className="card-hover group relative overflow-hidden rounded-2xl border border-border">
                <img src={w.img} alt={w.title} loading="lazy" width={1600} height={912} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-2xl" aria-hidden>{w.icon}</p>
                  <h3 className={`mt-1 font-display text-2xl font-bold ${w.accent}`}>{w.title}</h3>
                  <p className="mt-2 text-sm text-secondary-custom">{w.text}</p>
                  <p className="mt-4 font-tech text-xs uppercase tracking-widest text-foreground">
                    {w.cta} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-border bg-navy/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-tech text-xs uppercase tracking-[0.3em] text-cyan">From the archive</p>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Featured Missions</h2>
            </div>
            <Link to="/missions" className="font-tech text-sm text-cyan hover:underline">View all {MISSIONS.length} missions →</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((m) => (
              <MissionCard key={m.slug} mission={m} />
            ))}
          </div>
        </div>
      </section>

      {/* SPACE IS HARD */}
      <section className="relative border-t border-border py-24">
        <Starfield density={0.00005} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-failure">What could go wrong?</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Space Is Hard.</h2>
          <p className="mt-4 max-w-2xl text-secondary-custom">
            Every mission must survive thousands of things that can go wrong. Here are twelve of the usual suspects.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HAZARDS.map((h) => (
              <details key={h.name} className="card-hover group rounded-xl border border-border bg-card p-5 open:border-nasa/40">
                <summary className="flex cursor-pointer list-none items-center gap-3 font-display font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="text-xl" aria-hidden>{h.icon}</span>
                  {h.name}
                  <span className="ml-auto text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-secondary-custom">{h.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-border bg-navy/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 text-center sm:grid-cols-4 sm:px-6">
          {[
            { n: `${MISSIONS.length}`, l: "Missions archived" },
            { n: "1959", l: "First mission in the archive" },
            { n: "24B km", l: "Farthest active spacecraft" },
            { n: "3", l: "Worlds of exploration" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl font-bold text-nasa glow-nasa">{s.n}</p>
              <p className="mt-2 font-tech text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
