import { DynamicIslandCard, LiveActivityCard } from "@/components/live-activity";
import { SiteFooter, Wordmark } from "@/components/site-chrome";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/9b4DaTtE";
/* Guards the placeholder case: if the link is ever cleared, the action degrades
 * to a marked pending state rather than shipping a live-looking dead link. */
const TESTFLIGHT_READY = /join\/[A-Za-z0-9]+$/.test(TESTFLIGHT_URL);

/* ------------------------------------------------------------------ *
 * Icons — authored, single 1.6 stroke weight, one family.
 * ------------------------------------------------------------------ */
type IconProps = { className?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M12 21c4-4.5 6-7.7 6-10.5A6 6 0 0 0 6 10.5C6 13.3 8 16.5 12 21Z" />
    <circle cx="12" cy="10.5" r="2.25" />
  </svg>
);

const CodeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <rect x="3" y="6" width="18" height="12" rx="2.5" />
    <path d="M7.5 12h.01M12 12h.01M16.5 12h.01" />
  </svg>
);

const GlanceIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M9 8.5h6M9 12h4" />
  </svg>
);

const StopIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.5 9.5h5v5h-5z" />
  </svg>
);

const ArrowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

const ClockIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.75" />
  </svg>
);

const CheckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Roadbook plumbing
 * ------------------------------------------------------------------ */

/**
 * One waypoint on the route. The spine runs down the right edge of the left
 * column; the marker and its label sit level with the section heading.
 * `terminal` ends the route rather than continuing it.
 */
function Waypoint({
  n,
  rail,
  children,
  id,
  terminal = false,
}: {
  n: string;
  rail: string;
  children: React.ReactNode;
  id: string;
  terminal?: boolean;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-16 grid-cols-[2.75rem_1fr] sm:grid-cols-[9rem_1fr]"
    >
      <div className="relative">
        <span
          aria-hidden
          className={
            terminal
              ? "absolute top-0 right-0 h-32 w-px bg-linear-to-b from-spine to-transparent"
              : "absolute inset-y-0 right-0 w-px bg-spine"
          }
        />
        <div className="relative pt-20 sm:pt-24">
          <div className="flex h-10 items-start justify-end pr-4 sm:pr-6">
            <div className="flex flex-col items-end">
              {/* The rally plate: white face, hard keyline, black numerals —
                  the plate as it is actually printed and taped to a fairing. */}
              <span className="figures inline-block rounded-[5px] border-[1.5px] border-ink bg-stock px-1.5 py-0.5 text-sm leading-none font-bold tracking-[0.08em] text-ink sm:px-2 sm:py-1 sm:text-base">
                {n}
              </span>
              <span className="placard mt-2 hidden text-right sm:block">
                {rail}
              </span>
            </div>
          </div>
          {terminal ? (
            <span
              aria-hidden
              className="absolute top-20 right-0 mt-[0.4375rem] size-[15px] translate-x-1/2 rounded-full border-2 border-brand-ink bg-ground sm:top-24"
            />
          ) : (
            <span
              aria-hidden
              className="absolute top-20 right-0 mt-2.5 size-[9px] translate-x-1/2 rounded-full bg-brand-ink ring-4 ring-ground sm:top-24"
            />
          )}
        </div>
      </div>
      <div className="min-w-0 pt-20 pb-24 pl-5 sm:pt-24 sm:pb-28 sm:pl-10">
        {children}
      </div>
    </section>
  );
}

/**
 * The one TestFlight action. While TESTFLIGHT_URL is still the placeholder it
 * renders as a disabled, plainly-marked pending state rather than a live-looking
 * button pointing at a dead link.
 */
function TestFlightAction({ className = "" }: { className?: string }) {
  const shared =
    "bg-gradient-brand-base inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold text-[#06222a]";

  /* Keeps the action's full visual weight so the first viewport still has a
     primary anchor, but renders as a non-link with the pending state stated
     plainly beside it — never a live-looking button over a dead URL. */
  if (!TESTFLIGHT_READY) {
    return (
      <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
        <span aria-disabled className={`${shared} cursor-not-allowed`}>
          Join the TestFlight beta
          <ArrowIcon className="size-[18px]" />
        </span>
        <span className="figures inline-flex items-center gap-1.5 text-sm font-medium text-caution">
          <ClockIcon className="size-4" />
          Invite link pending
        </span>
      </span>
    );
  }

  return (
    <a
      href={TESTFLIGHT_URL}
      className={`${shared} transition-[transform,filter] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-110 active:scale-[0.98] ${className}`}
    >
      Join the TestFlight beta
      <ArrowIcon className="size-[18px]" />
    </a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[20ch] text-3xl font-bold tracking-[-0.03em] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

const STEPS = [
  {
    icon: PinIcon,
    dist: "0.0",
    title: "Drop one destination",
    body: "One trip, one place everyone is heading. Not an itinerary, not a route plan — the single point the group is converging on.",
  },
  {
    icon: CodeIcon,
    dist: "0.4",
    title: "Send a six-character code",
    body: "Whoever you send it to joins from the link or the code. No account hunting, no adding everyone as a permanent friend.",
  },
  {
    icon: GlanceIcon,
    dist: "8.2",
    title: "Then put the phone down",
    body: "Progress, ETA, and arrival land on the Lock Screen and the Dynamic Island. Checking on the group costs a glance, not an app switch.",
  },
  {
    icon: StopIcon,
    dist: "21.4",
    title: "Sharing ends with the trip",
    body: "When the trip is done, so is the location sharing. You can also stop yours at any moment, mid-trip, from the Live Activity.",
  },
];

const REFUSALS = [
  {
    head: "It is not always-on location sharing",
    body: "Sharing is opted into per trip and ends when the trip does. Omawe is not a permanent map of where your friends live their lives.",
  },
  {
    head: "It does not navigate for you",
    body: "Maps and Waze already do that well. Omawe tracks progress against the destination; opening a real navigation app is expected.",
  },
  {
    head: "It is not another group chat",
    body: "The premise is fewer messages, not better ones. There is no thread here to fall behind on.",
  },
  {
    head: "One destination per trip",
    body: "Multi-stop itineraries are a different product. Omawe answers one question: are we all converging on the same place, and when.",
  },
  {
    head: "iPhone only, for now",
    body: "The whole design leans on Live Activities and the Dynamic Island. Android needs its own answer rather than a translation of this one.",
  },
];

export default function Home() {
  return (
    <div className="relative flex-1 bg-map-grid">
      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ---------------- Departure ---------------- */}
        <header className="pt-10 pb-14 sm:pt-14">
          <Wordmark />
        </header>

        {/* No bottom padding: the connector band below must abut the card so the
            route line leaves it rather than starting in empty ground. */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <div>
            <h1 className="text-[2.75rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.25rem]">
              Nobody has to ask where anyone is.
            </h1>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-dim sm:text-xl">
              Omawe puts every traveller&rsquo;s progress toward one shared
              destination on the iPhone Lock Screen. The best trip is the one
              where nobody opens the app.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TestFlightAction />
              <a
                href="#roadbook"
                className="inline-flex h-13 items-center justify-center rounded-full border border-rule-strong px-7 text-base font-semibold text-ink transition-colors duration-200 hover:bg-stock"
              >
                How a trip runs
              </a>
            </div>

            <p className="placard mt-6">
              TestFlight beta · iPhone · iOS 17 or later
            </p>
          </div>

          <LiveActivityCard />
        </div>

        {/* The route line leaves the Live Activity card and sweeps down into the
            page's spine. Both endpoints are proportional to the same wrapper, so
            the join holds as the container width changes. */}
        {/* The band is padded to the spine's x and the SVG is a plain block child
            filling it. Absolute inset-based sizing is not usable here: a replaced
            element with an auto dimension takes it from the viewBox's intrinsic
            ratio rather than from the offsets, and overflows the band. */}
        <div aria-hidden className="h-24 pl-11 sm:pl-36 lg:h-32">
          <svg
            className="block h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 44.7 0 C 44.7 46, 0 44, 0 100"
              stroke="var(--rb-spine)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="hidden lg:block"
            />
            <path
              d="M 0 0 V 100"
              stroke="var(--rb-spine)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="lg:hidden"
            />
          </svg>
        </div>

        {/* ---------------- 01 ---------------- */}
        <Waypoint id="ask" n="01" rail="The ask">
          <SectionHeading>
            Every group trip quietly runs a second, worse app.
          </SectionHeading>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-dim">
            It is the message thread. It costs everyone their attention at
            exactly the moment the trip should feel easy, and it gets worse with
            every person you add.
          </p>

          <ul className="mt-10 max-w-xl divide-y divide-rule border-y border-rule">
            {[
              "Where are you?",
              "anyone left yet?",
              "eta?",
              "we're already at the gate",
              "I'm 5 minutes away",
            ].map((line, i) => (
              <li
                key={line}
                className={`py-4 text-lg ${i === 4 ? "text-ink" : "text-ink-dim"}`}
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[62ch] text-base text-ink-dim">
            The last one is the one everybody sends and nobody means. A
            self-reported ETA is a guess wearing a number.
          </p>
        </Waypoint>

        {/* ---------------- 02 ---------------- */}
        <Waypoint id="glance" n="02" rail="The glance">
          <SectionHeading>
            The status lives outside the app, where you actually look.
          </SectionHeading>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-dim">
            Omawe is built on Live Activities. Every traveller&rsquo;s progress,
            ETA, and arrival render on the Lock Screen and collapse into the
            Dynamic Island — designed so that understanding the whole group
            costs one glance, with the phone still locked.
          </p>

          <div className="mt-10 space-y-4">
            <p className="placard">Collapsed into the Dynamic Island</p>
            <DynamicIslandCard />
          </div>

          <p className="mt-8 max-w-[62ch] text-base text-ink-dim">
            The in-app map is still there. It is for when you actually want
            navigation — not for checking on people.
          </p>
        </Waypoint>

        {/* ---------------- 03 ---------------- */}
        <Waypoint id="roadbook" n="03" rail="The roadbook">
          <SectionHeading>How a trip runs.</SectionHeading>

          <ol className="mt-10 max-w-3xl border-t border-rule">
            {STEPS.map(({ icon: Icon, dist, title, body }) => (
              <li
                key={title}
                className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-b border-rule py-6 sm:grid-cols-[4.5rem_2.5rem_1fr] sm:gap-x-6"
              >
                <span className="figures pt-0.5 text-sm text-ink-dim sm:text-base">
                  {dist}
                  <span className="text-xs"> km</span>
                </span>
                <span className="row-span-2 hidden justify-self-center pt-0.5 text-brand-ink sm:block">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="col-start-2 mt-2 max-w-[54ch] text-base leading-relaxed text-ink-dim sm:col-start-3">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </Waypoint>

        {/* ---------------- 04 ---------------- */}
        <Waypoint id="refuses" n="04" rail="What it refuses">
          <SectionHeading>The scope is the feature.</SectionHeading>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-dim">
            Most of what Omawe is comes from what it will not do. These are
            commitments, not a list of things we have not got to yet.
          </p>

          <dl className="mt-10 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2">
            {REFUSALS.map(({ head, body }, i) => (
              <div
                key={head}
                /* Five items in two columns: the last one takes the full row
                   rather than leaving a hole in the grid. */
                className={`bg-stock p-6 ${
                  i === REFUSALS.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <dt className="text-base font-semibold text-ink">{head}</dt>
                <dd className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-dim">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </Waypoint>

        {/* ---------------- 05 ---------------- */}
        <Waypoint id="honest" n="05" rail="Honest state">
          <SectionHeading>
            Tunnels happen. The map should admit it.
          </SectionHeading>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-dim">
            Signal drops in car parks, tunnels and lifts. When a location goes
            stale, Omawe says so plainly instead of leaving a confident dot
            sitting on a road somebody left ten minutes ago.
          </p>

          <ul className="mt-10 flex flex-wrap gap-3">
            <li className="bg-gradient-in-trip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#06222a]">
              <ArrowIcon className="size-4" />
              En route · 11:02
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-caution px-4 py-2 text-sm font-semibold text-caution">
              <ClockIcon className="size-4" />
              Last seen 4 min ago
            </li>
            <li className="bg-gradient-has-trip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#06222a]">
              <CheckIcon className="size-4" />
              Arrived
            </li>
          </ul>
          <p className="mt-6 text-sm text-ink-dim">
            Every state carries a word and a mark, never a colour alone.
          </p>
        </Waypoint>

        {/* ---------------- Arrival ---------------- */}
        <Waypoint id="arrival" n="06" rail="Arrival" terminal>
          <SectionHeading>Take it on the next trip.</SectionHeading>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-dim">
            Omawe is in TestFlight while the group-tracking and arrival
            behaviour get tested on real journeys. If you run trips with more
            than two people, that is exactly the feedback worth having.
          </p>
          <TestFlightAction className="mt-9" />
          <p className="placard mt-6">
            Beta software · Requires iPhone on iOS 17 or later
          </p>
        </Waypoint>
      </main>

      <SiteFooter />
    </div>
  );
}
