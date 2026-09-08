"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const lenis = new Lenis({
      anchors: { duration: 1.8 },
      autoRaf: true,
      duration: 1.1,
      stopInertiaOnNavigate: true,
    });
    const sections = document.querySelectorAll<HTMLElement>(
      "main > section:not(#get-omawe):not(#overview)",
    );
    const scrollToTop = () => lenis.scrollTo("top", { duration: 1.8 });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.classList.add("is-scroll-revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );

    root.classList.add("scroll-effects-ready");
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("omawe:scroll-to-top", scrollToTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("omawe:scroll-to-top", scrollToTop);
      lenis.destroy();
      root.classList.remove("scroll-effects-ready");
    };
  }, []);

  return null;
}
