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
        className="omawe-problem-section relative overflow-hidden px-6 py-20 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
      >
        <div className="mx-auto max-w-[774px] text-center sm:hidden">
          <p className="mb-3 text-xs font-medium tracking-[0.375em] text-white/50 sm:text-sm">
            PROBLEM
          </p>
          <h2 className="type-title-1 text-gradient-brand sm:type-large-title">
            The Messy Reality
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-[898px] gap-12 sm:mt-0 lg:grid-cols-[449px_400px] lg:items-center lg:gap-12">
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

          <div className="mx-auto w-full max-w-[400px] sm:mx-0">
            <div className="hidden sm:block">
              <p className="mb-3 text-sm font-medium tracking-[0.375em] text-white/50">
                PROBLEM
              </p>
              <h2 className="type-large-title text-white">The Messy Reality</h2>
            </div>
            <p className="type-callout text-gradient-description mt-6 max-w-[400px] px-4 opacity-90 sm:px-0 sm:type-body">
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
              className="omawe-button type-title-3 mx-auto mt-10 flex h-[72px] w-[200px] items-center justify-center rounded-[20px] px-3 text-white sm:type-button sm:mx-0 sm:mt-6 sm:inline-flex sm:h-14 sm:w-auto sm:justify-start sm:rounded-2xl sm:px-4"
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
          className={`omawe-modal${isSolutionClosing ? " omawe-modal--closing" : ""} fixed inset-0 z-50 flex flex-col items-center justify-start overflow-y-auto bg-[#2c2c2c] px-4 pt-28 pb-8 sm:justify-center sm:gap-6 sm:bg-black/[0.9] sm:px-4 sm:py-8`}
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
            src="/figma/ProblemPopUp-phone.png"
            alt="Omawe features including trip awareness, accessibility, and core location tracking"
            width={747}
            height={3095}
            quality={100}
            sizes="100vw"
            className="h-auto w-full sm:hidden"
          />
          <Image
            src="/figma/ProblemPopUp.png"
            alt="Omawe features including trip awareness, accessibility, and core location tracking"
            width={3271}
            height={1763}
            quality={100}
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(100vw - 4rem), 1066px"
            className="hidden h-auto w-full max-w-[1066px] sm:block"
          />
          <button
            type="button"
            onClick={closeSolution}
            className="fixed bottom-10 left-1/2 z-10 -translate-x-1/2 rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:static sm:translate-x-0"
            aria-label="Close solution preview"
          >
            <Image
              src="/figma/ProblemPopUpButton.png"
              alt=""
              width={65}
              height={65}
              className="size-20 sm:size-16"
            />
          </button>
        </div>
      )}
    </>
  );
}
