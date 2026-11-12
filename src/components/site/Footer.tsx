import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { STORE } from "@/config/store";
import { collections, waLink } from "@/lib/store";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const [email, setEmail] = useState("");

  // No email service yet: subscriptions are sent to the shop on WhatsApp.
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink(STORE.contacts[0].wa, `Hi Lenszora! Please add me to your updates: ${email}`), "_blank");
    setEmail("");
  };

  const heading = "mb-4 text-sm font-medium text-gold-light";
  const item = "block py-1 text-sm text-muted-foreground transition-colors hover:text-gold-light";

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.6fr]">
        <div className="flex items-start justify-center sm:justify-start">
          <Logo size="lg" />
        </div>
        <div>
          <h3 className={`${heading} font-sans tracking-normal`}>Quick Links</h3>
          <Link to="/" className={item}>Home</Link>
          <Link to="/shop" className={item}>Shop</Link>
          <Link to="/collections" className={item}>Collections</Link>
          <Link to="/about" className={item}>About Us</Link>
          <Link to="/contact" className={item}>Contact</Link>
        </div>
        <div>
          <h3 className={`${heading} font-sans tracking-normal`}>Shop By Collection</h3>
          {collections.map((c) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className={item}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3 className={`${heading} font-sans tracking-normal`}>Follow Us</h3>
          <SocialLinks />
        </div>
        <div>
          <h3 className={`${heading} font-sans tracking-normal`}>Subscribe for latest updates</h3>
          <form onSubmit={subscribe} className="flex items-center rounded-full border border-input p-1 focus-within:border-gold">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              className="h-10 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
            />
            <button type="submit" aria-label="Subscribe" className="flex size-10 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground transition hover:brightness-110">
              <ArrowRight className="size-4" />
            </button>
          </form>
          <p className="mt-6 -rotate-6 text-right font-script text-3xl text-gold">Thank you for choosing Lenszora ♡</p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground">© 2025 Lenszora. All rights reserved.</p>
      </div>
    </footer>
  );
}
