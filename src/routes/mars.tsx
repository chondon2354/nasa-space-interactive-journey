import { createFileRoute } from "@tanstack/react-router";
import { DestinationPage } from "../components/DestinationPage";
import marsImg from "../assets/mars.jpg";

export const Route = createFileRoute("/mars")({
  head: () => ({
    meta: [
      { title: "Mars — NASA Space Exploration Archive" },
      { name: "description", content: "A world of ancient water, dust, rocks, and unanswered questions. Explore the flybys, orbiters, landers, and rovers sent to Mars." },
      { property: "og:title", content: "Mars — NASA Space Exploration Archive" },
      { property: "og:description", content: "Explore six decades of missions to the Red Planet — the triumphs and the losses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <DestinationPage
      destination="mars"
      image={marsImg}
      icon="🔴"
      title="MARS"
      tagline="A world of ancient water, dust, rocks, and unanswered questions."
      description="Mars is the most explored planet beyond Earth — and the hardest to land on. Roughly half of all Mars missions have failed. Yet flybys became orbiters, orbiters became landers, and landers became rovers that have crossed ancient lakebeds and river deltas in the search for past life."
      facts={[
        { label: "Distance from Earth", value: "54–401M km" },
        { label: "First reached", value: "1965 — Mariner 4" },
        { label: "First landing", value: "1976 — Viking 1" },
        { label: "Signal delay", value: "4–24 minutes" },
      ]}
      accent="text-mars"
    />
  ),
});
