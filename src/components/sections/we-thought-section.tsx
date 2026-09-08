import Image from "next/image";
import Link from "next/link";
import { OMAWE_DOWNLOAD_URL } from "@/lib/links";

export function WeThoughtSection() {
  return (
    <section
      id="we-thought"
      className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[954px]">
        <div className="mx-auto max-w-[774px] text-center">
          <p className="type-button mb-3 tracking-[0.375em] text-white/50">
            WE THOUGH
          </p>
          <h2 className="type-large-title text-gradient-brand sm:hidden">
            What if your phone just handled it?
          </h2>
          <h2 className="type-large-title hidden text-white sm:block">
            What if your phone just handled it?
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:gap-6 lg:grid-cols-[305px_625px] lg:items-stretch">
          <article className="we-thought-card omawe-card-border flex min-h-[165px] items-center gap-5 rounded-[40px] border-[1.5px] border-black bg-black/30 p-8 shadow-[0_4px_13px_rgb(0_0_0_/_0.25)] sm:block sm:min-h-0 sm:rounded-[48px]">
            <Image
              src="/WeThought1.png"
              alt=""
              width={240}
              height={240}
              className="size-[72px] shrink-0"
            />
            <h3 className="type-title-3 text-gradient-brand max-w-[238px] sm:mt-5">
              Staying connected shouldn&rsquo;t mean staying on your phone.
            </h3>
            <p className="type-body text-gradient-description mt-3 hidden max-w-[238px] opacity-50 sm:block">
              Group chats were filled with updates, questions, decisions, and
              logistics. Someone always had to keep track of it all.
            </p>
          </article>

          <article className="we-thought-card omawe-card-border relative min-h-[232px] overflow-hidden rounded-[40px] border-[1.5px] border-black bg-[linear-gradient(118deg,#000_14%,#006b7c_94%)] p-8 shadow-[0_4px_7px_rgb(0_0_0_/_0.25)] sm:min-h-0 sm:overflow-visible lg:min-h-[381px] lg:rounded-[48px] lg:pr-[280px]">
            <Image
              src="/WeThought2.png"
              alt=""
              width={240}
              height={240}
              className="size-[72px]"
            />
            <div className="absolute bottom-8 left-8 z-10 sm:relative sm:bottom-auto sm:left-auto">
              <h3 className="type-title-3 text-gradient-brand max-w-[170px] sm:mt-5 sm:max-w-[313px]">
                Let the phone handle the coordination.
              </h3>
              <p className="type-body text-gradient-description mt-3 hidden max-w-[313px] opacity-50 sm:block">
                We wanted to make coordination feel invisible&mdash;quietly
                handling the details in the background so everyone can focus on
                the people, not the planning.
              </p>
              <Link
                href={OMAWE_DOWNLOAD_URL}
                className="omawe-button type-button mt-6 hidden h-14 items-center rounded-2xl px-4 text-white sm:inline-flex"
              >
                <span>Download now</span>
              </Link>
            </div>
            <div className="absolute right-[-10px] bottom-[-138px] z-20 w-[195px] sm:relative sm:right-auto sm:bottom-auto sm:mx-auto sm:mt-6 sm:w-[min(62vw,248px)] lg:absolute lg:-right-6 lg:-top-16 lg:mt-0 lg:h-[467px] lg:w-[248px]">
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
