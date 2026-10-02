import { useEffect } from 'react';
import type { LegalDoc } from './legal';

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  useEffect(() => {
    document.title = `${doc.title} - Digital Presence Agency`;
    window.scrollTo(0, 0);
  }, [doc]);

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" aria-hidden="true" />
      <article className="relative max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent-cyan mb-4">Legal</p>
        <h1 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-4">
          <span className="gradient-text">{doc.title}</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">{doc.intro}</p>

        <div className="space-y-6">
          {doc.sections.map((s, i) => (
            <section key={s.heading} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
                <span className="font-mono text-sm text-accent-purple mr-3">{String(i + 1).padStart(2, '0')}</span>
                {s.heading}
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-3">{s.body}</div>
            </section>
          ))}
        </div>

        <a href="/" className="inline-block mt-12 text-accent-cyan underline underline-offset-4 hover:text-white transition-colors">
          &larr; Back to home
        </a>
      </article>
    </main>
  );
}
