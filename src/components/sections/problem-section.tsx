import Image from "next/image";
import Link from "next/link";

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="omawe-problem-section relative overflow-hidden px-4 py-16 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
    >
      <div className="mx-auto grid max-w-[898px] gap-12 lg:grid-cols-[449px_400px] lg:items-center lg:gap-12">
        <Image
          src="/figma/problem-visual.png"
          alt="A phone surrounded by group-travel messages"
          width={483}
          height={535}
          sizes="(max-width: 1023px) min(100vw - 2rem, 483px), 449px"
          className="mx-auto w-full max-w-[449px]"
        />

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
          <Link
            href="#we-thought"
            className="omawe-button type-button mt-6 inline-flex h-14 items-center rounded-2xl px-4 text-white"
          >
            <span>Our solution</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
