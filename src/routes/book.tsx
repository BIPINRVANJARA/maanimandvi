import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
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
          "Book your Garba passes for Maa Ni Mandvi Post Navratri 2026 (23, 24, 25 October 2026). Single day passes ₹500, 3-Day season pass ₹1200. Featuring Khushbu Asodiya, Kajal Maheriya, Neha Suthar.",
      },
      { property: "og:title", content: "Book Passes — Maa Ni Mandvi Post Navratri 2026" },
      {
        property: "og:description",
        content:
          "3 Days Only: 23, 24, 25 Oct 2026. Single Day ₹500 · 3-Day Pass ₹1200. Book on WhatsApp.",
      },
    ],
  }),
  component: BookPage,
});

const WHATSAPP_NUMBER = "917600280047";
const HELPLINE = "+91 99999 15015";
const VENUE_NAME = "Near Khedbrahma Court, Ambaji - Ahmedabad State Highway, Khedbrahma";
const MAPS_URL = "https://maps.app.goo.gl/MCpFCxfdE8JMz5GJ6";

interface DayTicket {
  id: "day1" | "day2" | "day3";
  dayNum: number;
  date: string;
  artist: string;
  image: string;
  price: number;
}

const DAILY_PASSES: DayTicket[] = [
  {
    id: "day1",
    dayNum: 1,
    date: "23 OCT 2026 (Friday)",
    artist: "Khushbu Asodiya",
    image: khushbuImg,
    price: 500,
  },
  {
    id: "day2",
    dayNum: 2,
    date: "24 OCT 2026 (Saturday)",
    artist: "Kajal Maheriya",
    image: kajalImg,
    price: 500,
  },
  {
    id: "day3",
    dayNum: 3,
    date: "25 OCT 2026 (Sunday)",
    artist: "Neha Suthar",
    image: nehaImg,
    price: 500,
  },
];

const COMBO_PRICE = 1200; // 3-Day Full Season Pass

type BookingStep = "select" | "details" | "review";

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
}

function BookPage() {
  const [step, setStep] = useState<BookingStep>("select");
  const [booking, setBooking] = useState<PassSelection>({
    seasonPassQty: 0,
    dailyQuantities: { day1: 0, day2: 0, day3: 0 },
    name: "",
    phone: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const setDailyQty = (id: string, qty: number) => {
    setBooking((prev) => ({
      ...prev,
      dailyQuantities: { ...prev.dailyQuantities, [id]: Math.max(0, qty) },
    }));
  };

  const setSeasonQty = (qty: number) => {
    setBooking((prev) => ({
      ...prev,
      seasonPassQty: Math.max(0, qty),
    }));
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
    if (!booking.name.trim()) errs.name = "Full name is required.";
    if (!booking.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^[6-9]\d{9}$/.test(booking.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!booking.termsAccepted) errs.terms = "Please accept the terms and conditions.";
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

  const handleWhatsApp = () => {
    window.open(buildWhatsAppMessage(), "_blank");
  };

  return (
    <div className="min-h-screen bg-ink text-cream selection:bg-gold selection:text-ink">
      {/* Top Header */}
      <header className="border-b border-gold/30 bg-maroon/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="Maa Ni Mandvi"
              className="h-10 w-10 rounded-full border border-gold/60 object-cover"
            />
            <div>
              <span className="font-deva text-lg text-gold block leading-tight" lang="gu">
                માંની માંડવી
              </span>
              <span className="text-[9px] tracking-widest text-gold-bright block">
                POST NAVRATRI 2026
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${HELPLINE.replace(/[^0-9+]/g, "")}`}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-gold hover:text-gold-bright"
            >
              📞 {HELPLINE}
            </a>
            <Link
              to="/"
              className="rounded-full border border-gold/50 px-4 py-1.5 text-xs font-bold tracking-wider text-cream/90 hover:border-gold hover:text-gold transition"
            >
              ← BACK TO HOME
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Banner */}
        <div className="mb-10 text-center">
          <div className="inline-block rounded-full bg-crimson/20 border border-crimson/40 px-4 py-1 text-xs font-bold tracking-widest text-gold-bright mb-3">
            POST NAVRATRI · 23 — 25 OCT 2026 · KHEDBRAHMA
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-cream">
            Book Your <span className="text-gold">Garba Passes</span>
          </h1>
          <p className="mt-2 text-cream/70 text-sm max-w-lg mx-auto">
            Experience 3 nights of unforgettable Garba with Gujarat's finest singers. Special 3-Day Pass at ₹1200 or Single Day Pass at ₹500.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-10 flex items-center justify-center gap-3">
          {[
            { id: "select", label: "Select Passes" },
            { id: "details", label: "Your Details" },
            { id: "review", label: "Review & Send" },
          ].map((s, idx) => {
            const stepsOrder = ["select", "details", "review"];
            const currentIdx = stepsOrder.indexOf(step);
            const isDone = idx < currentIdx;
            const isCurrent = s.id === step;
            return (
              <div key={s.id} className="flex items-center gap-3">
                {idx > 0 && (
                  <div className={`h-px w-8 md:w-16 ${isDone ? "bg-gold" : "bg-gold/30"}`} />
                )}
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                      isCurrent
                        ? "bg-gold text-ink"
                        : isDone
                          ? "bg-gold/30 text-gold border border-gold"
                          : "border border-gold/30 text-cream/50"
                    }`}
                  >
                    {isDone ? "✓" : idx + 1}
                  </div>
                  <span
                    className={`hidden sm:inline text-xs font-semibold tracking-wider ${
                      isCurrent ? "text-gold" : "text-cream/60"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ STEP 1: SELECT PASSES ═══ */}
        {step === "select" && (
          <div className="space-y-8">
            {/* COMBO PASS CARD (FEATURED) */}
            <div className="relative rounded-2xl border-2 border-gold bg-gradient-to-r from-maroon/90 via-crimson/80 to-maroon/90 p-6 md:p-8 shadow-[0_0_35px_rgba(212,175,55,0.25)] overflow-hidden">
              <div className="absolute top-4 right-4 bg-gold text-ink text-[10px] md:text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase shadow">
                ★ BEST VALUE · SAVE ₹300
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.3em] text-gold-bright uppercase block mb-1">
                    ALL 3 NIGHTS SEASON PASS
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream">
                    Full 3-Day Garba Pass
                  </h3>
                  <p className="mt-2 text-sm text-cream/80 leading-relaxed max-w-md">
                    Valid for all 3 nights (23, 24 & 25 Oct). Enjoy Khushbu Asodiya, Kajal Maheriya, and Neha Suthar!
                  </p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-serif text-3xl md:text-4xl font-extrabold text-gold-bright">
                      ₹{COMBO_PRICE}
                    </span>
                    <span className="text-sm text-cream/50 line-through">₹1,500</span>
                    <span className="text-xs font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded">
                      Save ₹300
                    </span>
                  </div>
                </div>

                {/* Season Qty selector */}
                <div className="flex flex-col items-center md:items-end gap-2 bg-ink/60 border border-gold/40 p-4 rounded-xl">
                  <span className="text-xs font-semibold tracking-wider text-cream/80">
                    SEASON PASSES
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSeasonQty(booking.seasonPassQty - 1)}
                      disabled={booking.seasonPassQty === 0}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold hover:bg-gold hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition font-bold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-serif text-2xl font-bold text-cream tabular-nums">
                      {booking.seasonPassQty}
                    </span>
                    <button
                      onClick={() => setSeasonQty(booking.seasonPassQty + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold hover:bg-gold hover:text-ink cursor-pointer transition font-bold"
                    >
                      +
                    </button>
                  </div>
                  {booking.seasonPassQty > 0 && (
                    <span className="text-xs font-semibold text-gold-bright">
                      Subtotal: ₹{booking.seasonPassQty * COMBO_PRICE}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* OR DIVIDER */}
            <div className="flex items-center gap-4 text-xs font-bold tracking-[0.4em] text-gold/80 justify-center">
              <span className="h-px w-24 bg-gold/30" />
              <span>OR CHOOSE SINGLE DAYS (₹500 / DAY)</span>
              <span className="h-px w-24 bg-gold/30" />
            </div>

            {/* DAILY PASS CARDS */}
            <div className="grid gap-6 md:grid-cols-3">
              {DAILY_PASSES.map((d) => {
                const qty = booking.dailyQuantities[d.id] || 0;
                const isSelected = qty > 0;
                return (
                  <div
                    key={d.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
                      isSelected
                        ? "border-gold bg-crimson/30 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                        : "border-gold/30 bg-maroon/40 hover:border-gold/60"
                    }`}
                  >
                    {/* Singer Poster Image */}
                    <div className="relative aspect-square overflow-hidden border-b border-gold/30">
                      <img
                        src={d.image}
                        alt={`${d.artist} poster`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-md border border-gold/40 text-gold-bright text-[10px] font-bold px-2.5 py-1 rounded-full">
                        DAY {d.dayNum}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-gold text-ink text-xs font-black px-2.5 py-1 rounded shadow">
                        ₹{d.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gold-bright tracking-wider">
                          {d.date}
                        </p>
                        <h4 className="font-serif text-xl font-bold text-cream mt-1">
                          {d.artist}
                        </h4>
                        <p className="text-xs text-cream/60 mt-1">Single Day Pass</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-5 pt-4 border-t border-gold/20 flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-wider text-cream/70">
                          QTY
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDailyQty(d.id, qty - 1)}
                            disabled={qty === 0}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-serif text-lg font-bold text-cream tabular-nums">
                            {qty}
                          </span>
                          <button
                            onClick={() => setDailyQty(d.id, qty + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-ink cursor-pointer transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Total & Continue Bar */}
            <div className="rounded-xl border border-gold/40 bg-maroon/60 p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  TOTAL SELECTED PASSES
                </p>
                <p className="font-serif text-3xl font-bold text-cream">{totalTickets}</p>
              </div>

              <div className="text-right">
                <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  TOTAL PAYABLE
                </p>
                <p className="font-serif text-3xl font-bold text-gold-bright">₹{totalAmount}</p>
              </div>

              <button
                onClick={() => setStep("details")}
                disabled={totalTickets === 0}
                className="w-full md:w-auto bg-gold px-8 py-4 text-xs font-bold tracking-[0.3em] text-ink shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer uppercase"
              >
                CONTINUE TO DETAILS →
              </button>
            </div>
          </div>
        )}

        {/* ═══ STEP 2: ATTENDEE DETAILS ═══ */}
        {step === "details" && (
          <div className="max-w-xl mx-auto rounded-2xl border border-gold/40 bg-maroon/50 p-6 md:p-8">
            <h3 className="font-serif text-2xl font-bold text-gold-bright mb-1">
              Attendee Information
            </h3>
            <p className="text-xs text-cream/70 mb-6">
              Details will be prefilled in your WhatsApp booking confirmation request.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-gold mb-2">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  value={booking.name}
                  onChange={(e) => {
                    setBooking((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gold/40 bg-ink/70 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold transition"
                />
                {errors.name && <p className="mt-1 text-xs text-[#ff6b6b]">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gold mb-2">
                  MOBILE NUMBER *
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
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="9876543210"
                    className="w-full rounded-r-lg border border-gold/40 bg-ink/70 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold transition"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-[#ff6b6b]">{errors.phone}</p>}
              </div>

              <div className="pt-2">
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
                  <span className="text-xs text-cream/80 leading-relaxed">
                    I accept the event terms & conditions. Passes are subject to organizer confirmation on WhatsApp. No payment is collected directly on this website.
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-[#ff6b6b]">{errors.terms}</p>}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={() => setStep("select")}
                className="border border-gold/50 px-6 py-3 text-xs font-bold tracking-wider text-cream/80 hover:text-gold hover:border-gold transition cursor-pointer"
              >
                ← BACK
              </button>
              <button
                onClick={() => {
                  if (validate()) setStep("review");
                }}
                className="bg-gold px-8 py-3 text-xs font-bold tracking-wider text-ink hover:brightness-110 transition cursor-pointer shadow"
              >
                REVIEW ORDER →
              </button>
            </div>
          </div>
        )}

        {/* ═══ STEP 3: REVIEW & WHATSAPP ═══ */}
        {step === "review" && (
          <div className="max-w-xl mx-auto rounded-2xl border border-gold/40 bg-maroon/60 p-6 md:p-8">
            <h3 className="font-serif text-2xl font-bold text-gold-bright mb-1">
              Review Your Booking
            </h3>
            <p className="text-xs text-cream/70 mb-6">
              Please verify your selections before sending via WhatsApp.
            </p>

            {/* Attendee Info Box */}
            <div className="border border-gold/30 bg-ink/70 rounded-xl p-4 mb-5">
              <p className="text-[10px] font-bold tracking-wider text-gold uppercase mb-1">
                ATTENDEE DETAILS
              </p>
              <p className="font-serif text-lg font-bold text-cream">{booking.name}</p>
              <p className="text-sm text-cream/70">+91 {booking.phone}</p>
            </div>

            {/* Line Items */}
            <div className="border border-gold/30 bg-ink/70 rounded-xl p-4 mb-5 space-y-3">
              <p className="text-[10px] font-bold tracking-wider text-gold uppercase mb-2">
                ORDER SUMMARY
              </p>

              {booking.seasonPassQty > 0 && (
                <div className="flex items-center justify-between text-sm py-1 border-b border-gold/20">
                  <div>
                    <span className="font-semibold text-cream">Full 3-Day Season Pass</span>
                    <span className="text-xs text-cream/60 ml-2">
                      {booking.seasonPassQty} × ₹{COMBO_PRICE}
                    </span>
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
                    className="flex items-center justify-between text-sm py-1 border-b border-gold/20 last:border-b-0"
                  >
                    <div>
                      <span className="font-semibold text-cream">{d.date.split(" ")[0]} OCT ({d.artist})</span>
                      <span className="text-xs text-cream/60 ml-2">
                        {q} × ₹{d.price}
                      </span>
                    </div>
                    <span className="font-serif font-bold text-gold-bright">
                      ₹{q * d.price}
                    </span>
                  </div>
                );
              })}

              <div className="pt-2 flex justify-between items-center text-sm font-bold">
                <span className="text-cream/80">TOTAL PASSES</span>
                <span className="text-cream">{totalTickets}</span>
              </div>

              <div className="flex justify-between items-center text-base font-bold pt-1">
                <span className="text-gold tracking-wider">TOTAL AMOUNT</span>
                <span className="font-serif text-2xl text-gold-bright">₹{totalAmount}</span>
              </div>
            </div>

            {/* Venue & Notice */}
            <div className="rounded-lg bg-ink/50 border border-gold/20 p-3 mb-6 text-xs text-cream/70 space-y-1">
              <p>
                📍 <strong>Venue:</strong> {VENUE_NAME}
              </p>
              <p>
                📲 <strong>Next step:</strong> Pressing the button will open WhatsApp with your booking details. Please tap <strong>Send</strong> in WhatsApp.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setStep("details")}
                className="border border-gold/50 px-6 py-3 text-xs font-bold tracking-wider text-cream/80 hover:text-gold transition cursor-pointer"
              >
                ← EDIT
              </button>

              <button
                onClick={handleWhatsApp}
                className="bg-gold px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-ink hover:brightness-110 transition cursor-pointer shadow-[0_10px_30px_rgba(212,175,55,0.3)] uppercase"
              >
                SEND BOOKING ON WHATSAPP 📲
              </button>
            </div>
          </div>
        )}

        {/* Assistance strip */}
        <div className="mt-12 text-center text-xs text-muted-foreground border-t border-gold/20 pt-6">
          <p>
            Need help booking? Call Helpline:{" "}
            <a href={`tel:${HELPLINE.replace(/[^0-9+]/g, "")}`} className="text-gold font-bold">
              {HELPLINE}
            </a>{" "}
            or WhatsApp{" "}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-gold font-bold">
              +91 76002 80047
            </a>
          </p>
          <p className="mt-2 text-cream/50">
            Venue: Near Khedbrahma Court, Ambaji - Ahmedabad State Highway ·{" "}
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="underline text-gold">
              View on Google Maps
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
