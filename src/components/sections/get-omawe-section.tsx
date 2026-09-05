import { TripRoute } from "@/components/trip-route";

export function GetOmaweSection() {
  return (
    <section
      id="get-omawe"
      className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden px-4 pt-32 pb-16 sm:pt-40"
    >
      <h1 className="text-gradient-brand type-large-title max-w-[31ch] text-center tracking-[-0.04em]">
  Group travel, just vibes. <br />
  No more &quot;Where are you?&quot; texts.
</h1>

      <TripRoute />

      <p className="text-gradient-description type-body mt-5 max-w-[58ch] text-center sm:mt-8">
        Every great trip starts with hype, not homework. <strong>Omawe brings your <br /> squad&rsquo;s journey straight to your Lock Screen</strong> so you can put the phone <br /> down and actually enjoy the ride.
      </p>

      <span className="omawe-button bg-button-background type-button mt-9 inline-flex rounded-xl px-4 py-4 text-white">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="text-xl leading-none"></span>
          Get Omawe
        </span>
      </span>
    </section>
  );
}
