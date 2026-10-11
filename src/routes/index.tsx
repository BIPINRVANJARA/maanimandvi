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
import galleryUmbrellas from "@/assets/gallery/gallery-umbrellas.jpg";
import galleryDiyas from "@/assets/gallery/gallery-diyas.jpg";
import galleryNightGround from "@/assets/gallery/gallery-night-ground.jpg";
import galleryDandiyaCheers from "@/assets/gallery/gallery-dandiya-cheers.jpg";
import galleryCanopyDecor from "@/assets/gallery/gallery-canopy-decor.jpg";
import { BackgroundMusic } from "@/components/BackgroundMusic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maa Ni Mandvi 2026 — પોસ્ટ નવરાત્રિ મહોત્સવ | Khedbrahma" },
      {
        name: "description",
        content:
          "3 Nights of Grand Post Navratri Garba at Khedbrahma. 23, 24, 25 October 2026. Featuring Khushbu Asodiya (23 Oct), Neha Suthar (24 Oct), Kajal Maheriya (25 Oct). Single day ₹500, 3-Day pass ₹1200.",
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
  ["Singers", "#singers"],
  ["Gallery", "#gallery"],
  ["About", "#about"],
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
    name: "Neha Suthar",
    gujaratiName: "નેહા સુથાર",
    image: nehaImg,
    badge: "WEEKEND SPECIAL",
    price: "₹500",
  },
  {
    day: "DAY 3",
    date: "25 OCT 2026",
    weekday: "Sunday",
    name: "Kajal Maheriya",
    gujaratiName: "કાજલ મહેરિયા",
    image: kajalImg,
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
    "23 Oct: Khushbu Asodiya | 24 Oct: Neha Suthar | 25 Oct: Kajal Maheriya.",
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
    <section className="bg-textile relative border-y border-gold/30 py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {live ? (
          <p className="text-gold font-serif text-3xl sm:text-5xl md:text-7xl font-semibold">
            The Mandvi is Live ✨️
          </p>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-8">
              {parts.map(([v, l]) => (
                <div key={l} className="border-gold/20 border-r last:border-r-0">
                  <div className="text-gold font-serif text-3xl sm:text-5xl md:text-7xl font-semibold tabular-nums">
                    {now === null ? "--" : String(v).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[8px] sm:text-[10px] font-semibold tracking-[0.15em] sm:tracking-[0.35em] text-muted-foreground uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 sm:mt-8 text-[10px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.5em] text-cream">
              UNTIL 23 OCT 2026 · KHEDBRAHMA
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5">
          <a
            href="#home"
            aria-label="Maa Ni Mandvi home"
            className="flex items-center gap-2.5 sm:gap-3 group"
          >
            <img
              src={logoImg}
              alt="માંની માંડવી"
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-gold/60 object-cover shadow-md transition group-hover:scale-105"
            />
            <div className="leading-tight text-left">
              <span className="font-deva text-base sm:text-xl text-gold block" lang="gu">
                માંની માંડવી
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-gold-bright block -mt-0.5">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/book"
              className="bg-gold px-3 py-1.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold tracking-widest text-ink transition hover:brightness-110 shadow-sm uppercase rounded-sm"
            >
              BOOK PASSES
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex flex-col gap-1.5 lg:hidden cursor-pointer p-1.5"
            >
              <span className="block h-px w-6 sm:w-7 bg-gold" />
              <span className="block h-px w-4 sm:w-5 bg-gold" />
              <span className="block h-px w-6 sm:w-7 bg-gold" />
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
   FESTIVAL PHOTO GALLERY & LIGHTBOX
   ═══════════════════════════════════════════════ */
const GALLERY_ITEMS = [
  {
    id: "night-ground",
    image: galleryNightGround,
    title: "Garba Raas Celebration",
    gujaratiTitle: "ઉત્સાહી ગરબા રાસ",
    category: "GARBA ARENA",
    description:
      "Thousands of energetic Garba players moving in divine harmony under the colorful festival canopy at Khedbrahma.",
  },
  {
    id: "canopy-decor",
    image: galleryCanopyDecor,
    title: "Illuminated Mandap Canopy",
    gujaratiTitle: "રોયલ મંડપ અને લાઇટિંગ",
    category: "ROYAL DECOR",
    description:
      "Spectacular suspended fabric ceiling adorned with handcrafted Gujarati umbrellas and glittering fairy lights.",
  },
  {
    id: "dandiya-cheers",
    image: galleryDandiyaCheers,
    title: "Dandiya Sticks Raas",
    gujaratiTitle: "રંગબેરંગી દાંડિયા રાસ",
    category: "RAAS DANDIYA",
    description:
      "Garba lovers crossing decorated wooden dandiya sticks in joyful rhythm with traditional folk melodies.",
  },
  {
    id: "diyas",
    image: galleryDiyas,
    title: "Maa Aarti & Diya Rangoli",
    gujaratiTitle: "મંગલ આરતી અને દીપોત્સવ",
    category: "DIVINE AARTI",
    subtitle: "Sacred Flower & Lamp Decor",
    description:
      "Sacred brass lamps and glowing diyas nestled in vibrant fresh marigold and rose petal rangoli.",
  },
  {
    id: "umbrellas",
    image: galleryUmbrellas,
    title: "Kutchi Embroidered Umbrellas",
    gujaratiTitle: "કચ્છી છત્રી શણગાર",
    category: "HERITAGE CRAFT",
    subtitle: "Handcrafted Folk Mirrors",
    description:
      "Handcrafted folk umbrellas featuring exquisite Kutchi embroidery, mirror work, and colourful tassels.",
  },
];

function GallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
      }
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIdx]);

  return (
    <section id="gallery" className="bg-velvet relative py-14 sm:py-24 border-t border-gold/30 overflow-hidden">
      <Embers count={12} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>FESTIVE GLIMPSES · ઉત્સવની ઝાંખી</Eyebrow>
          <h2 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-cream">
            The Spirit of <span className="text-gold">Maa Ni Mandvi</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-cream/75 text-xs sm:text-base max-w-2xl mx-auto">
            Experience the royal decor, sacred aarti, traditional dandiya, and vibrant memories from our grand celebrations.
          </p>
        </Reveal>

        {/* Gallery Bento Grid */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Item 1: Arena Garba Night (Large Showcase - 7 cols on desktop) */}
          <Reveal className="sm:col-span-2 lg:col-span-7 flex">
            <div
              onClick={() => setActiveIdx(0)}
              className="group relative w-full overflow-hidden rounded-2xl border border-gold/40 bg-maroon/60 shadow-xl cursor-pointer transition-all duration-300 hover:border-gold hover:shadow-[0_12px_45px_rgba(212,175,55,0.3)] min-h-[260px] sm:min-h-[400px] flex flex-col justify-end"
            >
              <img
                src={GALLERY_ITEMS[0].image}
                alt={GALLERY_ITEMS[0].title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="rounded-full border border-gold/50 bg-ink/85 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold tracking-widest text-gold-bright uppercase shadow">
                  ★ {GALLERY_ITEMS[0].category}
                </span>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="h-9 w-9 rounded-full bg-gold text-ink flex items-center justify-center font-bold text-sm shadow">
                  🔍
                </span>
              </div>

              <div className="relative p-6 md:p-8">
                <p className="font-deva text-xl text-gold-bright" lang="gu">
                  {GALLERY_ITEMS[0].gujaratiTitle}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream mt-1 group-hover:text-gold transition">
                  {GALLERY_ITEMS[0].title}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-cream/80 max-w-lg">
                  {GALLERY_ITEMS[0].description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-gold group-hover:translate-x-1 transition-transform">
                  VIEW FULL PHOTO ↗
                </span>
              </div>
            </div>
          </Reveal>

          {/* Item 2: Canopy Decor (5 cols on desktop) */}
          <Reveal className="sm:col-span-2 lg:col-span-5 flex">
            <div
              onClick={() => setActiveIdx(1)}
              className="group relative w-full overflow-hidden rounded-2xl border border-gold/40 bg-maroon/60 shadow-xl cursor-pointer transition-all duration-300 hover:border-gold hover:shadow-[0_12px_45px_rgba(212,175,55,0.3)] min-h-[260px] sm:min-h-[400px] flex flex-col justify-end"
            >
              <img
                src={GALLERY_ITEMS[1].image}
                alt={GALLERY_ITEMS[1].title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="rounded-full border border-gold/50 bg-ink/85 backdrop-blur-md px-3 py-0.5 sm:px-3.5 sm:py-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-gold-bright uppercase shadow">
                  {GALLERY_ITEMS[1].category}
                </span>
              </div>

              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gold text-ink flex items-center justify-center font-bold text-sm shadow">
                  🔍
                </span>
              </div>

              <div className="relative p-4 sm:p-6">
                <p className="font-deva text-base sm:text-lg text-gold-bright" lang="gu">
                  {GALLERY_ITEMS[1].gujaratiTitle}
                </p>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-cream mt-0.5 sm:mt-1 group-hover:text-gold transition">
                  {GALLERY_ITEMS[1].title}
                </h3>
                <p className="mt-1 sm:mt-2 text-xs text-cream/80 line-clamp-2 sm:line-clamp-none">
                  {GALLERY_ITEMS[1].description}
                </p>
                <span className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-gold group-hover:translate-x-1 transition-transform">
                  VIEW FULL PHOTO ↗
                </span>
              </div>
            </div>
          </Reveal>

          {/* Item 3: Dandiya Cheers (4 cols on desktop) */}
          <Reveal className="lg:col-span-4 flex">
            <div
              onClick={() => setActiveIdx(2)}
              className="group relative w-full overflow-hidden rounded-2xl border border-gold/40 bg-maroon/60 shadow-xl cursor-pointer transition-all duration-300 hover:border-gold hover:shadow-[0_12px_45px_rgba(212,175,55,0.3)] min-h-[200px] sm:min-h-[300px] flex flex-col justify-end"
            >
              <img
                src={GALLERY_ITEMS[2].image}
                alt={GALLERY_ITEMS[2].title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="rounded-full border border-gold/50 bg-ink/85 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-gold-bright uppercase shadow">
                  {GALLERY_ITEMS[2].category}
                </span>
              </div>

              <div className="relative p-3.5 sm:p-5">
                <p className="font-deva text-sm sm:text-base text-gold-bright" lang="gu">
                  {GALLERY_ITEMS[2].gujaratiTitle}
                </p>
                <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-cream mt-0.5 group-hover:text-gold transition">
                  {GALLERY_ITEMS[2].title}
                </h3>
                <span className="mt-1 sm:mt-2 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gold">
                  EXPAND ↗
                </span>
              </div>
            </div>
          </Reveal>

          {/* Item 4: Diyas & Aarti (4 cols on desktop) */}
          <Reveal className="lg:col-span-4 flex">
            <div
              onClick={() => setActiveIdx(3)}
              className="group relative w-full overflow-hidden rounded-2xl border border-gold/40 bg-maroon/60 shadow-xl cursor-pointer transition-all duration-300 hover:border-gold hover:shadow-[0_12px_45px_rgba(212,175,55,0.3)] min-h-[200px] sm:min-h-[300px] flex flex-col justify-end"
            >
              <img
                src={GALLERY_ITEMS[3].image}
                alt={GALLERY_ITEMS[3].title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="rounded-full border border-gold/50 bg-ink/85 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-gold-bright uppercase shadow">
                  {GALLERY_ITEMS[3].category}
                </span>
              </div>

              <div className="relative p-3.5 sm:p-5">
                <p className="font-deva text-sm sm:text-base text-gold-bright" lang="gu">
                  {GALLERY_ITEMS[3].gujaratiTitle}
                </p>
                <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-cream mt-0.5 group-hover:text-gold transition">
                  {GALLERY_ITEMS[3].title}
                </h3>
                <span className="mt-1 sm:mt-2 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gold">
                  EXPAND ↗
                </span>
              </div>
            </div>
          </Reveal>

          {/* Item 5: Kutchi Umbrellas (4 cols on desktop) */}
          <Reveal className="lg:col-span-4 flex">
            <div
              onClick={() => setActiveIdx(4)}
              className="group relative w-full overflow-hidden rounded-2xl border border-gold/40 bg-maroon/60 shadow-xl cursor-pointer transition-all duration-300 hover:border-gold hover:shadow-[0_12px_45px_rgba(212,175,55,0.3)] min-h-[200px] sm:min-h-[300px] flex flex-col justify-end"
            >
              <img
                src={GALLERY_ITEMS[4].image}
                alt={GALLERY_ITEMS[4].title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="rounded-full border border-gold/50 bg-ink/85 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-gold-bright uppercase shadow">
                  {GALLERY_ITEMS[4].category}
                </span>
              </div>

              <div className="relative p-3.5 sm:p-5">
                <p className="font-deva text-sm sm:text-base text-gold-bright" lang="gu">
                  {GALLERY_ITEMS[4].gujaratiTitle}
                </p>
                <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-cream mt-0.5 group-hover:text-gold transition">
                  {GALLERY_ITEMS[4].title}
                </h3>
                <span className="mt-1 sm:mt-2 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gold">
                  EXPAND ↗
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-14 text-center">
          <Link
            to="/book"
            className="inline-block w-full sm:w-auto bg-gold px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-ink hover:brightness-110 transition uppercase shadow-[0_10px_35px_rgba(212,175,55,0.3)] active:scale-95 text-center"
          >
            EXPERIENCE IT LIVE · BOOK PASSES →
          </Link>
        </div>

        {/* Interactive Lightbox Modal */}
        {activeIdx !== null && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setActiveIdx(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveIdx(null)}
              aria-label="Close photo preview"
              className="absolute top-5 right-5 z-20 h-11 w-11 rounded-full border border-gold/60 bg-maroon/90 text-gold-bright hover:bg-gold hover:text-ink text-2xl flex items-center justify-center transition cursor-pointer shadow-lg"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-gold/60 bg-maroon/90 text-gold hover:bg-gold hover:text-ink text-2xl flex items-center justify-center transition cursor-pointer shadow-lg"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-gold/60 bg-maroon/90 text-gold hover:bg-gold hover:text-ink text-2xl flex items-center justify-center transition cursor-pointer shadow-lg"
            >
              ›
            </button>

            {/* Modal Content */}
            <div
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-gold/70 shadow-[0_0_60px_rgba(212,175,55,0.4)] bg-ink max-h-[66vh] flex items-center justify-center">
                <img
                  src={GALLERY_ITEMS[activeIdx].image}
                  alt={GALLERY_ITEMS[activeIdx].title}
                  className="max-h-[66vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption Box */}
              <div className="mt-4 w-full rounded-xl border border-gold/40 bg-maroon/95 p-5 text-center shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-center gap-2 text-[11px] font-bold tracking-widest text-gold-bright uppercase">
                  <span>{GALLERY_ITEMS[activeIdx].category}</span>
                  <span>•</span>
                  <span>PHOTO {activeIdx + 1} OF {GALLERY_ITEMS.length}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream mt-1">
                  {GALLERY_ITEMS[activeIdx].title}
                </h3>
                <p className="font-deva text-base text-gold mt-0.5" lang="gu">
                  {GALLERY_ITEMS[activeIdx].gujaratiTitle}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-cream/80 max-w-xl mx-auto">
                  {GALLERY_ITEMS[activeIdx].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
function Index() {
  return (
    <main className="overflow-x-hidden">
      <BackgroundMusic />
      <Nav />

      {/* ═══ HERO SECTION ═══ */}
      <section id="home" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
        <img
          src={heroPoster}
          alt="Divine Maa Durga Navratri Darshan"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-55 md:opacity-85 [mask-image:linear-gradient(to_bottom,black_45%,transparent_90%)]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,var(--ink)_85%)]" />
        <Embers />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 pt-24 sm:pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.9fr]">
            {/* Left Column: Minimal Elegant Branding & CTAs */}
            <div className="animate-rise">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/80 px-4 py-1.5 backdrop-blur-md mb-6 shadow-md">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-gold-bright uppercase">
                  POST NAVRATRI · KHEDBRAHMA
                </span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4 mb-3">
                <img
                  src={logoImg}
                  alt="માંની માંડવી"
                  className="h-14 w-14 sm:h-20 sm:w-20 rounded-full border-2 border-gold object-cover shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                />
                <div>
                  <h1 className="font-deva text-3xl sm:text-5xl md:text-6xl text-gold leading-none" lang="gu">
                    માંની માંડવી
                  </h1>
                  <p className="font-deva text-sm sm:text-base md:text-lg text-gold-bright tracking-wider mt-1" lang="gu">
                    પોસ્ટ નવરાત્રિ મહોત્સવ ૨૦૨૬
                  </p>
                </div>
              </div>

              <p className="font-serif text-lg sm:text-xl md:text-2xl text-cream/90 font-light italic mt-3">
                23 · 24 · 25 October 2026 · Khedbrahma ✨️
              </p>

              {/* Minimalist Highlights */}
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="rounded-full border border-gold/30 bg-maroon/60 px-3 py-1 text-xs text-cream/90">
                  🎤 Khushbu · Neha · Kajal
                </span>
                <span className="rounded-full border border-gold/30 bg-maroon/60 px-3 py-1 text-xs text-gold-bright font-bold">
                  🎟️ Passes from ₹500
                </span>
              </div>

              {/* Clean CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  to="/book"
                  className="bg-gold inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 text-xs font-bold tracking-[0.25em] text-ink shadow-[0_10px_35px_-5px_var(--gold)] transition hover:brightness-110 uppercase text-center w-full sm:w-auto cursor-pointer"
                >
                  BOOK PASSES →
                </Link>
                <GoldButton
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to book passes for Maa Ni Mandvi Post Navratri (23-25 Oct 2026).")}`}
                  ghost
                >
                  WHATSAPP
                </GoldButton>
              </div>
            </div>

            {/* Right Column: Official Announcement Flyer */}
            <div className="hidden lg:block animate-rise" style={{ animationDelay: ".25s" }}>
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
      <section id="singers" className="bg-velvet relative overflow-hidden py-14 sm:py-24 border-t border-gold/30">
        <Embers count={16} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>STAR LINEUP · 3 MEGA CELEBRITIES</Eyebrow>
            <h2 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-cream">
              Grand Post Navratri <span className="text-gold">Artists</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-cream/75 text-xs sm:text-base max-w-2xl mx-auto">
              Three consecutive nights of enchanting Garba led by Gujarat's most celebrated vocalists.
            </p>
          </Reveal>

          <div className="mt-10 sm:mt-16 grid gap-6 md:grid-cols-3">
            {SINGERS.map((s, idx) => (
              <Reveal key={s.name} className="flex">
                <div className="group relative w-full rounded-2xl border-2 border-gold/40 bg-maroon/60 p-3.5 sm:p-4 transition-all duration-300 hover:border-gold hover:shadow-[0_10px_40px_rgba(212,175,55,0.25)] flex flex-col justify-between">
                  {/* Singer poster image */}
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-gold/30">
                    <img
                      src={s.image}
                      alt={`${s.name} official poster`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-ink/80 backdrop-blur-md border border-gold/40 text-gold-bright text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full uppercase">
                      {s.day} · {s.date.split(" ")[0]} OCT
                    </div>
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-crimson/90 border border-gold/30 text-cream text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-full">
                      {s.badge}
                    </div>
                  </div>

                  {/* Singer info */}
                  <div className="mt-4 sm:mt-5 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gold-bright tracking-wider">
                        {s.date} ({s.weekday})
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mt-1 group-hover:text-gold transition">
                        {s.name}
                      </h3>
                      <p className="font-deva text-sm sm:text-base text-cream/80 mt-0.5" lang="gu">
                        {s.gujaratiName}
                      </p>
                      <div className="mt-2.5 inline-block bg-gold/10 border border-gold/30 px-3 py-1 rounded-full text-xs font-bold text-gold">
                        Pass: {s.price} / Day
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-gold/20">
                      <Link
                        to="/book"
                        className="block w-full bg-gold py-3 text-xs font-bold tracking-widest text-ink uppercase hover:brightness-110 transition shadow cursor-pointer active:scale-95"
                      >
                        BOOK FOR {s.date.split(" ")[0]} OCT →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              to="/book"
              className="inline-block w-full sm:w-auto border-2 border-gold px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-cream hover:bg-gold hover:text-ink transition uppercase shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95"
            >
              BOOK 3-DAY SEASON PASS (₹1200) →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PHOTO GALLERY SECTION ═══ */}
      <GallerySection />

      {/* ═══ ABOUT SECTION ═══ */}
      <section id="about" className="bg-paper relative py-14 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-16 px-4 sm:px-6 md:grid-cols-2">
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
            <div className="inline-block rounded-full bg-crimson/10 border border-crimson/30 px-3.5 py-1 text-xs font-bold tracking-widest text-crimson mb-3">
              KHEDBRAHMA · ૨૩-૨૫ OCT 2026
            </div>

            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-charcoal">
              A Grand Cultural Celebration,
              <br />
              <span className="text-festival">At A Brand New Venue</span>
            </h2>

            <div className="my-5 sm:my-6 h-px w-20 bg-gold-burnished" />

            <p className="max-w-md text-sm sm:text-base leading-relaxed text-charcoal/80">
              Maa Ni Mandvi brings 3 magical nights of Post Navratri celebration to Khedbrahma. Experience divine Aarti, royal decor, and high-energy Garba with Gujarat's most beloved vocalists.
            </p>

            <div className="mt-6 flex items-center gap-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-festival hover:underline uppercase"
              >
                Follow @maa.ni.mandvi on Instagram →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PASSES & PRICING PREVIEW ═══ */}
      <section id="passes" className="bg-textile py-14 sm:py-24 border-t border-gold/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>PASSES & TICKETS</Eyebrow>
            <h2 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-cream">
              Choose Your <span className="text-gold">Pass Package</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-cream/70 text-xs sm:text-sm max-w-lg mx-auto">
              Direct booking through our online pass portal with WhatsApp confirmation.
            </p>
          </Reveal>

          <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Single Day Card */}
            <Reveal>
              <div className="rounded-2xl border border-gold/40 bg-maroon/50 p-5 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold tracking-[0.3em] text-gold uppercase block mb-1">
                    INDIVIDUAL NIGHTS
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">Single Day Pass</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-cream/70">
                    Pick any 1 night from 23, 24, or 25 October. Valid for 1 person for that specific night.
                  </p>
                  <div className="mt-5 sm:mt-6 flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-bright">₹500</span>
                    <span className="text-xs text-muted-foreground">/ person / night</span>
                  </div>
                  <ul className="mt-5 sm:mt-6 space-y-2 text-xs text-cream/80">
                    <li>✓ Entry to selected night</li>
                    <li>✓ Access to live concert & Garba ground</li>
                    <li>✓ Instant WhatsApp reservation</li>
                  </ul>
                </div>
                <div className="mt-6 sm:mt-8">
                  <Link
                    to="/book"
                    className="block w-full border border-gold py-3.5 sm:py-4 text-center text-xs font-bold tracking-[0.2em] text-gold hover:bg-gold hover:text-ink transition uppercase active:scale-95"
                  >
                    SELECT SINGLE DAY →
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* 3-Day Combo Card */}
            <Reveal>
              <div className="rounded-2xl border-2 border-gold bg-gradient-to-b from-maroon/90 to-crimson/80 p-5 sm:p-8 flex flex-col justify-between h-full shadow-[0_0_35px_rgba(212,175,55,0.25)] relative overflow-hidden">
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 bg-gold text-ink text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase shadow">
                  ★ BEST VALUE
                </div>
                <div>
                  <span className="text-xs font-bold tracking-[0.3em] text-gold-bright uppercase block mb-1">
                    ALL 3 NIGHTS INCLUDED
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">Full 3-Day Season Pass</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-cream/80">
                    Access to all 3 nights (23, 24 & 25 Oct) featuring Khushbu Asodiya, Neha Suthar, and Kajal Maheriya!
                  </p>
                  <div className="mt-5 sm:mt-6 flex items-baseline gap-2.5 sm:gap-3">
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-bright">₹1,200</span>
                    <span className="text-xs sm:text-sm text-cream/50 line-through">₹1,500</span>
                    <span className="text-[11px] font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded">
                      SAVE ₹300
                    </span>
                  </div>
                  <ul className="mt-5 sm:mt-6 space-y-2 text-xs text-cream/90">
                    <li>✓ Valid for all 3 nights (23, 24, 25 Oct)</li>
                    <li>✓ Access to all 3 Celebrity Singer concerts</li>
                    <li>✓ Guaranteed priority entry</li>
                  </ul>
                </div>
                <div className="mt-6 sm:mt-8">
                  <Link
                    to="/book"
                    className="block w-full bg-gold py-3.5 sm:py-4 text-center text-xs font-bold tracking-[0.2em] text-ink hover:brightness-110 transition uppercase shadow active:scale-95"
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
      <section id="venue" className="bg-paper relative py-14 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-16 px-4 sm:px-6 md:grid-cols-2">
          <Reveal>
            <div className="inline-block rounded-full bg-crimson/10 border border-crimson/30 px-3.5 py-1 text-xs font-bold tracking-widest text-crimson mb-3">
              📍 OFFICIAL VENUE LOCATION
            </div>
            <p className="font-deva text-2xl sm:text-3xl text-festival" lang="gu">
              ગરબાની રાત, હવે નવા સરનામે...!
            </p>
            <h2 className="mt-2 sm:mt-4 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight text-charcoal">
              Find Your Way to the Mandvi
            </h2>
            <div className="my-5 sm:my-8 h-px w-20 sm:w-24 bg-gold-burnished" />
            <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-charcoal uppercase">
              {VENUE_NAME}
            </p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-lg text-charcoal/85 leading-relaxed">{VENUE_FULL}</p>

            <div className="mt-5 sm:mt-6 space-y-1.5 text-xs sm:text-sm text-charcoal/80">
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

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full sm:w-auto text-center justify-center bg-festival px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-cream transition hover:bg-crimson shadow"
              >
                OPEN IN GOOGLE MAPS 📍
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, please send location directions for Maa Ni Mandvi venue in Khedbrahma.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full sm:w-auto text-center justify-center border border-festival px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-festival transition hover:bg-festival hover:text-cream"
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
      <section id="faq" className="bg-mandala py-14 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>KNOW BEFORE YOU GO</Eyebrow>
            <h2 className="mt-3 sm:mt-6 font-serif text-3xl sm:text-5xl font-semibold">Questions & Answers</h2>
          </Reveal>
          <div className="mt-8 sm:mt-12">
            {FAQ_DATA.map(([q, a]) => (
              <details key={q} className="group border-b border-gold/30 py-4 sm:py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg sm:text-2xl">
                  {q}
                  <span className="text-gold transition group-open:rotate-45 ml-2">+</span>
                </summary>
                <p className="mt-2 sm:mt-4 text-cream/70 leading-relaxed text-xs sm:text-base">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-textile relative overflow-hidden border-t border-gold/30 py-14 sm:py-20 text-center pb-24 md:pb-20">
        <Embers count={10} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <img
            src={logoImg}
            alt="માંની માંડવી Logo"
            className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-gold shadow-[0_0_35px_rgba(212,175,55,0.45)] object-cover mb-4"
          />

          <h3 className="font-deva text-2xl sm:text-4xl text-gold" lang="gu">
            માંની માંડવી
          </h3>
          <p className="font-deva text-sm sm:text-base text-gold-bright mt-1" lang="gu">
            પોસ્ટ નવરાત્રિ મહોત્સવ ૨૦૨૬ · ખેડબ્રહ્મા
          </p>
          <p className="mt-1 text-[11px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.4em] text-cream">
            23 OCT · 24 OCT · 25 OCT 2026
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            <Link
              to="/book"
              className="bg-gold px-6 sm:px-7 py-3 text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-ink hover:brightness-110 transition shadow uppercase active:scale-95"
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
              MAPS
            </GoldButton>
            <GoldButton href={INSTAGRAM_URL} ghost>
              INSTAGRAM
            </GoldButton>
          </div>

          <div className="mt-8 sm:mt-10 text-xs text-muted-foreground space-y-1">
            <p>{VENUE_FULL}</p>
            <p>
              WhatsApp: {WHATSAPP_DISPLAY} · Helpline: {HELPLINE_PHONE}
            </p>
          </div>

          <div className="mt-8 sm:mt-10 border-t border-gold/20 pt-6 text-xs text-cream/80 flex flex-col items-center gap-2">
            <p className="tracking-widest uppercase font-medium text-[11px] sm:text-xs">
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

      {/* ═══ MOBILE BOTTOM STICKY QUICK BOOKING BAR ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-maroon/95 border-t border-gold/40 backdrop-blur-md px-4 py-2.5 shadow-[0_-5px_25px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3">
        <div>
          <span className="text-[9px] font-bold text-gold-bright block uppercase tracking-wider">
            23-25 OCT · KHEDBRAHMA
          </span>
          <span className="text-xs font-semibold text-cream">
            Passes from <strong className="text-gold font-bold">₹500</strong>
          </span>
        </div>
        <Link
          to="/book"
          className="bg-gold px-4 py-2 text-[11px] font-bold tracking-wider text-ink shadow uppercase active:scale-95 transition rounded"
        >
          BOOK PASSES →
        </Link>
      </div>
    </main>
  );
}
