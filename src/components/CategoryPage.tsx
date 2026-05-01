"use client";

import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import ChatInput from "@/components/ChatInput";

type PopularSearch = {
  label: string;
  query: string;
};

type CategoryPageProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  popularSearches: PopularSearch[];
  popularParts: string[];
};

export default function CategoryPage({
  icon: Icon,
  title,
  subtitle,
  description,
  popularSearches,
  popularParts,
}: CategoryPageProps) {
  const router = useRouter();

  function handleSubmit(value: string) {
    router.push(`/chat/new?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="min-h-screen px-4 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-DEFAULT/10 border border-orange-DEFAULT/20 flex items-center justify-center">
            <Icon size={20} className="text-orange-DEFAULT" />
          </div>
          <div>
            <h1 className="font-semibold text-2xl lg:text-3xl tracking-tight text-text-primary">
              {title}
            </h1>
            <p className="text-sm text-text-secondary">{subtitle}</p>
          </div>
        </div>

        <p className="text-text-secondary mt-4 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="mb-10">
          <ChatInput onSubmit={handleSubmit} autoFocus />
        </div>

        <div className="mb-10">
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Popular searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSubmit(s.query)}
                className="px-3.5 py-2 rounded-xl border border-line bg-panel text-sm text-text-secondary hover:border-text-tertiary hover:text-text-primary transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Common parts
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {popularParts.map((part) => (
              <button
                key={part}
                onClick={() => handleSubmit(`I need a ${part.toLowerCase()}`)}
                className="px-3.5 py-3 rounded-xl border border-line bg-panel text-sm text-text-primary text-left hover:border-text-tertiary hover:bg-elevated transition-colors"
              >
                {part}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
