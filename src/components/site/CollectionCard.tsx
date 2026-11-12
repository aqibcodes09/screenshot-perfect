import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import productSet from "@/assets/product-set.jpg";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/config/store";
import { colorsLabel, formatPrice } from "@/lib/store";
import { BrushBadge } from "./BrushBadge";
import { LensSwatch } from "./LensSwatch";

/** Big collection card (home + collections page), styled like the reference design. */
export function CollectionCard({ collection: c }: { collection: Collection }) {
  const [active, setActive] = useState(0);
  const discounted = c.oldPrice !== undefined;
  const activeName = c.shades[active]?.name ?? "";

  return (
    <article className="gold-card group relative overflow-hidden">
      <div className="relative aspect-[4/3] sm:aspect-[16/10]">
        <img src={c.image} alt={`${c.name} — eye wearing ${activeName} lens`} loading="lazy" width={1200} height={800} className="absolute inset-0 h-full w-full object-cover object-left transition-transform duration-700 group-hover:scale-105" />
        <div className="fade-right absolute inset-0" />
        <div className="fade-up absolute inset-0" />
        <img src={productSet} alt="" aria-hidden="true" loading="lazy" width={1024} height={1024} className="mask-soft absolute bottom-0 left-1/2 hidden w-32 -translate-x-1/4 opacity-90 sm:block lg:w-36" />

        <div className="absolute right-4 top-4 max-w-[60%] text-right sm:right-6 sm:top-6">
          <h3 className="text-xl text-foreground sm:text-3xl">{c.name.toUpperCase()}</h3>
          <p className="mt-1 text-xs text-foreground/85 sm:text-sm">{c.tagline}</p>
          <div className="mt-3 sm:mt-4">
            {discounted ? (
              <div className="flex flex-col items-end gap-1">
                <BrushBadge className="text-xl sm:text-3xl">{c.discountLabel}</BrushBadge>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Was: <s>{formatPrice(c.oldPrice!)}</s>
                </p>
                <p className="text-sm sm:text-lg">
                  Now: <span className="font-semibold text-gold-light">{formatPrice(c.price)}</span>
                </p>
              </div>
            ) : (
              <BrushBadge className="flex-col text-xl sm:text-3xl">
                {formatPrice(c.price)}
                <span className="block text-sm sm:text-lg">Only</span>
              </BrushBadge>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border/50 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label={`${c.name} shades`}>
          {c.shades.map((s, i) => (
            <LensSwatch key={s.name} shade={s} size="sm" active={i === active} onClick={() => setActive(i)} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-gold">{activeName}</span> · {colorsLabel(c)}
          </p>
          <Button asChild variant="gold" size="pill">
            <Link to="/collections/$slug" params={{ slug: c.slug }}>
              Shop Now <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
