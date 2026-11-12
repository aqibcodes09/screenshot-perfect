import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Gold paint-brush-stroke badge used for prices and discounts. */
export function BrushBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-flex -rotate-6 items-center justify-center px-7 py-2", className)}>
      <svg viewBox="0 0 220 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full drop-shadow-lg" aria-hidden="true">
        <defs>
          <linearGradient id="brush-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--gold-deep)" />
            <stop offset=".35" stopColor="var(--gold-light)" />
            <stop offset=".7" stopColor="var(--gold)" />
            <stop offset="1" stopColor="var(--gold-deep)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#brush-gold)"
          d="M8 22c18-6 40-9 66-10 30-2 62-3 92-1 14 1 30 2 46 6l-6 4 8 3-10 3c4 4 4 9 1 13l6 5-9 2c3 5 1 10-5 13-20 4-48 6-80 7-30 1-58 0-84-3l-12-3 6-4-9-3 7-4c-4-4-5-9-3-14l-8-4 8-3c-6-3-7-6-14-7Z"
        />
        <path d="M30 30h150M24 50h160" stroke="var(--gold-deep)" strokeOpacity=".25" strokeWidth="2" />
      </svg>
      <span className="relative font-display font-bold leading-none text-primary-foreground">{children}</span>
    </span>
  );
}
