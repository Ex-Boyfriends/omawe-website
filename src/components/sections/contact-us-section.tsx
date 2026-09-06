import Image from "next/image";

export function ContactUsSection() {
  return (
    <section
      id="contact-us"
      className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[60px]"
    >
      <div className="mx-auto max-w-[832px] border border-black/50 bg-black/10 p-6 text-center backdrop-blur sm:p-10">
        <div
          className="mx-auto flex w-fit gap-3 rounded-full bg-white/10 p-2.5"
          aria-hidden
        >
          <Image
            src="/figma/linkedin.svg"
            alt=""
            width={36}
            height={36}
            className="size-9"
          />
          <Image
            src="/figma/instagram.svg"
            alt=""
            width={36}
            height={36}
            className="size-9"
          />
        </div>
        <p className="mt-6 text-sm font-medium tracking-[0.375em] text-white/50">
          CONTACT US
        </p>
        <h2 className="type-large-title mt-3 text-white">
          Got feedback? We&rsquo;re all ears.
        </h2>
        <p className="type-body text-gradient-description mx-auto mt-6 max-w-[750px] opacity-90">
          Whether you found a sneaky bug, have a genius feature idea, or just
          want to tell us about your latest squad trip, we&rsquo;d love to hear from
          you. No automated bot replies here&mdash;we&rsquo;re actually real humans
          reading these, promise.
        </p>
        <a
          href="mailto:nurkahfirahmada@gmail.com"
          className="omawe-button type-button mt-6 inline-flex h-14 items-center gap-2 rounded-2xl px-4 text-white"
        >
          <span aria-hidden>✉</span>
          <span>Gmail us</span>
        </a>
      </div>
    </section>
  );
}
