"use client";

import Image from "next/image";

export function BackToTopButton() {
  function scrollToTop() {
    if (document.documentElement.classList.contains("lenis")) {
      window.dispatchEvent(new Event("omawe:scroll-to-top"));
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="type-button inline-flex h-[55px] cursor-pointer items-center gap-2 rounded-full border border-[#03b9d6] bg-white/10 px-6 text-white"
    >
      <Image src="/figma/arrowsquare.svg" alt="" width={14} height={14} />
      Back to top
    </button>
  );
}
