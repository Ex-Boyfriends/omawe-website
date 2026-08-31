import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Omawe — live group trip awareness",
    short_name: "Omawe",
    description:
      "Every traveller's progress toward one shared destination, on the iPhone Lock Screen. Time-boxed location sharing, iOS only.",
    start_url: "/",
    display: "standalone",
    /* The site's paper ground and its brand teal — matches --rb-ground and
     * --rb-brand-ink so the install splash does not flash a different world. */
    background_color: "#eef2f4",
    theme_color: "#0284a0",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        /* Padded to the safe zone so Android's shape mask never clips the ring. */
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
