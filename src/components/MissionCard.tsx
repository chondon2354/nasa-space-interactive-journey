import { Link } from "@tanstack/react-router";
import { OUTCOME_META, type Mission } from "../data/missions";

export function MissionCard({ mission }: { mission: Mission }) {
  const meta = OUTCOME_META[mission.outcome];
  return (
    <Link
      to="/missions/$slug"
      params={{ slug: mission.slug }}
      className="card-hover group flex flex-col rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-4xl font-bold text-nasa/25 transition-colors group-hover:text-nasa/50">
          {mission.year}
        </span>
        <span className={`flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-tech text-[10px] uppercase tracking-wider ${meta.color}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
          {meta.label}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold leading-tight">{mission.name}</h3>
      <p className="mt-1 font-tech text-xs uppercase tracking-wider text-muted-foreground">
        {mission.destinationLabel.split("—")[0]?.trim()} · {mission.type}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary-custom">{mission.oneLiner}</p>
      <p className="mt-4 font-tech text-xs text-cyan opacity-0 transition-opacity group-hover:opacity-100">
        OPEN MISSION FILE →
      </p>
    </Link>
  );
}
