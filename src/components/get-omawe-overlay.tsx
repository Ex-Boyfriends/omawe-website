import Image from "next/image";
import Link from "next/link";
import { OMAWE_DOWNLOAD_URL } from "@/lib/links";

export function GetOmaweOverlay() {
  return (
    <Link
      href={OMAWE_DOWNLOAD_URL}
      aria-label="Get Omawe on TestFlight"
      className="fixed inset-x-4 bottom-4 z-40 flex h-[102px] max-h-[370px] overflow-hidden rounded-[28px] border border-transparent p-4 sm:hidden"
      style={{
        backgroundImage:
          "var(--rb-button-dot), linear-gradient(90deg, #000000 0%, #006b7c 100%), linear-gradient(90deg, #03b9d6 0%, #7ae8ff 50%, #03b9d6 100%)",
        backgroundClip: "padding-box, padding-box, border-box",
        backgroundSize: "4px 4px, 100% 100%, 100% 100%",
      }}
    >
      <div className="relative z-10 max-w-[210px]">
        <p className="type-title-1 !text-[15px] !leading-[25px] flex items-center gap-1 text-white">
          <span aria-hidden className="text-[1.5em] leading-none"></span>
          Get Omawe
        </p>
        <p className="font-sans !text-[12px] !leading-[20px] text-gradient-description mt-2.5 font-normal">
          Available on Appstore now!
        </p>
      </div>
      <Image
        src="/figma/lockscreen-2.png"
        alt=""
        width={92}
        height={162}
        sizes="92px"
        className="omawe-overlay-phone-one absolute right-[40px] bottom-[-100px] z-10 w-[92px]"
      />
      <Image
        src="/figma/lock-screen.png"
        alt=""
        width={108}
        height={194}
        sizes="108px"
        className="omawe-overlay-phone-two absolute right-[90px] bottom-[-100px] z-20 w-[108px] drop-shadow-[0_8px_16px_rgb(0_0_0_/_0.45)]"
      />
      <span aria-hidden className="absolute top-1/2 right-3 z-30 -translate-y-1/2 text-4xl font-light text-white">
        ›
      </span>
    </Link>
  );
}
