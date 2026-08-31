import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omawe — the whole group's ETA, on your Lock Screen",
  description:
    "Omawe puts every traveller's progress toward one shared destination on the iPhone Lock Screen and Dynamic Island, so nobody has to ask where anyone is. Time-boxed location sharing, iOS only. Now in TestFlight beta.",
  metadataBase: new URL("https://omaweapp.my.id"),
  openGraph: {
    title: "Omawe — the whole group's ETA, on your Lock Screen",
    description:
      "Live group trip awareness for iOS. Everyone's progress toward one destination, glanceable without unlocking. Now in TestFlight beta.",
    url: "https://omaweapp.my.id",
    siteName: "Omawe",
    type: "website",
  },
};

const DIRECTION_CONTRACT = `<!--
THESIS: This page is the roadbook for one trip. A cyan route spine runs the whole
document and every section is a numbered waypoint plate hung off it. It refuses the
arrangement this category always ships — an angled iPhone floating over a cyan glow
blob above a feature triptych — because that shows the app, and Omawe's whole claim
is that you never open the app.
OWN-WORLD: Cool technical paper under a faint cyan street grid lifted from the app
icon. The dark surfaces on the page are devices, not a theme: a Lock Screen is black,
so the Live Activity and Dynamic Island inset into the paper as real objects. White
rally plates with hard keylines and black numerals, brand-cyan route line, amber
reserved for honestly-declared degraded states, one checkered flag at the
destination. SF Pro throughout (pinned brand commitment): tracked caps placards over
tabular figures, character from rules and weight, never a novelty face.
STORY: A group's status is glanceable from the Lock Screen. Believed because the hero
computes it live, failure state included. Acted on by joining the beta.
FIRST VIEWPORT: Rally-plate wordmark top-left; headline left; a live Live Activity at
real scale to its right; the route line exits that card's base and becomes the page
spine; the TestFlight action sits on the spine.
FORM: Roadbook & Rally Plate — candidate 7 of 7, seed 4c8387f6.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-ground text-ink font-sans min-h-full flex flex-col">
        {/* JSX comments are stripped at compile time, so the direction contract is
            emitted as a real comment node to survive the production build. */}
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
