import { STORE } from "@/config/store";
import { cn } from "@/lib/utils";

/** Lets the customer choose which WhatsApp number receives the message. */
export function NumberPicker({ value, onChange }: { value: string; onChange: (wa: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Send to which WhatsApp number? *</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {STORE.contacts.map((c) => (
          <label
            key={c.wa}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all",
              value === c.wa ? "border-gold bg-accent shadow-gold-soft" : "border-input hover:border-gold",
            )}
          >
            <input type="radio" name="wa-number" value={c.wa} checked={value === c.wa} onChange={() => onChange(c.wa)} className="accent-gold" />
            <span>
              <span className="block text-xs text-muted-foreground">{c.label}</span>
              <span className="font-semibold text-gold-light">{c.display}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
