import Image from "next/image";
import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="omawe-footer-section relative overflow-hidden pt-16 text-white sm:pt-24 lg:pt-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-[120px]">
        <Link href="#get-omawe" className="flex items-center gap-5">
          <Image
            src="/omawe-icon.webp"
            alt=""
            width={60}
            height={60}
            className="size-[60px] rounded-xl"
          />
          <span className="text-2xl font-semibold tracking-tight">Omawe</span>
        </Link>

        <div className="flex flex-col items-start gap-5 lg:items-center">
          <div className="flex gap-3" aria-hidden>
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
          <Link
            href="#get-omawe"
            className="type-button inline-flex h-[55px] items-center gap-2 rounded-full border border-[#03b9d6] bg-white/10 px-6 text-white"
          >
            <span aria-hidden>↥</span>
            Back to top
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t border-white/30">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-5 text-center text-sm text-white/90 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-[120px] lg:text-left">
          <Link href="/privacy-policy" className="transition-opacity hover:opacity-70">
            Privacy
          </Link>
          <p>© 2026 Omawe. Live group trip awareness for iOS.</p>
        </div>
      </div>
    </footer>
  );
}
