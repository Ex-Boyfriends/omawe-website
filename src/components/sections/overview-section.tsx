import Image from "next/image";

export function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative isolate flex min-h-[380px] items-center justify-center overflow-hidden px-4 py-24 sm:min-h-[444px]"
    >
      <Image
        src="/figma/overview-background.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/70" aria-hidden />

      <div className="text-center text-white">
        <p className="mb-3 text-sm font-medium tracking-[0.375em] text-white/50">
          OVERVIEW
        </p>
        <h2 className="type-large-title">Omawe</h2>
        <span className="type-button mt-6 inline-flex h-[55px] items-center gap-2 rounded-full border border-[#03b9d6] bg-white/10 px-6 text-white">
          <span aria-hidden className="text-xs">▷</span>
          Click to see the video
        </span>
      </div>
    </section>
  );
}
