import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

/** Cursor-reactive particle network: dots drift, link up, and chase the mouse. */
export default function MouseField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || prefersReducedMotion()) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004, vy: (Math.random() - 0.5) * 0.0004,
    }));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    window.addEventListener('pointermove', onMove);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const px = p.x * w, py = p.y * h;
        const dx = mouse.x - px, dy = mouse.y - py;
        const d = Math.hypot(dx, dy);
        if (d < 180) { // gentle pull toward the cursor
          p.x += (dx / w) * 0.012 * (1 - d / 180);
          p.y += (dy / h) * 0.012 * (1 - d / 180);
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const ax = a.x * w, ay = a.y * h;
        ctx.fillStyle = 'rgba(168,85,247,0.8)';
        ctx.beginPath(); ctx.arc(ax, ay, 1.8, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const bx = pts[j].x * w, by = pts[j].y * h;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 130) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * 0.35})`;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        }
        const md = Math.hypot(ax - mouse.x, ay - mouse.y);
        if (md < 200) {
          ctx.strokeStyle = `rgba(168,85,247,${(1 - md / 200) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" aria-hidden="true" />;
}
