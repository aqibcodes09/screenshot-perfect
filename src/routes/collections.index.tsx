// ALL COLLECTIONS PAGE
import { createFileRoute } from "@tanstack/react-router";
import { CollectionCard } from "@/components/site/CollectionCard";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { collections } from "@/lib/store";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Our Collections — Lenszora Colour Lenses" },
      { name: "description", content: "One Day Lenses, Aura Collection, Party Wear and Daily Wear — find your perfect Lenszora shade." },
      { property: "og:title", content: "Our Collections — Lenszora" },
      { property: "og:description", content: "Four collections, dozens of shades. Find your perfect look." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <>
      <PageHeader title="OUR COLLECTIONS" subtitle="Find Your Perfect Shade" />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 120}>
            <CollectionCard collection={c} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
