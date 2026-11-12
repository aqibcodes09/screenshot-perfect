import { cn } from "@/lib/utils";
import type { Shade } from "@/config/store";

type Props = {
  shade: Shade;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

const sizes = { sm: "size-7", md: "size-10", lg: "size-14" };

/** Round contact-lens swatch. Clickable when onClick is given. */
export function LensSwatch({ shade, size = "md", active, onClick, className }: Props) {
  const classes = cn(
    "lens-swatch shrink-0 transition-all duration-300",
    sizes[size],
    active && "scale-110 ring-2 ring-gold ring-offset-2 ring-offset-ink",
    onClick && "cursor-pointer hover:scale-110 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
    className,
  );
  const style = { "--shade": shade.color } as React.CSSProperties;

  if (!onClick) return <span className={classes} style={style} title={shade.name} aria-hidden="true" />;
  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      style={style}
      title={shade.name}
      aria-label={`Shade ${shade.name}`}
      aria-pressed={active}
    />
  );
}
