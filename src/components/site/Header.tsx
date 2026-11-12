// Sticky header: announcement bar, logo, menu, search, account, cart.
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { STORE } from "@/config/store";
import { useCart } from "@/lib/cart";
import { collections, waLink } from "@/lib/store";
import { Logo } from "./Logo";

const navLink =
  "relative py-2 text-xs uppercase tracking-[0.2em] text-foreground/85 transition-colors hover:text-gold-light data-[status=active]:text-gold-light after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100 data-[status=active]:after:scale-x-100";

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <button type="button" className={`${navLink} inline-flex items-center gap-1`} aria-haspopup="true">
        {label} <ChevronDown className="size-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-lg border border-border bg-popover p-2 shadow-gold-soft">{children}</div>
      </div>
    </div>
  );
}

const dropItem =
  "block rounded-md px-4 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-accent hover:text-gold-light";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/shop", search: { q: query.trim() || undefined } });
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar */}
      <div className="bg-gold-gradient px-4 py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground sm:text-xs">
        {STORE.freeDeliveryNote} · Delivery across {STORE.deliveryCity} · {STORE.paymentMethod}
      </div>

      <div className="border-b border-border bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className="p-2 text-gold lg:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm border-border bg-ink p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col overflow-y-auto p-6">
                <Logo className="self-start" />
                <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/shop", label: "Shop All" },
                    { to: "/collections", label: "Collections" },
                    { to: "/about", label: "About Us" },
                    { to: "/contact", label: "Contact" },
                    { to: "/cart", label: `Cart (${count})` },
                  ].map((l) => (
                    <SheetClose asChild key={l.to}>
                      <Link
                        to={l.to}
                        className="border-b border-border/50 py-4 font-display text-lg tracking-[0.15em] text-foreground data-[status=active]:text-gold-light"
                        activeOptions={{ exact: true }}
                      >
                        {l.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <p className="mt-8 text-xs uppercase tracking-[0.25em] text-gold">Shop by collection</p>
                <div className="mt-3 flex flex-col">
                  {collections.map((c) => (
                    <SheetClose asChild key={c.slug}>
                      <Link to="/collections/$slug" params={{ slug: c.slug }} className="py-2.5 text-sm text-muted-foreground hover:text-gold-light">
                        {c.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            <Link to="/" className={navLink} activeOptions={{ exact: true }}>
              Home
            </Link>
            <Dropdown label="Shop">
              <Link to="/shop" className={dropItem}>
                All Products
              </Link>
              {collections.map((c) => (
                <Link key={c.slug} to="/shop" search={{ collection: c.slug }} className={dropItem}>
                  {c.name}
                </Link>
              ))}
            </Dropdown>
            <Dropdown label="Collections">
              <Link to="/collections" className={dropItem}>
                All Collections
              </Link>
              {collections.map((c) => (
                <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className={dropItem}>
                  {c.name}
                </Link>
              ))}
            </Dropdown>
            <Link to="/about" className={navLink}>
              About Us
            </Link>
            <Link to="/contact" className={navLink}>
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <button type="button" className="p-2 text-gold transition-colors hover:text-gold-light" aria-label="Search">
                  <Search className="size-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="border-border bg-popover">
                <DialogTitle className="text-gold-gradient">Search lenses</DialogTitle>
                <form onSubmit={submitSearch} className="mt-2 flex gap-2">
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try “blue”, “hazel”, “party”…"
                    className="h-11 flex-1 rounded-full border border-input bg-transparent px-5 text-sm outline-none focus:border-gold"
                    aria-label="Search products"
                  />
                  <Button type="submit" variant="goldSolid" size="pill">
                    Search
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="hidden p-2 text-gold transition-colors hover:text-gold-light sm:block" aria-label="Account">
                  <User className="size-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 border-border bg-popover text-sm">
                <p className="font-display text-gold-light">No account needed</p>
                <p className="mt-2 text-muted-foreground">
                  Add lenses to your cart and confirm your order on WhatsApp. For order updates, message us anytime.
                </p>
                <Button asChild variant="whatsapp" size="sm" className="mt-4 w-full">
                  <a href={waLink(STORE.contacts[0].wa, "Hi Lenszora! I have a question about my order.")} target="_blank" rel="noreferrer">
                    Message us
                  </a>
                </Button>
              </PopoverContent>
            </Popover>

            <Link to="/cart" className="relative p-2 text-gold transition-colors hover:text-gold-light" aria-label={`Cart, ${count} items`}>
              <ShoppingBag className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-gold-gradient text-[0.65rem] font-bold text-primary-foreground">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

