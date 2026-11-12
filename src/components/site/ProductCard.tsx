import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { STORE } from "@/config/store";
import { useCart } from "@/lib/cart";
import { buildQuickOrderMessage, formatPrice, waLink, type Product, primaryContact } from "@/lib/store";
import { LensSwatch } from "./LensSwatch";
import { WhatsAppIcon } from "./icons";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-input" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} className="flex size-10 items-center justify-center text-gold hover:text-gold-light" aria-label="Decrease quantity">
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(99, value + 1))} className="flex size-10 items-center justify-center text-gold hover:text-gold-light" aria-label="Increase quantity">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function ProductCard({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();

  const addToCart = () => {
    add(p.id, qty);
    toast.success(`${p.collection.name} – ${p.name} added`, {
      description: `Qty ${qty} · ${formatPrice(p.price * qty)}`,
      action: { label: "View cart", onClick: () => navigate({ to: "/cart" }) },
    });
    setQty(1);
  };

  return (
    <article className="gold-card group flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img src={p.collection.image} alt={`${p.collection.name} lens in ${p.name}`} loading="lazy" width={1200} height={800} className="h-full w-full object-cover object-[30%_50%] transition-transform duration-700 group-hover:scale-110" />
        <div className="fade-up absolute inset-0" />
        <LensSwatch shade={p.shade} size="lg" className="absolute bottom-3 right-3" />
        {p.collection.discountLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
            {p.collection.discountLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">{p.collection.name}</p>
          <h3 className="mt-1 text-lg text-foreground">{p.name}</h3>
        </div>
        <p className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gold-light">{formatPrice(p.price)}</span>
          {p.oldPrice && <s className="text-sm text-muted-foreground">{formatPrice(p.oldPrice)}</s>}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <QtyStepper value={qty} onChange={setQty} label={`Quantity for ${p.name}`} />
          <Button variant="goldSolid" size="pill" onClick={addToCart} className="w-full">
            <ShoppingBag /> Add to Cart
          </Button>
          <Button asChild variant="whatsapp" size="pill" className="w-full">
            <a href={waLink(primaryContact.wa, buildQuickOrderMessage(p, qty))} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Order on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
