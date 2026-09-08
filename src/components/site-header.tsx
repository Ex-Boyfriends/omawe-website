import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "#our-story", label: "Our story" },
  { href: "#about-us", label: "About us" },
  { href: "#contact-us", label: "Contact" },
];

export function SiteHeader() {
  return (
    <div className="site-header-shell fixed inset-x-0 top-0 z-20 mx-auto flex w-full gap-4 px-4 pt-4 sm:relative sm:z-10 sm:gap-5 lg:px-[120px] lg:pt-[50px]">
      <header className="site-header flex h-16 min-w-0 flex-1 items-center justify-center rounded-none px-3 sm:justify-start sm:rounded-[24px] sm:px-4 sm:pr-6">
        <Link href="#top" className="inline-flex items-center gap-3 rounded-lg sm:gap-5">
          <Image
            src="/omawe-icon.webp"
            alt=""
            width={48}
            height={48}
            priority
            className="size-10 rounded-[10px] sm:size-12 sm:rounded-[12px]"
          />
          <span className="text-xl font-semibold tracking-tight text-white">
            Omawe
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-9 text-sm font-semibold text-white lg:flex"
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
        className="omawe-button hidden h-12 shrink-0 items-center justify-center rounded-2xl px-4 text-[11px] font-semibold text-white sm:inline-flex sm:h-16 sm:w-[245px] sm:rounded-[24px] sm:px-6 sm:text-lg"
      >
        <span>Download now</span>
      </Link>
    </div>
  );
}
