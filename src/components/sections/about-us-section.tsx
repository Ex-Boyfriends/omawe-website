import Image from "next/image";

const team = [
  {
    name: "Kahfi",
    role: "PM/Developer",
    country: "Indonesia",
    flag: "🇮🇩",
    src: "/figma/card-kahfi.png",
  },
  {
    name: "Gleen",
    role: "Developer",
    country: "Indonesia",
    flag: "🇮🇩",
    src: "/figma/card-gleen.png",
  },
  {
    name: "Bintang",
    role: "Developer",
    country: "Indonesia",
    flag: "🇮🇩",
    src: "/figma/card-bintang.png",
  },
  {
    name: "Luat",
    role: "Designer",
    country: "Vietnam",
    flag: "🇻🇳",
    src: "/figma/card-luat.png",
  },
  {
    name: "Syed",
    role: "Designer",
    country: "Australia",
    flag: "🇦🇺",
    src: "/figma/card-syed.png",
  },
];

function TeamCard({
  name,
  role,
  country,
  flag,
  src,
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
        <p className="team-card-country">
          <span aria-hidden>{flag}</span>
          {country}
        </p>
      </div>
    </article>
  );
}

export function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-24 lg:px-[120px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[774px] text-center">
          <p className="type-button mb-3 tracking-[0.375em] text-white/50">
            ABOUT US
          </p>
          <h2 className="type-large-title text-white">Our &ldquo;Handsome&rdquo; Team</h2>
          <p className="type-body text-gradient-description mt-3 opacity-50">
            We&apos;re a team from the Apple Developer Academy Bali who created
            Omawe to stop weekend trips from getting lost or delayed. We love
            the App Extension framework, Live Activities, and iOS widgets to
            enhance your Lock Screen.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {team.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
