// SHOP PAGE — all shades as products, with collection filter + search.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";
import { collections, products } from "@/lib/store";

type ShopSearch = { collection?: string; q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    collection: typeof search.collection === "string" ? search.collection : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Colour Contact Lenses — Lenszora" },
      { name: "description", content: "Browse every Lenszora shade: blue, grey, hazel, green, brown and more. Add to cart or order instantly on WhatsApp." },
      { property: "og:title", content: "Shop All Shades — Lenszora" },
      { property: "og:description", content: "Every Lenszora shade in one place. Cash on delivery in Karachi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { collection, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const filtered = useMemo(() => {
    const term = (q ?? "").toLowerCase().trim();
    return products.filter(
      (p) =>
        (!collection || p.collection.slug === collection) &&
        (!term || p.name.toLowerCase().includes(term) || p.collection.name.toLowerCase().includes(term)),
    );
  }, [collection, q]);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-all",
      active ? "border-gold bg-gold text-primary-foreground" : "border-input text-foreground/85 hover:border-gold hover:text-gold-light",
    );

  return (
    <>
      <PageHeader title="SHOP" subtitle="Every Shade, One Place" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
            <button type="button" className={chip(!collection)} onClick={() => navigate({ search: (s) => ({ ...s, collection: undefined }) })}>
              All
            </button>
            {collections.map((c) => (
              <button key={c.slug} type="button" className={chip(collection === c.slug)} onClick={() => navigate({ search: (s) => ({ ...s, collection: c.slug }) })}>
                {c.name}
              </button>
            ))}
          </div>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search shades</span>
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold" />
            <input
              value={q ?? ""}
              onChange={(e) => navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })}
              placeholder="Search shades…"
              className="h-11 w-full rounded-full border border-input bg-transparent pl-11 pr-4 text-sm outline-none focus:border-gold"
            />
          </label>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">{filtered.length} products</p>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-script text-4xl text-gold">No shades found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another colour or clear the filters.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
