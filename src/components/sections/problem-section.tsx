"use client";

import Image from "next/image";
import { useState } from "react";

export function ProblemSection() {
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [isSolutionClosing, setIsSolutionClosing] = useState(false);

  function closeSolution() {
    setIsSolutionClosing(true);
  }

  return (
    <>
      <section
        id="problem"
        className="omawe-problem-section relative overflow-hidden px-4 py-16 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
      >
        <div className="mx-auto grid max-w-[898px] gap-12 lg:grid-cols-[449px_400px] lg:items-center lg:gap-12">
          <div
            className="problem-scene mx-auto w-full max-w-[449px]"
            role="img"
            aria-label="A gold phone surrounded by group-travel messages"
          >
            <div className="problem-scene-layer problem-scene-layer--phone">
              <Image
                src="/figma/gold-phone.png"
                alt=""
                width={524}
                height={1070}
                sizes="(max-width: 1023px) 52vw, 236px"
                className="problem-scene-item problem-scene-item--phone"
              />
            </div>
            <div className="problem-scene-layer problem-scene-layer--one">
              <Image
                src="/figma/problem1.png"
                alt=""
                width={332}
                height={263}
                sizes="(max-width: 1023px) 35vw, 157px"
                className="problem-scene-item problem-scene-item--one"
              />
            </div>
            <div className="problem-scene-layer problem-scene-layer--two">
              <Image
                src="/figma/problem2.png"
                alt=""
                width={583}
                height={293}
                sizes="(max-width: 1023px) 61vw, 269px"
                className="problem-scene-item problem-scene-item--two"
              />
            </div>
            <div className="problem-scene-layer problem-scene-layer--three">
              <Image
                src="/figma/problem3.png"
                alt=""
                width={525}
                height={283}
                sizes="(max-width: 1023px) 55vw, 247px"
                className="problem-scene-item problem-scene-item--three"
              />
            </div>
          </div>

          <div className="max-w-[400px]">
            <p className="mb-3 text-sm font-medium tracking-[0.375em] text-white/50">
              PROBLEM
            </p>
            <h2 className="type-large-title text-white">The Messy Reality</h2>
            <p className="type-body text-gradient-description mt-6 max-w-[400px] opacity-90">
              Suddenly, you&rsquo;re spending half the drive unlocking your phone,
              babysitting a map, and stressing over who is lagging behind.
              Location sharing was supposed to be helpful, but somehow it just
              feels like a chore.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSolutionClosing(false);
                setIsSolutionOpen(true);
              }}
              className="omawe-button type-button mt-6 inline-flex h-14 items-center rounded-2xl px-4 text-white"
            >
              <span>Our solution</span>
            </button>
          </div>
        </div>
      </section>

      {isSolutionOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Omawe solution preview"
          data-lenis-prevent
          className={`omawe-modal${isSolutionClosing ? " omawe-modal--closing" : ""} fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 overflow-y-auto bg-black/[0.9] px-4 py-8`}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeSolution();
          }}
          onAnimationEnd={(event) => {
            if (isSolutionClosing && event.target === event.currentTarget) {
              setIsSolutionOpen(false);
              setIsSolutionClosing(false);
            }
          }}
        >
          <Image
            src="/figma/ProblemPopUp.png"
            alt="Omawe features including trip awareness, accessibility, and core location tracking"
            width={3271}
            height={1763}
            quality={100}
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(100vw - 4rem), 1066px"
            className="h-auto w-full max-w-[1066px]"
          />
          <button
            type="button"
            onClick={closeSolution}
            className="shrink-0 rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            aria-label="Close solution preview"
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
