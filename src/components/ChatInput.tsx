"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mic, Camera, Car, Send, X } from "lucide-react";
import clsx from "clsx";

export type ImageAttachment = {
  data: string;
  mimeType: string;
  preview: string;
};

interface ChatInputProps {
  placeholder?: string;
  onSubmit?: (value: string, image?: ImageAttachment) => void;
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
  const [image, setImage] = useState<ImageAttachment | null>(null);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!value.trim() && !image) return;
    if (onSubmit) {
      onSubmit(value.trim() || (image ? "What is this part?" : ""), image || undefined);
    } else {
      router.push(`/chat/new?q=${encodeURIComponent(value.trim())}`);
    }
    setValue("");
    setImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("Image must be under 4MB");
      return;
    }

    const preview = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setImage({ data: base64, mimeType: file.type, preview });
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image.preview);
      setImage(null);
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
      {image && (
        <div className="px-4 pt-3">
          <div className="relative inline-block">
            <img
              src={image.preview}
              alt="Attached"
              className="h-16 w-16 object-cover rounded-lg border border-line"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-elevated border border-line rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={10} />
            </button>
          </div>
        </div>
      )}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={image ? "Ask about this image..." : placeholder}
        autoFocus={autoFocus}
        rows={3}
        className="w-full bg-transparent px-4 pt-3.5 pb-12 text-text-primary placeholder:text-text-tertiary resize-none outline-none text-sm leading-relaxed"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2.5 pb-2.5">
        <div className="flex items-center gap-0.5">
          <button type="button" aria-label="Voice" className="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-elevated transition-colors">
            <Mic size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Photo"
            onClick={handleImageSelect}
            className={clsx(
              "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
              image
                ? "text-orange-DEFAULT bg-orange-DEFAULT/10"
                : "text-text-tertiary hover:text-text-primary hover:bg-elevated"
            )}
          >
            <Camera size={14} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Add vehicle" className="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-elevated transition-colors">
            <Car size={14} aria-hidden="true" />
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!value.trim() && !image}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            value.trim() || image
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
