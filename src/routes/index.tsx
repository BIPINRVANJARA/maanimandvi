import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logoImg from "@/assets/logo.jpg";
import flyerImg from "@/assets/flyer.jpg";
import heroPoster from "@/assets/hero-poster.jpg";
import garbaArenaImg from "@/assets/garba-arena.jpg";
import venueGateImg from "@/assets/venue-gate.jpg";
import garbaCircle from "@/assets/garba-circle.jpg";
import dancer from "@/assets/dancer.jpg";
import diyas from "@/assets/diyas.jpg";
import khushbuImg from "@/assets/artists/khushbu-asodiya.jpg";
import kajalImg from "@/assets/artists/kajal-maheriya.jpg";
import nehaImg from "@/assets/artists/neha-suthar.jpg";
import { BackgroundMusic } from "@/components/BackgroundMusic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maa Ni Mandvi 2026 — પોસ્ટ નવરાત્રિ મહોત્સવ | Khedbrahma" },
      {
        name: "description",
        content:
          "3 Nights of Grand Post Navratri Garba at Khedbrahma. 23, 24, 25 October 2026. Featuring Khushbu Asodiya, Kajal Maheriya, Neha Suthar. Single day ₹500, 3-Day pass ₹1200.",
      },
      { property: "og:title", content: "Maa Ni Mandvi 2026 — Post Navratri Mahotsav" },
      {
        property: "og:description",
        content:
          "3 Days Only: 23, 24, 25 Oct 2026. Near Khedbrahma Court, Ambaji - Ahmedabad State Highway. Single Day ₹500 · 3-Day Pass ₹1200.",
      },
      { property: "og:image", content: "/flyer.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ═══════════════════════════════════════════════
   CONFIGURABLE EVENT DATA
   ═══════════════════════════════════════════════ */

const WHATSAPP_NUMBER = "917600280047";
const WHATSAPP_DISPLAY = "+91 76002 80047";
const HELPLINE_PHONE = "+91 99999 15015";
const HELPLINE_RAW = "9999915015";
const INSTAGRAM_URL = "https://www.instagram.com/maa.ni.mandvi/";

// Venue
const VENUE_NAME = "Near Khedbrahma Court";
const VENUE_FULL = "Near Khedbrahma Court, Ambaji - Ahmedabad State Highway, Khedbrahma";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/MCpFCxfdE8JMz5GJ6";

// Event dates: Post Navratri 2026 (23, 24, 25 October 2026)
const EVENT_DATES = "23 OCT — 25 OCT 2026";
const START = new Date("2026-10-23T19:00:00+05:30").getTime();
const END = new Date("2026-10-26T02:00:00+05:30").getTime();

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Singers", "#singers"],
  ["Passes", "#passes"],
  ["Venue", "#venue"],
  ["FAQ", "#faq"],
] as const;

/* ═══════════════════════════════════════════════
   STAR ARTISTS DATA
   ═══════════════════════════════════════════════ */
const SINGERS = [
  {
    day: "DAY 1",
    date: "23 OCT 2026",
    weekday: "Friday",
    name: "Khushbu Asodiya",
    gujaratiName: "ખુશ્બુ અસોડિયા",
    image: khushbuImg,
    badge: "OPENING NIGHT",
    price: "₹500",
  },
  {
    day: "DAY 2",
    date: "24 OCT 2026",
    weekday: "Saturday",
    name: "Kajal Maheriya",
    gujaratiName: "કાજલ મહેરિયા",
    image: kajalImg,
    badge: "WEEKEND SPECIAL",
    price: "₹500",
  },
  {
    day: "DAY 3",
    date: "25 OCT 2026",
    weekday: "Sunday",
    name: "Neha Suthar",
    gujaratiName: "નેહા સુથાર",
    image: nehaImg,
    badge: "GRAND FINALE",
    price: "₹500",
  },
];

const FAQ_DATA = [
  [
    "When is the Post Navratri event?",
    "3 magical nights from 23 October to 25 October 2026 (Friday, Saturday & Sunday) starting at 7:00 PM.",
  ],
  [
    "Who are the performing artists?",
    "23 Oct: Khushbu Asodiya | 24 Oct: Kajal Maheriya | 25 Oct: Neha Suthar.",
  ],
  [
    "What are the ticket prices?",
    "Single Day Pass is ₹500 per day. Full 3-Day Season Pass is ₹1200 (saves ₹300 for all 3 days).",
  ],
  [
    "Where is the venue?",
    "Near Khedbrahma Court, Ambaji - Ahmedabad State Highway, Khedbrahma. Click the 'Get Directions' button on this website to open in Google Maps.",
  ],
  [
    "How do I book passes?",
    "Click the 'GET YOUR PASS' button to visit our dedicated booking page, choose your passes, and send your booking request via WhatsApp directly to the organizers.",
  ],
  [
    "Who do I contact for questions?",
    `WhatsApp: ${WHATSAPP_DISPLAY} | Calling Helpline: ${HELPLINE_PHONE} | Instagram: @maa.ni.mandvi.`,
  ],
];

/* ═══════════════════════════════════════════════
   HELPERS & SHARED COMPONENTS
   ═══════════════════════════════════════════════ */

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
      { threshold: 0.15 },
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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-xs font-semibold tracking-[0.4em] text-gold">
      <span className="ornament-rule w-12" />
      {children}
      <span className="ornament-rule w-12" />
    </div>
  );
}

function GoldButton({
  href,
  children,
  ghost,
  onClick,
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  ghost?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = ghost
    ? "inline-flex items-center gap-2 border border-gold/60 px-7 py-4 text-xs font-bold tracking-[0.3em] text-cream transition hover:border-gold-bright hover:text-gold-bright disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    : "bg-gold inline-flex items-center gap-2 px-7 py-4 text-xs font-bold tracking-[0.3em] text-ink shadow-[0_10px_40px_-10px_var(--gold)] transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer";

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link to={href} className={cls}>
          {children}
        </Link>
      );
    }
    const ext = href.startsWith("http");
    return (
      <a
        href={href}
        target={ext ? "_blank" : undefined}
        rel={ext ? "noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type || "button"} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   COUNTDOWN TIMER (TARGET: 23 OCT 2026)
   ═══════════════════════════════════════════════ */
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
          <p className="text-gold font-serif text-5xl font-semibold md:text-7xl">
            The Mandvi is Live ✨️
          </p>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 md:gap-8">
              {parts.map(([v, l]) => (
                <div key={l} className="border-gold/20 md:border-r md:last:border-r-0">
                  <div className="text-gold font-serif text-5xl font-semibold tabular-nums md:text-8xl">
                    {now === null ? "--" : String(v).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-[10px] font-semibold tracking-[0.35em] text-muted-foreground">
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs font-semibold tracking-[0.5em] text-cream">
              UNTIL THE FIRST RAAS · 23 OCT 2026
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   3D TILT FLYER CARD
   ═══════════════════════════════════════════════ */
function FlyerCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setT({
          x: ((e.clientY - r.top) / r.height - 0.5) * -10,
          y: ((e.clientX - r.left) / r.width - 0.5) * 12,
        });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="cursor-pointer"
    >
      <div
        className="gold-frame relative overflow-hidden rounded-xl transition-transform duration-200 ease-out shadow-[0_25px_65px_-15px_rgba(0,0,0,0.85)]"
        style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      >
        <img
          src={flyerImg}
          alt="Maa Ni Mandvi 2026 Official Flyer - Khedbrahma"
          className="block w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INTRO ANIMATION
   ═══════════════════════════════════════════════ */
function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 4000);
    const t2 = setTimeout(onDone, 4700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink transition-opacity duration-700 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-mandala animate-intro-zoom absolute inset-[-20%] rounded-full opacity-70 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
      <Embers count={30} />
      <div className="relative text-center px-4" style={{ perspective: 800 }}>
        <div className="mb-6 flex justify-center">
          <img
            src={logoImg}
            alt="માંની માંડવી"
            className="h-28 w-28 md:h-36 md:w-36 rounded-full border-2 border-gold object-cover shadow-[0_0_40px_rgba(212,175,55,0.6)] animate-rise"
            style={{ animationDelay: "0.8s" }}
          />
        </div>

        <div className="font-deva text-6xl leading-[0.95] md:text-8xl" lang="gu">
          <span className="text-gold animate-letter block" style={{ animationDelay: "1.5s" }}>
            માંની માંડવી
          </span>
        </div>

        <p
          className="animate-rise mt-4 font-deva text-base tracking-[0.3em] text-gold-bright"
          style={{ animationDelay: "2.3s" }}
          lang="gu"
        >
          પોસ્ટ નવરાત્રિ મહોત્સવ ૨૦૨૬
        </p>

        <p
          className="animate-rise mt-2 text-[11px] font-semibold tracking-[0.5em] text-cream"
          style={{ animationDelay: "2.8s" }}
        >
          ૨૩ · ૨૪ · ૨૫ OCT · KHEDBRAHMA
        </p>
      </div>

      <button
        onClick={onDone}
        className="absolute bottom-8 right-8 text-[10px] font-semibold tracking-[0.4em] text-muted-foreground hover:text-gold cursor-pointer"
      >
        SKIP →
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAVIGATION BAR
   ═══════════════════════════════════════════════ */
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/30 bg-maroon/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a
            href="#home"
            aria-label="Maa Ni Mandvi home"
            className="flex items-center gap-3 group"
          >
            <img
              src={logoImg}
              alt="માંની માંડવી"
              className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-gold/60 object-cover shadow-md transition group-hover:scale-105"
            />
            <div className="leading-tight text-left">
              <span className="font-deva text-lg md:text-xl text-gold block" lang="gu">
                માંની માંડવી
              </span>
              <span className="text-[9px] tracking-[0.25em] text-gold-bright block -mt-0.5">
                POST NAVRATRI · KHEDBRAHMA
              </span>
            </div>
          </a>

          <nav className="hidden gap-8 lg:flex">
            {NAV.map(([l, h]) => (
              <a
                key={h}
                href={h}
                className="text-[11px] font-semibold tracking-[0.3em] text-cream/80 transition hover:text-gold-bright"
              >
                {l.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/book"
              className="bg-gold hidden px-5 py-2.5 text-[11px] font-bold tracking-[0.25em] text-ink sm:inline-block transition hover:brightness-110 shadow-sm"
            >
              BOOK PASSES
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex flex-col gap-1.5 lg:hidden cursor-pointer p-1"
            >
              <span className="block h-px w-7 bg-gold" />
              <span className="block h-px w-5 bg-gold" />
              <span className="block h-px w-7 bg-gold" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`bg-velvet fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 transition-[clip-path] duration-700 lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_50%_0_50%)]"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-6 top-5 text-3xl text-gold cursor-pointer"
          aria-label="Close menu"
        >
          ×
        </button>

        <img
          src={logoImg}
          alt="માંની માંડવી"
          className="h-20 w-20 rounded-full border-2 border-gold shadow-lg mb-2"
        />

        <div className="font-deva text-3xl text-gold" lang="gu">
          માંની માંડવી
        </div>
        <p className="text-xs tracking-widest text-gold-bright -mt-4">
          POST NAVRATRI · 23-25 OCT 2026
        </p>

        {NAV.map(([l, h], i) => (
          <a
            key={h}
            href={h}
            onClick={() => setOpen(false)}
            className={`font-serif text-2xl tracking-[0.15em] text-cream transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${250 + i * 60}ms` : "0ms" }}
          >
            {l.toUpperCase()}
          </a>
        ))}

        <div className="mt-4">
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="inline-block bg-gold px-8 py-3.5 text-xs font-bold tracking-[0.25em] text-ink uppercase"
          >
            BOOK PASSES →
          </Link>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
function Index() {
  const [intro, setIntro] = useState(true);

  return (
    <main className="overflow-x-hidden">
      {intro && <Intro onDone={() => setIntro(false)} />}
      <BackgroundMusic />
      <Nav />

      {/* ═══ HERO SECTION ═══ */}
      <section id="home" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
        <img
          src={heroPoster}
          alt="Divine Maa Durga Navratri Darshan"
          className="absolute left-1/2 top-0 w-[max(100%,960px)] max-w-none -translate-x-1/2 -translate-y-[4%] opacity-90 [mask-image:linear-gradient(to_bottom,black_40%,transparent_75%)]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,var(--ink)_85%)]" />
        <Embers />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.9fr]">
            {/* Left Column: Branding and Headline */}
            <div className={intro ? "opacity-0" : "animate-rise"}>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/80 px-4 py-1.5 backdrop-blur-md mb-6 shadow-md">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-gold-bright uppercase">
                  POST NAVRATRI · 23 — 25 OCT 2026
                </span>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={logoImg}
                    alt="માંની માંડવી Logo"
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-gold object-cover shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  />
                  <div>
                    <h1 className="font-deva text-4xl md:text-6xl text-gold leading-none" lang="gu">
                      માંની માંડવી
                    </h1>
                    <p className="font-deva text-lg md:text-xl text-gold-bright tracking-wider mt-1" lang="gu">
                      પોસ્ટ નવરાત્રિ મહોત્સવ ૨૦૨૬
                    </p>
                  </div>
                </div>

                <p className="font-deva text-2xl md:text-3xl text-gold-bright tracking-wide mt-2" lang="gu">
                  ગરબાની રાત, હવે નવા સરનામે...!
                </p>

                <p className="font-serif text-xl italic text-cream/90 md:text-2xl">
                  3 Nights · 3 Mega Stars · Khedbrahma ✨️
                </p>
              </div>

              {/* Details strip */}
              <div className="mt-8 border-l border-gold/50 pl-6">
                <p className="font-serif text-2xl font-semibold text-gold-bright md:text-3xl">
                  {EVENT_DATES}
                </p>
                <p className="mt-2 text-sm font-bold tracking-[0.2em] text-cream">
                  {VENUE_NAME.toUpperCase()}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{VENUE_FULL}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                  <span className="text-gold font-bold">Single Day Pass: ₹500</span>
                  <span className="text-gold-bright font-bold">3-Day Pass: ₹1,200</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/book"
                  className="bg-gold inline-flex items-center gap-2 px-7 py-4 text-xs font-bold tracking-[0.3em] text-ink shadow-[0_10px_40px_-10px_var(--gold)] transition hover:brightness-110 uppercase"
                >
                  BOOK YOUR PASS →
                </Link>
                <GoldButton
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to book passes for Maa Ni Mandvi Post Navratri (23-25 Oct 2026).")}`}
                  ghost
                >
                  WHATSAPP BOOKING
                </GoldButton>
              </div>
            </div>

            {/* Right Column: Official Announcement Flyer */}
            <div className={`hidden lg:block ${intro ? "opacity-0" : "animate-rise"}`} style={{ animationDelay: ".25s" }}>
              <div className="max-w-sm mx-auto">
                <FlyerCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RESTORED COUNTDOWN TIMER ═══ */}
      <Countdown />

      {/* ═══ SINGER LINEUP SECTION (NEW!) ═══ */}
      <section id="singers" className="bg-velvet relative overflow-hidden py-28 border-t border-gold/30">
        <Embers count={16} />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <Eyebrow>STAR LINEUP · 3 MEGA CELEBRITIES</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl font-semibold text-cream">
              Grand Post Navratri <span className="text-gold">Artists</span>
            </h2>
            <p className="mt-3 text-cream/75 text-sm md:text-base max-w-2xl mx-auto">
              Three consecutive nights of enchanting Garba led by Gujarat's most celebrated vocalists.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {SINGERS.map((s, idx) => (
              <Reveal key={s.name} className="flex">
                <div className="group relative w-full rounded-2xl border-2 border-gold/40 bg-maroon/60 p-4 transition-all duration-300 hover:border-gold hover:shadow-[0_10px_40px_rgba(212,175,55,0.25)] flex flex-col justify-between">
                  {/* Singer poster image */}
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-gold/30">
                    <img
                      src={s.image}
                      alt={`${s.name} official poster`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-md border border-gold/40 text-gold-bright text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                      {s.day} · {s.date.split(" ")[0]} OCT
                    </div>
                    <div className="absolute top-3 right-3 bg-crimson/90 border border-gold/30 text-cream text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {s.badge}
                    </div>
                  </div>

                  {/* Singer info */}
                  <div className="mt-5 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gold-bright tracking-wider">
                        {s.date} ({s.weekday})
                      </p>
                      <h3 className="font-serif text-2xl font-bold text-cream mt-1 group-hover:text-gold transition">
                        {s.name}
                      </h3>
                      <p className="font-deva text-base text-cream/80 mt-1" lang="gu">
                        {s.gujaratiName}
                      </p>
                      <div className="mt-3 inline-block bg-gold/10 border border-gold/30 px-3 py-1 rounded-full text-xs font-bold text-gold">
                        Pass: {s.price} / Day
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gold/20">
                      <Link
                        to="/book"
                        className="block w-full bg-gold py-3 text-xs font-bold tracking-widest text-ink uppercase hover:brightness-110 transition shadow"
                      >
                        BOOK FOR {s.date.split(" ")[0]} OCT →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/book"
              className="inline-block border-2 border-gold px-8 py-4 text-xs font-bold tracking-[0.3em] text-cream hover:bg-gold hover:text-ink transition uppercase shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              BOOK 3-DAY SEASON PASS (₹1200) →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT SECTION ═══ */}
      <section id="about" className="bg-paper relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal className="relative">
            <div className="gold-frame overflow-hidden rounded-xl shadow-2xl">
              <img
                src={garbaArenaImg}
                alt="Illuminated Grand Garba Mandvo Arena in Gujarat at Night"
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="inline-block rounded-full bg-crimson/10 border border-crimson/30 px-4 py-1 text-xs font-bold tracking-widest text-crimson mb-4">
              નવું સરનામું · KHEDBRAHMA
            </div>

            <p className="font-deva text-4xl text-festival leading-tight" lang="gu">
              ગરબાની રાત,
              <br />
              હવે નવા સરનામે...!
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl text-charcoal">
              Post Navratri 2026
              <br />
              Khedbrahma Mahotsav
            </h2>

            <div className="my-8 h-px w-24 bg-gold-burnished" />

            <p className="max-w-md text-lg leading-relaxed text-charcoal/85">
              Maa Ni Mandvi brings 3 spectacular nights of Post Navratri Garba to Khedbrahma on 23, 24, and 25 October 2026. Join thousands of Garba lovers and dance to the divine tunes of Khushbu Asodiya, Kajal Maheriya, and Neha Suthar!
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={logoImg}
                  alt="માંની માંડવી"
                  className="h-12 w-12 rounded-full border border-gold object-cover shadow"
                />
                <div>
                  <p className="font-deva text-sm font-bold text-festival" lang="gu">
                    માંની માંડવી
                  </p>
                  <p className="text-[11px] text-charcoal/70">23 - 25 Oct 2026</p>
                </div>
              </div>
              <div className="h-8 w-px bg-gold/30" />
              <div>
                <p className="text-xs font-bold tracking-widest text-charcoal uppercase">Follow On IG</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-festival hover:underline"
                >
                  @maa.ni.mandvi
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PASSES & PRICING PREVIEW ═══ */}
      <section id="passes" className="bg-textile py-28 border-t border-gold/30">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center">
            <Eyebrow>PASSES & TICKETS</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl font-semibold text-cream">
              Choose Your <span className="text-gold">Pass Package</span>
            </h2>
            <p className="mt-3 text-cream/70 text-sm max-w-lg mx-auto">
              Direct booking through our online pass portal with WhatsApp confirmation.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Single Day Card */}
            <Reveal>
              <div className="rounded-2xl border border-gold/40 bg-maroon/50 p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold tracking-[0.3em] text-gold uppercase block mb-1">
                    INDIVIDUAL NIGHTS
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-cream">Single Day Pass</h3>
                  <p className="mt-2 text-sm text-cream/70">
                    Pick any 1 night from 23, 24, or 25 October. Valid for 1 person for that specific night.
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-extrabold text-gold-bright">₹500</span>
                    <span className="text-xs text-muted-foreground">/ person / night</span>
                  </div>
                  <ul className="mt-6 space-y-2 text-xs text-cream/80">
                    <li>✓ Entry to selected night</li>
                    <li>✓ Access to live concert & Garba ground</li>
                    <li>✓ Instant WhatsApp reservation</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to="/book"
                    className="block w-full border border-gold py-4 text-center text-xs font-bold tracking-[0.2em] text-gold hover:bg-gold hover:text-ink transition uppercase"
                  >
                    SELECT SINGLE DAY →
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* 3-Day Combo Card */}
            <Reveal>
              <div className="rounded-2xl border-2 border-gold bg-gradient-to-b from-maroon/90 to-crimson/80 p-8 flex flex-col justify-between h-full shadow-[0_0_35px_rgba(212,175,55,0.25)] relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-gold text-ink text-[10px] font-black px-3 py-1 rounded-full uppercase shadow">
                  ★ BEST VALUE
                </div>
                <div>
                  <span className="text-xs font-bold tracking-[0.3em] text-gold-bright uppercase block mb-1">
                    ALL 3 NIGHTS INCLUDED
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-cream">Full 3-Day Season Pass</h3>
                  <p className="mt-2 text-sm text-cream/80">
                    Access to all 3 nights (23, 24 & 25 Oct) featuring Khushbu Asodiya, Kajal Maheriya, and Neha Suthar!
                  </p>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-serif text-4xl font-extrabold text-gold-bright">₹1,200</span>
                    <span className="text-sm text-cream/50 line-through">₹1,500</span>
                    <span className="text-xs font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded">
                      SAVE ₹300
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2 text-xs text-cream/90">
                    <li>✓ Valid for all 3 nights (23, 24, 25 Oct)</li>
                    <li>✓ Access to all 3 Celebrity Singer concerts</li>
                    <li>✓ Guaranteed priority entry</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to="/book"
                    className="block w-full bg-gold py-4 text-center text-xs font-bold tracking-[0.2em] text-ink hover:brightness-110 transition uppercase shadow"
                  >
                    BOOK 3-DAY COMBO PASS →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ VENUE SECTION ═══ */}
      <section id="venue" className="bg-paper relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal>
            <div className="inline-block rounded-full bg-crimson/10 border border-crimson/30 px-3.5 py-1 text-xs font-bold tracking-widest text-crimson mb-3">
              📍 OFFICIAL VENUE LOCATION
            </div>
            <p className="font-deva text-3xl text-festival" lang="gu">
              ગરબાની રાત, હવે નવા સરનામે...!
            </p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl text-charcoal">
              Find Your Way to the Mandvi
            </h2>
            <div className="my-8 h-px w-24 bg-gold-burnished" />
            <p className="text-sm font-bold tracking-[0.3em] text-charcoal">
              {VENUE_NAME.toUpperCase()}
            </p>
            <p className="mt-2 text-lg text-charcoal/85 leading-relaxed">{VENUE_FULL}</p>

            <div className="mt-6 space-y-2 text-sm text-charcoal/80">
              <p>
                <strong>WhatsApp Booking:</strong>{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="font-bold text-festival">
                  {WHATSAPP_DISPLAY}
                </a>
              </p>
              <p>
                <strong>Helpline (Contact Only):</strong>{" "}
                <a href={`tel:+91${HELPLINE_RAW}`} className="font-bold text-festival">
                  {HELPLINE_PHONE}
                </a>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-festival px-7 py-4 text-xs font-bold tracking-[0.3em] text-cream transition hover:bg-crimson shadow"
              >
                OPEN IN GOOGLE MAPS 📍
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, please send location directions for Maa Ni Mandvi venue in Khedbrahma.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block border border-festival px-7 py-4 text-xs font-bold tracking-[0.3em] text-festival transition hover:bg-festival hover:text-cream"
              >
                ASK ON WHATSAPP
              </a>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="gold-frame overflow-hidden rounded-xl shadow-2xl">
              <img
                src={venueGateImg}
                alt="Grand entrance gate of Maa Ni Mandvi Khedbrahma"
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section id="faq" className="bg-mandala py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <Eyebrow>KNOW BEFORE YOU GO</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold">Questions & Answers</h2>
          </Reveal>
          <div className="mt-12">
            {FAQ_DATA.map(([q, a]) => (
              <details key={q} className="group border-b border-gold/30 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-2xl">
                  {q}
                  <span className="text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-cream/70 leading-relaxed text-sm md:text-base">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-textile relative overflow-hidden border-t border-gold/30 py-20 text-center">
        <Embers count={10} />
        <div className="relative mx-auto max-w-4xl px-6">
          <img
            src={logoImg}
            alt="માંની માંડવી Logo"
            className="mx-auto h-24 w-24 rounded-full border-2 border-gold shadow-[0_0_35px_rgba(212,175,55,0.45)] object-cover mb-4"
          />

          <h3 className="font-deva text-3xl md:text-4xl text-gold" lang="gu">
            માંની માંડવી
          </h3>
          <p className="font-deva text-base text-gold-bright mt-1" lang="gu">
            પોસ્ટ નવરાત્રિ મહોત્સવ ૨૦૨૬ · ખેડબ્રહ્મા
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.4em] text-cream">
            23 OCT · 24 OCT · 25 OCT 2026
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="bg-gold px-7 py-3 text-xs font-bold tracking-[0.25em] text-ink hover:brightness-110 transition shadow uppercase"
            >
              BOOK PASSES
            </Link>
            <GoldButton
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to book passes for Maa Ni Mandvi Post Navratri (23-25 Oct 2026).")}`}
              ghost
            >
              WHATSAPP
            </GoldButton>
            <GoldButton href={GOOGLE_MAPS_URL} ghost>
              LOCATION MAPS
            </GoldButton>
            <GoldButton href={INSTAGRAM_URL} ghost>
              @MAA.NI.MANDVI
            </GoldButton>
          </div>

          <div className="mt-10 text-xs text-muted-foreground space-y-1">
            <p>{VENUE_FULL}</p>
            <p>
              WhatsApp Booking: {WHATSAPP_DISPLAY} · Helpline: {HELPLINE_PHONE}
            </p>
          </div>

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
