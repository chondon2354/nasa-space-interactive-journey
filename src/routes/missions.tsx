import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MISSIONS, OUTCOME_META, type Destination, type Outcome } from "../data/missions";
import { MissionCard } from "../components/MissionCard";
import { Starfield } from "../components/Starfield";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "Mission Archive — NASA Space Exploration Archive" },
      { name: "description", content: "Search and filter major exploration missions to the Moon, Mars, and deep space by destination, type, outcome, and era." },
      { property: "og:title", content: "Mission Archive — NASA Space Exploration Archive" },
      { property: "og:description", content: "Search and filter major exploration missions to the Moon, Mars, and deep space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionsPage,
});

const DESTS: { value: Destination | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "moon", label: "🌕 Moon" },
  { value: "mars", label: "🔴 Mars" },
  { value: "deep-space", label: "🌌 Deep Space" },
];

const OUTCOMES: (Outcome | "all")[] = ["all", "successful", "partial", "failed", "ongoing", "extended", "lost"];

const ERAS = [
  { value: "all", label: "All eras" },
  { value: "1950-1970", label: "1959–1970" },
  { value: "1970-1990", label: "1970–1990" },
  { value: "1990-2010", label: "1990–2010" },
  { value: "2010-2030", label: "2010–Present" },
];

function MissionsPage() {
  const [query, setQuery] = useState("");
  const [dest, setDest] = useState<Destination | "all">("all");
  const [outcome, setOutcome] = useState<Outcome | "all">("all");
  const [era, setEra] = useState("all");

  const results = useMemo(() => {
    return MISSIONS.filter((m) => {
      if (dest !== "all" && m.destination !== dest) return false;
      if (outcome !== "all" && m.outcome !== outcome) return false;
      if (era !== "all") {
        const [lo, hi] = era.split("-").map(Number);
        if (m.year < lo || m.year >= hi) return false;
      }
      if (query) {
        const q = query.toLowerCase();
        const hay = `${m.name} ${m.type} ${m.agency} ${m.destinationLabel} ${m.oneLiner}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => a.year - b.year);
  }, [query, dest, outcome, era]);

  return (
    <div className="relative min-h-screen py-16">
      <Starfield density={0.00005} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-tech text-xs uppercase tracking-[0.3em] text-cyan">🛰️ The archive</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">Mission Archive</h1>
        <p className="mt-4 max-w-2xl text-secondary-custom">
          Major exploration missions to the Moon, Mars, and deep space — with emphasis on NASA and major international missions. Search, filter, and open any mission file.
        </p>

        {/* Filters */}
        <div className="mt-10 rounded-2xl border border-border bg-card/80 p-5 backdrop-blur">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔎 Search missions, destinations, agencies…"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-nasa"
            aria-label="Search missions"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {DESTS.map((d) => (
              <button
                key={d.value}
                onClick={() => setDest(d.value)}
                className={`rounded-full border px-4 py-1.5 font-tech text-xs uppercase tracking-wider transition-colors ${
                  dest === d.value ? "border-nasa bg-nasa/15 text-nasa" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {OUTCOMES.map((o) => (
              <button
                key={o}
                onClick={() => setOutcome(o)}
                className={`rounded-full border px-4 py-1.5 font-tech text-xs uppercase tracking-wider transition-colors ${
                  outcome === o ? "border-cyan bg-cyan/10 text-cyan" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {o === "all" ? "All outcomes" : OUTCOME_META[o].label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {ERAS.map((e) => (
              <button
                key={e.value}
                onClick={() => setEra(e.value)}
                className={`rounded-full border px-4 py-1.5 font-tech text-xs uppercase tracking-wider transition-colors ${
                  era === e.value ? "border-solar bg-solar/10 text-solar" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 font-tech text-xs uppercase tracking-widest text-muted-foreground">
          {results.length} mission{results.length === 1 ? "" : "s"} found
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((m) => (
            <MissionCard key={m.slug} mission={m} />
          ))}
        </div>
        {results.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">No missions match those filters. Try widening the search.</p>
        )}
      </div>
    </div>
  );
}
