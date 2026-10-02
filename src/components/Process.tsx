import SplitHeading from './SplitHeading';
import { motion, animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { HiSearch, HiPencil, HiCog, HiCheckCircle } from 'react-icons/hi';

const steps = [
  {
    number: '01',
    icon: HiSearch,
    title: 'Discover',
    description: 'We map your goals, audience and market, then lock the requirements into a written agreement.',
    count: 3,
    suffix: '',
    unit: 'days',
    note: 'Requirements & timeline signed off',
    tint: 'from-violet-500/30 via-violet-500/10 to-transparent',
    accent: 'text-violet-300',
    bar: 'from-violet-400 to-fuchsia-400',
    ring: 'hover:border-violet-400/70 hover:shadow-violet-500/30',
    chip: 'bg-violet-400/15 text-violet-200',
    fill: 25,
  },
  {
    number: '02',
    icon: HiPencil,
    title: 'Design',
    description: 'Wireframes and polished visuals that match your brand, reviewed with you before any code.',
    count: 7,
    suffix: '',
    unit: 'days',
    note: 'Wireframes to final visuals',
    tint: 'from-cyan-500/30 via-cyan-500/10 to-transparent',
    accent: 'text-cyan-300',
    bar: 'from-cyan-400 to-sky-400',
    ring: 'hover:border-cyan-400/70 hover:shadow-cyan-500/30',
    chip: 'bg-cyan-400/15 text-cyan-200',
    fill: 50,
  },
  {
    number: '03',
    icon: HiCog,
    title: 'Develop',
    description: 'Clean, scalable code and smooth motion, built to the agreed scope with regular progress updates.',
    count: 21,
    suffix: '',
    unit: 'days',
    note: 'Build, test, iterate',
    tint: 'from-pink-500/30 via-pink-500/10 to-transparent',
    accent: 'text-pink-300',
    bar: 'from-pink-400 to-rose-400',
    ring: 'hover:border-pink-400/70 hover:shadow-pink-500/30',
    chip: 'bg-pink-400/15 text-pink-200',
    fill: 75,
  },
  {
    number: '04',
    icon: HiCheckCircle,
    title: 'Deliver',
    description: 'We check the finished work against every requirement. You pay only once it is complete.',
    count: 100,
    suffix: '%',
    unit: 'checked',
    note: 'Payment after completion',
    tint: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
    accent: 'text-emerald-300',
    bar: 'from-emerald-400 to-teal-400',
    ring: 'hover:border-emerald-400/70 hover:shadow-emerald-500/30',
    chip: 'bg-emerald-400/15 text-emerald-200',
    fill: 100,
  },
];

function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!start || !ref.current) return;
    const el = ref.current;
    if (reduce) { el.textContent = `${to}${suffix}`; return; }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => { el.textContent = `${Math.round(v)}${suffix}`; },
    });
    return () => controls.stop();
  }, [start, to, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}

const Process = () => {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.25 });

  return (
    <section id="process" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent-cyan mb-4">Our process</p>
          <SplitHeading className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            How It <span className="gradient-text">Works</span>
          </SplitHeading>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Four clear steps, one after the other, with a written agreement before we start.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={reduce ? undefined : { opacity: 0, y: 60, scale: 0.95 }}
              animate={inView || reduce ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.7, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`card-hover group relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 flex flex-col hover:shadow-2xl ${step.ring}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.tint} pointer-events-none`} aria-hidden="true" />

              <div className="relative flex items-center justify-between mb-8">
                <span className={`font-mono text-xs px-3 py-1 rounded-full ${step.chip}`}>STEP {step.number}</span>
                <step.icon className={`text-2xl ${step.accent} transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6`} />
              </div>

              <div className="relative mb-2 flex items-baseline gap-2">
                <span className={`font-num text-6xl font-bold leading-none ${step.accent}`}>
                  <CountUp to={step.count} suffix={step.suffix} start={inView} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400">{step.unit}</span>
              </div>
              <p className="relative font-mono text-[11px] uppercase tracking-wide text-gray-500 mb-6">{step.note}</p>

              <h3 className="relative font-heading text-2xl font-extrabold text-white mb-2">{step.title}</h3>
              <p className="relative text-gray-400 text-sm leading-relaxed flex-1">{step.description}</p>

              <div className="relative mt-6 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${step.bar}`}
                  initial={reduce ? undefined : { width: 0 }}
                  animate={inView || reduce ? { width: `${step.fill}%` } : undefined}
                  transition={{ duration: 1.2, delay: i * 0.25 + 0.4, ease: 'easeOut' }}
                  style={reduce ? { width: `${step.fill}%` } : undefined}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
