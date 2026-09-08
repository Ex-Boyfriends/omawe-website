import Image from "next/image";

export function OurStorySection() {
  return (
    <section
      id="our-story"
      className="relative hidden overflow-hidden px-4 py-16 sm:block sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[774px] text-center">
          <p className="type-button mb-3 tracking-[0.375em] text-white/50">
            OUR STORY
          </p>
          <h2 className="type-large-title text-white">Start from interest</h2>
        </div>

        <div className="mt-12 grid overflow-hidden border border-black bg-black/30 lg:grid-cols-[678fr_522fr]">
          <Image
            src="/figma/team-story-crop.png"
            alt="The Ex-boyfriends team together at the Apple Developer Academy Bali"
            width={552}
            height={345}
            loading="eager"
            quality={100}
            sizes="(max-width: 1023px) 100vw, 56.5vw"
            className="h-auto w-full"
          />
          <div className="flex min-h-[280px] items-center p-8 sm:p-12 lg:p-[69px]">
            <div className="max-w-[384px]">
              <h3 className="type-large-title text-white">Ex-boyfriends team</h3>
              <p className="type-body text-gradient-description mt-4">
                We&apos;re a team from the Apple Developer Academy Bali who created
                Omawe to stop weekend trips from getting lost or delayed. We
                love the App Extension framework, Live Activities, and iOS
                widgets to enhance your Lock Screen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
