// ONE COLLECTION PAGE (e.g. /collections/party-wear)
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BrushBadge } from "@/components/site/BrushBadge";
import { LensSwatch } from "@/components/site/LensSwatch";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { colorsLabel, formatPrice, getCollection, products } from "@/lib/store";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { slug: collection.slug };
  },
  head: ({ params }) => {
    const c = getCollection(params.slug);
    const title = c ? `${c.name} — Lenszora Colour Lenses` : "Collection — Lenszora";
    const description = c ? `${c.name}: ${c.tagline}. ${colorsLabel(c).toLowerCase()} from ${formatPrice(c.price)}. Cash on delivery in Karachi.` : "Lenszora collection";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="px-6 py-24 text-center">
      <p className="font-script text-4xl text-gold">Collection not found</p>
      <Button asChild variant="gold" size="pill" className="mt-6">
        <Link to="/collections">See all collections</Link>
      </Button>
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useLoaderData();
  const c = getCollection(slug)!;
  const items = products.filter((p) => p.collection.slug === slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-ink">
        <img src={c.image} alt={`${c.name} lenses`} width={1200} height={800} className="absolute inset-0 h-full w-full object-cover object-left opacity-60 lg:w-2/3 lg:opacity-100" />
        <div className="fade-right absolute inset-0" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center justify-end px-6 py-14">
          <div className="max-w-md text-right">
            <h1 className="text-3xl text-gold-gradient sm:text-5xl">{c.name.toUpperCase()}</h1>
            <p className="mt-3 text-sm text-foreground/90">{c.tagline}</p>
            <p className="mt-4 text-sm text-muted-foreground">{c.description}</p>
            <div className="mt-6 flex flex-col items-end gap-1">
              <BrushBadge className="text-2xl sm:text-3xl">{c.discountLabel ?? `${formatPrice(c.price)} Only`}</BrushBadge>
              {c.oldPrice && (
                <p className="mt-2 text-sm">
                  <s className="text-muted-foreground">{formatPrice(c.oldPrice)}</s>{" "}
                  <span className="font-semibold text-gold-light">{formatPrice(c.price)}</span>
                </p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              {c.shades.map((s) => (
                <LensSwatch key={s.name} shade={s} size="sm" />
              ))}
            </div>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{colorsLabel(c)}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
