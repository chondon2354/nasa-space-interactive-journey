import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-sm font-bold tracking-wide">🚀 NASA SPACE EXPLORATION ARCHIVE</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A digital museum of major exploration missions to the Moon, Mars, and deep space — with emphasis on NASA and
            major international missions.
          </p>
        </div>
        <div>
          <p className="font-tech text-xs uppercase tracking-widest text-muted-foreground">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link to="/moon" className="text-secondary-custom hover:text-cyan">🌕 The Moon</Link>
            <Link to="/mars" className="text-secondary-custom hover:text-mars">🔴 Mars</Link>
            <Link to="/deep-space" className="text-secondary-custom hover:text-nasa">🌌 Deep Space</Link>
            <Link to="/missions" className="text-secondary-custom hover:text-foreground">🛰️ All Missions</Link>
          </div>
        </div>
        <div>
          <p className="font-tech text-xs uppercase tracking-widest text-muted-foreground">Archive</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link to="/timeline" className="text-secondary-custom hover:text-foreground">Timeline</Link>
            <Link to="/about" className="text-secondary-custom hover:text-foreground">About the Archive</Link>
          </div>
          <p className="mt-6 font-tech text-xs text-muted-foreground">
            Educational archive. Not affiliated with NASA.
          </p>
        </div>
      </div>
    </footer>
  );
}
