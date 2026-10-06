import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
import passesImg from "@/assets/passes.png";
import singers1 from "@/assets/singers-1.png";
import singers2 from "@/assets/singers-2.png";
import singers3 from "@/assets/singers-3.png";
import venueImg from "@/assets/venue.png";
import garbaCircle from "@/assets/garba-circle.jpg";
import dancer from "@/assets/dancer.jpg";
import diyas from "@/assets/diyas.jpg";
import { BackgroundMusic } from "@/components/BackgroundMusic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maa No Mandvo 2026 — The OG Garba | HIR Party Plot, Himatnagar" },
      {
        name: "description",
        content:
          "Nine nights of rhythm, raas and celebration. Maa No Mandvo 2026, 11–19 October at HIR Party Plot, Himatnagar. Passes now live.",
      },
      { property: "og:title", content: "Maa No Mandvo 2026 — The OG Garba" },
      {
        property: "og:description",
        content: "9 Nights. One Mandvo. Endless Raas. 11–19 Oct 2026, HIR Party Plot, Himatnagar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- Editable event content ---------- */
const PASS_URL = "https://mepass.in/city/Himatnagar/events/maa-no-mandvo";
const INSTAGRAM_URL = "https://www.instagram.com/maanomandvo/";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=HIR+Party+Plot+New+Civil+Gadhoda+Road+Himatnagar";
const PHONE = "92892 82582";
const START = new Date("2026-10-11T19:00:00+05:30").getTime();
const END = new Date("2026-10-20T02:00:00+05:30").getTime();

const NAV = [
  ["Home", "#home"],
  ["The Mandvo", "#mandvo"],
  ["Singers", "#singers"],
  ["Experience", "#experience"],
  ["Gallery", "#gallery"],
  ["Venue", "#venue"],
] as const;

export interface SingerDay {
  dayNumber: number;
  dayLabel: string;
  date: string;
  fullDate: string;
  weekday: string;
  name: string;
  nativeName: string;
  title: string;
  role: string;
  bio: string;
  photo: string;
  badge: string;
}

const SINGERS_SCHEDULE: SingerDay[] = [
  {
    dayNumber: 1,
    dayLabel: "DAY 01",
    date: "11 OCT",
    fullDate: "Sunday, 11 October 2026",
    weekday: "Sunday",
    name: "Hina Suthar",
    nativeName: "હીના સુથાર",
    title: "Garba Queen of Every Beat",
    role: "Opening Night Headliner",
    bio: "Kicking off Maa No Mandvo 2026 with unmatchable energy! Hina Suthar commands the stage with electrifying traditional and fusion garba rhythms that set the festival ablaze.",
    photo: "/photos/day1-hina-suthar.png",
    badge: "OPENING NIGHT",
  },
  {
    dayNumber: 2,
    dayLabel: "DAY 02",
    date: "12 OCT",
    fullDate: "Monday, 12 October 2026",
    weekday: "Monday",
    name: "Dharti Solanki",
    nativeName: "ધરતી સોલંકી",
    title: "High-Energy Folk Sensation",
    role: "Garba Vocalist",
    bio: "Renowned across Gujarat for non-stop Tahukar beats and authentic folk melodies. Dharti Solanki brings vibrant passion and relentless rhythm to the mandvo circle.",
    photo: "/photos/day2-dharti-solanki.png",
    badge: "TAHUKAR SPECIAL",
  },
  {
    dayNumber: 3,
    dayLabel: "DAY 03",
    date: "13 OCT",
    fullDate: "Tuesday, 13 October 2026",
    weekday: "Tuesday",
    name: "Mansi Kumavat",
    nativeName: "માનસી કુમાવત",
    title: "Trending Garba Icon",
    role: "Youth Sensation Vocalist",
    bio: "The viral voice behind chart-topping Navratri tracks. Mansi Kumavat's youthful charm and dynamic vocal range keep the crowd whirling until the late hours.",
    photo: "/photos/day3-mansi-kumavat.png",
    badge: "YOUTH FAVOURITE",
  },
  {
    dayNumber: 4,
    dayLabel: "DAY 04",
    date: "14 OCT",
    fullDate: "Wednesday, 14 October 2026",
    weekday: "Wednesday",
    name: "Kinjal Dave",
    nativeName: "કિંજલ દવે",
    title: "The Garba Empress",
    role: "Mega Star Performer",
    bio: "One of Gujarat's most celebrated global musical icons. Kinjal Dave brings unmatched charisma, signature hits, and timeless garba anthems to Maa No Mandvo.",
    photo: "/photos/day4-kinjal-dave.png",
    badge: "STAR ATTRACTION",
  },
  {
    dayNumber: 5,
    dayLabel: "DAY 05",
    date: "15 OCT",
    fullDate: "Thursday, 15 October 2026",
    weekday: "Thursday",
    name: "Varsha Vanjara",
    nativeName: "વર્ષા વણઝારા",
    title: "Melodious Traditional Swar",
    role: "Lead Folk Artist",
    bio: "With deep-rooted reverence and powerful traditional cadence, Varsha Vanjara enchants the mandvo with authentic Maa Ambe stutis and timeless Raas.",
    photo: "/photos/day5-varsha-vanjara.jpg",
    badge: "FOLK MASTER",
  },
  {
    dayNumber: 6,
    dayLabel: "DAY 06",
    date: "16 OCT",
    fullDate: "Friday, 16 October 2026",
    weekday: "Friday",
    name: "Geeta Rabari",
    nativeName: "ગીતા રબારી",
    title: "Kutch Ni Koyal & Folk Legend",
    role: "Cultural Icon",
    bio: "The pride of Kutch and Gujarat, Geeta Rabari delivers an iconic performance steeped in cultural heritage, rich traditional vocals, and heartfelt devotion.",
    photo: "/photos/day6-geeta-rabari.jpg",
    badge: "WEEKEND SPECIAL",
  },
  {
    dayNumber: 7,
    dayLabel: "DAY 07",
    date: "17 OCT",
    fullDate: "Saturday, 17 October 2026",
    weekday: "Saturday",
    name: "Divya Thakor",
    nativeName: "દિવ્યા ઠાકોર",
    title: "Powerhouse Garba Vocalist",
    role: "High-Octane Performer",
    bio: "Known for an electrifying stage presence and resounding thumps that get every foot moving, Divya Thakor brings pure festive fire to Saturday night.",
    photo: "/photos/day7-divya-thakor.jpg",
    badge: "SATURDAY MEGA NIGHT",
  },
  {
    dayNumber: 8,
    dayLabel: "DAY 08",
    date: "18 OCT",
    fullDate: "Sunday, 18 October 2026",
    weekday: "Sunday",
    name: "Pooja Krishna",
    nativeName: "પૂજા કૃષ્ણ",
    title: "Divine & Vibrant Raas Star",
    role: "Garba Vocalist",
    bio: "Pooja Krishna combines soulful spiritual devotion with fast-paced raas rhythms, creating a celestial garba experience under the Himatnagar sky.",
    photo: "/photos/day8-pooja-krishna.jpg",
    badge: "ASHTAMI SPECIAL",
  },
  {
    dayNumber: 9,
    dayLabel: "DAY 09",
    date: "19 OCT",
    fullDate: "Monday, 19 October 2026",
    weekday: "Monday",
    name: "Grand Finale Maha Raas",
    nativeName: "મહા રાસ ગ્રાન્ડ ફિનાલે",
    title: "All-Stars Mandvo Ensemble",
    role: "Sharad Purnima Mega Finale",
    bio: "The grand crowning celebration of Maa No Mandvo 2026! A monumental finale uniting the finest artists, master orchestra, and thousands of dancers for an unforgettable final night.",
    photo: "/photos/day9-grand-finale.png",
    badge: "GRAND FINALE",
  },
];

const FAQ = [
  ["Where is Maa No Mandvo?", "HIR Party Plot, New Civil – Gadhoda Road, Himatnagar, Gujarat."],
  ["When is the event?", "Nine nights, from 11 October to 19 October 2026."],
  ["Where can I buy passes?", "Passes are live on Mepass. Tap any “Buy Passes” button or scan the QR on the official pass poster."],
  ["Who do I contact for more information?", `Call ${PHONE} or message @maanomandvo on Instagram.`],
];

/* ---------- Helpers ---------- */
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Embers({ count = 24 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 block animate-ember rounded-full bg-gold-bright"
          style={{
            left: `${(i * 37) % 100}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            animationDuration: `${8 + (i % 7) * 1.5}s`,
            animationDelay: `${(i * 0.7) % 9}s`,
            boxShadow: "0 0 8px var(--gold-bright)",
          }}
        />
      ))}
    </div>
  );
}

function Logo({ size = "lg" }: { size?: "sm" | "lg" | "xl" }) {
  const s = { sm: "text-2xl", lg: "text-6xl md:text-8xl", xl: "text-7xl md:text-[9rem]" }[size];
  return (
    <div className={`font-deva leading-[0.95] ${s}`} lang="hi">
      <span className="text-gold block">माँ नो</span>
      <span className="text-gold block">मांडवो</span>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-xs font-semibold tracking-[0.4em] text-gold">
      <span className="ornament-rule w-12" />
      {children}
      <span className="ornament-rule w-12" />
    </div>
  );
}

function GoldButton({ href, children, ghost }: { href: string; children: ReactNode; ghost?: boolean }) {
  const ext = href.startsWith("http");
  return (
    <a
      href={href}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noreferrer" : undefined}
      className={
        ghost
          ? "inline-flex items-center gap-2 border border-gold/60 px-7 py-4 text-xs font-bold tracking-[0.3em] text-cream transition hover:border-gold-bright hover:text-gold-bright"
          : "bg-gold inline-flex items-center gap-2 px-7 py-4 text-xs font-bold tracking-[0.3em] text-ink shadow-[0_10px_40px_-10px_var(--gold)] transition hover:brightness-110"
      }
    >
      {children}
    </a>
  );
}

/* ---------- Intro ---------- */
function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 5200);
    const t2 = setTimeout(onDone, 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);
  const letters = ["माँ", "नो"];
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink transition-opacity duration-700 ${leaving ? "opacity-0" : "opacity-100"}`}
    >
      <div className="bg-mandala animate-intro-zoom absolute inset-[-20%] rounded-full opacity-70 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
      <Embers count={30} />
      <div className="relative text-center" style={{ perspective: 800 }}>
        <div className="font-deva text-7xl leading-[0.95] md:text-9xl" lang="hi">
          <div className="flex justify-center gap-4">
            {letters.map((l, i) => (
              <span key={l} className="text-gold animate-letter inline-block" style={{ animationDelay: `${2 + i * 0.25}s` }}>
                {l}
              </span>
            ))}
          </div>
          <span className="text-gold animate-letter block" style={{ animationDelay: "2.7s" }}>
            मांडवो
          </span>
        </div>
        <svg viewBox="0 0 300 30" className="mx-auto mt-2 w-64">
          <path
            d="M10 20 Q150 -5 290 20"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeLinecap="round"
            style={{ strokeDashoffset: 400, animation: "draw 1s ease forwards 3.8s" }}
            pathLength={400}
          />
        </svg>
        <p className="animate-rise mt-4 text-xs font-semibold tracking-[0.5em] text-gold" style={{ animationDelay: "4.4s" }}>
          THE OG GARBA 2026
        </p>
      </div>
      <button
        onClick={onDone}
        className="absolute bottom-8 right-8 text-[10px] font-semibold tracking-[0.4em] text-muted-foreground hover:text-gold"
      >
        SKIP →
      </button>
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-gold/30 bg-maroon/85 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" aria-label="Maa No Mandvo home" className="font-deva text-xl leading-none" lang="hi">
            <span className="text-gold">माँ नो मांडवो</span>
          </a>
          <nav className="hidden gap-8 lg:flex">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="text-[11px] font-semibold tracking-[0.3em] text-cream/80 transition hover:text-gold-bright">
                {l.toUpperCase()}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={PASS_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-gold hidden px-5 py-2.5 text-[11px] font-bold tracking-[0.25em] text-ink sm:inline-block"
            >
              GET PASSES
            </a>
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5 lg:hidden">
              <span className="block h-px w-7 bg-gold" />
              <span className="block h-px w-5 bg-gold" />
              <span className="block h-px w-7 bg-gold" />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`bg-velvet fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 transition-[clip-path] duration-700 lg:hidden ${open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_50%_0_50%)]"}`}
      >
        <button onClick={() => setOpen(false)} className="absolute right-6 top-5 text-3xl text-gold" aria-label="Close menu">
          ×
        </button>
        {[...NAV, ["FAQ", "#faq"] as const].map(([l, h], i) => (
          <a
            key={h}
            href={h}
            onClick={() => setOpen(false)}
            className={`font-serif text-3xl tracking-[0.15em] text-cream transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ transitionDelay: open ? `${300 + i * 70}ms` : "0ms" }}
          >
            {l.toUpperCase()}
          </a>
        ))}
        <div className="mt-6">
          <GoldButton href={PASS_URL}>BUY PASSES →</GoldButton>
        </div>
      </div>
    </>
  );
}

/* ---------- Countdown ---------- */
function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const live = now !== null && now >= START && now < END;
  const diff = Math.max(0, START - (now ?? START));
  const parts = [
    [Math.floor(diff / 864e5), "DAYS"],
    [Math.floor(diff / 36e5) % 24, "HOURS"],
    [Math.floor(diff / 6e4) % 60, "MINUTES"],
    [Math.floor(diff / 1e3) % 60, "SECONDS"],
  ] as const;
  return (
    <section className="bg-textile relative border-y border-gold/30 py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        {live ? (
          <p className="text-gold font-serif text-5xl font-semibold md:text-7xl">The Mandvo is Live</p>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 md:gap-8">
              {parts.map(([v, l]) => (
                <div key={l} className="border-gold/20 md:border-r md:last:border-r-0">
                  <div className="text-gold font-serif text-5xl font-semibold tabular-nums md:text-8xl">
                    {now === null ? "--" : String(v).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-[10px] font-semibold tracking-[0.35em] text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs font-semibold tracking-[0.5em] text-cream">UNTIL THE FIRST RAAS</p>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- Pass tilt ---------- */
function PassCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 12 });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
    >
      <div
        className="gold-frame transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      >
        <img src={passesImg} alt="Official Maa No Mandvo pass poster with booking QR code" className="block w-full" loading="lazy" />
      </div>
    </div>
  );
}

function Index() {
  const [intro, setIntro] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [activeArtist, setActiveArtist] = useState<SingerDay | null>(null);

  const displayedArtists =
    selectedDay === "all"
      ? SINGERS_SCHEDULE
      : SINGERS_SCHEDULE.filter((s) => s.dayNumber === selectedDay);

  return (
    <main className="overflow-x-hidden">
      {intro && <Intro onDone={() => setIntro(false)} />}
      <BackgroundMusic />
      <Nav />

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
        <img
          src={heroPoster}
          alt="Maa Durga above the Maa No Mandvo mandala"
          className="absolute left-1/2 top-0 w-[max(100%,900px)] max-w-none -translate-x-1/2 -translate-y-[6%] opacity-90 [mask-image:linear-gradient(to_bottom,black_34%,transparent_47%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,var(--ink)_85%)]" />
        <Embers />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40">
          <div className="grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className={intro ? "opacity-0" : "animate-rise"}>
              <p className="mb-6 text-xs font-semibold tracking-[0.5em] text-gold">THE OG GARBA · 2026</p>
              <h1>
                <span className="sr-only">Maa No Mandvo</span>
                <Logo size="xl" />
              </h1>
              <p className="mt-6 font-serif text-2xl italic text-cream md:text-3xl">9 Nights. One Mandvo. Endless Raas.</p>
            </div>
            <div className={intro ? "opacity-0" : "animate-rise"} style={{ animationDelay: ".3s" }}>
              <div className="border-l border-gold/50 pl-6">
                <p className="font-serif text-3xl font-semibold text-gold-bright">11 OCT — 19 OCT 2026</p>
                <p className="mt-3 text-sm font-bold tracking-[0.3em] text-cream">HIR PARTY PLOT</p>
                <p className="mt-1 text-sm text-muted-foreground">New Civil – Gadhoda Road, Himatnagar, Gujarat</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton href={PASS_URL}>GET YOUR PASSES →</GoldButton>
                <GoldButton href="#mandvo" ghost>
                  EXPLORE ↓
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Countdown />

      {/* THE MANDVO */}
      <section id="mandvo" className="bg-paper relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal className="relative">
            <img src={garbaCircle} alt="A garba circle under string lights" width={1600} height={1008} loading="lazy" className="w-full shadow-2xl" />
            <img
              src={dancer}
              alt="Dancer with dandiya sticks"
              width={800}
              height={1104}
              loading="lazy"
              className="gold-frame absolute -bottom-12 -right-4 w-2/5 md:-right-10"
            />
          </Reveal>
          <Reveal>
            <p className="font-deva text-3xl text-festival" lang="gu">ગરબાની રાત</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              Where the City
              <br />
              Comes Together.
            </h2>
            <div className="my-8 h-px w-24 bg-gold-burnished" />
            <p className="max-w-md text-lg leading-relaxed text-charcoal/80">
              The wait is over. Maa No Mandvo 2026 brings nine unforgettable nights of rhythm, raas and celebration to
              Himatnagar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* INFO */}
      <section className="bg-mandala border-y border-gold/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-5">
          {[
            ["Dates", "11 — 19 OCT"],
            ["Venue", "HIR PARTY PLOT"],
            ["City", "HIMATNAGAR"],
            ["Experience", "GARBA · RAAS · MUSIC"],
            ["Contact", PHONE],
          ].map(([k, v]) => (
            <div key={k} className="border-gold/20 border-b border-r px-6 py-10 text-center last:col-span-2 md:border-b-0 md:last:col-span-1">
              <p className="text-[10px] font-semibold tracking-[0.4em] text-muted-foreground">{k?.toUpperCase()}</p>
              <p className="mt-3 font-serif text-xl font-semibold text-gold-bright">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PASSES */}
      <section id="passes" className="bg-velvet relative overflow-hidden py-28">
        <Embers count={14} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal>
            <PassCard />
          </Reveal>
          <Reveal>
            <Eyebrow>PASSES NOW LIVE</Eyebrow>
            <h2 className="mt-6 text-center font-serif text-5xl font-semibold leading-tight md:text-left md:text-6xl">
              Your Entry to <span className="text-gold">the Mandvo</span>
            </h2>
            <p className="mt-6 text-center text-lg text-cream/80 md:text-left">
              The wait is over. Your nights of rhythm, raas &amp; celebration await. Scan the QR on the pass or book
              online in seconds.
            </p>
            <div className="mt-10 flex justify-center md:justify-start">
              <GoldButton href={PASS_URL}>BUY YOUR PASS →</GoldButton>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground md:text-left">
              Questions? Call <a href={`tel:+91${PHONE.replace(" ", "")}`} className="text-gold">{PHONE}</a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* SINGERS ACCORDING TO PARTICULAR DAY */}
      <section id="singers" className="bg-mandala relative py-28 border-t border-gold/30">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <Eyebrow>NAVRATRI 2026 · DAILY LINE-UP</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold md:text-6xl">
              The Voices of <span className="text-gold">the Mandvo</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-cream/80 text-base md:text-lg">
              Nine nights, nine celebrated artists. Discover the legendary voices performing live at HIR Party Plot, Himatnagar.
            </p>
          </Reveal>

          {/* Day Filter Tabs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <button
              onClick={() => setSelectedDay("all")}
              className={`rounded-full px-5 py-2 text-xs font-bold tracking-widest transition-all duration-300 ${
                selectedDay === "all"
                  ? "bg-gold text-ink shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                  : "border border-gold/40 bg-maroon/40 text-cream/80 hover:border-gold hover:text-gold-bright"
              }`}
            >
              ALL 9 NIGHTS
            </button>
            {SINGERS_SCHEDULE.map((s) => (
              <button
                key={s.dayNumber}
                onClick={() => setSelectedDay(s.dayNumber)}
                className={`rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 ${
                  selectedDay === s.dayNumber
                    ? "bg-gold text-ink shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "border border-gold/30 bg-maroon/30 text-cream/70 hover:border-gold hover:text-gold-bright"
                }`}
              >
                {s.dayLabel} · {s.date}
              </button>
            ))}
          </div>

          {/* Singer Cards Grid */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayedArtists.map((artist) => (
              <Reveal key={artist.dayNumber} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/30 bg-maroon/60 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_20px_45px_-10px_rgba(212,175,55,0.35)]">
                  {/* Photo with Overlays */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                    <img
                      src={artist.photo}
                      alt={artist.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/20 to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span className="rounded-full border border-gold/40 bg-ink/80 px-3.5 py-1 text-[11px] font-bold tracking-widest text-gold-bright backdrop-blur-md shadow-lg">
                        {artist.dayLabel} · {artist.date}
                      </span>
                      <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-extrabold tracking-wider text-ink shadow-md">
                        {artist.badge}
                      </span>
                    </div>

                    {/* Bottom overlay info on image */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-deva text-sm tracking-widest text-gold-bright/90" lang="gu">
                        {artist.nativeName}
                      </p>
                      <h3 className="mt-1 font-serif text-3xl font-bold text-cream transition group-hover:text-gold-bright">
                        {artist.name}
                      </h3>
                      <p className="mt-1 text-xs font-semibold tracking-wider text-gold">
                        {artist.title}
                      </p>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between border-b border-gold/20 pb-3 text-[11px] text-muted-foreground">
                        <span className="font-bold tracking-wider text-cream/90">{artist.role}</span>
                        <span className="text-gold/90">{artist.fullDate}</span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-cream/75 line-clamp-3">
                        {artist.bio}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gold/15">
                      <button
                        onClick={() => setActiveArtist(artist)}
                        className="flex-1 rounded border border-gold/60 bg-transparent py-2.5 text-center text-[11px] font-bold tracking-[0.2em] text-cream transition hover:border-gold-bright hover:bg-gold hover:text-ink"
                      >
                        ARTIST BIO
                      </button>
                      <a
                        href={PASS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded bg-gold py-2.5 text-center text-[11px] font-bold tracking-[0.2em] text-ink transition hover:brightness-110 shadow-sm"
                      >
                        GET PASS →
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARTIST DETAIL MODAL */}
      {activeArtist && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4 md:p-6 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveArtist(null)}
        >
          <div
            className="gold-frame relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-maroon shadow-2xl md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative h-64 md:h-auto overflow-hidden bg-ink">
              <img
                src={activeArtist.photo}
                alt={activeArtist.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-transparent to-transparent md:hidden" />
              <div className="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/80 px-3.5 py-1 text-xs font-bold tracking-widest text-gold-bright backdrop-blur-md">
                {activeArtist.dayLabel} · {activeArtist.date}
              </div>
            </div>

            {/* Modal Info */}
            <div className="flex flex-col justify-between overflow-y-auto p-6 md:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gold/20 border border-gold/40 px-3 py-1 text-[10px] font-bold tracking-widest text-gold-bright">
                    {activeArtist.badge}
                  </span>
                  <button
                    onClick={() => setActiveArtist(null)}
                    className="text-2xl leading-none text-muted-foreground hover:text-gold"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <p className="mt-4 font-deva text-lg tracking-wider text-gold" lang="gu">
                  {activeArtist.nativeName}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-cream">
                  {activeArtist.name}
                </h3>
                <p className="mt-1 text-xs font-semibold tracking-wider text-gold-bright">
                  {activeArtist.title}
                </p>

                <div className="mt-4 rounded-lg border border-gold/20 bg-ink/40 p-3 text-xs">
                  <p className="text-muted-foreground">
                    Performance Date: <strong className="text-cream">{activeArtist.fullDate} ({activeArtist.weekday})</strong>
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Role: <strong className="text-gold">{activeArtist.role}</strong>
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Venue: <strong className="text-cream">HIR Party Plot, Himatnagar</strong>
                  </p>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-cream/80">
                  {activeArtist.bio}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-gold/20">
                <a
                  href={PASS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded bg-gold py-3 text-center text-xs font-bold tracking-[0.3em] text-ink transition hover:brightness-110 shadow-lg"
                >
                  BUY PASS FOR THIS NIGHT →
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center text-xs font-semibold tracking-[0.25em] text-gold hover:underline"
                >
                  FOLLOW @MAANOMANDVO ON INSTAGRAM →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NINE NIGHTS CALENDAR SCHEDULE */}
      <section className="bg-textile py-28 border-t border-gold/30">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <Eyebrow>OCTOBER 11 — 19, 2026</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold">Nine Nights of Raas</h2>
            <p className="mt-3 text-cream/70 text-sm">Tap on any night to discover the featured artist and reserve your passes.</p>
          </Reveal>
          <div className="mt-14 flex snap-x gap-4 overflow-x-auto pb-6 scrollbar-thin">
            {SINGERS_SCHEDULE.map((n) => (
              <button
                key={n.dayLabel}
                onClick={() => setActiveArtist(n)}
                className="group min-w-[240px] snap-start rounded-xl border border-gold/30 bg-maroon/60 p-6 text-left transition hover:border-gold hover:bg-crimson/80 hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-gold font-serif text-4xl font-semibold">{String(n.dayNumber).padStart(2, "0")}</p>
                    <span className="text-[10px] font-bold tracking-wider text-gold-bright/90 bg-ink/50 px-2.5 py-1 rounded-full border border-gold/30">
                      {n.weekday}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-bold tracking-[0.3em] text-cream">{n.date}</p>
                  <p className="mt-0.5 text-[10px] tracking-[0.3em] text-muted-foreground">{n.dayLabel}</p>

                  {/* Singer Avatar */}
                  <div className="my-4 flex items-center gap-3">
                    <img
                      src={n.photo}
                      alt={n.name}
                      className="h-14 w-14 rounded-full border-2 border-gold/70 object-cover shadow-md transition group-hover:scale-105 group-hover:border-gold-bright"
                    />
                    <div>
                      <p className="font-serif text-base font-bold text-cream group-hover:text-gold-bright transition leading-snug">
                        {n.name}
                      </p>
                      <p className="text-[10px] font-medium text-gold/90 mt-0.5 line-clamp-1">
                        {n.title}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-[10px] font-bold tracking-widest text-gold group-hover:underline flex items-center justify-between">
                  <span>VIEW ARTIST</span>
                  <span>→</span>
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative overflow-hidden bg-ink">
        <img src={garbaCircle} alt="" aria-hidden width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.5em] text-gold">FEEL THE GARBA</p>
            <h2 className="mt-6 font-serif text-5xl font-semibold md:text-7xl">Not just a Garba night.</h2>
          </Reveal>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
            {["RAAS", "RHYTHM", "LIGHTS", "MUSIC", "TRADITION", "COMMUNITY"].map((w, i) => (
              <Reveal key={w}>
                <span className={`font-serif text-5xl font-semibold md:text-8xl ${i % 2 ? "text-cream/30" : "text-gold"}`}>{w}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-velvet py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <Eyebrow>FROM THE MANDVO</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold">Moments of the Raas</h2>
          </Reveal>
          <div className="mt-14 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {[
              [dancer, "THE NIGHT WE DANCED"],
              [garbaCircle, "GARBA NIGHT"],
              [heroPoster, "MAA NO MANDVO"],
              [diyas, "THE AARTI"],
              [venueImg, "THE NEW ADDRESS"],
              [singers2, "THE VOICES"],
            ].map(([src, cap]) => (
              <figure key={cap} className="group relative break-inside-avoid overflow-hidden">
                <img src={src} alt={cap} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-0 flex items-end bg-ink/0 p-5 opacity-0 transition duration-500 group-hover:bg-ink/55 group-hover:opacity-100">
                  <span className="text-gold font-serif text-2xl font-semibold">{cap}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <GoldButton href={INSTAGRAM_URL} ghost>
              FOLLOW @MAANOMANDVO →
            </GoldButton>
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="bg-paper relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal>
            <p className="font-deva text-3xl text-festival" lang="gu">હવે નવા સરનામે...!</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">Find Your Way to the Mandvo</h2>
            <div className="my-8 h-px w-24 bg-gold-burnished" />
            <p className="text-sm font-bold tracking-[0.3em]">HIR PARTY PLOT</p>
            <p className="mt-2 text-lg text-charcoal/80">New Civil – Gadhoda Road, Himatnagar, Gujarat</p>
            <p className="mt-6 text-charcoal/80">
              More information: <a href={`tel:+91${PHONE.replace(" ", "")}`} className="font-bold text-festival">{PHONE}</a>
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block bg-crimson px-7 py-4 text-xs font-bold tracking-[0.3em] text-cream transition hover:bg-festival"
            >
              GET DIRECTIONS →
            </a>
          </Reveal>
          <Reveal className="relative">
            <svg viewBox="0 0 500 420" className="w-full drop-shadow-2xl" role="img" aria-label="Map route to HIR Party Plot">
              <rect x="10" y="30" width="480" height="360" fill="var(--cream)" stroke="var(--gold-burnished)" strokeWidth="2" transform="skewX(-4)" />
              {[80, 160, 240, 320].map((y) => (
                <path key={y} d={`M20 ${y} L480 ${y + 20}`} stroke="var(--gold)" strokeOpacity=".35" />
              ))}
              {[100, 200, 300, 400].map((x) => (
                <path key={x} d={`M${x} 40 L${x - 30} 380`} stroke="var(--gold)" strokeOpacity=".35" />
              ))}
              <path className="route-line" d="M40 360 C140 320 120 240 220 230 S330 160 300 120" fill="none" stroke="var(--festival)" strokeWidth="5" strokeLinecap="round" />
              <g className="pin" transform="translate(300 120)">
                <circle r="14" fill="var(--festival)" opacity=".5" className="animate-pulse-ring" style={{ transformOrigin: "center", transformBox: "fill-box" }} />
                <path d="M0 0 C-22 -30 -22 -60 0 -62 C22 -60 22 -30 0 0Z" fill="var(--crimson)" />
                <circle cy="-40" r="9" fill="none" stroke="var(--gold-bright)" strokeWidth="4" />
              </g>
            </svg>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-mandala py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <Eyebrow>KNOW BEFORE YOU GO</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold">Questions</h2>
          </Reveal>
          <div className="mt-12">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group border-b border-gold/30 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-2xl">
                  {q}
                  <span className="text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-cream/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-textile relative overflow-hidden border-t border-gold/30 py-20 text-center">
        <Embers count={10} />
        <div className="relative">
          <Logo size="lg" />
          <p className="mt-4 text-xs font-semibold tracking-[0.5em] text-gold">THE OG GARBA 2026 · 11 — 19 OCT</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <GoldButton href={PASS_URL}>BUY PASSES →</GoldButton>
            <GoldButton href={INSTAGRAM_URL} ghost>
              @MAANOMANDVO
            </GoldButton>
          </div>
          <p className="mt-12 text-xs text-muted-foreground">
            HIR Party Plot, New Civil – Gadhoda Road, Himatnagar · {PHONE}
          </p>
          <div className="mt-10 border-t border-gold/20 pt-6 text-xs text-cream/80 flex flex-col items-center gap-2">
            <p className="tracking-widest uppercase font-medium">
              all rights reserved by kyvraone 2026
            </p>
            <p className="text-[12px] text-muted-foreground">
              made by{" "}
              <a
                href="https://www.instagram.com/kyvraone/"
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:underline transition font-semibold"
              >
                ig @kyvraone
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
