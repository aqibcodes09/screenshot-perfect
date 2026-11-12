export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <span className="gold-rule hidden w-16 sm:block sm:w-32" />
        <h2 className="text-2xl text-gold-gradient sm:text-4xl">{title}</h2>
        <span className="gold-rule hidden w-16 sm:block sm:w-32" />
      </div>
      {subtitle && <p className="mt-3 text-sm tracking-[0.25em] text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
