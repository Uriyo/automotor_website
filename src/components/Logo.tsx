import clsx from "clsx";

type LogoProps = {
  size?: number;
  className?: string;
  monochrome?: boolean;
};

/**
 * AutoMotor.AI brand mark — refined speedometer.
 *
 * Geometry rules used:
 *   - 32×32 viewBox, mathematical center at (16, 16)
 *   - Dial radius 11, opens at 240°/300° (5 o'clock → 7 o'clock)
 *   - 7 evenly-spaced ticks from -210° to +30° (15° steps), the last
 *     one rendered as an orange "redline" wedge
 *   - Needle pointed at -45° (1:30 position), length 9 from center
 *   - Needle stroke 2, dial stroke 2, tick stroke 1.5 — all integer
 *     widths so edges stay crisp at favicon sizes
 *   - Pivot is a 2.4r cap with a 0.9r cutout that punches through to bg
 *
 * Result: reads as a tachometer at 16 px, presence at 64 px.
 */
export function LogoMark({ size = 28, className, monochrome = false }: LogoProps) {
  const accent = monochrome ? "currentColor" : "#EA580C";
  const neutral = "currentColor";
  const dim = "currentColor";

  // Tick math — same radius for inner/outer, just stroke ends differ
  // Angles measured from horizontal, going CCW. We want ticks from
  // 7 o'clock (210°) sweeping clockwise to 5 o'clock (-30°), i.e.
  // -150°, -120°, -90°, -60°, -30°, 0°, 30° (in screen-y-flipped coords)
  // Pre-computing positions so the SVG stays declarative and pixel-clean.
  const ticks = [
    { x1: 7.0,  y1: 21.5, x2: 8.4,  y2: 20.5, opacity: 0.30 }, // 7:30 (cold)
    { x1: 5.5,  y1: 17.0, x2: 7.1,  y2: 16.6, opacity: 0.40 }, // 9:00
    { x1: 7.0,  y1: 10.5, x2: 8.4,  y2: 11.5, opacity: 0.55 }, // 10:30
    { x1: 11.5, y1: 6.5,  x2: 12.5, y2: 7.9,  opacity: 0.70 }, // 12:00 - 1
    { x1: 17.0, y1: 5.5,  x2: 17.0, y2: 7.2,  opacity: 0.85 }, // 12:00
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dial arc — 270° from 7 o'clock CW to 5 o'clock */}
      <path
        d="M9.65 24.35 A11 11 0 1 1 22.35 24.35"
        stroke={neutral}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Cool ticks (left side) */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={dim}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={t.opacity}
        />
      ))}

      {/* Hot ticks (right side, leading to redline) */}
      <line x1="20.5" y1="6.5"  x2="19.5" y2="7.9"  stroke={accent} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      <line x1="24.0" y1="9.0"  x2="22.7" y2="10.0" stroke={accent} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />

      {/* Redline wedge — the "danger zone" arc, 1 o'clock area */}
      <path
        d="M25.4 11.7 A11 11 0 0 1 26.5 16"
        stroke={accent}
        strokeWidth={2.4}
        strokeLinecap="round"
      />

      {/* Needle — from center to ~1:30 position */}
      <line
        x1="16"
        y1="16"
        x2="22.5"
        y2="9.5"
        stroke={accent}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Pivot cap — neutral with cutout for depth */}
      <circle cx="16" cy="16" r="2.6" fill={neutral} />
      <circle cx="16" cy="16" r="1" fill="#09090B" />
    </svg>
  );
}

type LockupProps = {
  size?: number;
  className?: string;
  textClassName?: string;
  showDot?: boolean;
};

/**
 * Full horizontal lockup: speedometer mark + wordmark.
 * The dot in "AutoMotor.AI" picks up the redline color, tying the
 * wordmark to the mark.
 */
export function LogoLockup({
  size = 28,
  className,
  textClassName,
  showDot = true,
}: LockupProps) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <LogoMark size={size} className="text-text-primary" />
      <span
        className={clsx(
          "font-semibold tracking-tight text-text-primary leading-none",
          textClassName
        )}
      >
        AutoMotor
        {showDot && <span className="text-orange-DEFAULT">.</span>}
        AI
      </span>
    </span>
  );
}

export default LogoMark;
