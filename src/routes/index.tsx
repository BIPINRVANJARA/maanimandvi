import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import logoImg from "@/assets/logo.jpg";
import flyerImg from "@/assets/flyer.jpg";
import heroPoster from "@/assets/hero-poster.jpg";
import garbaCircle from "@/assets/garba-circle.jpg";
import dancer from "@/assets/dancer.jpg";
import diyas from "@/assets/diyas.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maa Ni Mandvi 2026 — માંની માંડવી નવરાત્રિ | Khedbrahma" },
      {
        name: "description",
        content:
          "Nine nights of captivating Garba. માંની માંડવી નવરાત્રિ 2026, Khedbrahma, Gujarat. ગરબાની રાત, હવે નવા સરનામે...! Ancient Rhythms, Modern Heart. Book your passes now.",
      },
      { property: "og:title", content: "Maa Ni Mandvi 2026 — માંની માંડવી નવરાત્રિ" },
      {
        property: "og:description",
        content: "ગરબાની રાત, હવે નવા સરનામે...! Khedbrahma, Gujarat. 9 Nights. Passes now live.",
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
const INSTAGRAM_URL = "https://www.instagram.com/maa.ni.mandvi/";
const PHONE = "7600280047";
const PHONE_DISPLAY = "+91 76002 80047";

// Venue
const VENUE_NAME = "Khedbrahma";
const VENUE_FULL = "Khedbrahma, Gujarat";

// Event dates: Navratri 2026 (11 Oct – 19 Oct 2026)
const EVENT_DATES = "11 OCT — 19 OCT 2026";
const START = new Date("2026-10-11T19:00:00+05:30").getTime();
const END = new Date("2026-10-20T02:00:00+05:30").getTime();

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Flyer", "#flyer"],
  ["Passes", "#booking"],
  ["Venue", "#venue"],
  ["FAQ", "#faq"],
] as const;

/* ═══════════════════════════════════════════════
   TICKET DATA — 9 Garba nights
   Day 1 = ₹199, Day 2–9 = TBC
   ═══════════════════════════════════════════════ */
interface TicketDay {
  day: number;
  label: string;
  date: string;
  price: number | null; // null = price not yet confirmed
}

const TICKET_DAYS: TicketDay[] = [
  { day: 1, label: "Day 1", date: "11 Oct 2026", price: 199 },
  { day: 2, label: "Day 2", date: "12 Oct 2026", price: null },
  { day: 3, label: "Day 3", date: "13 Oct 2026", price: null },
  { day: 4, label: "Day 4", date: "14 Oct 2026", price: null },
  { day: 5, label: "Day 5", date: "15 Oct 2026", price: null },
  { day: 6, label: "Day 6", date: "16 Oct 2026", price: null },
  { day: 7, label: "Day 7", date: "17 Oct 2026", price: null },
  { day: 8, label: "Day 8", date: "18 Oct 2026", price: null },
  { day: 9, label: "Day 9", date: "19 Oct 2026", price: null },
];

const FAQ_DATA = [
  ["Where is Maa Ni Mandvi?", `${VENUE_FULL}. Follow our official announcement flyer for venue landmarks in Khedbrahma.`],
  ["When is the event?", "Nine nights, from 11 October to 19 October 2026 in Khedbrahma."],
  ["How do I book passes?", "Choose your Garba night, select ticket count, enter attendee details, and send the request via WhatsApp."],
  ["How does the WhatsApp booking work?", "You will be redirected to WhatsApp with a pre-filled booking message. You must press Send manually. The organiser will then confirm ticket availability and next steps."],
  ["What is the ticket price?", "Day 1 passes are ₹199 per ticket. Prices for Day 2 to Day 9 will be announced soon by the organiser."],
  ["Who do I contact for more information?", `Call or WhatsApp ${PHONE_DISPLAY} or DM @maa.ni.mandvi on Instagram.`],
];

/* ═══════════════════════════════════════════════
   BOOKING STATE
   ═══════════════════════════════════════════════ */
type BookingStep = "select" | "details" | "review";

interface BookingState {
  quantities: Record<number, number>;
  name: string;
  phone: string;
  termsAccepted: boolean;
}

const initialBooking: BookingState = {
  quantities: {},
  name: "",
  phone: "",
  termsAccepted: false,
};

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

/**
 * Official Brand Logo with authentic artwork and correct typography
 * Matching the uploaded logo: માંની માંડવી (નવરાત્રિ)
 */
function Logo({ size = "lg", showBadge = false }: { size?: "sm" | "lg" | "xl"; showBadge?: boolean }) {
  const s = {
    sm: "text-2xl",
    lg: "text-5xl md:text-7xl",
    xl: "text-6xl md:text-[8rem]",
  }[size];

  return (
    <div className="flex flex-col items-center">
      {showBadge && (
        <div className="relative mb-3 flex items-center justify-center">
          <img
            src={logoImg}
            alt="માંની માંડવી નવરાત્રિ Logo"
            className="h-20 w-20 md:h-28 md:w-28 rounded-full border-2 border-gold object-cover shadow-[0_0_35px_rgba(212,175,55,0.45)] transition hover:scale-105"
          />
        </div>
      )}
      <div className={`font-deva leading-[0.95] text-center ${s}`} lang="gu">
        <span className="text-gold block">માંની</span>
        <span className="text-gold block">માંડવી</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <span className="ornament-rule w-8" />
        <span className="text-gold-bright font-deva text-sm tracking-[0.3em] uppercase md:text-base" lang="gu">
          નવરાત્રિ
        </span>
        <span className="ornament-rule w-8" />
      </div>
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
   COUNTDOWN TIMER (EXACT SPEC MATCH)
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
              UNTIL THE FIRST RAAS
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
        className="gold-frame relative overflow-hidden rounded-xl transition-transform duration-200 ease-out shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
        style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      >
        <img
          src={flyerImg}
          alt="Maa Ni Mandvi 2026 Official Flyer - Khedbrahma"
          className="block w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="text-xs font-bold tracking-widest text-gold-bright uppercase">
            📍 KHEDBRAHMA · NAVRATRI 2026
          </p>
        </div>
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
    const t1 = setTimeout(() => setLeaving(true), 4500);
    const t2 = setTimeout(onDone, 5300);
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
        {/* Animated official logo badge */}
        <div className="mb-6 flex justify-center">
          <img
            src={logoImg}
            alt="માંની માંડવી"
            className="h-28 w-28 md:h-36 md:w-36 rounded-full border-2 border-gold object-cover shadow-[0_0_40px_rgba(212,175,55,0.6)] animate-rise"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="font-deva text-7xl leading-[0.95] md:text-9xl" lang="gu">
          <span className="text-gold animate-letter block" style={{ animationDelay: "1.8s" }}>
            માંની
          </span>
          <span className="text-gold animate-letter block" style={{ animationDelay: "2.4s" }}>
            માંડવી
          </span>
        </div>

        <svg viewBox="0 0 300 30" className="mx-auto mt-3 w-64">
          <path
            d="M10 20 Q150 -5 290 20"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeLinecap="round"
            style={{ strokeDashoffset: 400, animation: "draw 1s ease forwards 3.2s" }}
            pathLength={400}
          />
        </svg>

        <p
          className="animate-rise mt-4 font-deva text-sm tracking-[0.3em] text-gold-bright"
          style={{ animationDelay: "3.6s" }}
          lang="gu"
        >
          ગરબાની રાત, હવે નવા સરનામે...!
        </p>

        <p
          className="animate-rise mt-2 text-[11px] font-semibold tracking-[0.5em] text-cream"
          style={{ animationDelay: "3.9s" }}
        >
          📍 KHEDBRAHMA · 2026
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
            ? "border-b border-gold/30 bg-maroon/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* Logo with official graphic emblem */}
          <a
            href="#home"
            aria-label="Maa Ni Mandvi home"
            className="flex items-center gap-3 group"
          >
            <img
              src={logoImg}
              alt="માંની માંડવી નવરાત્રિ"
              className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-gold/60 object-cover shadow-md transition group-hover:scale-105"
            />
            <div className="leading-tight text-left">
              <span className="font-deva text-lg md:text-xl text-gold block" lang="gu">
                માંની માંડવી
              </span>
              <span className="text-[9px] tracking-[0.25em] text-gold-bright block -mt-0.5">
                નવરાત્રિ · KHEDBRAHMA
              </span>
            </div>
          </a>

          {/* Nav links */}
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

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="bg-gold hidden px-5 py-2.5 text-[11px] font-bold tracking-[0.25em] text-ink sm:inline-block transition hover:brightness-110 shadow-sm"
            >
              GET YOUR PASS
            </a>
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

        {[...NAV, ["FAQ", "#faq"] as const].map(([l, h], i) => (
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
          <GoldButton
            onClick={() => {
              setOpen(false);
              const el = document.getElementById("booking");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            GET YOUR PASS →
          </GoldButton>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   TICKET SELECTOR (STEP 1)
   ═══════════════════════════════════════════════ */
function TicketSelector({
  booking,
  setBooking,
  onContinue,
}: {
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
  onContinue: () => void;
}) {
  const getQty = (day: number) => booking.quantities[day] || 0;

  const setQty = (day: number, qty: number) => {
    setBooking((prev) => ({
      ...prev,
      quantities: { ...prev.quantities, [day]: Math.max(0, qty) },
    }));
  };

  const totalTickets = Object.values(booking.quantities).reduce((a, b) => a + b, 0);
  const hasUnpricedSelection = TICKET_DAYS.some((d) => d.price === null && getQty(d.day) > 0);
  const confirmedSubtotal = TICKET_DAYS.reduce((sum, d) => {
    if (d.price !== null) return sum + d.price * getQty(d.day);
    return sum;
  }, 0);
  const canContinue = totalTickets > 0 && !hasUnpricedSelection;

  return (
    <div>
      <div className="text-center mb-10">
        <Eyebrow>STEP 1 · SELECT PASSES</Eyebrow>
        <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
          Choose Your Garba Nights
        </h2>
        <p className="mt-3 text-cream/70 text-sm max-w-lg mx-auto">
          Nine nights of ancient rhythms and modern heart in Khedbrahma. Adjust ticket quantities for each night.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TICKET_DAYS.map((td) => {
          const qty = getQty(td.day);
          const isSelected = qty > 0;
          return (
            <div
              key={td.day}
              className={`relative rounded-xl border p-5 transition-all duration-300 ${
                isSelected
                  ? "border-gold bg-crimson/30 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                  : "border-gold/30 bg-maroon/40 hover:border-gold/60"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink shadow-md">
                  ✓
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif text-2xl font-semibold text-gold-bright">{td.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground tracking-wider">{td.date}</p>
                </div>
                <div className="text-right">
                  {td.price !== null ? (
                    <p className="font-serif text-xl font-bold text-cream">₹{td.price}</p>
                  ) : (
                    <p className="text-xs font-semibold text-gold/70 tracking-wider">PRICE TBC</p>
                  )}
                  <p className="text-[10px] text-muted-foreground">per ticket</p>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-cream/80">QUANTITY</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty(td.day, qty - 1)}
                    disabled={qty === 0}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold transition hover:bg-gold hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label={`Decrease ${td.label} quantity`}
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-serif text-xl font-bold text-cream tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => {
                      if (td.price === null) return;
                      setQty(td.day, qty + 1);
                    }}
                    disabled={td.price === null}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold transition hover:bg-gold hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label={`Increase ${td.label} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>

              {isSelected && td.price !== null && (
                <div className="mt-3 border-t border-gold/20 pt-3 text-right">
                  <span className="text-xs text-muted-foreground">Subtotal: </span>
                  <span className="font-serif text-lg font-bold text-gold-bright">
                    ₹{td.price * qty}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="mt-8 rounded-xl border border-gold/40 bg-ink/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground">
              TOTAL TICKETS
            </p>
            <p className="font-serif text-3xl font-bold text-cream">{totalTickets}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground">
              CONFIRMED SUBTOTAL
            </p>
            <p className="font-serif text-3xl font-bold text-gold-bright">₹{confirmedSubtotal}</p>
          </div>
        </div>

        {hasUnpricedSelection && (
          <p className="mt-4 text-sm text-[#ff6b6b] font-medium">
            ⚠ You have selected days with unconfirmed prices. Please remove those selections to proceed.
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <GoldButton onClick={onContinue} disabled={!canContinue}>
            CONTINUE →
          </GoldButton>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ATTENDEE FORM (STEP 2)
   ═══════════════════════════════════════════════ */
function AttendeeForm({
  booking,
  setBooking,
  onContinue,
  onBack,
}: {
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
  onContinue: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const trimmedName = booking.name.trim();
    if (!trimmedName) errs.name = "Full name is required.";
    if (!booking.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^[6-9]\d{9}$/.test(booking.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!booking.termsAccepted) errs.terms = "You must accept the terms and conditions.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setBooking((prev) => ({ ...prev, name: prev.name.trim().replace(/\s+/g, " ") }));
      onContinue();
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <Eyebrow>STEP 2 · ATTENDEE DETAILS</Eyebrow>
        <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Your Details</h2>
        <p className="mt-3 text-cream/70 text-sm">
          Enter attendee details to prefill the WhatsApp booking request.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="attendee-name" className="block text-xs font-semibold tracking-wider text-gold mb-2">
            FULL NAME *
          </label>
          <input
            id="attendee-name"
            type="text"
            value={booking.name}
            onChange={(e) => {
              setBooking((prev) => ({ ...prev, name: e.target.value }));
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gold/40 bg-ink/60 px-4 py-3 text-cream placeholder:text-cream/40 outline-none transition focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          />
          {errors.name && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="attendee-phone" className="block text-xs font-semibold tracking-wider text-gold mb-2">
            PHONE NUMBER *
          </label>
          <div className="flex">
            <span className="flex items-center rounded-l-lg border border-r-0 border-gold/40 bg-maroon/60 px-3 text-sm text-gold">
              +91
            </span>
            <input
              id="attendee-phone"
              type="tel"
              value={booking.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9\s]/g, "");
                setBooking((prev) => ({ ...prev, phone: val }));
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              placeholder="9876543210"
              maxLength={10}
              className="w-full rounded-r-lg border border-gold/40 bg-ink/60 px-4 py-3 text-cream placeholder:text-cream/40 outline-none transition focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.phone}</p>}
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={booking.termsAccepted}
              onChange={(e) => {
                setBooking((prev) => ({ ...prev, termsAccepted: e.target.checked }));
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
              }}
              className="mt-1 h-4 w-4 accent-[var(--gold)]"
            />
            <span className="text-sm text-cream/80">
              I accept the{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    "Terms & Conditions — Maa Ni Mandvi 2026:\n\n1. This website generates a booking request for WhatsApp.\n2. Pass availability is confirmed directly by the event organisers upon receiving your message.\n3. No payment is collected on this website.\n4. Tickets are subject to venue capacity and organizer confirmation.\n5. Event rules of Maa Ni Mandvi Khedbrahma apply."
                  );
                }}
                className="text-gold underline hover:text-gold-bright"
              >
                terms and conditions
              </button>
              .
            </span>
          </label>
          {errors.terms && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.terms}</p>}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <GoldButton onClick={onBack} ghost>
          ← BACK
        </GoldButton>
        <GoldButton onClick={handleSubmit}>REVIEW BOOKING →</GoldButton>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   BOOKING REVIEW (STEP 3)
   ═══════════════════════════════════════════════ */
function BookingReview({
  booking,
  onBack,
  onWhatsApp,
}: {
  booking: BookingState;
  onBack: () => void;
  onWhatsApp: () => void;
}) {
  const selectedDays = TICKET_DAYS.filter((d) => (booking.quantities[d.day] || 0) > 0);
  const totalTickets = selectedDays.reduce((sum, d) => sum + (booking.quantities[d.day] || 0), 0);
  const subtotal = selectedDays.reduce((sum, d) => sum + (d.price || 0) * (booking.quantities[d.day] || 0), 0);
  const additionalFees = 0;
  const total = subtotal + additionalFees;

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <Eyebrow>STEP 3 · REVIEW & CONFIRM</Eyebrow>
        <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Review Booking</h2>
        <p className="mt-3 text-cream/70 text-sm">
          Review your booking before sending the request to the organiser on WhatsApp.
        </p>
      </div>

      <div className="rounded-xl border border-gold/40 bg-ink/60 overflow-hidden">
        <div className="border-b border-gold/20 p-5">
          <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground mb-3">
            ATTENDEE DETAILS
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif text-xl font-semibold text-cream">{booking.name}</p>
              <p className="text-sm text-cream/70">+91 {booking.phone}</p>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-gold bg-gold/10 border border-gold/30 px-2.5 py-1 rounded-full">
              VALIDATED
            </span>
          </div>
        </div>

        <div className="border-b border-gold/20 p-5">
          <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground mb-3">
            YOUR BOOKING
          </p>
          <div className="space-y-3">
            {selectedDays.map((d) => {
              const qty = booking.quantities[d.day] || 0;
              const lineTotal = (d.price || 0) * qty;
              return (
                <div key={d.day} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-cream">{d.label}</span>
                    <span className="text-cream/60 ml-2">
                      {qty} ticket{qty > 1 ? "s" : ""} × ₹{d.price}
                    </span>
                  </div>
                  <span className="font-serif text-lg font-bold text-gold-bright">₹{lineTotal}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-cream/70">Total Tickets</span>
              <span className="font-semibold text-cream">{totalTickets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream/70">Ticket Subtotal</span>
              <span className="font-semibold text-cream">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream/70">Additional Fees</span>
              <span className="font-semibold text-cream">₹{additionalFees}</span>
            </div>
            <div className="h-px bg-gold/30 my-2" />
            <div className="flex justify-between">
              <span className="font-bold text-gold tracking-wider text-xs">TOTAL PAYABLE</span>
              <span className="font-serif text-2xl font-bold text-gold-bright">₹{total}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 p-5">
          <p className="text-xs text-cream/60">
            ✓ Terms and Conditions: <span className="text-gold font-semibold">Accepted</span>
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gold/30 bg-maroon/40 p-4">
        <p className="text-xs text-cream/80 leading-relaxed">
          <strong className="text-gold">Important:</strong> Clicking below will launch WhatsApp with your pre-filled message. You must manually press <strong>Send</strong> in WhatsApp. This sends your booking request; the organiser will confirm ticket availability.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <GoldButton onClick={onBack} ghost>
          ← EDIT BOOKING
        </GoldButton>
        <GoldButton onClick={onWhatsApp}>CONTINUE TO WHATSAPP →</GoldButton>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
function Index() {
  const [intro, setIntro] = useState(true);
  const [bookingStep, setBookingStep] = useState<BookingStep>("select");
  const [booking, setBooking] = useState<BookingState>(initialBooking);

  const bookingRef = useRef<HTMLElement>(null);

  const scrollToBooking = useCallback(() => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleStepChange = useCallback(
    (step: BookingStep) => {
      setBookingStep(step);
      setTimeout(scrollToBooking, 100);
    },
    [scrollToBooking],
  );

  const buildWhatsAppUrl = useCallback(() => {
    const selectedDays = TICKET_DAYS.filter((d) => (booking.quantities[d.day] || 0) > 0);
    const totalTickets = selectedDays.reduce((sum, d) => sum + (booking.quantities[d.day] || 0), 0);
    const subtotal = selectedDays.reduce((sum, d) => sum + (d.price || 0) * (booking.quantities[d.day] || 0), 0);
    const additionalFees = 0;
    const total = subtotal + additionalFees;

    const bookingLines = selectedDays
      .map((d) => {
        const qty = booking.quantities[d.day] || 0;
        const amt = (d.price || 0) * qty;
        return `${d.label} × ${qty} = ₹${amt}`;
      })
      .join("\n");

    const message = `Maa Ni Mandvi — Garba Pass Booking

Attendee Details
Name: ${booking.name}
Phone: +91 ${booking.phone}

Booking Details
${bookingLines}

Total Tickets: ${totalTickets}
Ticket Subtotal: ₹${subtotal}
Additional Fees: ₹${additionalFees}
Total Payable: ₹${total}

Terms and Conditions: Accepted

Please review my booking request and confirm availability and the next steps for completing the booking.

Thank you!
Maa Ni Mandvi | Khedbrahma`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [booking]);

  const handleWhatsApp = useCallback(() => {
    window.open(buildWhatsAppUrl(), "_blank");
  }, [buildWhatsAppUrl]);

  return (
    <main className="overflow-x-hidden">
      {intro && <Intro onDone={() => setIntro(false)} />}
      <Nav />

      {/* ═══ HERO SECTION ═══ */}
      <section id="home" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
        <img
          src={heroPoster}
          alt="Festive Garba celebration imagery"
          className="absolute left-1/2 top-0 w-[max(100%,900px)] max-w-none -translate-x-1/2 -translate-y-[6%] opacity-90 [mask-image:linear-gradient(to_bottom,black_34%,transparent_47%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,var(--ink)_85%)]" />
        <Embers />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.9fr]">
            {/* Left Column: Branding and Headline */}
            <div className={intro ? "opacity-0" : "animate-rise"}>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/70 px-4 py-1.5 backdrop-blur-md mb-6">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-gold-bright uppercase">
                  📍 KHEDBRAHMA · GUJARAT
                </span>
              </div>

              {/* Exact name with Logo Badge */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={logoImg}
                    alt="માંની માંડવી નવરાત્રિ Logo"
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-gold object-cover shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  />
                  <div>
                    <h1 className="font-deva text-4xl md:text-6xl text-gold leading-none" lang="gu">
                      માંની માંડવી
                    </h1>
                    <p className="font-deva text-lg md:text-xl text-gold-bright tracking-wider mt-1" lang="gu">
                      નવરાત્રિ ૨૦૨૬
                    </p>
                  </div>
                </div>

                <p className="font-deva text-2xl md:text-3xl text-gold-bright tracking-wide mt-2" lang="gu">
                  ગરબાની રાત, હવે નવા સરનામે...!
                </p>

                <p className="font-serif text-xl italic text-cream/90 md:text-2xl">
                  Ancient Rhythms, Modern Heart ✨️
                </p>
              </div>

              {/* Details strip */}
              <div className="mt-8 border-l border-gold/50 pl-6">
                <p className="font-serif text-2xl font-semibold text-gold-bright md:text-3xl">
                  {EVENT_DATES}
                </p>
                <p className="mt-2 text-sm font-bold tracking-[0.3em] text-cream">
                  {VENUE_NAME.toUpperCase()}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{VENUE_FULL}</p>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton href="#booking">GET YOUR PASS →</GoldButton>
                <GoldButton
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in Maa Ni Mandvi Garba passes for Khedbrahma.")}`}
                  ghost
                >
                  CONTACT ON WHATSAPP
                </GoldButton>
              </div>
            </div>

            {/* Right Column: Official Announcement Flyer Showcase */}
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

      {/* ═══ THE ANNOUNCEMENT / ABOUT ═══ */}
      <section id="about" className="bg-paper relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal className="relative">
            <div className="gold-frame overflow-hidden rounded-xl shadow-2xl">
              <img
                src={flyerImg}
                alt="Maa Ni Mandvi Khedbrahma Flyer"
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
              Where Khedbrahma
              <br />
              Comes Together.
            </h2>

            <div className="my-8 h-px w-24 bg-gold-burnished" />

            <p className="max-w-md text-lg leading-relaxed text-charcoal/85">
              Maa Ni Mandvi 2026 brings nine magical nights of authentic Garba to Khedbrahma. Experience ancient rhythms blended with modern heart under the sacred blessings of Maa Ambe.
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
                  <p className="text-[11px] text-charcoal/70">Khedbrahma 2026</p>
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

      {/* ═══ FLYER SHOWCASE SECTION ═══ */}
      <section id="flyer" className="bg-mandala relative py-24 border-y border-gold/30">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <Eyebrow>OFFICIAL ANNOUNCEMENT</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
              Official Event Flyer
            </h2>
            <p className="mt-3 text-cream/75 text-sm max-w-xl mx-auto">
              Spot the sacred Mandvi logo and official location poster for Maa Ni Mandvi Navratri 2026 in Khedbrahma.
            </p>
          </Reveal>

          <Reveal className="mt-12 flex justify-center">
            <div className="w-full max-w-md">
              <FlyerCard />
            </div>
          </Reveal>

          <div className="mt-8 flex justify-center gap-4">
            <GoldButton href="#booking">BOOK YOUR PASS NOW →</GoldButton>
            <GoldButton
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, please share more information about Maa Ni Mandvi passes in Khedbrahma.")}`}
              ghost
            >
              CHAT ON WHATSAPP
            </GoldButton>
          </div>
        </div>
      </section>

      {/* ═══ HOW TO BOOK ═══ */}
      <section id="passes" className="bg-velvet relative overflow-hidden py-28">
        <Embers count={14} />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="text-center">
            <Eyebrow>EASY BOOKING</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              How to <span className="text-gold">Book Your Pass</span>
            </h2>
            <p className="mt-4 text-cream/70 max-w-2xl mx-auto">
              A smooth WhatsApp-based booking flow. No online payment required — the organiser will confirm ticket availability and booking steps.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Select Garba Nights",
                desc: "Choose from 9 nights and set ticket quantities with simple plus and minus controls.",
              },
              {
                step: "02",
                title: "Enter Attendee Info",
                desc: "Provide your name, phone number, and accept the event terms and conditions.",
              },
              {
                step: "03",
                title: "Confirm on WhatsApp",
                desc: "Review your itemised summary and launch WhatsApp with the prefilled message.",
              },
            ].map((item) => (
              <Reveal key={item.step}>
                <div className="rounded-xl border border-gold/30 bg-maroon/40 p-6 text-center transition hover:border-gold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
                  <p className="font-serif text-5xl font-bold text-gold">{item.step}</p>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <GoldButton href="#booking">START BOOKING →</GoldButton>
          </div>
        </div>
      </section>

      {/* ═══ 9-DAY BOOKING SECTION ═══ */}
      <section id="booking" ref={bookingRef} className="bg-textile py-28 border-t border-gold/30">
        <div className="mx-auto max-w-5xl px-6">
          {/* Progress Indicator */}
          <div className="mb-12 flex items-center justify-center gap-2">
            {(["select", "details", "review"] as BookingStep[]).map((step, i) => {
              const labels = ["Select Passes", "Your Details", "Review"];
              const isActive = step === bookingStep;
              const stepIndex = (["select", "details", "review"] as BookingStep[]).indexOf(bookingStep);
              const isDone = i < stepIndex;
              return (
                <div key={step} className="flex items-center gap-2">
                  {i > 0 && (
                    <div className={`h-px w-8 md:w-16 ${isDone ? "bg-gold" : "bg-gold/30"}`} />
                  )}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                        isActive
                          ? "bg-gold text-ink"
                          : isDone
                            ? "bg-gold/30 text-gold border border-gold"
                            : "border border-gold/40 text-cream/50"
                      }`}
                    >
                      {isDone ? "✓" : i + 1}
                    </div>
                    <span
                      className={`hidden text-xs font-semibold tracking-wider md:inline ${
                        isActive ? "text-gold" : "text-cream/50"
                      }`}
                    >
                      {labels[i]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step views */}
          {bookingStep === "select" && (
            <TicketSelector
              booking={booking}
              setBooking={setBooking}
              onContinue={() => handleStepChange("details")}
            />
          )}
          {bookingStep === "details" && (
            <AttendeeForm
              booking={booking}
              setBooking={setBooking}
              onContinue={() => handleStepChange("review")}
              onBack={() => handleStepChange("select")}
            />
          )}
          {bookingStep === "review" && (
            <BookingReview
              booking={booking}
              onBack={() => handleStepChange("details")}
              onWhatsApp={handleWhatsApp}
            />
          )}
        </div>
      </section>

      {/* ═══ EXPERIENCE / ENERGY ═══ */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={garbaCircle}
          alt=""
          aria-hidden
          width={1600}
          height={1008}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.5em] text-gold">FEEL THE GARBA</p>
            <h2 className="mt-6 font-serif text-5xl font-semibold md:text-7xl">
              Not just a Garba night.
            </h2>
          </Reveal>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
            {["RAAS", "RHYTHM", "LIGHTS", "DEVOTION", "TRADITION", "COMMUNITY"].map((w, i) => (
              <Reveal key={w}>
                <span
                  className={`font-serif text-5xl font-semibold md:text-8xl ${
                    i % 2 ? "text-cream/30" : "text-gold"
                  }`}
                >
                  {w}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY SECTION ═══ */}
      <section className="bg-velvet py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <Eyebrow>MOMENTS & ARTWORK</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold">Moments of the Raas</h2>
          </Reveal>
          <div className="mt-14 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {[
              [flyerImg, "OFFICIAL KHEDBRAHMA FLYER"],
              [logoImg, "SACRED BRAND LOGO"],
              [dancer, "THE NIGHT WE DANCED"],
              [garbaCircle, "GARBA CIRCLE"],
              [heroPoster, "MAA NI MANDVI"],
              [diyas, "THE AARTI"],
            ].map(([src, cap]) => (
              <figure key={cap} className="group relative break-inside-avoid overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={cap}
                  loading="lazy"
                  className="w-full transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-0 flex items-end bg-ink/0 p-5 opacity-0 transition duration-500 group-hover:bg-ink/55 group-hover:opacity-100">
                  <span className="text-gold font-serif text-xl font-semibold">{cap}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <GoldButton href={INSTAGRAM_URL} ghost>
              FOLLOW @MAA.NI.MANDVI →
            </GoldButton>
          </div>
        </div>
      </section>

      {/* ═══ VENUE SECTION ═══ */}
      <section id="venue" className="bg-paper relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal>
            <div className="inline-block rounded-full bg-crimson/10 border border-crimson/30 px-3.5 py-1 text-xs font-bold tracking-widest text-crimson mb-3">
              📍 KHEDBRAHMA
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
            <p className="mt-2 text-lg text-charcoal/80">{VENUE_FULL}</p>
            <p className="mt-4 text-sm text-charcoal/60 italic">
              Exact address & landmark details will be shared on WhatsApp by the organizers.
            </p>
            <p className="mt-6 text-charcoal/80">
              Information Hotline:{" "}
              <a href={`tel:+91${PHONE}`} className="font-bold text-festival">
                {PHONE_DISPLAY}
              </a>
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, please provide venue location and directions for Maa Ni Mandvi in Khedbrahma.")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block bg-crimson px-7 py-4 text-xs font-bold tracking-[0.3em] text-cream transition hover:bg-festival"
            >
              ASK DIRECTIONS ON WHATSAPP →
            </a>
          </Reveal>

          <Reveal className="relative">
            <div className="gold-frame overflow-hidden rounded-xl shadow-2xl">
              <img
                src={flyerImg}
                alt="Khedbrahma Venue Map Illustration from Official Flyer"
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
            નવરાત્રિ ૨૦૨૬ · ખેડબ્રહ્મા
          </p>
          <p className="mt-2 font-serif text-lg italic text-cream/80">
            ગરબાની રાત, હવે નવા સરનામે...!
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.5em] text-gold uppercase">
            Ancient Rhythms, Modern Heart ✨️
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <GoldButton href="#booking">GET YOUR PASS →</GoldButton>
            <GoldButton
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in Maa Ni Mandvi Garba passes.")}`}
              ghost
            >
              WHATSAPP
            </GoldButton>
            <GoldButton href={INSTAGRAM_URL} ghost>
              @MAA.NI.MANDVI
            </GoldButton>
          </div>

          <p className="mt-12 text-xs text-muted-foreground">
            {VENUE_FULL} · {PHONE_DISPLAY}
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
