import { STORE } from "@/config/store";
import { waLink } from "@/lib/store";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./icons";

export function SocialLinks() {
  const links = [
    { href: STORE.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: STORE.social.tiktok, label: "TikTok", Icon: TikTokIcon },
    { href: STORE.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: waLink(STORE.contacts[0].wa, "Hi Lenszora!"), label: "WhatsApp", Icon: WhatsAppIcon },
  ];
  return (
    <div className="flex gap-3">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex size-11 items-center justify-center rounded-full border border-border text-gold transition-all hover:-translate-y-1 hover:border-gold hover:text-gold-light hover:shadow-gold"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
