"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, CheckCircle, ChevronDown, FileText, Plug, SkipForward, CreditCard, PartyPopper, Smartphone, Settings, PlayCircle } from "lucide-react";
import clsx from "clsx";
import { getSupabase } from "@/lib/supabase";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const specialties = [
  "Engines", "Transmissions", "Transfer cases", "Differentials",
  "Marine engines", "Diesel engines", "Classic/Vintage", "Performance",
  "Commercial truck parts",
];

const TOTAL_STEPS = 7;

export default function JunkYardSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendSecs, setResendSecs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [radius, setRadius] = useState(250);
  const [inventoryChoice, setInventoryChoice] = useState<string>("");
  const [yardName, setYardName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [ein, setEin] = useState("");
  const [stripeConnected, setStripeConnected] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittedRef = useRef(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const sendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setResendSecs(30);
      const timer = setInterval(() => {
        setResendSecs((s) => {
          if (s <= 1) { clearInterval(timer); return 0; }
          return s - 1;
        });
      }, 1000);
    }, 1000);
  };

  const handleOtp = (i: number, val: string) => {
    const newOtp = [...otp];
    newOtp[i] = val.slice(-1);
    setOtp(newOtp);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
    if (newOtp.every(Boolean)) {
      setTimeout(() => setStep(3), 400);
    }
  };

  const toggleSpecialty = (s: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  useEffect(() => {
    if (step !== TOTAL_STEPS || submittedRef.current) return;
    submittedRef.current = true;

    (async () => {
      try {
        const supabase = getSupabase();
        const { error } = await supabase.from("yard_signups").insert({
          phone,
          yard_name: yardName.trim() || null,
          owner_name: ownerName.trim() || null,
          address: address.trim() || null,
          ein: ein.trim() || null,
          service_radius: radius,
          specialties: selectedSpecialties,
          inventory_choice: inventoryChoice || null,
          stripe_connected: stripeConnected,
        });
        if (error) setSubmitError(error.message);
      } catch (err) {
        // Supabase not configured locally — log only, don't block the demo.
        console.warn("yard signup persistence skipped:", err instanceof Error ? err.message : err);
      }
    })();
  }, [step, phone, yardName, ownerName, address, ein, radius, selectedSpecialties, inventoryChoice, stripeConnected]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Progress */}
        {step < TOTAL_STEPS && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
              <span>Step {step} of {TOTAL_STEPS - 1}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-elevated rounded-full">
              <div
                className="h-full bg-orange-DEFAULT rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1 — Phone */}
        {step === 1 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              Let&apos;s get you set up.
            </h2>
            <p className="text-text-secondary mb-8">No password needed.</p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(555) 123-4567"
              className="w-full bg-panel border border-line rounded-xl px-4 py-4 text-text-primary placeholder:text-text-secondary text-xl font-mono outline-none focus:border-orange-DEFAULT/60 transition-colors mb-3"
            />
            <p className="text-sm text-text-secondary mb-6">
              We&apos;ll text you a 6-digit code.
            </p>
            <button
              onClick={sendCode}
              disabled={phone.replace(/\D/g, "").length !== 10 || loading}
              className="w-full py-3 rounded-lg bg-orange-DEFAULT text-white font-medium disabled:opacity-40 hover:bg-orange-hover transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
              Send code
            </button>
          </div>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              Enter your code.
            </h2>
            <p className="text-text-secondary mb-8">Sent to {phone}.</p>
            <div className="flex gap-2 mb-6 justify-center">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  value={v}
                  onChange={(e) => handleOtp(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !v && i > 0) {
                      otpRefs.current[i - 1]?.focus();
                    }
                  }}
                  maxLength={1}
                  aria-label={`Digit ${i + 1} of 6`}
                  className="w-12 h-14 text-center text-2xl font-mono bg-panel border-2 border-line rounded-xl text-text-primary outline-none focus:border-orange-DEFAULT/60 transition-colors"
                />
              ))}
            </div>
            {resendSecs > 0 ? (
              <p className="text-sm text-text-secondary text-center">
                Resend in {resendSecs}s
              </p>
            ) : (
              <button
                onClick={sendCode}
                className="w-full text-sm text-orange-DEFAULT text-center hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
        )}

        {/* Step 3 — Business info */}
        {step === 3 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              Tell us about your yard.
            </h2>
            <p className="text-text-secondary mb-8">Basic info to get you listed.</p>
            <div className="space-y-4 mb-8">
              {[
                { label: "Yard name", placeholder: "Tommy's Auto Salvage", value: yardName, set: setYardName },
                { label: "Owner name", placeholder: "Tommy Rodriguez", value: ownerName, set: setOwnerName },
                { label: "Business address", placeholder: "123 Industrial Blvd, Dallas, TX", value: address, set: setAddress },
                { label: "EIN (optional)", placeholder: "12-3456789", value: ein, set: setEin },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-sm text-text-secondary mb-1.5 block">{f.label}</label>
                  <input
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full bg-panel border border-line rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors"
                  />
                </div>
              ))}
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm text-text-secondary">Service radius</label>
                  <span className="text-sm font-semibold text-text-primary">{radius} mi</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  aria-label="Service radius in miles"
                  className="w-full accent-orange-DEFAULT"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>10 mi</span><span>500 mi</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(4)}
              className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 4 — Specialties */}
        {step === 4 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              What do you specialize in?
            </h2>
            <p className="text-text-secondary mb-8">Select all that apply.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSpecialty(s)}
                  className={clsx(
                    "px-4 py-2.5 rounded-full border text-sm font-medium transition-all",
                    selectedSpecialties.includes(s)
                      ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT"
                      : "bg-panel border-line text-text-secondary hover:border-text-tertiary"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(5)}
              className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 5 — Inventory upload */}
        {step === 5 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              Upload your inventory.
            </h2>
            <p className="text-text-secondary mb-8">Or skip for now — you can add it later.</p>
            <div className="space-y-3 mb-8">
              {[
                {
                  key: "csv",
                  title: "Upload CSV",
                  desc: "Hollander, Checkmate, Pinnacle, Powerlink exports",
                  icon: FileText,
                },
                {
                  key: "api",
                  title: "Connect existing system",
                  desc: "API sync with your inventory management software",
                  icon: Plug,
                },
                {
                  key: "skip",
                  title: "Skip for now",
                  desc: "I'll add inventory later from the dashboard",
                  icon: SkipForward,
                },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setInventoryChoice(opt.key)}
                  className={clsx(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    inventoryChoice === opt.key
                      ? "bg-orange-DEFAULT/10 border-orange-DEFAULT/60"
                      : "bg-panel border-line hover:border-text-tertiary"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-DEFAULT/10 flex items-center justify-center flex-shrink-0">
                      <opt.icon size={18} className="text-orange-DEFAULT" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">{opt.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{opt.desc}</p>
                    </div>
                    {inventoryChoice === opt.key && (
                      <CheckCircle size={16} className="text-orange-DEFAULT ml-auto" aria-hidden="true" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(6)}
              disabled={!inventoryChoice}
              className="w-full py-3 rounded-lg bg-orange-DEFAULT text-white font-medium disabled:opacity-40 hover:bg-orange-hover transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 6 — Stripe Connect */}
        {step === 6 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              Set up payouts.
            </h2>
            <p className="text-text-secondary mb-8">
              Connect Stripe to receive weekly payouts. Takes 2 minutes.
            </p>
            <div className="bg-panel rounded-xl border border-line p-8 text-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#635BFF]/10 flex items-center justify-center mx-auto mb-3">
                <CreditCard size={28} className="text-[#635BFF]" aria-hidden="true" />
              </div>
              <p className="text-text-primary font-medium mb-2">Stripe Connect</p>
              <p className="text-sm text-text-secondary mb-4">
                Fast payouts every Friday. Funds held in escrow for buyer protection.
              </p>
              <button
                onClick={() => { setStripeConnected(true); setStep(7); }}
                className="px-4 py-2.5 rounded-lg bg-[#635BFF] text-white font-medium hover:bg-[#7A73FF] transition-colors"
              >
                Connect Stripe →
              </button>
            </div>
            <button
              onClick={() => setStep(7)}
              className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors text-center"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Step 7 — Success */}
        {step === 7 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-orange-DEFAULT/10 flex items-center justify-center mx-auto mb-4">
              <PartyPopper size={40} className="text-orange-DEFAULT" aria-hidden="true" />
            </div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-3">
              You&apos;re in.
            </h2>
            <p className="text-text-secondary text-lg mb-4">
              First leads arrive within 48 hours.
            </p>
            {submitError && (
              <p className="text-xs text-red-400 mb-6">
                We couldn&apos;t save your signup right now: {submitError}. Our team will follow up by phone.
              </p>
            )}
            {!submitError && <div className="mb-4" />}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {[
                { icon: Smartphone, title: "Install mobile app", desc: "Get notified instantly when leads come in" },
                { icon: Settings, title: "Review lead settings", desc: "Customize your lead filters and score threshold" },
                { icon: PlayCircle, title: "Watch 2-min welcome video", desc: "Learn how to maximize your close rate" },
              ].map((item) => (
                <div key={item.title} className="bg-panel rounded-xl border border-line p-4 flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-orange-DEFAULT/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-orange-DEFAULT" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">{item.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push("/yards/dashboard")}
              className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors"
            >
              Go to dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
