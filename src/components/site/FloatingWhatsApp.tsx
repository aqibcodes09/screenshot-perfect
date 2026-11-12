import { STORE } from "@/config/store";
import { waLink, primaryContact } from "@/lib/store";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(primaryContact.wa, "Hi Lenszora! I'd like to know more about your lenses.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-gold transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
