import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

const LINKS = [
  { to: "/", label: "Explore" },
  { to: "/missions", label: "Missions" },
  { to: "/moon", label: "Moon" },
  { to: "/mars", label: "Mars" },
  { to: "/deep-space", label: "Deep Space" },
  { to: "/timeline", label: "Timeline" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="glass fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold tracking-wide">
          <span aria-hidden>🚀</span>
          <span className="hidden sm:inline">NASA SPACE EXPLORATION ARCHIVE</span>
          <span className="sm:hidden">NSEA</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-3 py-2 font-tech text-xs uppercase tracking-widest transition-colors ${
                pathname === l.to ? "text-cyan" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/missions"
            className="ml-2 rounded-md border border-input px-3 py-2 font-tech text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Search missions"
          >
            🔎 Search
          </Link>
        </div>

        <button
          className="rounded-md border border-input p-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-border lg:hidden">
          <div className="flex flex-col px-4 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 font-tech text-sm uppercase tracking-widest ${
                  pathname === l.to ? "text-cyan" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
