import { createFileRoute } from "@tanstack/react-router";
import { DestinationPage } from "../components/DestinationPage";
import deepSpaceImg from "../assets/deep-space.jpg";

export const Route = createFileRoute("/deep-space")({
  head: () => ({
    meta: [
      { title: "Deep Space — NASA Space Exploration Archive" },
      { name: "description", content: "Where explorers travel beyond the worlds we can reach easily — Voyager, Cassini, New Horizons, and the missions that reached the edge of the solar system." },
      { property: "og:title", content: "Deep Space — NASA Space Exploration Archive" },
      { property: "og:description", content: "Explore the missions that traveled to the giant planets, the Kuiper Belt, and interstellar space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <DestinationPage
      destination="deep-space"
      image={deepSpaceImg}
      icon="🌌"
      title="DEEP SPACE"
      tagline="Where explorers travel beyond the worlds we can reach easily."
      description="Beyond Mars lie the giant planets, the asteroid belt, the Kuiper Belt, and the interstellar void. Missions here take years to arrive, run on nuclear power, and communicate across billions of kilometers. Two of them — the Voyagers — have left the solar system entirely."
      facts={[
        { label: "Farthest spacecraft", value: "Voyager 1 — 24B km" },
        { label: "First to Jupiter", value: "1973 — Pioneer 10" },
        { label: "First to Pluto", value: "2015 — New Horizons" },
        { label: "Signal delay (Voyager)", value: "~22 hours" },
      ]}
      accent="text-nasa"
    />
  ),
});
