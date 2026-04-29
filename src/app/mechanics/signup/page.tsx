"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, Flame, Wrench, Rocket, Users } from "lucide-react";
import clsx from "clsx";
import { getSupabase } from "@/lib/supabase";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const specialties = [
  "General repair", "Diesel", "European", "Japanese",
  "Domestic trucks", "Classic cars", "Performance", "Transmissions", "Marine",
];

const earningModels = [
  {
    key: "commission",
    title: "Commission",
    sub: "Simple",
    desc: "We source and price. You get a flat referral fee of $200–$500 per closed deal.",
    earning: "$200–$500 per deal",
  },
  {
    key: "markup",
    title: "Markup",
    sub: "Recommended",
    desc: "We source. You set the final price. Keep the margin. Customer never sees AutoMotor.",
    earning: "Avg +$550 per deal",
    recommended: true,
  },
  {
    key: "hybrid",
    title: "Hybrid",
    sub: "Best of both",
    desc: "Both models combined. Reserved for Platinum partners after 3 months.",
    earning: "Max earnings",
  },
];

const TOTAL_STEPS = 6;

export default function MechanicSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendSecs, setResendSecs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [earningModel, setEarningModel] = useState("");
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [aseCertified, setAseCertified] = useState(false);
  const [yearsInBusiness, setYearsInBusiness] = useState("");
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
        setResendSecs((s) => { if (s <= 1) { clearInterval(timer); return 0; } return s - 1; });
      }, 1000);
    }, 1000);
  };

  const handleOtp = (i: number, val: string) => {
    const newOtp = [...otp];
    newOtp[i] = val.slice(-1);
    setOtp(newOtp);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
    if (newOtp.every(Boolean)) setTimeout(() => setStep(3), 400);
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
        const years = yearsInBusiness ? parseInt(yearsInBusiness, 10) : null;
        const { error } = await supabase.from("mechanic_signups").insert({
          phone,
          shop_name: shopName.trim() || null,
          owner_name: ownerName.trim() || null,
          address: address.trim() || null,
          specialties: selectedSpecialties,
          ase_certified: aseCertified,
          years_in_business: Number.isFinite(years) ? years : null,
          earning_model: earningModel || null,
        });
        if (error) setSubmitError(error.message);
      } catch (err) {
        console.warn("mechanic signup persistence skipped:", err instanceof Error ? err.message : err);
      }
    })();
  }, [step, phone, shopName, ownerName, address, selectedSpecialties, aseCertified, yearsInBusiness, earningModel]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
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
              Join 2,400+ partner mechanics.
            </h2>
            <p className="text-text-secondary mb-8">Enter your phone to get started.</p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(555) 123-4567"
              className="w-full bg-panel border border-line rounded-xl px-4 py-4 text-text-primary placeholder:text-text-secondary text-xl font-mono outline-none focus:border-orange-DEFAULT/60 transition-colors mb-6"
            />
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
                  onKeyDown={(e) => { if (e.key === "Backspace" && !v && i > 0) otpRefs.current[i - 1]?.focus(); }}
                  maxLength={1}
                  aria-label={`Digit ${i + 1} of 6`}
                  className="w-12 h-14 text-center text-2xl font-mono bg-panel border-2 border-line rounded-xl text-text-primary outline-none focus:border-orange-DEFAULT/60 transition-colors"
                />
              ))}
            </div>
            {resendSecs > 0 ? (
              <p className="text-sm text-text-secondary text-center">Resend in {resendSecs}s</p>
            ) : (
              <button onClick={sendCode} className="w-full text-sm text-orange-DEFAULT text-center hover:underline">
                Resend code
              </button>
            )}
          </div>
        )}

        {/* Step 3 — Shop info */}
        {step === 3 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              Tell us about your shop.
            </h2>
            <p className="text-text-secondary mb-8">This info is only shared with customers who book installs.</p>
            <div className="space-y-4 mb-4">
              {[
                { label: "Shop name", placeholder: "Mike's Auto Repair", value: shopName, set: setShopName },
                { label: "Your name", placeholder: "Mike Thompson", value: ownerName, set: setOwnerName },
                { label: "Shop address", placeholder: "456 Main St, Dallas, TX", value: address, set: setAddress },
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
            </div>
            <div className="mb-8">
              <label className="text-sm text-text-secondary mb-2 block">Specialties</label>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSpecialty(s)}
                    className={clsx(
                      "px-3.5 py-2 rounded-full border text-sm font-medium transition-all",
                      selectedSpecialties.includes(s)
                        ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT"
                        : "bg-panel border-line text-text-secondary hover:border-text-tertiary"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(4)} className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors">
              Continue →
            </button>
          </div>
        )}

        {/* Step 4 — Certifications */}
        {step === 4 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              Any certifications?
            </h2>
            <p className="text-text-secondary mb-8">Optional — but certified mechanics earn 23% more on average.</p>
            <div className="space-y-4 mb-8">
              <label className="flex items-center gap-3 bg-panel rounded-xl border border-line p-4 cursor-pointer hover:border-text-tertiary transition-colors">
                <input
                  type="checkbox"
                  checked={aseCertified}
                  onChange={(e) => setAseCertified(e.target.checked)}
                  className="accent-orange-DEFAULT w-4 h-4"
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">ASE Certified</p>
                  <p className="text-xs text-text-secondary">Automotive Service Excellence</p>
                </div>
              </label>
              <div>
                <label className="text-sm text-text-secondary mb-1.5 block">Upload credentials (optional)</label>
                <div className="bg-panel rounded-xl border border-dashed border-line p-6 text-center hover:border-text-tertiary transition-colors cursor-pointer">
                  <p className="text-sm text-text-secondary">Drop file here or click to browse</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-text-secondary mb-1.5 block">Years in business</label>
                <input
                  type="number"
                  value={yearsInBusiness}
                  onChange={(e) => setYearsInBusiness(e.target.value)}
                  placeholder="5"
                  className="w-full bg-panel border border-line rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors"
                />
              </div>
            </div>
            <button onClick={() => setStep(5)} className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors">
              Continue →
            </button>
          </div>
        )}

        {/* Step 5 — Earning model */}
        {step === 5 && (
          <div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">
              How do you want to earn?
            </h2>
            <p className="text-text-secondary mb-8">You can change this later.</p>
            <div className="space-y-3 mb-8">
              {earningModels.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setEarningModel(m.key)}
                  className={clsx(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    earningModel === m.key
                      ? "bg-orange-DEFAULT/10 border-orange-DEFAULT/60"
                      : m.recommended
                      ? "bg-panel border-orange-DEFAULT/30"
                      : "bg-panel border-line hover:border-text-tertiary"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold tracking-tight text-text-primary">{m.title}</span>
                        {m.recommended && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-DEFAULT/20 text-orange-DEFAULT font-semibold inline-flex items-center gap-1">
                            <Flame size={10} aria-hidden="true" /> Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mb-1">{m.sub}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-semibold text-orange-DEFAULT whitespace-nowrap">{m.earning}</p>
                      {earningModel === m.key && (
                        <CheckCircle size={16} className="text-orange-DEFAULT ml-auto mt-1" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(6)}
              disabled={!earningModel}
              className="w-full py-3 rounded-lg bg-orange-DEFAULT text-white font-medium disabled:opacity-40 hover:bg-orange-hover transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 6 — Success */}
        {step === 6 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-orange-DEFAULT/10 flex items-center justify-center mx-auto mb-4">
              <Wrench size={40} className="text-orange-DEFAULT" aria-hidden="true" />
            </div>
            <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-3">
              Welcome to the network.
            </h2>
            <p className="text-text-secondary text-lg mb-4">
              You&apos;re ready to start earning extra on every engine job.
            </p>
            {submitError && (
              <p className="text-xs text-red-400 mb-6">
                We couldn&apos;t save your signup right now: {submitError}. Our team will follow up by phone.
              </p>
            )}
            {!submitError && <div className="mb-4" />}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {[
                { icon: Rocket, title: "Submit your first part request", desc: "Get base quotes in 90 seconds" },
                { icon: Users, title: "Invite another mechanic", desc: "Earn $200 + 10% override for 12 months" },
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
              onClick={() => router.push("/mechanics/dashboard")}
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
