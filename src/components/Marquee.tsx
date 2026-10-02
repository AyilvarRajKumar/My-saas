const items = [
  'Web Development', 'Mobile Apps', 'Graphic Design', 'Motion Graphics',
  'AI Content', 'Creator Outreach', 'Branding', 'SaaS Growth',
];

/** Infinite, edge-faded text marquee (21st.dev style). Never pauses; not selectable or clickable. */
export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden py-8 border-y border-white/10 bg-background select-none pointer-events-none"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
      aria-hidden="true"
    >
      <div className="flex w-max animate-scroll">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 text-2xl md:text-4xl font-display font-bold text-white/40 whitespace-nowrap"
          >
            {item}
            <span className="text-accent-purple">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
