// CONTACT PAGE — call, WhatsApp, Instagram, and a form that sends to WhatsApp.
import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/icons";
import { NumberPicker } from "@/components/site/NumberPicker";
import { PageHeader } from "@/components/site/PageHeader";
import { SocialLinks } from "@/components/site/SocialLinks";
import { STORE } from "@/config/store";
import { waLink, primaryContact } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Lenszora — WhatsApp, Call & Instagram" },
      { name: "description", content: "Call or WhatsApp Lenszora on 0333 3635564 or 0327 2356067, or DM us on Instagram @lenszora.pk." },
      { property: "og:title", content: "Contact Lenszora" },
      { property: "og:description", content: "WhatsApp, call or DM us — we're here 24/7." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [sendTo, setSendTo] = useState<string>(primaryContact.wa);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || form.message.trim().length < 3) {
      setError("Please enter your name and a message.");
      return;
    }
    setError("");
    window.location.href = waLink(sendTo, `Hi Lenszora! My name is ${form.name}.\n${form.message}`);
  };

  return (
    <>
      <PageHeader title="CONTACT US" subtitle="24/7 Support · DM for any query" />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {STORE.contacts.map((c) => (
            <div key={c.wa} className="gold-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.label}</p>
              <a href={`tel:+${c.wa}`} className="mt-1 block font-display text-2xl text-gold-light hover:underline">
                {c.display}
              </a>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Button asChild variant="gold" size="pill">
                  <a href={`tel:+${c.wa}`}><Phone /> Call Now</a>
                </Button>
                <Button asChild variant="whatsapp" size="pill">
                  <a href={waLink(c.wa, "Hi Lenszora!")} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>
                </Button>
              </div>
            </div>
          ))}
          <div className="gold-card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Instagram</p>
            <p className="mt-1 font-display text-2xl text-gold-light">{STORE.social.instagramHandle}</p>
            <Button asChild variant="goldSolid" size="pill" className="mt-4 w-full sm:w-auto">
              <a href={STORE.social.instagram} target="_blank" rel="noreferrer"><InstagramIcon /> DM on Instagram</a>
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-6">
            <span className="text-sm text-muted-foreground">Follow us</span>
            <SocialLinks />
          </div>
          <p className="text-xs text-muted-foreground">{STORE.freeDeliveryNote}. We deliver across {STORE.deliveryCity}.</p>
        </div>

        <form onSubmit={submit} noValidate className="gold-card flex flex-col gap-4 p-6 hover:translate-y-0">
          <h2 className="text-xl text-gold-gradient">SEND A MESSAGE</h2>
          <div>
            <Label htmlFor="c-name">Your Name *</Label>
            <Input id="c-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="c-msg">Message *</Label>
            <Textarea id="c-msg" rows={6} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="mt-1.5" />
          </div>
          <NumberPicker value={sendTo} onChange={setSendTo} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="whatsapp" size="xl" className="w-full">
            <WhatsAppIcon /> Send on WhatsApp
          </Button>
        </form>
      </section>
    </>
  );
}
