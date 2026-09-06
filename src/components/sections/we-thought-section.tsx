import Image from "next/image";
import Link from "next/link";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/9b4DaTtE";

export function WeThoughtSection() {
  return (
    <section
      id="we-thought"
      className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[954px]">
        <div className="mx-auto max-w-[774px] text-center">
          <p className="type-button mb-3 tracking-[0.375em] text-white/50">
            WE THOUGH
          </p>
          <h2 className="type-large-title text-white">
            What if your phone just handled it?
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[305px_625px] lg:items-stretch">
          <article className="omawe-card-border rounded-[40px] border-[1.5px] border-black bg-black/30 p-8 shadow-[0_4px_13px_rgb(0_0_0_/_0.25)] lg:rounded-[48px]">
            <Image
              src="/WeThought1.png"
              alt=""
              width={240}
              height={240}
              className="size-[72px]"
            />
            <h3 className="type-title-3 text-gradient-brand mt-5 max-w-[238px]">
              Staying connected shouldn&rsquo;t mean staying on your phone.
            </h3>
            <p className="type-body text-gradient-description mt-3 max-w-[238px] opacity-50">
              Group chats were filled with updates, questions, decisions, and
              logistics. Someone always had to keep track of it all.
            </p>
          </article>

          <article className="omawe-card-border relative overflow-visible rounded-[40px] border-[1.5px] border-black bg-[linear-gradient(118deg,#000_14%,#006b7c_94%)] p-8 shadow-[0_4px_7px_rgb(0_0_0_/_0.25)] lg:min-h-[381px] lg:rounded-[48px] lg:pr-[280px]">
            <Image
              src="/WeThought2.png"
              alt=""
              width={240}
              height={240}
              className="size-[72px]"
            />
            <div className="relative z-10">
              <h3 className="type-title-3 text-gradient-brand mt-5 max-w-[313px]">
                Let the phone handle the coordination.
              </h3>
              <p className="type-body text-gradient-description mt-3 max-w-[313px] opacity-50">
                We wanted to make coordination feel invisible&mdash;quietly
                handling the details in the background so everyone can focus on
                the people, not the planning.
              </p>
              <Link
                href={TESTFLIGHT_URL}
                className="omawe-button type-button mt-6 inline-flex h-14 items-center rounded-2xl px-4 text-white"
              >
                <span>Download now</span>
              </Link>
            </div>
            <div className="relative z-20 mx-auto mt-6 w-[min(62vw,248px)] lg:absolute lg:-right-6 lg:-top-16 lg:mt-0 lg:h-[467px] lg:w-[248px]">
              <Image
                src="/figma/lock-screen.png"
                alt="An iPhone Lock Screen showing Omawe's Live Activity"
                width={824}
                height={1480}
                sizes="(max-width: 1023px) min(62vw, 248px), 248px"
                className="h-auto w-full drop-shadow-[0_12px_24px_rgb(0_0_0_/_0.42)]"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
