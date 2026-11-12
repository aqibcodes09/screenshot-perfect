import { SectionHeading } from "./SectionHeading";

export function PageHeader({ title, subtitle, script }: { title: string; subtitle?: string; script?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-14 sm:py-20">
      <SectionHeading title={title} subtitle={subtitle} />
      {script && <p className="mt-4 text-center font-script text-3xl text-gold sm:text-4xl">{script}</p>}
    </section>
  );
}
