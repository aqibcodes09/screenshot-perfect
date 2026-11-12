import { Eye, Feather, Gem, ShieldCheck } from "lucide-react";
import eyesBanner from "@/assets/eyes-banner.jpg";

const perks = [
  { Icon: Eye, label: "Natural Look" },
  { Icon: Feather, label: "All Day Comfort" },
  { Icon: Gem, label: "High Quality" },
  { Icon: ShieldCheck, label: "Safe & Gentle" },
];

export function BannerStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-ink">
      <div className="grid items-center lg:grid-cols-[1.3fr_1fr]">
        <div className="relative h-48 sm:h-64">
          <img src={eyesBanner} alt="Close-up of eyes wearing honey-brown Lenszora lenses" loading="lazy" width={1600} height={640} className="h-full w-full object-cover" />
          <div className="fade-right absolute inset-0" />
          <p className="absolute bottom-6 right-6 -rotate-12 font-script text-4xl text-gold sm:right-10 sm:text-5xl">
            Your Eye,<br />Your Choice ♡
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 px-4 py-8 sm:px-10">
          {perks.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-14 items-center justify-center rounded-full border border-gold text-gold transition-all hover:shadow-gold sm:size-16">
                <Icon className="size-6 sm:size-7" strokeWidth={1.3} />
              </span>
              <span className="text-xs text-foreground/90 sm:text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
