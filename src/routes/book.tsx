import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import logoImg from "@/assets/logo.jpg";
import khushbuImg from "@/assets/artists/khushbu-asodiya.jpg";
import kajalImg from "@/assets/artists/kajal-maheriya.jpg";
import nehaImg from "@/assets/artists/neha-suthar.jpg";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Passes — Maa Ni Mandvi Post Navratri 2026 | Khedbrahma" },
      {
        name: "description",
        content:
          "Fast & easy mobile booking for Maa Ni Mandvi Post Navratri Garba 2026 (23, 24, 25 October 2026). Single day passes ₹500, 3-Day season pass ₹1200. Featuring Khushbu Asodiya, Neha Suthar, Kajal Maheriya.",
      },
      { property: "og:title", content: "Book Passes — Maa Ni Mandvi Post Navratri 2026" },
      {
        property: "og:description",
        content:
          "3 Days Only: 23, 24, 25 Oct 2026. Single Day ₹500 · 3-Day Pass ₹1200. Instant WhatsApp Booking.",
      },
    ],
  }),
  component: BookPage,
});

const WHATSAPP_NUMBER = "917600280047";
const HELPLINE = "+91 99999 15015";
const VENUE_SHORT = "Near Khedbrahma Court, State Highway";
const VENUE_NAME = "Near Khedbrahma Court, Ambaji - Ahmedabad State Highway, Khedbrahma";
const MAPS_URL = "https://maps.app.goo.gl/MCpFCxfdE8JMz5GJ6";

interface DayTicket {
  id: "day1" | "day2" | "day3";
  dayNum: number;
  date: string;
  dayShort: string;
  artist: string;
  gujaratiArtist: string;
  image: string;
  price: number;
}

const DAILY_PASSES: DayTicket[] = [
  {
    id: "day1",
    dayNum: 1,
    date: "23 OCT 2026",
    dayShort: "Fri · શુક્રવાર",
    artist: "Khushbu Asodiya",
    gujaratiArtist: "ખુશ્બુ અસોડિયા",
    image: khushbuImg,
    price: 500,
  },
  {
    id: "day2",
    dayNum: 2,
    date: "24 OCT 2026",
    dayShort: "Sat · શનિવાર",
    artist: "Neha Suthar",
    gujaratiArtist: "નેહા સુથાર",
    image: nehaImg,
    price: 500,
  },
  {
    id: "day3",
    dayNum: 3,
    date: "25 OCT 2026",
    dayShort: "Sun · રવિવાર",
    artist: "Kajal Maheriya",
    gujaratiArtist: "કાજલ મહેરિયા",
    image: kajalImg,
    price: 500,
  },
];

const COMBO_PRICE = 1200; // 3-Day Full Season Pass

interface PassSelection {
  seasonPassQty: number; // 3-day pass
  dailyQuantities: Record<string, number>; // day1, day2, day3
  name: string;
  phone: string;
  termsAccepted: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  terms?: string;
  passes?: string;
}

function BookPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [booking, setBooking] = useState<PassSelection>({
    seasonPassQty: 0,
    dailyQuantities: { day1: 0, day2: 0, day3: 0 },
    name: "",
    phone: "",
    termsAccepted: true, // Pre-checked for quick mobile checkout
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showReviewModal, setShowReviewModal] = useState(false);

  const setDailyQty = (id: string, qty: number) => {
    setBooking((prev) => ({
      ...prev,
      dailyQuantities: { ...prev.dailyQuantities, [id]: Math.max(0, qty) },
    }));
    if (errors.passes) setErrors((prev) => ({ ...prev, passes: undefined }));
  };

  const setSeasonQty = (qty: number) => {
    setBooking((prev) => ({
      ...prev,
      seasonPassQty: Math.max(0, qty),
    }));
    if (errors.passes) setErrors((prev) => ({ ...prev, passes: undefined }));
  };

  const totalDailyTickets = Object.values(booking.dailyQuantities).reduce((a, b) => a + b, 0);
  const totalTickets = booking.seasonPassQty + totalDailyTickets;

  const dailySubtotal = DAILY_PASSES.reduce(
    (sum, d) => sum + d.price * (booking.dailyQuantities[d.id] || 0),
    0
  );
  const seasonSubtotal = booking.seasonPassQty * COMBO_PRICE;
  const totalAmount = dailySubtotal + seasonSubtotal;

  const validate = () => {
    const errs: FormErrors = {};
    if (totalTickets === 0) {
      errs.passes = "Please select at least 1 pass to continue.";
    }
    if (!booking.name.trim()) {
      errs.name = "Please enter your full name.";
    }
    if (!booking.phone.trim()) {
      errs.phone = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(booking.phone.replace(/\s/g, ""))) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!booking.termsAccepted) {
      errs.terms = "Please accept the event terms.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = useCallback(() => {
    const lines: string[] = [];

    if (booking.seasonPassQty > 0) {
      lines.push(
        `3-Day Season Pass (23-25 Oct) × ${booking.seasonPassQty} = ₹${booking.seasonPassQty * COMBO_PRICE}`
      );
    }

    DAILY_PASSES.forEach((d) => {
      const q = booking.dailyQuantities[d.id] || 0;
      if (q > 0) {
        lines.push(`${d.date} (${d.artist}) × ${q} = ₹${q * d.price}`);
      }
    });

    const msg = `Maa Ni Mandvi — Post Navratri Pass Booking (23-25 Oct 2026)

Attendee Details
Name: ${booking.name.trim()}
Phone: +91 ${booking.phone.trim()}

Booking Summary
${lines.join("\n")}

Total Passes: ${totalTickets}
Total Payable: ₹${totalAmount}

Venue: Near Khedbrahma Court, Ambaji - Ahmedabad State Highway
Terms & Conditions: Accepted

Please confirm my pass booking and share payment instructions.
Thank you!
Maa Ni Mandvi | Khedbrahma`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [booking, totalTickets, totalAmount]);

  const handleCheckoutClick = () => {
    if (totalTickets === 0) {
      setErrors({ passes: "Please choose at least 1 pass above." });
      return;
    }
    if (!booking.name.trim() || !booking.phone.trim() || errors.phone) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      nameInputRef.current?.focus();
      validate();
      return;
    }
    if (validate()) {
      setShowReviewModal(true);
    }
  };

  const confirmAndOpenWhatsApp = () => {
    window.open(buildWhatsAppMessage(), "_blank");
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen bg-ink text-cream selection:bg-gold selection:text-ink pb-24 md:pb-12">
      {/* ═══ COMPACT HEADER ═══ */}
      <header className="border-b border-gold/30 bg-maroon/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logoImg}
              alt="Maa Ni Mandvi"
              className="h-9 w-9 rounded-full border border-gold/60 object-cover"
            />
            <div>
              <span className="font-deva text-base text-gold block leading-none" lang="gu">
                માંની માંડવી
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest text-gold-bright block mt-0.5">
                PASS BOOKING · 2026
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${HELPLINE.replace(/[^0-9+]/g, "")}`}
              className="text-xs font-semibold text-gold hover:text-gold-bright flex items-center gap-1"
            >
              <span>📞</span>
              <span className="hidden sm:inline">{HELPLINE}</span>
            </a>
            <Link
              to="/"
              className="rounded-full border border-gold/50 px-3 py-1 text-[11px] font-bold tracking-wider text-cream/90 hover:border-gold hover:text-gold transition"
            >
              ← HOME
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ MAIN BOOKING CONTAINER ═══ */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 md:py-10">
        {/* Minimal Page Header */}
        <div className="mb-6 text-center">
          <div className="inline-block rounded-full bg-crimson/20 border border-crimson/40 px-3 py-0.5 text-[11px] font-bold tracking-widest text-gold-bright mb-2">
            POST NAVRATRI · 23 — 25 OCT · KHEDBRAHMA
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-cream">
            Choose Your <span className="text-gold">Passes</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-cream/70 max-w-md mx-auto">
            Select your preferred night or get the full 3-day pass with instant WhatsApp reservation.
          </p>
        </div>

        {errors.passes && (
          <div className="mb-4 rounded-xl border border-red-500/50 bg-red-950/60 p-3 text-center text-xs font-bold text-red-200">
            ⚠️ {errors.passes}
          </div>
        )}

        {/* ═══ 2-COLUMN LAYOUT ON DESKTOP / STACK ON MOBILE ═══ */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] items-start">
          {/* Left Column: Passes Selection + Form */}
          <div className="space-y-4 sm:space-y-6">
            {/* 1. SEASON COMBO PASS (FEATURED TOP) */}
            <div className="relative rounded-2xl border-2 border-gold bg-gradient-to-r from-maroon/90 via-crimson/75 to-maroon/90 p-4 sm:p-5 shadow-[0_0_25px_rgba(212,175,55,0.2)] overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="bg-gold text-ink text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase shadow">
                  ★ BEST VALUE · SAVE ₹300
                </span>
                <span className="text-[10px] font-bold text-gold-bright uppercase tracking-wider">
                  ALL 3 NIGHTS
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream">
                    Full 3-Day Season Pass
                  </h3>
                  <p className="text-xs text-cream/80 mt-0.5">
                    Entry to all 3 nights (Khushbu, Neha & Kajal)
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-bright">
                      ₹{COMBO_PRICE}
                    </span>
                    <span className="text-xs text-cream/50 line-through">₹1,500</span>
                    <span className="text-[11px] font-bold text-[#4ade80] bg-[#4ade80]/15 px-2 py-0.5 rounded">
                      Save ₹300
                    </span>
                  </div>
                </div>

                {/* Touch Stepper for Season Pass */}
                <div className="flex items-center justify-between sm:justify-end gap-3 bg-ink/70 border border-gold/40 px-3 py-2 rounded-xl">
                  <span className="text-xs font-semibold text-cream/80 sm:hidden">Season Qty:</span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSeasonQty(booking.seasonPassQty - 1)}
                      disabled={booking.seasonPassQty === 0}
                      aria-label="Decrease season pass count"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold text-gold hover:bg-gold hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition font-bold text-lg active:scale-95"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-serif text-2xl font-bold text-cream tabular-nums">
                      {booking.seasonPassQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSeasonQty(booking.seasonPassQty + 1)}
                      aria-label="Increase season pass count"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold text-gold hover:bg-gold hover:text-ink cursor-pointer transition font-bold text-lg active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] text-gold/80 justify-center">
              <span className="h-px flex-1 bg-gold/20" />
              <span>OR CHOOSE SINGLE NIGHTS (₹500 / DAY)</span>
              <span className="h-px flex-1 bg-gold/20" />
            </div>

            {/* 2. DAILY PASS CARDS (COMPACT MOBILE-FRIENDLY ROWS) */}
            <div className="space-y-3">
              {DAILY_PASSES.map((d) => {
                const qty = booking.dailyQuantities[d.id] || 0;
                const isSelected = qty > 0;
                return (
                  <div
                    key={d.id}
                    className={`rounded-xl border transition-all duration-200 p-3 sm:p-4 flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-gold bg-crimson/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        : "border-gold/30 bg-maroon/40 hover:border-gold/60"
                    }`}
                  >
                    {/* Left: Artist Thumbnail */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-lg overflow-hidden border border-gold/40">
                        <img
                          src={d.image}
                          alt={d.artist}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-ink/80 text-[9px] font-bold text-gold px-1.5 py-0.5 rounded-br">
                          DAY {d.dayNum}
                        </div>
                      </div>

                      {/* Middle: Details */}
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-gold-bright tracking-wider truncate">
                          {d.date} · {d.dayShort}
                        </p>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-cream truncate">
                          {d.artist}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-serif text-base sm:text-lg font-bold text-gold">
                            ₹{d.price}
                          </span>
                          <span className="text-[10px] text-cream/50">/ pass</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Touch Friendly Stepper */}
                    <div className="flex items-center gap-2 bg-ink/60 border border-gold/30 px-2 py-1 rounded-lg flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setDailyQty(d.id, qty - 1)}
                        disabled={qty === 0}
                        aria-label={`Decrease tickets for ${d.artist}`}
                        className="flex h-8 w-8 items-center justify-center rounded border border-gold/50 text-gold hover:bg-gold hover:text-ink disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition font-bold text-base active:scale-95"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-serif text-xl font-bold text-cream tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDailyQty(d.id, qty + 1)}
                        aria-label={`Increase tickets for ${d.artist}`}
                        className="flex h-8 w-8 items-center justify-center rounded border border-gold/50 text-gold hover:bg-gold hover:text-ink cursor-pointer transition font-bold text-base active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3. ATTENDEE FORM (INLINE ON THE SAME SCREEN) */}
            <div
              ref={formRef}
              className="rounded-2xl border border-gold/40 bg-maroon/50 p-4 sm:p-6 shadow-md"
            >
              <h3 className="font-serif text-xl font-bold text-gold-bright mb-1 flex items-center gap-2">
                <span>👤</span>
                <span>Attendee Information</span>
              </h3>
              <p className="text-xs text-cream/70 mb-4">
                Enter your details to prepare your WhatsApp booking request.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gold mb-1">
                    YOUR FULL NAME *
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={booking.name}
                    onChange={(e) => {
                      setBooking((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gold/40 bg-ink/80 px-4 py-3 text-cream placeholder:text-cream/35 outline-none focus:border-gold transition text-sm"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">⚠️ {errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gold mb-1">
                    WHATSAPP MOBILE NUMBER *
                  </label>
                  <div className="flex">
                    <span className="flex items-center rounded-l-lg border border-r-0 border-gold/40 bg-maroon/80 px-3 text-sm text-gold">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={booking.phone}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^0-9]/g, "");
                        setBooking((prev) => ({ ...prev, phone: v }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="9876543210"
                      className="w-full rounded-r-lg border border-gold/40 bg-ink/80 px-4 py-3 text-cream placeholder:text-cream/35 outline-none focus:border-gold transition text-sm"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-400">⚠️ {errors.phone}</p>}
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={booking.termsAccepted}
                    onChange={(e) => {
                      setBooking((prev) => ({ ...prev, termsAccepted: e.target.checked }));
                      if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                    }}
                    className="mt-0.5 h-4 w-4 accent-[var(--gold)]"
                  />
                  <span className="text-[11px] text-cream/75 leading-tight">
                    I agree to event terms. Passes will be confirmed directly on WhatsApp with the organizers. No online payment is taken on this website.
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-red-400">⚠️ {errors.terms}</p>}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary Box (Desktop) */}
          <div className="lg:sticky lg:top-20 space-y-4">
            <div className="rounded-2xl border border-gold/40 bg-maroon/70 p-5 sm:p-6 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-gold-bright mb-3 pb-2 border-b border-gold/30">
                Order Summary
              </h3>

              {totalTickets === 0 ? (
                <div className="py-6 text-center text-xs text-cream/50">
                  <p className="text-2xl mb-2">🎟️</p>
                  No passes selected yet.
                  <br />
                  Add season or single day passes above.
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  {booking.seasonPassQty > 0 && (
                    <div className="flex justify-between items-center py-1 border-b border-gold/15">
                      <div>
                        <p className="font-semibold text-cream">3-Day Season Pass</p>
                        <p className="text-[11px] text-cream/60">
                          {booking.seasonPassQty} × ₹{COMBO_PRICE}
                        </p>
                      </div>
                      <span className="font-serif font-bold text-gold-bright">
                        ₹{booking.seasonPassQty * COMBO_PRICE}
                      </span>
                    </div>
                  )}

                  {DAILY_PASSES.map((d) => {
                    const q = booking.dailyQuantities[d.id] || 0;
                    if (q === 0) return null;
                    return (
                      <div
                        key={d.id}
                        className="flex justify-between items-center py-1 border-b border-gold/15"
                      >
                        <div>
                          <p className="font-semibold text-cream">{d.date.split(" ")[0]} OCT ({d.artist})</p>
                          <p className="text-[11px] text-cream/60">
                            {q} × ₹{d.price}
                          </p>
                        </div>
                        <span className="font-serif font-bold text-gold-bright">
                          ₹{q * d.price}
                        </span>
                      </div>
                    );
                  })}

                  <div className="pt-2 flex justify-between items-center text-xs text-cream/80">
                    <span>Total Passes:</span>
                    <span className="font-bold text-cream">{totalTickets}</span>
                  </div>

                  <div className="pt-2 flex justify-between items-baseline border-t border-gold/30">
                    <span className="text-xs font-bold tracking-wider text-gold uppercase">
                      TOTAL AMOUNT
                    </span>
                    <span className="font-serif text-3xl font-extrabold text-gold-bright">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Button (Desktop) */}
              <div className="mt-5 hidden md:block">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  disabled={totalTickets === 0}
                  className="w-full bg-gold py-4 text-xs font-bold tracking-[0.25em] text-ink hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition uppercase shadow-[0_10px_30px_rgba(212,175,55,0.3)] cursor-pointer"
                >
                  CONTINUE TO WHATSAPP 📲
                </button>
              </div>

              {/* Venue & Notice */}
              <div className="mt-4 pt-4 border-t border-gold/20 text-[11px] text-cream/70 space-y-1">
                <p>📍 <strong>Venue:</strong> {VENUE_SHORT}</p>
                <p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold hover:underline"
                  >
                    Open in Google Maps ↗
                  </a>
                </p>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="rounded-xl border border-gold/20 bg-ink/60 p-4 text-xs text-cream/80 text-center">
              <p>Need assistance booking?</p>
              <p className="mt-1">
                Call: <a href={`tel:${HELPLINE.replace(/[^0-9+]/g, "")}`} className="font-bold text-gold">{HELPLINE}</a>
                {" · "}
                WhatsApp: <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="font-bold text-gold">+91 76002 80047</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ═══ STICKY MOBILE BOTTOM CHECKOUT BAR ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-maroon/95 border-t border-gold/40 backdrop-blur-md px-4 py-3 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              {totalTickets > 0 ? `${totalTickets} PASS${totalTickets > 1 ? "ES" : ""}` : "SELECT PASSES"}
            </p>
            <p className="font-serif text-2xl font-black text-gold-bright leading-none">
              ₹{totalAmount}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCheckoutClick}
            disabled={totalTickets === 0}
            className="flex-1 bg-gold py-3.5 px-4 text-xs font-bold tracking-[0.2em] text-ink hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition uppercase text-center shadow-[0_5px_20px_rgba(212,175,55,0.4)] cursor-pointer active:scale-95"
          >
            BUY ON WHATSAPP 📲
          </button>
        </div>
      </div>

      {/* ═══ REVIEW & CONFIRM MODAL (1-TAP CONFIRMATION) ═══ */}
      {showReviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border-2 border-gold/70 bg-maroon p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-2xl text-cream/70 hover:text-gold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-serif text-2xl font-bold text-gold-bright mb-1">
              Confirm Booking
            </h3>
            <p className="text-xs text-cream/70 mb-4">
              Your details will be sent to the official organizers on WhatsApp.
            </p>

            <div className="rounded-xl border border-gold/30 bg-ink/80 p-3.5 space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-gold font-semibold">Attendee:</span>
                <span className="font-bold text-cream">{booking.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold font-semibold">Mobile:</span>
                <span className="font-bold text-cream">+91 {booking.phone}</span>
              </div>
              <div className="h-px bg-gold/20 my-1" />
              {booking.seasonPassQty > 0 && (
                <div className="flex justify-between">
                  <span>3-Day Season Pass:</span>
                  <span className="font-bold text-gold-bright">
                    {booking.seasonPassQty} × ₹{COMBO_PRICE}
                  </span>
                </div>
              )}
              {DAILY_PASSES.map((d) => {
                const q = booking.dailyQuantities[d.id] || 0;
                if (!q) return null;
                return (
                  <div key={d.id} className="flex justify-between">
                    <span>{d.date.split(" ")[0]} Oct ({d.artist}):</span>
                    <span className="font-bold text-gold-bright">
                      {q} × ₹{d.price}
                    </span>
                  </div>
                );
              })}
              <div className="h-px bg-gold/20 my-1" />
              <div className="flex justify-between text-sm font-bold pt-1">
                <span className="text-gold">Total Amount:</span>
                <span className="font-serif text-xl text-gold-bright">₹{totalAmount}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={confirmAndOpenWhatsApp}
                className="w-full bg-gold py-3.5 text-xs font-bold tracking-widest text-ink hover:brightness-110 uppercase shadow transition cursor-pointer"
              >
                OPEN WHATSAPP & SEND 💬
              </button>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="w-full border border-gold/40 py-2.5 text-xs font-semibold text-cream/80 hover:text-gold transition cursor-pointer"
              >
                Modify Selections
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
