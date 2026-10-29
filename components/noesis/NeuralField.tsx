'use client';

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; glow: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number; hue: 'cyan' | 'amber' };

/**
 * A drifting field of neurons that fire along their links: a pulse travels an
 * edge, lights the neuron it reaches, and often carries on to a neighbour, so
 * activity cascades the way it does in the simulation. Pure decoration, so it
 * is aria-hidden, pauses when off screen or when the tab is hidden, and draws
 * a single still frame under prefers-reduced-motion.
 */
export function NeuralField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    const reach = () => Math.min(170, Math.max(100, w / 7));

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(130, Math.max(36, (w * h) / 9500)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        glow: 0,
        r: 1 + Math.random() * 1.7,
      }));
      pulses = [];
    };

    const neighbours = (i: number) => {
      const R = reach();
      const out: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < R * R) out.push(j);
      }
      return out;
    };

    const fireFrom = (i: number, hue: Pulse['hue']) => {
      const n = neighbours(i);
      if (!n.length || pulses.length > 46) return;
      pulses.push({
        a: i,
        b: n[(Math.random() * n.length) | 0],
        t: 0,
        speed: 0.0007 + Math.random() * 0.0007,
        hue,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = reach();
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const a = (1 - Math.sqrt(d2) / R) * 0.3;
            ctx.strokeStyle = `rgba(125,175,255,${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pulses) {
        const A = nodes[p.a];
        const B = nodes[p.b];
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const col = p.hue === 'amber' ? '251,191,36' : '94,234,212';
        ctx.fillStyle = `rgba(${col},0.18)`;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = `rgba(${col},0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, 6.283);
        ctx.fill();
      }
      for (const n of nodes) {
        if (n.glow > 0.02) {
          ctx.fillStyle = `rgba(251,191,36,${(n.glow * 0.22).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4 + n.glow * 12, 0, 6.283);
          ctx.fill();
        }
        ctx.fillStyle =
          n.glow > 0.2 ? `rgba(255,236,170,${0.55 + n.glow * 0.45})` : 'rgba(170,200,255,0.6)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.glow * 1.6, 0, 6.283);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min(now - last || 16, 50);
      last = now;
      for (const n of nodes) {
        n.x += n.vx * dt * 0.96;
        n.y += n.vy * dt * 0.96;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
        n.glow *= Math.pow(0.0035, dt / 1000);
      }
      if (Math.random() < dt * 0.0045) fireFrom((Math.random() * nodes.length) | 0, 'cyan');
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += p.speed * dt;
        if (p.t >= 1) {
          pulses.splice(k, 1);
          nodes[p.b].glow = 1;
          if (Math.random() < 0.62) fireFrom(p.b, Math.random() < 0.3 ? 'amber' : p.hue);
        }
      }
      draw();
    };

    build();
    const ro = new ResizeObserver(() => {
      build();
      if (reduced) draw();
    });
    ro.observe(canvas);

    if (reduced) {
      draw();
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
