"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wrench, MoreHorizontal, Phone, CheckCircle } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import DiagnosisCard from "@/components/chat/DiagnosisCard";
import PhoneCaptureCard from "@/components/chat/PhoneCaptureCard";
import QuoteCard from "@/components/chat/QuoteCard";
import ComparisonTable from "@/components/chat/ComparisonTable";
import MechanicReferralCard from "@/components/chat/MechanicReferralCard";
import SuggestionChips from "@/components/chat/SuggestionChips";
import SavingsReceiptModal from "@/components/SavingsReceiptModal";

type MessageType =
  | { role: "user"; text: string }
  | { role: "ai"; text: string; components?: string[] };

const MOCK_FLOW: Record<number, { text: string; components?: string[] }> = {
  1: {
    text: "Got it — a 2014 Silverado 1500 with a 5.3L V8. Is the engine completely dead (no start, no crank), or is it running but knocking / misfiring badly?",
  },
  2: {
    text: "A tick at idle that gets louder under load on a high-mileage 5.3 is a very specific signature. Based on what you're describing, I've got a diagnosis.",
    components: ["diagnosis"],
  },
  3: {
    text: "Want me to call 15 yards right now and get you live quotes? I can have prices texted to you in under 90 seconds.",
    components: ["chips_pre_phone"],
  },
  4: {
    text: "Perfect. Just need a number to send quotes to.",
    components: ["phone"],
  },
  5: {
    text: "Dispatching calls now — contacting 15 yards in parallel. I'll stream quotes as they come in.",
  },
};

const mockQuotes = [
  {
    isBestMatch: true,
    yardName: "Tommy's Auto Salvage",
    rating: 4.8,
    reviewCount: 312,
    city: "Dallas, TX",
    distance: "23 mi",
    partDesc: "5.3L Vortec · 87,432 mi",
    price: 1800,
    marketAvg: 2100,
    warranty: "90-day",
    shipsDay: "Monday",
    quoteId: "q1",
  },
  {
    isBestMatch: false,
    yardName: "Pick-n-Pull Dallas",
    rating: 4.5,
    reviewCount: 847,
    city: "Dallas, TX",
    distance: "18 mi",
    partDesc: "5.3L Vortec · 102,100 mi",
    price: 2100,
    marketAvg: 2100,
    warranty: "60-day",
    shipsDay: "Wednesday",
    quoteId: "q2",
  },
  {
    isBestMatch: false,
    yardName: "LKQ Garland",
    rating: 4.7,
    reviewCount: 1204,
    city: "Garland, TX",
    distance: "31 mi",
    partDesc: "5.3L Vortec AFM · 94,800 mi",
    price: 1950,
    marketAvg: 2100,
    warranty: "90-day",
    shipsDay: "Tuesday",
    quoteId: "q3",
  },
];

function LiveStatusPanel({
  callsComplete,
  quoteCount,
  elapsed,
}: {
  callsComplete: number;
  quoteCount: number;
  elapsed: number;
}) {
  const done = callsComplete >= 15;
  const min = Math.floor(elapsed / 60)
    .toString()
    .padStart(2, "0");
  const sec = (elapsed % 60).toString().padStart(2, "0");

  return (
    <aside aria-label="Live call status" className="w-80 flex-shrink-0 hidden lg:block">
      <div className="bg-panel border border-line rounded-xl p-4 sticky top-6">
        <div className="flex items-center gap-2 mb-3">
          {done ? (
            <CheckCircle size={16} className="text-green-400" aria-hidden="true" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-orange-DEFAULT animate-pulse" aria-hidden="true" />
          )}
          <h4
            aria-live="polite"
            aria-atomic="true"
            className="font-semibold tracking-tight text-sm text-text-primary"
          >
            {done
              ? `Done — ${quoteCount} quotes in ${sec}s`
              : "Calling yards..."}
          </h4>
        </div>

        {!done && (
          <>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>{callsComplete} of 15 complete</span>
                <span>{min}:{sec} elapsed</span>
              </div>
              <div
                role="progressbar"
                aria-label="Calls completed"
                aria-valuenow={callsComplete}
                aria-valuemin={0}
                aria-valuemax={15}
                aria-valuetext={`${callsComplete} of 15 calls complete`}
                className="h-1.5 bg-elevated rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-orange-DEFAULT rounded-full transition-all duration-500"
                  style={{ width: `${(callsComplete / 15) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-text-secondary mb-1.5">Currently calling:</p>
            <ul className="space-y-1.5 mb-3 list-none">
              {["Pick-n-Pull Dallas", "Tommy's Auto Salvage", "LKQ Garland"].map(
                (yard) => (
                  <li key={yard} className="flex items-center gap-2 text-xs text-text-secondary">
                    <Phone size={11} className="text-orange-DEFAULT" aria-hidden="true" />
                    {yard}
                  </li>
                )
              )}
            </ul>
          </>
        )}

        {quoteCount > 0 && (
          <>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-xs text-text-secondary mb-1.5"
            >
              Quotes received: {quoteCount}
            </p>
            <ul className="list-none">
              {mockQuotes.slice(0, quoteCount).map((q, i) => (
                <li
                  key={i}
                  className="bg-bg rounded-xl border border-line p-2.5 mb-1.5 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary font-medium truncate">
                      {q.yardName}
                    </span>
                    <span className="text-orange-DEFAULT font-semibold ml-2">
                      ${q.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-text-secondary">{q.partDesc}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [turn, setTurn] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [callsComplete, setCallsComplete] = useState(0);
  const [quoteCount, setQuoteCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [callingActive, setCallingActive] = useState(false);
  const [title, setTitle] = useState("New chat");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDismissed, setReceiptDismissed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      addUserMessage(initialQuery);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (callingActive) {
      timer = setInterval(() => {
        setElapsed((e) => e + 1);
        setCallsComplete((c) => {
          const next = c + 1;
          if (next === 5) streamQuote(0);
          if (next === 9) streamQuote(1);
          if (next === 13) streamQuote(2);
          if (next >= 15) {
            clearInterval(timer);
            setCallingActive(false);
            setTimeout(() => finalMessage(), 1000);
          }
          return Math.min(next, 15);
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [callingActive]);

  const streamQuote = (idx: number) => {
    setQuoteCount((q) => q + 1);
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: `Quote #${idx + 1} just came in from ${mockQuotes[idx].yardName}:`,
        components: [`quote_${idx}`],
      },
    ]);
  };

  const finalMessage = () => {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "All quotes are in. Here's the side-by-side comparison — and good news, you can get this installed locally too.",
        components: ["comparison", "mechanic_referral", "chips_final"],
      },
    ]);
    if (!receiptDismissed) {
      setTimeout(() => setShowReceipt(true), 4000);
    }
  };

  const addUserMessage = (text: string) => {
    if (!title || title === "New chat") {
      setTitle(text.slice(0, 40));
    }
    const newTurn = turn + 1;
    setTurn(newTurn);
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsTyping(true);

    const delay = newTurn <= 2 ? 1200 : 1600;
    setTimeout(() => {
      setIsTyping(false);
      const response = MOCK_FLOW[newTurn] || {
        text: "I'm on it. Give me just a second.",
      };
      setMessages((prev) => [...prev, { role: "ai", ...response }]);

      if (newTurn === 5) {
        setTimeout(() => {
          setCallingActive(true);
        }, 800);
      }
    }, delay);
  };

  const handlePhoneSubmit = (phone: string) => {
    addUserMessage(`My number is ${phone}`);
  };

  const renderComponents = (components: string[], messageIdx: number) => {
    return components.map((comp) => {
      if (comp === "diagnosis")
        return (
          <DiagnosisCard
            key={comp}
            onGetQuotes={() => addUserMessage("Yes, get me quotes")}
          />
        );
      if (comp === "chips_pre_phone")
        return (
          <SuggestionChips
            key={comp}
            chips={["Yes, call the yards now", "What could cause this?", "Find a mechanic near me"]}
            onSelect={addUserMessage}
          />
        );
      if (comp === "phone")
        return <PhoneCaptureCard key={comp} onSubmit={handlePhoneSubmit} />;
      if (comp === "chips_final")
        return (
          <SuggestionChips
            key={comp}
            chips={["Reserve the best quote", "Is this a fair price?", "Find a mechanic near me"]}
            onSelect={addUserMessage}
          />
        );
      if (comp === "comparison") return <ComparisonTable key={comp} />;
      if (comp === "mechanic_referral") return <MechanicReferralCard key={comp} />;
      if (comp.startsWith("quote_")) {
        const idx = parseInt(comp.split("_")[1]);
        return <QuoteCard key={comp} {...mockQuotes[idx]} />;
      }
      return null;
    });
  };

  return (
    <div className="flex h-full">
      {/* Center column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-line flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <ArrowLeft size={15} />
            New chat
          </Link>
          <h2 className="font-medium text-text-primary text-sm truncate max-w-[200px] lg:max-w-sm">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="More options"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Conversation"
          className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-4"
        >
          {messages.map((msg, i) => (
            <div key={i} className="message-enter">
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-panel border-l-2 border-orange-DEFAULT/40 rounded-xl px-4 py-3 text-text-primary text-sm leading-relaxed">
                    <span className="sr-only">You said: </span>
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-orange-DEFAULT/10 border border-orange-DEFAULT/20 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <Wrench size={13} className="text-orange-DEFAULT" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-panel rounded-xl px-4 py-3 text-text-primary text-sm leading-relaxed">
                      <span className="sr-only">AutoMotor said: </span>
                      {msg.text}
                    </div>
                    {msg.role === "ai" &&
                      msg.components &&
                      renderComponents(msg.components, i)}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div role="status" aria-label="AutoMotor is typing" className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-orange-DEFAULT/10 border border-orange-DEFAULT/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Wrench size={13} className="text-orange-DEFAULT" />
              </div>
              <div className="bg-panel rounded-xl px-4 py-3.5">
                <div className="dot-pulse flex items-center gap-1" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Chat input */}
        <div className="px-4 lg:px-6 py-4 border-t border-line flex-shrink-0 pb-safe">
          <ChatInput onSubmit={addUserMessage} />
        </div>
      </div>

      {/* Live Status Panel */}
      {(callingActive || quoteCount > 0) && (
        <div className="px-4 py-6 border-l border-line">
          <LiveStatusPanel
            callsComplete={callsComplete}
            quoteCount={quoteCount}
            elapsed={elapsed}
          />
        </div>
      )}

      {showReceipt && (
        <SavingsReceiptModal
          savings={mockQuotes[0].marketAvg - mockQuotes[0].price}
          marketAvg={mockQuotes[0].marketAvg}
          yourPrice={mockQuotes[0].price}
          vehicle="2014 Silverado 1500"
          secondsElapsed={elapsed}
          onClose={() => {
            setShowReceipt(false);
            setReceiptDismissed(true);
          }}
        />
      )}
    </div>
  );
}
