"use client";

import Image from "next/image";
import { useState } from "react";

const socialIconSize = {
  bw: 36,
  color: 36,
};

const team = [
  {
    name: "Kahfi",
    role: "PM/Developer",
    country: "Indonesia",
    flag: "🇮🇩",
    src: "/figma/card-kahfi.png",
    instagramUrl: "https://www.instagram.com/nrkahfirhmd/",
    linkedinUrl: "https://www.linkedin.com/in/nrkahfirhmd/",
    websiteUrl: "",
  },
  {
    name: "Gleen",
    role: "Developer",
    country: "Indonesia",
    flag: "🇮🇩",
    src: "/figma/card-gleen.png",
    instagramUrl: "https://www.instagram.com/gleenryan2005/",
    linkedinUrl: "https://www.linkedin.com/in/gleen-ryan/",
    websiteUrl: "https://gleenryan.vercel.app",
  },
  {
    name: "Bintang",
    role: "Developer",
    country: "Indonesia",
    flag: "🇮🇩",
    src: "/figma/card-bintang.png",
    instagramUrl: "https://www.instagram.com/_alfathoshi",
    linkedinUrl: "https://www.linkedin.com/in/alfathoshi",
    websiteUrl: "https://alfathoshi.vercel.app/",
  },
  {
    name: "Luat",
    role: "Designer",
    country: "Vietnam",
    flag: "🇻🇳",
    src: "/figma/card-luat.png",
    instagramUrl: "https://www.instagram.com/nmluat_2603/",
    linkedinUrl: "https://www.linkedin.com/in/luat-nguyen-639649219/",
    websiteUrl: "https://luatnguyen26.framer.website/",
  },
  {
    name: "Syed",
    role: "Designer",
    country: "Australia",
    flag: "🇦🇺",
    src: "/figma/card-syed.png",
    instagramUrl: "https://www.instagram.com/syed1srar/",
    linkedinUrl: "https://www.linkedin.com/in/syed-israruddin/",
    websiteUrl: "",
  },
];

function TeamCard({
  name,
  role,
  country,
  flag,
  src,
  instagramUrl,
  linkedinUrl,
  websiteUrl,
}: (typeof team)[number]) {
  return (
    <article className="team-card">
      <Image
        src={src}
        alt={`${name}, ${role}, ${country}`}
        width={663}
        height={876}
        sizes="(max-width: 639px) min(100vw - 2rem, 440px), (max-width: 1023px) min(50vw - 3rem, 440px), 20vw"
        className="team-card-art"
      />

      <div className="team-card-copy">
        <h3 className="team-card-name">{name}</h3>
        <p className="team-card-role">{role}</p>
      </div>
      <p className="team-card-country">
        <span aria-hidden>{flag}</span>
        {country}
      </p>
      <div className="team-card-connect">
        <p>Connect with me</p>
        <div className="team-card-socials" aria-label={`${name}'s social links`}>
          <a className="team-card-social" href={instagramUrl || undefined} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}'s Instagram`}>
            <Image className="team-card-social-base" src="/figma/insta-bw.svg" alt="" width={socialIconSize.bw} height={socialIconSize.bw} />
            <Image className="team-card-social-hover" src="/figma/insta.svg" alt="" width={socialIconSize.color} height={socialIconSize.color} />
          </a>
          <a className="team-card-social" href={linkedinUrl || undefined} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}'s LinkedIn`}>
            <Image className="team-card-social-base" src="/figma/linkedin-bw.svg" alt="" width={socialIconSize.bw} height={socialIconSize.bw} />
            <Image className="team-card-social-hover" src="/figma/linkedin.svg" alt="" width={socialIconSize.color} height={socialIconSize.color} />
          </a>
          <a className="team-card-social" href={websiteUrl || undefined} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}'s website`}>
            <Image className="team-card-social-base" src="/figma/website-bw.svg" alt="" width={socialIconSize.bw} height={socialIconSize.bw} />
            <Image className="team-card-social-hover" src="/figma/website.svg" alt="" width={socialIconSize.color} height={socialIconSize.color} />
          </a>
        </div>
      </div>
    </article>
  );
}

function MobileTeamList() {
  const [activeName, setActiveName] = useState(team[0].name);

  return (
    <div className="omawe-card-border mt-12 overflow-hidden rounded-[40px] border border-black bg-black/35 sm:hidden">
      {team.map((member, index) => {
        const isOpen = activeName === member.name;

        return (
          <div
            key={member.name}
            className={index > 0 ? "border-t border-white/20" : undefined}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setActiveName(isOpen ? "" : member.name)}
              className="flex min-h-16 w-full items-center justify-between gap-4 px-4 text-left"
            >
              <span className="type-title-3 text-white">
                {member.name} <span aria-hidden>{member.flag}</span>
              </span>
              <span className="flex items-center gap-3 text-right">
                <span className="type-callout text-white/55">{member.role}</span>
                <span aria-hidden className="text-2xl leading-none text-white/55">
                  {isOpen ? "⌃" : "⌄"}
                </span>
              </span>
            </button>

            <div
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex min-h-14 items-center justify-between gap-4 border-t border-white/10 bg-black/20 px-4 py-3">
                  <p className="type-headline text-white">Connect with me</p>
                  <div className="team-card-socials mt-0" aria-label={`${member.name}'s social links`}>
                    {[
                      ["Instagram", member.instagramUrl, "/figma/insta-bw.svg"],
                      ["LinkedIn", member.linkedinUrl, "/figma/linkedin-bw.svg"],
                      ["website", member.websiteUrl, "/figma/website-bw.svg"],
                    ].map(([label, href, icon]) => (
                      <a
                        key={label}
                        href={href || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isOpen ? 0 : -1}
                        aria-label={`Open ${member.name}'s ${label}`}
                        className="team-card-social !size-9"
                      >
                        <Image
                          src={icon}
                          alt=""
                          width={36}
                          height={36}
                          className="team-card-social-base"
                        />
                        <Image
                          src={icon.replace("-bw", "")}
                          alt=""
                          width={36}
                          height={36}
                          className="team-card-social-hover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[774px] text-center">
          <p className="type-button mb-3 tracking-[0.375em] text-white/50">
            ABOUT US
          </p>
          <h2 className="type-title-1 text-gradient-brand sm:hidden">Our &ldquo;Handsome&rdquo; Team</h2>
          <h2 className="type-large-title hidden text-white sm:block">Our &ldquo;Handsome&rdquo; Team</h2>
          <p className="type-body text-gradient-description mt-3 hidden opacity-50 sm:block">
            We&apos;re a team from the Apple Developer Academy Bali who created
            Omawe to stop weekend trips from getting lost or delayed. We love
            the App Extension framework, Live Activities, and iOS widgets to
            enhance your Lock Screen.
          </p>
        </div>

        <MobileTeamList />

        <div className="mt-12 hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {team.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

      </div>
    </section>
  );
}
