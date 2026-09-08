import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, Wordmark } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Privacy Policy | Omawe",
  description: "How Omawe collects, uses, and protects your personal information.",
};

// ponytail: static content with placeholder company details ([COMPANY_*] tokens).
// Fill in real legal entity, address, and contact email before launch.
const LAST_UPDATED = "August 31, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-page relative isolate flex-1">
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-home-background" />
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Wordmark href="/" />

      <h1 className="mt-10 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="placard mt-3">Last updated: {LAST_UPDATED}</p>

      <div className="mt-10 space-y-8 border-t border-rule pt-10 leading-relaxed text-ink-dim [&_h2]:text-ink [&_strong]:text-ink">
        <section className="space-y-3">
          <p>
            This Privacy Policy explains how Omawe (&quot;Omawe&quot;, &quot;we&quot;,
            &quot;us&quot;) collects, uses, and shares information about you when you visit our
            website or use our services (the &quot;Services&quot;). By using the Services, you
            agree to the practices described here.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Location data</h2>
          <p>
            Omawe is a trip-tracking app, so precise location is the most
            sensitive information it handles. How it works:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Only during a trip you joined.</strong> Precise location is
              collected only while you are an opted-in participant of an active
              trip, and only after you grant location permission.
            </li>
            <li>
              <strong>Shared only with that trip&rsquo;s participants.</strong>{" "}
              Your position and estimated arrival are visible to the other people
              on the same trip, for the purpose of showing the group who is where.
            </li>
            <li>
              <strong>It ends when the trip ends.</strong> Sharing stops
              automatically when the trip is completed. You can also stop sharing
              yourself at any point during a trip.
            </li>
            <li>
              <strong>No always-on tracking.</strong> Omawe does not collect your
              location outside an active trip, and does not build a continuous
              history of your movements.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Other information we collect</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Account details.</strong> When you sign in with Apple we
              receive an identifier and the name and email address you choose to
              share, used to create and maintain your account.
            </li>
            <li>
              <strong>Trip data.</strong> Trips you create or join, their
              destination, participants, and status.
            </li>
            <li>
              <strong>Usage data.</strong> Pages visited, features used, referring URLs, and
              approximate location derived from your IP address.
            </li>
            <li>
              <strong>Device data.</strong> Browser type, operating system, and device
              identifiers.
            </li>
            <li>
              <strong>Cookies and similar technologies.</strong> Used to keep you signed in,
              remember preferences, and measure traffic. You can control cookies through your
              browser settings.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">How we use information</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Provide, maintain, and improve the Services.</li>
            <li>Respond to inquiries and provide customer support.</li>
            <li>Monitor and analyze usage, trends, and performance.</li>
            <li>Detect, prevent, and address security incidents and abuse.</li>
            <li>Comply with legal obligations and enforce our terms.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">How we share information</h2>
          <p>We do not sell your personal information. We share it only:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              With other participants of a trip you have joined, as described
              under Location data above.
            </li>
            <li>
              With service providers who process data on our behalf (hosting and
              infrastructure) under contractual confidentiality obligations.
            </li>
            <li>When required by law, subpoena, or to protect our rights and users.</li>
            <li>
              In connection with a merger, acquisition, or sale of assets, with notice to
              affected users.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Data retention</h2>
          <p>
            We retain personal information for as long as needed to provide the Services and
            for legitimate business or legal purposes. When no longer needed, we delete or
            anonymize it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, delete,
            or export your personal information, or to object to or restrict certain
            processing. To exercise these rights, contact us at the address below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect your
            information. No method of transmission or storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Children&apos;s privacy</h2>
          <p>
            The Services are not directed to children under 13 (or the age required by local
            law), and we do not knowingly collect their personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be
            posted on this page with a new &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Contact us</h2>
          <p>
            Questions about this Privacy Policy? Contact us at{" "}
            <a
              href="mailto:nurkahfirahmada@gmail.com"
              className="underline underline-offset-4"
            >
              nurkahfirahmada@gmail.com
            </a>
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-rule pt-6">
        <Link
          href="/"
          className="text-sm text-ink-dim underline decoration-rule-strong transition-colors hover:text-ink"
        >
          &larr; Back to home
        </Link>
      </div>
    </main>
    <SiteFooter />
    </div>
  );
}
