import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { EyeLogo } from "./icons";

/** LENSZORA logo: eye icon + wordmark + tagline. */
export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <Link to="/" aria-label="Lenszora home" className={cn("group inline-flex flex-col items-center", className)}>
      <EyeLogo className={cn("text-gold transition-transform group-hover:scale-110", size === "lg" ? "h-8 w-14" : "h-5 w-9")} />
      <span
        className={cn(
          "font-display font-semibold leading-none tracking-[0.12em] text-gold-gradient",
          size === "lg" ? "mt-2 text-3xl" : "mt-1 text-xl sm:text-2xl",
        )}
      >
        LENSZORA
      </span>
      <span className="mt-1 text-[0.5rem] uppercase tracking-[0.3em] text-muted-foreground sm:text-[0.55rem]">
        Your Eyes. Your Choice.
      </span>
    </Link>
  );
}
