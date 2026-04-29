"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mic, Camera, Car, Send } from "lucide-react";
import clsx from "clsx";

interface ChatInputProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export default function ChatInput({
  placeholder = "What's wrong with your ride?",
  onSubmit,
  autoFocus = false,
  className,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!value.trim()) return;
    if (onSubmit) {
      onSubmit(value.trim());
    } else {
      router.push(`/chat/new?q=${encodeURIComponent(value.trim())}`);
    }
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={clsx(
        "relative bg-panel rounded-xl border border-line overflow-hidden text-left",
        "focus-within:border-text-tertiary transition-colors",
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={3}
        className="w-full bg-transparent px-4 pt-3.5 pb-12 text-text-primary placeholder:text-text-tertiary resize-none outline-none text-sm leading-relaxed"
      />
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2.5 pb-2.5">
        <div className="flex items-center gap-0.5">
          <button type="button" aria-label="Voice" className="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-elevated transition-colors">
            <Mic size={14} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Photo" className="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-elevated transition-colors">
            <Camera size={14} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Add vehicle" className="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-elevated transition-colors">
            <Car size={14} aria-hidden="true" />
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            value.trim()
              ? "bg-orange-DEFAULT text-white hover:bg-orange-hover"
              : "bg-elevated text-text-tertiary cursor-not-allowed"
          )}
        >
          <Send size={12} aria-hidden="true" />
          Send
        </button>
      </div>
    </div>
  );
}
