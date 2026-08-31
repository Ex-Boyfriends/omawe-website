"use client";

import { useEffect, useRef } from "react";

/* Synthetic demo trip: the rider names and positions are invented for this
 * simulation. The mechanism they demonstrate — per-rider progress, a live
 * ETA, and an honest stale state — is the real one. */

/* Long enough that the trailing rider actually arrives (t≈31.8) and the trip
 * lands on a completed state, then a short hold before the loop restarts. */
const LOOP_SECONDS = 36;
const ROUTE_D = "M 10 86 C 140 52 260 40 380 44 C 500 48 610 62 700 74";
/* Sits inside the stale window so reduced-motion viewers still see the
 * honest-degradation state the page claims. */
const STATIC_FRAME = 10;

/* Dips the trip's opacity around the loop reset so restarting never reads as
 * riders teleporting backwards. Floored well above zero and kept short: the
 * card is the page's proof element and must stay readable throughout, so it
 * dims rather than dissolving. */
const FADE_FLOOR = 0.45;
const FADE_OUT_AT = LOOP_SECONDS - 1;
const FADE_IN_BY = 0.6;
const ramp = (v: number) => FADE_FLOOR + (1 - FADE_FLOOR) * Math.min(1, v);
const envelope = (t: number) => {
  if (t < FADE_IN_BY) return ramp(t / FADE_IN_BY);
  if (t > FADE_OUT_AT) {
    return ramp(Math.max(0, (LOOP_SECONDS - t) / (LOOP_SECONDS - FADE_OUT_AT)));
  }
  return 1;
};

/* The trailing rider owns the group ETA: a trip is not over until the last
 * person arrives. 10:36 + 24min = 11:00 at the opening frame. */
const BASE_CLOCK_MIN = 10 * 60 + 36;
const FULL_TRIP_MIN = 34;
const FULL_TRIP_KM = 21.43;

const STALE_FROM = 8;
const STALE_TO = 14;

type Rider = {
  id: string;
  label: string;
  name: string;
  start: number;
  speed: number;
  width: number;
};

const RIDERS: Rider[] = [
  { id: "l", label: "L", name: "Lina", start: 0.86, speed: 0.014, width: 34 },
  { id: "s", label: "S", name: "Sari", start: 0.62, speed: 0.02, width: 34 },
  { id: "b", label: "B", name: "Bagus", start: 0.46, speed: 0.024, width: 34 },
  {
    id: "g",
    label: "G+3",
    name: "Guntur and three others",
    start: 0.3,
    speed: 0.022,
    width: 58,
  },
];

const progressAt = (rider: Rider, t: number) =>
  Math.min(1, rider.start + rider.speed * t);

/**
 * Drives `paint` on an rAF loop, but only while the element is on screen and
 * the tab is visible — an unconditional loop burns battery for a card nobody
 * is looking at. Honours prefers-reduced-motion by painting one settled frame.
 */
function useTripClock(
  target: React.RefObject<Element | null>,
  paint: (t: number) => void,
) {
  const paintRef = useRef(paint);
  paintRef.current = paint;

  useEffect(() => {
    const node = target.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paintRef.current(STATIC_FRAME);
      return;
    }

    let frame = 0;
    /* Start past the fade-in so the very first painted frame is fully opaque.
     * Starting at 0 would render the card invisible until the loop advanced. */
    let elapsed = FADE_IN_BY;
    let last = 0;
    let running = false;

    const tick = (now: number) => {
      elapsed = (elapsed + (now - last) / 1000) % LOOP_SECONDS;
      last = now;
      paintRef.current(elapsed);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    /* Geometry check, used when the document becomes visible. A tab that loaded
     * in the background can latch isIntersecting=false and never fire again,
     * because the element's geometry never changes afterwards. */
    const onScreenNow = () => {
      const r = node.getBoundingClientRect();
      return (
        r.bottom > 0 &&
        r.top < window.innerHeight &&
        r.right > 0 &&
        r.left < window.innerWidth
      );
    };

    let onScreen = onScreenNow();
    const sync = () => (onScreen && !document.hidden ? start() : stop());

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(node);

    const onVisibility = () => {
      if (!document.hidden) onScreen = onScreenNow();
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    paintRef.current(elapsed);
    sync();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [target]);
}

const clock = (minutesFromNow: number) => {
  const total = BASE_CLOCK_MIN + minutesFromNow;
  const h = Math.floor(total / 60) % 24;
  const m = Math.round(total % 60);
  return `${h}:${String(m).padStart(2, "0")}`;
};

export function LiveActivityCard() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const travelledRef = useRef<SVGPathElement>(null);
  const etaRef = useRef<HTMLSpanElement>(null);
  const distRef = useRef<HTMLSpanElement>(null);
  const groupRefs = useRef<Record<string, SVGGElement | null>>({});
  const shapeRefs = useRef<Record<string, SVGRectElement | null>>({});
  const labelRefs = useRef<Record<string, SVGTextElement | null>>({});
  const noteRef = useRef<SVGGElement>(null);

  useTripClock(rootRef, (t) => {
    const path = pathRef.current;
    const travelled = travelledRef.current;
    if (!path || !travelled) return;

    const length = path.getTotalLength();
    travelled.style.strokeDasharray = `${length}`;

    let trailing = 1;
    let leading = 0;

    for (const rider of RIDERS) {
      const p = progressAt(rider, t);
      trailing = Math.min(trailing, p);
      leading = Math.max(leading, p);

      const point = path.getPointAtLength(p * length);
      const group = groupRefs.current[rider.id];
      const shape = shapeRefs.current[rider.id];
      const label = labelRefs.current[rider.id];
      if (!group || !shape || !label) continue;

      group.setAttribute(
        "transform",
        `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`,
      );

      const stale = rider.id === "g" && t >= STALE_FROM && t < STALE_TO;
      const arrived = p >= 1;

      shape.setAttribute(
        "fill",
        arrived
          ? "url(#omawe-arrived)"
          : stale
            ? "var(--rb-device-hi)"
            : "url(#omawe-live)",
      );
      shape.setAttribute("stroke", stale ? "var(--rb-caution-bright)" : "transparent");
      // A dark label on the dark stale fill would be unreadable.
      label.setAttribute("fill", stale ? "var(--rb-caution-bright)" : "#06222a");

      if (rider.id === "g" && noteRef.current) {
        noteRef.current.style.opacity = stale ? "1" : "0";
        noteRef.current.setAttribute(
          "transform",
          `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`,
        );
      }
    }

    /* The road is only covered once the LAST rider has passed it. Driving this
     * from the leader would paint the whole route done while three riders are
     * still en route. */
    travelled.style.strokeDashoffset = `${length * (1 - trailing)}`;

    const done = trailing >= 1;
    const minutes = Math.max(0, Math.round((1 - trailing) * FULL_TRIP_MIN));
    if (etaRef.current) etaRef.current.textContent = done ? "Arrived" : clock(minutes);
    if (distRef.current) {
      distRef.current.textContent = done
        ? "0.0km"
        : `${((1 - trailing) * FULL_TRIP_KM).toFixed(1)}km`;
    }

    if (contentRef.current) {
      contentRef.current.style.opacity = `${envelope(t)}`;
    }
  });

  return (
    <figure ref={rootRef} className="m-0">
      <div
        role="img"
        aria-label="A simulated Omawe Live Activity on an iPhone Lock Screen: four riders travelling toward one destination, each shown as a pill on a shared route line, with a group ETA of 11:00 and 15 kilometres remaining. One rider drops to a last-seen state and recovers."
        className="relative overflow-hidden rounded-[28px] border-2 border-brand bg-device p-5 shadow-[0_24px_60px_-24px_rgb(3_185_214_/_0.45)] sm:p-6"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "var(--pattern-plus)",
            backgroundSize: "var(--pattern-plus-size)",
          }}
        />

        <div ref={contentRef} className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="placard text-device-ink-dim">ETA</p>
            <p className="figures mt-1 text-3xl font-bold text-brand-soft sm:text-4xl">
              <span ref={etaRef}>11:00</span>
            </p>
          </div>
          <div className="text-right">
            <p className="placard text-device-ink-dim">Distance</p>
            <p className="figures mt-1 text-3xl font-bold text-brand-soft sm:text-4xl">
              <span ref={distRef}>15.0km</span>
            </p>
          </div>
        </div>

        <svg
          aria-hidden
          viewBox="0 0 720 148"
          className="mt-4 w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="omawe-live" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#03b9d6" />
              <stop offset="100%" stopColor="#7ae8ff" />
            </linearGradient>
            <linearGradient id="omawe-arrived" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#01c9b4" />
              <stop offset="100%" stopColor="#49ffec" />
            </linearGradient>
          </defs>

          {/* Road ahead */}
          <path
            ref={pathRef}
            d={ROUTE_D}
            stroke="#3a4247"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Road already covered by the group's leader */}
          <path
            ref={travelledRef}
            d={ROUTE_D}
            stroke="#e8f0f4"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Origin */}
          <path
            d="M 4 92 l 16 -7 -6 7 6 7 z"
            fill="#93a7b1"
            transform="translate(-6 -6)"
          />

          {/* The destination. The only checkered flag on this page. */}
          <g transform="translate(700 74)">
            <path d="M 0 -4 v 34" stroke="#93a7b1" strokeWidth="3" strokeLinecap="round" />
            <g transform="translate(2 -20)">
              <rect width="24" height="16" fill="#e8f0f4" />
              <path
                d="M0 0h6v4H0zM12 0h6v4h-6zM6 4h6v4H6zM18 4h6v4h-6zM0 8h6v4H0zM12 8h6v4h-6zM6 12h6v4H6zM18 12h6v4h-6z"
                fill="#0a0c0d"
              />
            </g>
          </g>

          {/* Travels with the stale rider rather than sitting at a fixed x. */}
          <g
            ref={noteRef}
            style={{
              opacity: 0,
              transition: "opacity 240ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <path d="M0 18 v10" stroke="var(--rb-caution-bright)" strokeWidth="1.5" />
            <text
              textAnchor="middle"
              y="44"
              className="figures"
              fill="var(--rb-caution-bright)"
              fontSize="14"
              fontWeight="600"
            >
              Last seen 2 min ago
            </text>
          </g>

          {RIDERS.map((rider) => (
            <g
              key={rider.id}
              ref={(el) => {
                groupRefs.current[rider.id] = el;
              }}
            >
              <rect
                ref={(el) => {
                  shapeRefs.current[rider.id] = el;
                }}
                x={-rider.width / 2}
                y={-17}
                width={rider.width}
                height={34}
                rx={17}
                fill="url(#omawe-live)"
                stroke="transparent"
                strokeWidth="2"
              />
              <text
                ref={(el) => {
                  labelRefs.current[rider.id] = el;
                }}
                textAnchor="middle"
                y="6"
                fontSize="16"
                fontWeight="700"
                fill="#06222a"
              >
                {rider.label}
              </text>
            </g>
          ))}
        </svg>
        </div>
      </div>

      <figcaption className="mt-3 text-sm text-ink-dim">
        A simulated trip, running live in your browser. Rider names are invented;
        the Live Activity, the ETA, and the last-seen state are the real ones.
      </figcaption>
    </figure>
  );
}

export function DynamicIslandCard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const etaRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useTripClock(rootRef, (t) => {
    const trailing = Math.min(...RIDERS.map((r) => progressAt(r, t)));
    if (etaRef.current) {
      etaRef.current.textContent = clock(
        Math.max(0, Math.round((1 - trailing) * FULL_TRIP_MIN)),
      );
    }
    if (fillRef.current) {
      fillRef.current.style.width = `${(trailing * 100).toFixed(1)}%`;
    }
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="The same trip collapsed into the iPhone Dynamic Island: a group progress bar and the arrival time."
      className="bg-gradient-dynamic-brand-base flex w-full max-w-sm items-center gap-3 rounded-full px-4 py-2.5 shadow-[0_10px_28px_-12px_rgb(2_132_160_/_0.55)]"
    >
      <span
        aria-hidden
        className="bg-gradient-brand-base size-6 shrink-0 rounded-full"
      />
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          ref={fillRef}
          className="bg-gradient-brand-base h-full rounded-full"
          style={{ width: "30%" }}
        />
      </div>
      <span className="figures text-sm font-semibold text-brand-soft">
        <span ref={etaRef}>11:00</span>
      </span>
    </div>
  );
}
