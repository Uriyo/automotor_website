"use client";

interface SuggestionChipsProps {
  chips: string[];
  onSelect: (chip: string) => void;
}

export default function SuggestionChips({ chips, onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect(chip)}
          className="px-3.5 py-1.5 rounded-full bg-panel border border-line text-text-secondary text-sm hover:text-text-primary hover:border-text-tertiary transition-colors"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
