"use client";

import Image from "next/image";
import { useState } from "react";

export function OverviewSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoClosing, setIsVideoClosing] = useState(false);

  function closeVideo() {
    setIsVideoClosing(true);
  }

  return (
    <>
      <section
        id="overview"
        className="relative isolate flex min-h-[380px] items-center justify-center overflow-hidden px-4 py-24 sm:min-h-[444px]"
      >
        <Image
          src="/figma/overview-background1.png"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/77" aria-hidden />

        <div className="text-center text-white">
          <p className="mb-3 text-sm font-medium tracking-[0.375em] text-white/50">
            OVERVIEW
          </p>
          <h2 className="type-large-title">Omawe</h2>
          <button
            type="button"
            onClick={() => {
              setIsVideoClosing(false);
              setIsVideoOpen(true);
            }}
            className="type-button mt-6 inline-flex h-[55px] cursor-pointer items-center gap-2 rounded-full border border-[#03b9d6] bg-white/10 px-6 text-white"
          >
            <span aria-hidden className="text-xs">▷</span>
            Click to see the video
          </button>
        </div>
      </section>

      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Omawe overview video"
          data-lenis-prevent
          className={`omawe-modal${isVideoClosing ? " omawe-modal--closing" : ""} fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 overflow-y-auto bg-black/[0.9] px-4 py-8`}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeVideo();
          }}
          onAnimationEnd={(event) => {
            if (isVideoClosing && event.target === event.currentTarget) {
              setIsVideoOpen(false);
              setIsVideoClosing(false);
            }
          }}
        >
          <video
            autoPlay
            controls
            playsInline
            preload="metadata"
            className="max-h-[calc(100svh-8rem)] w-full max-w-[1440px] rounded-2xl bg-black object-contain"
          >
            <source src="/omawe-video-web.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={closeVideo}
            className="shrink-0 rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            aria-label="Close overview video"
          >
            <Image
              src="/figma/ProblemPopUpButton.png"
              alt=""
              width={65}
              height={65}
              className="size-16"
            />
          </button>
        </div>
      )}
    </>
  );
}
