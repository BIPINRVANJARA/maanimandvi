import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import passesImg from "@/assets/passes.png.asset.json";
import singers1 from "@/assets/singers-1.png.asset.json";
import singers2 from "@/assets/singers-2.png.asset.json";
import singers3 from "@/assets/singers-3.png.asset.json";
import venueImg from "@/assets/venue.png.asset.json";
import garbaCircle from "@/assets/garba-circle.jpg";
import dancer from "@/assets/dancer.jpg";
import diyas from "@/assets/diyas.jpg";

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

// Artist details are configurable — names to be confirmed by organisers.
const LINEUP = [
  { img: singers2.url, title: "Featured Voices", role: "Lead Singers", note: "Line-up details to be announced." },
  { img: singers1.url, title: "The Raas Ensemble", role: "Garba Vocalists", note: "Line-up details to be announced." },
  { img: singers3.url, title: "The Mandvo Voices", role: "Garba Vocalists", note: "Line-up details to be announced." },
];

const NIGHTS = Array.from({ length: 9 }, (_, i) => ({
  date: `${11 + i} OCT`,
  day: `DAY 0${i + 1}`,
  theme: "Theme to be announced",
}));

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
        <img src={passesImg.url} alt="Official Maa No Mandvo pass poster with booking QR code" className="block w-full" loading="lazy" />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
function Index() {
  const [intro, setIntro] = useState(true);
  const [artist, setArtist] = useState<(typeof LINEUP)[number] | null>(null);

  return (
    <main className="overflow-x-hidden">
      {intro && <Intro onDone={() => setIntro(false)} />}
      <Nav />

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
        <img
          src={heroPoster.url}
          alt="Maa Durga above the Maa No Mandvo mandala"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-80 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
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

      {/* SINGERS */}
      <section id="singers" className="bg-mandala relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <Eyebrow>LIVE AT MAA NO MANDVO</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold md:text-6xl">The Voices of the Mandvo</h2>
            <p className="mt-4 text-cream/70">The artists bringing the rhythm to your raas.</p>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {LINEUP.map((a, i) => (
              <Reveal key={a.img} className={i === 0 ? "md:col-span-3 md:mx-auto md:w-2/3" : i === 2 ? "md:mt-16" : ""}>
                <button onClick={() => setArtist(a)} className="group relative block w-full overflow-hidden text-left">
                  <img src={a.img} alt={a.title} loading="lazy" className="block w-full transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 border border-transparent bg-ink/0 transition duration-500 group-hover:border-gold group-hover:bg-ink/50" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-serif text-3xl font-semibold text-gold-bright">{a.title}</p>
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.4em] text-cream">LIVE AT MAA NO MANDVO</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {artist && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-6 backdrop-blur" onClick={() => setArtist(null)}>
          <div className="gold-frame grid max-w-3xl bg-maroon md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
            <img src={artist.img} alt={artist.title} className="h-full w-full object-cover" />
            <div className="p-8">
              <p className="text-[10px] font-semibold tracking-[0.4em] text-gold">{artist.role.toUpperCase()}</p>
              <h3 className="mt-3 font-serif text-4xl font-semibold">{artist.title}</h3>
              <p className="mt-4 text-cream/70">{artist.note}</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-6 inline-block text-xs font-bold tracking-[0.3em] text-gold-bright">
                FOLLOW FOR REVEALS →
              </a>
              <button onClick={() => setArtist(null)} className="mt-8 block text-xs tracking-[0.3em] text-muted-foreground hover:text-cream">
                CLOSE ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NINE NIGHTS */}
      <section className="bg-textile py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <Eyebrow>NAVRATRI 2026</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold">Nine Nights</h2>
          </Reveal>
          <div className="mt-14 flex snap-x gap-4 overflow-x-auto pb-6">
            {NIGHTS.map((n, i) => (
              <div key={n.day} className="group min-w-[200px] snap-start border border-gold/30 bg-maroon/60 p-6 transition hover:border-gold hover:bg-crimson">
                <p className="text-gold font-serif text-6xl font-semibold">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-4 text-sm font-bold tracking-[0.3em] text-cream">{n.date}</p>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">{n.day}</p>
                <p className="mt-6 font-serif italic text-cream/60">{n.theme}</p>
              </div>
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
              [heroPoster.url, "MAA NO MANDVO"],
              [diyas, "THE AARTI"],
              [venueImg.url, "THE NEW ADDRESS"],
              [singers2.url, "THE VOICES"],
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
        </div>
      </footer>
    </main>
  );
}
