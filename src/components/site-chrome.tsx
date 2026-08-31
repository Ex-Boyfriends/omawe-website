import Image from "next/image";
import Link from "next/link";

/**
 * The Omawe mark — the ring broken by a checkered flag — set beside the
 * wordmark. The icon carries its own dark ground, so it needs no plate.
 */
export function Wordmark({ href }: { href?: string }) {
  const face = (
    <>
      <Image
        src="/omawe-icon.webp"
        alt=""
        width={40}
        height={40}
        priority
        className="size-10 rounded-[9px] shadow-[0_4px_14px_-4px_rgb(12_20_23_/_0.35)]"
      />
      <span className="text-lg font-bold tracking-[0.18em] text-ink">
        OMAWE
      </span>
    </>
  );

  const shell = "inline-flex items-center gap-3";

  return href ? (
    <Link href={href} className={`${shell} rounded-lg`}>
      {face}
    </Link>
  ) : (
    <div className={shell}>{face}</div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-ink-dim">
          © {new Date().getFullYear()} Omawe. Live group trip awareness for iOS.
        </p>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/privacy-policy"
            className="text-ink-dim underline decoration-rule-strong transition-colors hover:text-ink"
          >
            Privacy policy
          </Link>
          <a
            href="mailto:nurkahfirahmada@gmail.com"
            className="text-ink-dim underline decoration-rule-strong transition-colors hover:text-ink"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
