// ABOUT US PAGE
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import productSet from "@/assets/product-set.jpg";
import { Button } from "@/components/ui/button";
import { BannerStrip } from "@/components/site/BannerStrip";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Lenszora" },
      { name: "description", content: "Lenszora brings premium, comfortable colour contact lenses to Karachi — natural looks to bold party shades." },
      { property: "og:title", content: "About Lenszora" },
      { property: "og:description", content: "Premium colour lenses for every mood, delivered across Karachi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader title="ABOUT US" script="More than just lenses…" />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <Reveal>
          <img src={productSet} alt="Lenszora lens box and solution" loading="lazy" width={1024} height={1024} className="w-full rounded-xl border border-border" />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-2xl text-gold-gradient sm:text-3xl">YOUR EYES. YOUR CHOICE.</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/85">
            <p>
              Lenszora was created for everyone who wants to change their look without giving up comfort. From soft everyday shades to bold party colours, every lens is chosen for a natural finish and all-day wear.
            </p>
            <p>
              We deliver across Karachi with cash on delivery, and our team is always a message away on WhatsApp or Instagram to help you pick the right shade.
            </p>
          </div>
          <Button asChild variant="gold" size="xl" className="mt-8">
            <Link to="/collections">Explore Collections <ArrowRight /></Link>
          </Button>
        </Reveal>
      </section>
      <BannerStrip />
    </>
  );
}
