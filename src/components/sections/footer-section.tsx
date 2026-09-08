import { BackToTopButton } from "@/components/back-to-top-button";
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
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Omawe on LinkedIn"
              className="contact-social"
            >
              <Image
                src="/figma/linkedin-bw.svg"
                alt=""
                width={36}
                height={36}
                className="contact-social-base"
              />
              <Image
                src="/figma/linkedin.svg"
                alt=""
                width={36}
                height={36}
                className="contact-social-hover"
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Omawe on Instagram"
              className="contact-social"
            >
              <Image
                src="/figma/insta-bw.svg"
                alt=""
                width={36}
                height={36}
                className="contact-social-base"
              />
              <Image
                src="/figma/insta.svg"
                alt=""
                width={36}
                height={36}
                className="contact-social-hover"
              />
            </a>
          </div>
          <BackToTopButton />
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
