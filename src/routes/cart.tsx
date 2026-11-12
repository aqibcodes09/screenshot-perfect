// CART + CHECKOUT PAGE — order is sent to WhatsApp (no online payment).
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LensSwatch } from "@/components/site/LensSwatch";
import { NumberPicker } from "@/components/site/NumberPicker";
import { PageHeader } from "@/components/site/PageHeader";
import { QtyStepper } from "@/components/site/ProductCard";
import { WhatsAppIcon } from "@/components/site/icons";
import { STORE } from "@/config/store";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, formatPrice, getProduct, waLink, type CheckoutDetails } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart & Checkout — Lenszora" },
      { name: "description", content: "Review your Lenszora lenses and place your order on WhatsApp. Cash on delivery in Karachi." },
      { property: "og:title", content: "Your Cart — Lenszora" },
      { property: "og:description", content: "Place your order on WhatsApp, pay cash on delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

type Errors = Partial<Record<keyof CheckoutDetails, string>>;

function validate(d: CheckoutDetails): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name";
  if (!/^(\+?92|0)3\d{9}$/.test(d.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid mobile number, e.g. 03001234567";
  if (d.address.trim().length < 8) e.address = "Please enter your complete address";
  if (d.city.trim().length < 2) e.city = "Please enter your area / city";
  return e;
}

function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const [details, setDetails] = useState<CheckoutDetails>({ name: "", phone: "", address: "", city: STORE.deliveryCity, notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sendTo, setSendTo] = useState<string>(STORE.contacts[0].wa);
  const [sent, setSent] = useState(false);

  const update = (key: keyof CheckoutDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDetails((d) => ({ ...d, [key]: e.target.value }));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(details);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    const url = waLink(sendTo, buildOrderMessage(details, lines));
    clear();
    setSent(true);
    window.location.href = url;
  };

  if (sent) {
    return (
      <section className="px-6 py-24 text-center">
        <p className="font-script text-5xl text-gold">Thank you!</p>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your order is ready in WhatsApp — just press send. We'll confirm it there. If WhatsApp didn't open, message us on {STORE.contacts[0].display}.
        </p>
        <Button asChild variant="gold" size="xl" className="mt-8">
          <Link to="/shop">Continue Shopping <ArrowRight /></Link>
        </Button>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHeader title="YOUR CART" />
        <section className="px-6 py-20 text-center">
          <p className="font-script text-4xl text-gold">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">Find your perfect shade and add it here.</p>
          <Button asChild variant="gold" size="xl" className="mt-8">
            <Link to="/shop">Shop Now <ArrowRight /></Link>
          </Button>
        </section>
      </>
    );
  }

  const fieldError = (k: keyof CheckoutDetails) =>
    errors[k] && <p id={`${k}-error`} className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <>
      <PageHeader title="YOUR CART" subtitle={`${STORE.freeDeliveryNote} · ${STORE.deliveryCity} only`} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Items */}
        <div className="flex flex-col gap-4">
          {lines.map((line) => {
            const p = getProduct(line.productId)!;
            return (
              <div key={line.productId} className="gold-card flex flex-wrap items-center gap-4 p-4 hover:translate-y-0">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-md">
                  <img src={p.collection.image} alt="" loading="lazy" width={1200} height={800} className="h-full w-full object-cover object-[30%_50%]" />
                  <LensSwatch shade={p.shade} size="sm" className="absolute bottom-1 right-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">{p.collection.name}</p>
                  <p className="font-display text-lg">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(p.price)} each</p>
                </div>
                <QtyStepper value={line.qty} onChange={(n) => setQty(p.id, n)} label={`Quantity for ${p.name}`} />
                <p className="w-24 text-right font-semibold text-gold-light">{formatPrice(p.price * line.qty)}</p>
                <button type="button" onClick={() => remove(p.id)} className="p-2 text-muted-foreground hover:text-destructive" aria-label={`Remove ${p.name}`}>
                  <Trash2 className="size-5" />
                </button>
              </div>
            );
          })}
          <div className="flex items-center justify-between rounded-lg border border-border p-5">
            <span className="uppercase tracking-[0.2em] text-muted-foreground">Subtotal</span>
            <span className="font-display text-2xl text-gold-gradient">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Payment: {STORE.paymentMethod}. Delivery within {STORE.deliveryCity}. {STORE.freeDeliveryNote}.
          </p>
        </div>

        {/* Checkout form */}
        <form onSubmit={placeOrder} noValidate className="gold-card flex flex-col gap-4 p-6 hover:translate-y-0">
          <h2 className="text-xl text-gold-gradient">CHECKOUT</h2>
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" value={details.name} onChange={update("name")} autoComplete="name" className="mt-1.5 h-11" aria-invalid={!!errors.name} aria-describedby="name-error" />
            {fieldError("name")}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" type="tel" inputMode="tel" value={details.phone} onChange={update("phone")} placeholder="03001234567" autoComplete="tel" className="mt-1.5 h-11" aria-invalid={!!errors.phone} aria-describedby="phone-error" />
            {fieldError("phone")}
          </div>
          <div>
            <Label htmlFor="address">Complete Address *</Label>
            <Textarea id="address" value={details.address} onChange={update("address")} rows={3} autoComplete="street-address" className="mt-1.5" aria-invalid={!!errors.address} aria-describedby="address-error" />
            {fieldError("address")}
          </div>
          <div>
            <Label htmlFor="city">Area / City *</Label>
            <Input id="city" value={details.city} onChange={update("city")} className="mt-1.5 h-11" aria-invalid={!!errors.city} aria-describedby="city-error" />
            {fieldError("city")}
          </div>
          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" value={details.notes} onChange={update("notes")} rows={2} className="mt-1.5" />
          </div>
          <NumberPicker value={sendTo} onChange={setSendTo} />
          <Button type="submit" variant="whatsapp" size="xl" className="mt-2 w-full">
            <WhatsAppIcon /> Place Order on WhatsApp
          </Button>
          <p className="text-center text-xs text-muted-foreground">WhatsApp opens with your order filled in — just press send.</p>
        </form>
      </section>
    </>
  );
}
