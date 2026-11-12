import { Eye, Headphones, ShieldCheck, Truck } from "lucide-react";

const features = [
  { Icon: Truck, title: "Free Delivery", text: "First 10 Orders" },
  { Icon: ShieldCheck, title: "100% Original", text: "Premium Quality" },
  { Icon: Eye, title: "Safe & Comfortable", text: "For Your Eyes" },
  { Icon: Headphones, title: "24/7 Support", text: "DM for any query" },
];

export function FeaturesStrip() {
  return (
    <section className="border-y border-border bg-ink" aria-label="Why Lenszora">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, text }, i) => (
          <div
            key={title}
            className={`flex items-center gap-4 px-4 py-6 sm:px-8 ${i % 2 === 0 ? "border-r border-border/60" : ""} ${i < 2 ? "border-b border-border/60 lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
          >
            <Icon className="size-8 shrink-0 text-gold sm:size-10" strokeWidth={1.2} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground sm:text-sm">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
