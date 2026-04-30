import type { AutoPart } from "./supabase-server";

function formatPart(part: AutoPart): string {
  const lines: string[] = [`- ${part.part_name}`];
  if (part.part_number) lines.push(`  Part #: ${part.part_number}`);
  if (part.make || part.model) {
    const vehicle = [part.make, part.model].filter(Boolean).join(" ");
    lines.push(`  Vehicle: ${vehicle}`);
  }
  if (part.year_start || part.year_end) {
    lines.push(`  Years: ${part.year_start ?? "?"} – ${part.year_end ?? "?"}`);
  }
  if (part.price != null) lines.push(`  Price: $${part.price}`);
  if (part.condition) lines.push(`  Condition: ${part.condition}`);
  if (part.mileage != null) lines.push(`  Mileage: ${part.mileage.toLocaleString()} mi`);
  if (part.warranty) lines.push(`  Warranty: ${part.warranty}`);
  if (part.description) lines.push(`  ${part.description}`);
  return lines.join("\n");
}

export function buildSystemPrompt(parts: AutoPart[]): string {
  const base = `You are AutoMotor AI, a helpful and knowledgeable auto parts search assistant. You help people find used auto parts — engines, transmissions, and other components.

Be professional but friendly. Keep answers concise and useful. When referencing parts from the inventory, mention specific details like price, condition, and warranty.`;

  if (parts.length === 0) {
    return `${base}

No matching parts were found in our current inventory for this query. Let the user know you couldn't find an exact match and suggest they try different search terms, a different year range, or a compatible part. Do NOT make up parts that aren't in the inventory.`;
  }

  const formatted = parts.map(formatPart).join("\n\n");

  return `${base}

Here are the matching parts from our inventory:

${formatted}

Reference these specific parts in your answer. Include prices and key details. If the user asks about something not listed above, let them know it's not in current inventory.`;
}
