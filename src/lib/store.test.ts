import { describe, expect, it } from "vitest";
import { buildOrderMessage, cartSubtotal, formatPrice, getCollection, products, waLink } from "@/lib/store";

const partyId = products.find((p) => p.collection.slug === "party-wear")!.id;
const auraId = products.find((p) => p.collection.slug === "aura-collection")!.id;

describe("store rules", () => {
  it("collection prices match the brief", () => {
    expect(getCollection("one-day-lenses")?.price).toBe(800);
    expect(getCollection("aura-collection")?.price).toBe(100);
    expect(getCollection("party-wear")?.price).toBe(1500);
    expect(getCollection("party-wear")?.oldPrice).toBe(3000);
    expect(getCollection("daily-wear")?.price).toBe(2000);
    expect(getCollection("daily-wear")?.oldPrice).toBe(4000);
  });

  it("subtotal adds price × quantity", () => {
    expect(cartSubtotal([{ productId: partyId, qty: 2 }, { productId: auraId, qty: 3 }])).toBe(3300);
  });

  it("formats rupees with commas", () => {
    expect(formatPrice(1500)).toBe("Rs. 1,500");
  });

  it("order message includes total and cash on delivery", () => {
    const msg = buildOrderMessage(
      { name: "Ayesha", phone: "03001234567", address: "House 1", city: "Karachi" },
      [{ productId: partyId, qty: 2 }],
    );
    expect(msg).toContain("New Order – Lenszora");
    expect(msg).toContain("Qty 2 – Rs. 3,000");
    expect(msg).toContain("Total: Rs. 3,000");
    expect(msg).toContain("Payment: Cash on Delivery");
  });

  it("WhatsApp link goes to the chosen number", () => {
    expect(waLink("923333635564", "Hi there")).toBe("https://wa.me/923333635564?text=Hi%20there");
  });
});
