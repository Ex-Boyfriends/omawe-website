import { AboutUsSection } from "@/components/sections/about-us-section";
import { ContactUsSection } from "@/components/sections/contact-us-section";
import { FooterSection } from "@/components/sections/footer-section";
import { GetOmaweSection } from "@/components/sections/get-omawe-section";
import { OurStorySection } from "@/components/sections/our-story-section";
import { OverviewSection } from "@/components/sections/overview-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SiteHeader } from "@/components/site-header";
import { WeThoughtSection } from "@/components/sections/we-thought-section";

export default function Home() {
  return (
    <div id="top" className="relative isolate flex-1 text-device-ink">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-home-background" />
      <SiteHeader />
      <main>
        <GetOmaweSection />
        <ProblemSection />
        <WeThoughtSection />
        <OverviewSection />
        <AboutUsSection />
        <OurStorySection />
        <ContactUsSection />
      </main>
      <FooterSection />
    </div>
  );
}
