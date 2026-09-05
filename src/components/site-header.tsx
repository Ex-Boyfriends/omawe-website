import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "#our-story", label: "Our story" },
  { href: "#about-us", label: "About us" },
  { href: "#contact-us", label: "Contact" },
];

export function SiteHeader() {
  return (
    <div className="site-header-shell relative z-10 mx-auto flex w-full gap-4 px-4 pt-4 sm:gap-5 lg:px-[120px] lg:pt-[50px]">
      <header className="site-header flex h-12 min-w-0 flex-1 items-center rounded-2xl px-3 sm:h-[78px] sm:rounded-[24px] sm:px-4">
        <Link href="#get-omawe" className="inline-flex items-center gap-3 rounded-lg sm:gap-5">
          <Image
            src="/omawe-icon.webp"
            alt=""
            width={48}
            height={48}
            priority
            className="size-9 rounded-lg sm:size-12 sm:rounded-[12px]"
          />
          <span className="text-base font-semibold tracking-tight text-white sm:text-2xl">
            Omawe
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-9 text-lg font-semibold text-white lg:flex"
          aria-label="Main navigation"
        >
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-opacity hover:opacity-70"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <Link
        href="#get-omawe"
        className="omawe-button inline-flex h-12 shrink-0 items-center justify-center rounded-2xl px-4 text-xs font-semibold text-white sm:h-[78px] sm:w-[245px] sm:rounded-[24px] sm:px-6 sm:text-xl"
      >
        <span>Download now</span>
      </Link>
    </div>
  );
}
