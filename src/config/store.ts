/* =====================================================================
 *  LENSZORA — STORE SETTINGS
 *  ✏️  EDIT HERE  ✏️
 *
 *  Everything a shop owner normally changes lives in this ONE file:
 *  - prices and old (crossed-out) prices
 *  - collections and their shades (name + colour)
 *  - WhatsApp / phone numbers
 *  - Instagram, TikTok, Facebook links
 *
 *  Save the file and the whole website updates automatically.
 * ===================================================================== */

// Collection photos. To change a photo, replace the file in src/assets/
// with a new one using the SAME file name.
import eyeOneDay from "@/assets/eye-oneday.jpg";
import eyeAura from "@/assets/eye-aura.jpg";
import eyeParty from "@/assets/eye-party.jpg";
import eyeDaily from "@/assets/eye-daily.jpg";

export type Shade = {
  /** Shade name shown to customers, e.g. "Ocean Blue" */
  name: string;
  /** Colour of the round swatch (any CSS colour, e.g. "#4a7fb5") */
  color: string;
};

export type Collection = {
  /** Used in the web address: /collections/<slug>. Use lowercase-with-dashes. */
  slug: string;
  name: string;
  /** Short line under the name, e.g. "Bold • Glamorous • Unforgettable" */
  tagline: string;
  /** Selling price in rupees (numbers only, no commas) */
  price: number;
  /** Old price for discounts (crossed out). Leave out if no discount. */
  oldPrice?: number | undefined;
  /** Text inside the gold badge for discounts, e.g. "50% OFF" */
  discountLabel?: string | undefined;
  /** Text like "5 COLORS AVAILABLE". Leave out to auto-count the shades. */
  colorsLabel?: string | undefined;
  description: string;
  image: string;
  shades: Shade[];
};

export const STORE = {
  /* ---------- Brand ---------- */
  brandName: "LENSZORA",
  tagline: "Your Eyes. Your Choice.",
  currency: "Rs.",

  /* ---------- Delivery ---------- */
  deliveryCity: "Karachi",
  freeDeliveryNote: "Free delivery on first 10 orders",
  paymentMethod: "Cash on Delivery",

  /* ---------- WhatsApp / Call numbers ----------
   * display = how the number is shown on the site
   * wa      = the same number in international format, digits only (92 + number without the first 0)
   */
  contacts: [
    { label: "WhatsApp / Call 1", display: "0333 3635564", wa: "923333635564" },
    { label: "WhatsApp / Call 2", display: "0327 2356067", wa: "923272356067" },
  ],

  /* ---------- Social links ---------- */
  social: {
    instagram: "https://instagram.com/lenszora.pk",
    instagramHandle: "@lenszora.pk",
    tiktok: "https://www.tiktok.com/@lenszora", // placeholder — replace with your real TikTok
    facebook: "https://www.facebook.com/lenszora", // placeholder — replace with your real Facebook
  },

  /* ---------- Collections & shades ---------- */
  collections: [
    {
      slug: "one-day-lenses",
      name: "One Day Lenses",
      tagline: "Fresh Look • Daily Use • 1 Day Only",
      price: 800,
      description:
        "Single-use lenses for a fresh, effortless look. Wear once, enjoy all day, and throw away — no cleaning needed.",
      image: eyeOneDay,
      shades: [
        { name: "Ice Blue", color: "#7ea7c9" },
        { name: "Mist Grey", color: "#9aa3ab" },
        { name: "Caramel", color: "#b07b45" },
        { name: "Honey", color: "#c39a52" },
        { name: "Sage Green", color: "#7f9a6a" },
      ],
    },
    {
      slug: "aura-collection",
      name: "Aura Collection",
      tagline: "12+ Stunning Shades",
      price: 100,
      colorsLabel: "12+ COLORS AVAILABLE",
      description:
        "Our signature range with more than twelve shades — from soft natural tones to vivid statement colours.",
      image: eyeAura,
      shades: [
        { name: "Violet", color: "#7a5fb8" },
        { name: "Sapphire", color: "#3f6fb5" },
        { name: "Aqua", color: "#3d9fb0" },
        { name: "Rose", color: "#b8707a" },
        { name: "Amber", color: "#c98a2e" },
        { name: "Hazel", color: "#a3824a" },
        { name: "Emerald", color: "#4f9a6e" },
        { name: "Pink Blush", color: "#c47b98" },
        { name: "Silver", color: "#a7adb3" },
        { name: "Chestnut", color: "#8a5a35" },
        { name: "Olive", color: "#8a8f4c" },
        { name: "Turquoise", color: "#3fb3a5" },
      ],
    },
    {
      slug: "party-wear",
      name: "Party Wear",
      tagline: "Bold • Glamorous • Unforgettable",
      price: 1500,
      oldPrice: 3000,
      discountLabel: "50% OFF",
      description:
        "Bright, eye-catching shades made for weddings, parties and every night you want to stand out.",
      image: eyeParty,
      shades: [
        { name: "Glam Grey", color: "#a8aeb6" },
        { name: "Dusty Pink", color: "#b88c86" },
        { name: "Royal Blue", color: "#4b7fbf" },
        { name: "Golden Topaz", color: "#c9a04a" },
        { name: "Jade", color: "#6fa07c" },
        { name: "Mint", color: "#8fbfa4" },
      ],
    },
    {
      slug: "daily-wear",
      name: "Daily Wear",
      tagline: "Natural • Comfortable • Everyday",
      price: 2000,
      oldPrice: 4000,
      discountLabel: "50% OFF",
      description:
        "Soft, natural shades you can wear every day — comfortable from morning to night.",
      image: eyeDaily,
      shades: [
        { name: "Natural Grey", color: "#8e959b" },
        { name: "Cocoa", color: "#8a6142" },
        { name: "Hazel Brown", color: "#a37a45" },
        { name: "Light Brown", color: "#b08a5a" },
        { name: "Olive Green", color: "#7c8a5a" },
      ],
    },
  ] satisfies Collection[],
};
/* ===================== END OF EDITABLE SETTINGS ===================== */
