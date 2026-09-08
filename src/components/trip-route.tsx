"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ROUTE_WIDTH = 1440;
const ROUTE_HEIGHT = 260;
const LINE_DURATION = 2000;
const CYCLE_DURATION = LINE_DURATION + 3000;
const ROUTE_PATH =
  "M-40 157 C105 131 175 80 265 84 C350 88 424 162 505 159 C589 155 620 94 710 103 C789 111 784 195 842 184 C921 170 930 85 1012 101 C1145 129 1291 167 1480 206";

const TRAVELLERS = [
  { distance: "12km", src: "/Avatar1.png", x: 265, y: 84, appearAt: 400 },
  { distance: "8km", src: "/Avatar2.png", x: 505, y: 159, appearAt: 700 },
  { distance: "6.5km", src: "/Avatar3.png", x: 710, y: 103, appearAt: 1000 },
  { distance: "5km", src: "/Avatar4.png", x: 892, y: 154, appearAt: 1250 },
  { distance: "3km", src: "/Avatar5.png", x: 1112, y: 121, appearAt: 1550 },
];

export function TripRoute() {
  const [cycle, setCycle] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const maskId = `trip-route-mask-${cycle}`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timers = TRAVELLERS.map(({ appearAt }, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), appearAt),
    );

    timers.push(
      window.setTimeout(() => {
        setVisibleCount(0);
        setCycle((currentCycle) => currentCycle + 1);
      }, CYCLE_DURATION),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [cycle, reduceMotion]);

  return (
    <div
      role="img"
      aria-label="Five travellers on their way to a shared destination"
      className="relative mt-9 h-52 w-[180%] sm:mt-12 sm:h-64 sm:w-[calc(100%+2rem)]"
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${ROUTE_WIDTH} ${ROUTE_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <defs>
          <mask
            id={maskId}
            x="-50"
            y="0"
            width="1540"
            height={ROUTE_HEIGHT}
            maskUnits="userSpaceOnUse"
          >
            <path
              key={cycle}
              className="trip-route-line-reveal"
              d={ROUTE_PATH}
              fill="none"
              pathLength="1"
              stroke="white"
              strokeWidth="16"
              style={{ animationDuration: `${LINE_DURATION}ms` }}
            />
          </mask>
        </defs>
        <path
          d={ROUTE_PATH}
          fill="none"
          mask={`url(#${maskId})`}
          stroke="rgb(218 233 255 / 0.48)"
          strokeDasharray="9 12"
          strokeLinecap="round"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {TRAVELLERS.map(({ distance, src, x, y }, index) => (
        <div
          key={src}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${index === 0 || index === TRAVELLERS.length - 1 ? "hidden sm:block" : ""}`}
          style={{
            left: `${(x / ROUTE_WIDTH) * 100}%`,
            top: `${(y / ROUTE_HEIGHT) * 100}%`,
          }}
        >
          {(reduceMotion || index < visibleCount) && (
            <div key={`${src}-${cycle}`} className="trip-route-traveller relative">
              <span className="type-headline absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[60%] whitespace-nowrap rounded-full border border-white/25 bg-[linear-gradient(135deg,rgb(255_255_255_/_0.2),rgb(255_255_255_/_0.06))] px-3 py-2 tracking-[-0.04em] text-white shadow-[inset_0_1px_rgb(255_255_255_/_0.25),0_4px_14px_rgb(0_0_0_/_0.28)] backdrop-blur-xl sm:type-title-3">
                {distance}
              </span>
              <Image
                src={src}
                alt=""
                width={512}
                height={512}
                className="relative z-20 size-[clamp(3rem,7.5vw,6rem)]"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
