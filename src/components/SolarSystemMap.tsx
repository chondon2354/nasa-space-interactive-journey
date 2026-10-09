import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OUTCOME_META, getMission } from "../data/missions";

const PLANETS = [
  { name: "Sun", r: 0, size: 26, color: "var(--solar-yellow)", speed: 0 },
  { name: "Earth", r: 70, size: 8, color: "var(--nasa-blue)", speed: 30 },
  { name: "Mars", r: 110, size: 6, color: "var(--mars-orange)", speed: 55 },
  { name: "Jupiter", r: 180, size: 16, color: "oklch(0.78 0.08 60)", speed: 120 },
  { name: "Saturn", r: 245, size: 13, color: "oklch(0.85 0.09 85)", speed: 200 },
  { name: "Neptune", r: 305, size: 9, color: "oklch(0.65 0.12 250)", speed: 320 },
];

// Trajectories drawn from Earth (at angle 200deg) to targets.
const TRAJECTORIES = [
  { slug: "apollo-11", to: { x: -58, y: -52 }, label: "Earth → Moon" },
  { slug: "mariner-4", to: { x: 95, y: -55 }, label: "Earth → Mars" },
  { slug: "juno", to: { x: 150, y: 100 }, label: "Earth → Jupiter" },
  { slug: "cassini", to: { x: -200, y: 140 }, label: "Earth → Saturn" },
  { slug: "new-horizons", to: { x: 330, y: -150 }, label: "Earth → Pluto" },
  { slug: "voyager-1", to: { x: -340, y: -230 }, label: "Earth → Interstellar" },
];

export function SolarSystemMap() {
  const [hover, setHover] = useState<string | null>(null);
  const navigate = useNavigate();
  const earth = { x: -66, y: -24 };
  const hovered = hover ? getMission(hover) : null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-3xl">
      <svg viewBox="-380 -380 760 760" className="h-full w-full" role="img" aria-label="Interactive solar system map">
        {/* orbits */}
        {PLANETS.slice(1).map((p) => (
          <circle key={p.name} r={p.r} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeDasharray="2 6" />
        ))}
        {/* asteroid belt */}
        <circle r={145} fill="none" stroke="oklch(0.78 0.03 250 / 0.12)" strokeWidth={14} strokeDasharray="1 4" />
        {/* sun glow */}
        <circle r={60} fill="url(#sunGlow)" />
        <defs>
          <radialGradient id="sunGlow">
            <stop offset="0%" stopColor="oklch(0.87 0.15 95 / 0.6)" />
            <stop offset="100%" stopColor="oklch(0.87 0.15 95 / 0)" />
          </radialGradient>
        </defs>
        {/* planets — rotating groups */}
        {PLANETS.map((p) =>
          p.r === 0 ? (
            <circle key={p.name} r={p.size} fill={p.color} />
          ) : (
            <g key={p.name} className="orbit-spin" style={{ ["--orbit-speed" as string]: `${p.speed}s`, transformOrigin: "0 0" }}>
              <circle cx={p.r} cy={0} r={p.size} fill={p.color} />
              {p.name === "Saturn" && (
                <ellipse cx={p.r} cy={0} rx={p.size * 1.9} ry={p.size * 0.5} fill="none" stroke={p.color} strokeOpacity={0.6} />
              )}
              <text x={p.r} y={p.size + 14} textAnchor="middle" className="font-tech" fontSize="10" fill="oklch(0.7 0.03 255)">
                {p.name}
              </text>
            </g>
          ),
        )}
        {/* trajectories */}
        {TRAJECTORIES.map((t) => {
          const active = hover === t.slug;
          const cx = (earth.x + t.to.x) / 2 + (t.to.y - earth.y) * 0.25;
          const cy = (earth.y + t.to.y) / 2 - (t.to.x - earth.x) * 0.25;
          const d = `M ${earth.x} ${earth.y} Q ${cx} ${cy} ${t.to.x} ${t.to.y}`;
          return (
            <g
              key={t.slug}
              className="cursor-pointer"
              onMouseEnter={() => setHover(t.slug)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(t.slug)}
              onBlur={() => setHover(null)}
              onClick={() => navigate({ to: "/missions/$slug", params: { slug: t.slug } })}
              tabIndex={0}
              role="link"
              aria-label={`${t.label}: open mission`}
            >
              <path d={d} fill="none" stroke="transparent" strokeWidth={16} />
              <path
                d={d}
                fill="none"
                stroke={active ? "var(--electric-cyan)" : "oklch(0.68 0.15 245 / 0.45)"}
                strokeWidth={active ? 2.2 : 1.2}
                strokeDasharray={active ? "0" : "4 4"}
              />
              <circle cx={t.to.x} cy={t.to.y} r={active ? 5 : 3} fill={active ? "var(--electric-cyan)" : "var(--nasa-blue)"} />
            </g>
          );
        })}
        <circle cx={earth.x} cy={earth.y} r={9} fill="var(--nasa-blue)" stroke="oklch(1 0 0 / 0.6)" />
        <text x={earth.x} y={earth.y - 14} textAnchor="middle" fontSize="10" className="font-tech" fill="var(--electric-cyan)">
          EARTH
        </text>
      </svg>

      <div className="pointer-events-none absolute bottom-2 left-1/2 w-72 -translate-x-1/2 rounded-xl border border-border bg-popover/90 p-4 backdrop-blur transition-opacity">
        {hovered ? (
          <>
            <p className="font-tech text-[10px] uppercase tracking-widest text-cyan">Mission file</p>
            <p className="mt-1 font-display text-lg font-bold">{hovered.name}</p>
            <p className="font-tech text-xs text-muted-foreground">
              {hovered.year} · {hovered.destinationLabel.split("—")[0]?.trim()} · {hovered.type}
            </p>
            <p className={`mt-1 font-tech text-xs ${OUTCOME_META[hovered.outcome].color}`}>
              ● {OUTCOME_META[hovered.outcome].label}
            </p>
          </>
        ) : (
          <p className="text-center font-tech text-xs text-muted-foreground">
            Hover a trajectory · Click to open the mission story
          </p>
        )}
      </div>
    </div>
  );
}
