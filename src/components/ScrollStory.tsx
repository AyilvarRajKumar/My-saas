import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

/**
 * Scroll-driven storytelling. A canvas "flipbook" of FRAMES frames is scrubbed
 * by scroll position while the section is pinned: a swarm of particles morphs
 * from loose ideas -> wireframe -> finished UI -> growth chart. The cursor
 * pushes particles around, so the scene reacts to the mouse too.
 */

const W = 1000;
const H = 600;
const N = 1400;
const FRAMES = 120;

type Rect = [number, number, number, number, number]; // x, y, w, h, colour (0 purple, 1 cyan, 2 white)

const PALETTE: [number, number, number][] = [
  [168, 85, 247],
  [34, 211, 238],
  [226, 232, 240],
];

const UI: Rect[] = [
  [150, 70, 700, 460, 2],
  [150, 70, 700, 50, 0],
  [170, 140, 150, 370, 0],
  [345, 140, 480, 120, 1],
  [345, 280, 225, 230, 0],
  [600, 280, 225, 230, 1],
];

const BARS: Rect[] = [
  [170, 400, 90, 110, 0],
  [290, 340, 90, 170, 0],
  [410, 270, 90, 240, 1],
  [530, 200, 90, 310, 1],
  [650, 120, 90, 390, 2],
];

const chapters = [
  { n: '01', title: 'It starts with an idea', body: 'Scattered thoughts, rough goals, a spark. You bring the vision, we listen.' },
  { n: '02', title: 'We give it structure', body: 'Strategy and wireframes turn the noise into a clear, purposeful layout.' },
  { n: '03', title: 'We bring it to life', body: 'Design, motion and code come together into a polished, working product.' },
  { n: '04', title: 'Then we help it grow', body: 'Launch, measure, improve. Your digital presence compounds month after month.' },
];

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Points along the outlines of rects. */
function outlineTargets(rects: Rect[], rand: () => number) {
  const out: number[] = [];
  const perim = rects.map((r) => 2 * (r[2] + r[3]));
  const total = perim.reduce((a, b) => a + b, 0);
  for (let i = 0; i < N; i++) {
    let d = (i / N) * total;
    let k = 0;
    while (d > perim[k]) d -= perim[k++];
    const [x, y, w, h, c] = rects[k];
    const t = d + rand() * 2;
    let px: number, py: number;
    if (t < w) { px = x + t; py = y; }
    else if (t < w + h) { px = x + w; py = y + (t - w); }
    else if (t < 2 * w + h) { px = x + w - (t - w - h); py = y + h; }
    else { px = x; py = y + h - (t - 2 * w - h); }
    out.push(px, py, c);
  }
  return out;
}

/** Points scattered inside rects, weighted by area. */
function fillTargets(rects: Rect[], rand: () => number) {
  const out: number[] = [];
  const areas = rects.map((r) => r[2] * r[3]);
  const total = areas.reduce((a, b) => a + b, 0);
  for (let i = 0; i < N; i++) {
    let d = rand() * total;
    let k = 0;
    while (d > areas[k] && k < rects.length - 1) d -= areas[k++];
    const [x, y, w, h, c] = rects[k];
    out.push(x + rand() * w, y + rand() * h, c);
  }
  return out;
}

function buildScenes() {
  const rand = rng(7);
  const scatter: number[] = [];
  for (let i = 0; i < N; i++) scatter.push(rand() * W, rand() * H, Math.floor(rand() * 3));
  const growth = fillTargets(BARS, rand);
  // a rising trend line through the bars
  const lineN = 160;
  for (let i = 0; i < lineN; i++) {
    const t = i / (lineN - 1);
    growth[i * 3] = 130 + t * 640;
    growth[i * 3 + 1] = 470 - t * t * 330 - t * 40;
    growth[i * 3 + 2] = 2;
  }
  return [scatter, outlineTargets(UI, rand), fillTargets(UI, rand), growth];
}

const ease = (t: number) => t * t * (3 - 2 * t);

export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chapter, setChapter] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const scenes = buildScenes();
    const vel = new Float32Array(N * 2); // mouse displacement offsets
    const drift = new Float32Array(N * 2);
    const dr = rng(11);
    for (let i = 0; i < N * 2; i++) drift[i] = dr() * Math.PI * 2;

    const mouse = { x: -9999, y: -9999 };
    let progress = reduced ? 1 : 0;
    let visible = true;
    let scale = 1;
    let lastFrame = -1;
    let lastChapter = -1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      scale = (r.width * dpr) / W;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * W;
      mouse.y = ((e.clientY - r.top) / r.height) * H;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const draw = (time: number) => {
      if (!visible) return;
      // Flipbook: snap scroll progress to discrete frames.
      const fIdx = Math.round(progress * (FRAMES - 1));
      const p = fIdx / (FRAMES - 1);
      const seg = Math.min(p * 3, 2.9999);
      const a = Math.floor(seg);
      const f = ease(Math.min(1, Math.max(0, (seg - a - 0.2) / 0.6)));
      const from = scenes[a];
      const to = scenes[a + 1];
      const t = time / 1000;

      if (fIdx !== lastFrame) { lastFrame = fIdx; setFrame(fIdx + 1); }
      const ch = Math.min(3, Math.floor(p * 4));
      if (ch !== lastChapter) { lastChapter = ch; setChapter(ch); }

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      const looseness = a === 0 ? 1 - f : 0; // scatter scene wobbles
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const i2 = i * 2;
        let x = from[i3] + (to[i3] - from[i3]) * f;
        let y = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * f;
        const wob = 6 + looseness * 14;
        x += Math.sin(t * 0.8 + drift[i2]) * wob * (0.3 + looseness);
        y += Math.cos(t * 0.7 + drift[i2 + 1]) * wob * (0.3 + looseness);

        // cursor repel with springy return
        const dx = x + vel[i2] - mouse.x;
        const dy = y + vel[i2 + 1] - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110) {
          const d = Math.sqrt(d2) || 1;
          const push = (1 - d / 110) * 9;
          vel[i2] += (dx / d) * push;
          vel[i2 + 1] += (dy / d) * push;
        }
        vel[i2] *= 0.9;
        vel[i2 + 1] *= 0.9;
        x += vel[i2];
        y += vel[i2 + 1];

        const c0 = PALETTE[from[i3 + 2]];
        const c1 = PALETTE[to[i3 + 2]];
        const r = c0[0] + (c1[0] - c0[0]) * f;
        const g = c0[1] + (c1[1] - c0[1]) * f;
        const b = c0[2] + (c1[2] - c0[2]) * f;
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},0.75)`;
        ctx.fillRect(x - 1.4, y - 1.4, 2.8, 2.8);
      }
      ctx.globalCompositeOperation = 'source-over';
    };
    gsap.ticker.add(draw);

    let st: ScrollTrigger | undefined;
    if (!reduced) {
      st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: true,
        onUpdate: (self) => { progress = self.progress; },
        onToggle: (self) => { visible = self.isActive || self.progress > 0; },
      });
    }
    // Draw once even when not pinned (reduced motion).
    if (reduced) { draw(0); setChapter(3); setFrame(FRAMES); }

    return () => {
      gsap.ticker.remove(draw);
      st?.kill();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative z-[6] min-h-screen bg-background overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 gradient-mesh pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan uppercase mb-4">Our story, frame by frame</p>
          <div className="relative min-h-[11rem]">
            {chapters.map((c, i) => (
              <div
                key={c.n}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === chapter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
                aria-hidden={i !== chapter}
              >
                <div className="text-6xl md:text-7xl font-num font-semibold gradient-text mb-2">{c.n}</div>
                <h2 className="font-heading text-2xl md:text-4xl font-semibold text-white mb-3">{c.title}</h2>
                <p className="text-gray-400 max-w-md">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4 text-xs text-gray-500 font-mono">
            <span>FRAME {String(frame).padStart(3, '0')}/{FRAMES}</span>
            <div className="h-px flex-1 max-w-[12rem] bg-white/10 relative">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-purple to-accent-cyan"
                style={{ width: `${(frame / FRAMES) * 100}%` }}
              />
            </div>
            <span className="hidden sm:inline">Move your cursor over the scene</span>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <canvas
            ref={canvasRef}
            className="w-full aspect-[5/3] rounded-3xl border border-white/10 bg-white/[0.02] touch-pan-y"
            aria-label="Animated story: an idea becomes a designed, built and growing product"
            role="img"
          />
        </div>
      </div>
    </section>
  );
}
