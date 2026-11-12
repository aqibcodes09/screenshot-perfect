// Shop helpers: products, prices, and WhatsApp order messages.
// All editable data lives in src/config/store.ts.
import { STORE, type Collection, type Shade } from "@/config/store";

export type Product = {
  id: string;
  name: string;
  shade: Shade;
  collection: Collection;
  price: number;
  oldPrice?: number | undefined;
};

export type CartLine = { productId: string; qty: number };

export const collections: Collection[] = STORE.collections;

/** First number in the settings — used for the floating WhatsApp button and quick orders. */
export const primaryContact = STORE.contacts[0]!;

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function colorsLabel(c: Collection): string {
  return c.colorsLabel ?? `${c.shades.length} COLORS AVAILABLE`;
}

/** Every shade in every collection becomes one product. */
export const products: Product[] = collections.flatMap((collection) =>
  collection.shades.map((shade) => ({
    id: `${collection.slug}--${shade.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: shade.name,
    shade,
    collection,
    price: collection.price,
    oldPrice: collection.oldPrice,
  })),
);

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(amount: number): string {
  return `${STORE.currency} ${amount.toLocaleString("en-US")}`;
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const p = getProduct(line.productId);
    return p ? sum + p.price * line.qty : sum;
  }, 0);
}

export function waLink(waNumber: string, message: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export type CheckoutDetails = {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string | undefined;
};

export function buildOrderMessage(details: CheckoutDetails, lines: CartLine[]): string {
  const items = lines
    .map((line, i) => {
      const p = getProduct(line.productId);
      if (!p) return null;
      return `${i + 1}) ${p.collection.name} – Shade ${p.name} – Qty ${line.qty} – ${formatPrice(p.price * line.qty)}`;
    })
    .filter(Boolean)
    .join("\n");

  return [
    `New Order – Lenszora`,
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Address: ${details.address}`,
    `Area/City: ${details.city}`,
    details.notes ? `Notes: ${details.notes}` : null,
    `Items:\n${items}`,
    `Total: ${formatPrice(cartSubtotal(lines))}`,
    `Payment: ${STORE.paymentMethod}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildQuickOrderMessage(p: Product, qty: number): string {
  return [
    `Hi Lenszora! I'd like to order:`,
    `${p.collection.name} – Shade ${p.name} – Qty ${qty} – ${formatPrice(p.price * qty)}`,
    `Payment: ${STORE.paymentMethod}`,
    `Please confirm availability and delivery to ${STORE.deliveryCity}.`,
  ].join("\n");
}
