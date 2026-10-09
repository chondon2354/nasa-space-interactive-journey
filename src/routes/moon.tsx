import { createFileRoute } from "@tanstack/react-router";
import { DestinationPage } from "../components/DestinationPage";
import moonImg from "../assets/moon.jpg";

export const Route = createFileRoute("/moon")({
  head: () => ({
    meta: [
      { title: "The Moon — NASA Space Exploration Archive" },
      { name: "description", content: "Humanity's first great destination beyond Earth. Explore the landers, orbiters, and crewed Apollo missions that reached the Moon." },
      { property: "og:title", content: "The Moon — NASA Space Exploration Archive" },
      { property: "og:description", content: "Explore the missions that reached humanity's first destination beyond Earth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <DestinationPage
      destination="moon"
      image={moonImg}
      icon="🌕"
      title="THE MOON"
      tagline="Humanity's first great destination beyond Earth."
      description="From Luna 2's first impact in 1959 to the crewed Apollo landings and today's robotic orbiters, the Moon is where exploration began. It remains the only world beyond Earth that humans have walked on — and the destination we're returning to."
      facts={[
        { label: "Distance from Earth", value: "384,400 km" },
        { label: "First reached", value: "1959 — Luna 2" },
        { label: "First human steps", value: "1969 — Apollo 11" },
        { label: "Signal delay", value: "~1.3 seconds" },
      ]}
      accent="text-lunar"
    />
  ),
});
