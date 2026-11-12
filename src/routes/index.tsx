// HOME PAGE
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroEye from "@/assets/hero-eye.jpg";
import productSet from "@/assets/product-set.jpg";
import { Button } from "@/components/ui/button";
import { EyeLogo } from "@/components/site/icons";
import { FeaturesStrip } from "@/components/site/FeaturesStrip";
import { BannerStrip } from "@/components/site/BannerStrip";
import { CollectionCard } from "@/components/site/CollectionCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { collections } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lenszora — Premium Colour Contact Lenses | Your Eyes. Your Choice." },
      { name: "description", content: "Shop One Day, Aura, Party Wear and Daily Wear colour lenses. Natural look, all-day comfort, cash on delivery across Karachi." },
      { property: "og:title", content: "Lenszora — Premium Colour Contact Lenses" },
      { property: "og:description", content: "Find your perfect shade. Order on WhatsApp, cash on delivery in Karachi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-ink">
        <div className="relative grid min-h-[560px] lg:min-h-[620px] lg:grid-cols-[1fr_1.3fr_0.9fr]">
          {/* Eye photo (left) */}
          <div className="absolute inset-0 lg:relative lg:inset-auto">
            <img src={heroEye} alt="Close-up of an eye wearing a hazel Lenszora lens" width={1600} height={1008} className="h-full w-full object-cover object-[20%_50%] opacity-50 lg:opacity-100" />
            <div className="fade-right absolute inset-0 hidden lg:block" />
            <p className="absolute bottom-8 left-6 hidden -rotate-12 font-script text-4xl leading-tight text-gold lg:block">
              More than<br />&nbsp;&nbsp;just lenses… ♡
            </p>
          </div>

          {/* Title (centre) */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center">
            <Reveal>
              <EyeLogo className="mx-auto h-12 w-20 text-gold sm:h-14 sm:w-24" />
              <h1 className="mt-4 text-5xl font-medium text-gold-gradient animate-shimmer sm:text-7xl">LENSZORA</h1>
              <p className="mt-4 text-xs tracking-[0.45em] text-foreground sm:text-sm">YOUR EYES. YOUR CHOICE.</p>
              <p className="mt-5 text-xs text-foreground/85 sm:text-sm">
                Premium Contact Lenses <span className="px-1 text-gold">|</span> Natural Look <span className="px-1 text-gold">|</span> Long Lasting Comfort
              </p>
              <Button asChild variant="gold" size="xl" className="mt-8">
                <Link to="/shop">
                  Shop Now <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* Product (right) */}
          <div className="relative z-10 flex items-end justify-center px-6 pb-10 lg:items-center lg:pb-0">
            <img src={productSet} alt="Lenszora lens box, solution bottle and lens cases" width={1024} height={1024} className="mask-soft animate-float-soft w-64 sm:w-80 lg:w-full lg:max-w-md" />
          </div>
          <p className="relative z-10 -mt-4 pb-8 text-center font-script text-3xl text-gold lg:hidden">More than just lenses… ♡</p>
        </div>
      </section>

      {/* 2. FEATURES */}
      <FeaturesStrip />

      {/* 3. COLLECTIONS */}
      <section id="collections" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading title="OUR COLLECTIONS" subtitle="Find Your Perfect Shade" />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 120}>
              <CollectionCard collection={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. BANNER */}
      <BannerStrip />
    </>
  );
}
