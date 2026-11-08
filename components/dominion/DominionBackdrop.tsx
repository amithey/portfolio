'use client';

import { useEffect, useRef } from 'react';
import { soundFX } from './DominionAudio';

interface UnitBlip {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'tank' | 'naval' | 'air';
  faction: 'allied' | 'scout';
  trail: { x: number; y: number }[];
}

export function DominionBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let radarAngle = 0;
    let pulsePhase = 0;

    // Tactical units blips
    let units: UnitBlip[] = [];

    // Hexagon math
    const hexR = 34;
    const hexW = Math.sqrt(3) * hexR;
    const hexH = 2 * hexR;
    const vertDist = hexH * 0.75;

    // Tactical particles / embers
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 800,
      size: 1 + Math.random() * 2,
      vy: -(0.2 + Math.random() * 0.4),
      vx: (Math.random() - 0.5) * 0.2,
      opacity: 0.15 + Math.random() * 0.4,
      hue: Math.random() > 0.6 ? '#d9b66f' : '#6fb0ff',
    }));

    const initUnits = () => {
      units = [
        { x: width * 0.32, y: height * 0.45, vx: 0.15, vy: 0.08, type: 'tank', faction: 'allied', trail: [] },
        { x: width * 0.38, y: height * 0.52, vx: 0.12, vy: -0.05, type: 'tank', faction: 'allied', trail: [] },
        { x: width * 0.28, y: height * 0.58, vx: 0.08, vy: 0.12, type: 'tank', faction: 'allied', trail: [] },
        { x: width * 0.65, y: height * 0.28, vx: -0.35, vy: 0.18, type: 'air', faction: 'allied', trail: [] },
        { x: width * 0.72, y: height * 0.35, vx: -0.4, vy: 0.15, type: 'air', faction: 'allied', trail: [] },
        { x: width * 0.82, y: height * 0.68, vx: -0.08, vy: -0.1, type: 'naval', faction: 'scout', trail: [] },
        { x: width * 0.88, y: height * 0.75, vx: -0.1, vy: -0.08, type: 'naval', faction: 'scout', trail: [] },
      ];
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 750;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.forEach((p) => {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      });

      initUnits();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Mouse tracking for tactical target reticle
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = () => {
      soundFX.playTargetLock();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 180) * (60 * i - 30);
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Radar center point (tactical capital HQ)
      const radarX = width * 0.42;
      const radarY = height * 0.48;
      const radarRadius = Math.max(width, height) * 0.65;

      // 1. Draw Tactical Hexagonal Terrain Grid
      const cols = Math.ceil(width / hexW) + 2;
      const rows = Math.ceil(height / vertDist) + 2;

      ctx.lineWidth = 0.8;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * hexW + ((row % 2) * hexW) / 2;
          const cy = row * vertDist;

          // Territory highlight
          const isTerritory = (col * 3 + row * 7) % 11 === 0;
          const isFrontline = (col * 5 + row * 2) % 13 === 0;

          // Mouse proximity highlight
          const mouseDist = mouseRef.current.active
            ? Math.hypot(cx - mouseRef.current.x, cy - mouseRef.current.y)
            : 999;
          const isHovered = mouseDist < hexR * 1.5;

          drawHex(cx, cy, hexR - 1);

          if (isHovered) {
            ctx.fillStyle = 'rgba(217, 182, 111, 0.25)';
            ctx.fill();
            ctx.strokeStyle = '#d9b66f';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.lineWidth = 0.8;
          } else if (isTerritory) {
            const glow = 0.04 + Math.sin(pulsePhase + col) * 0.02;
            ctx.fillStyle = `rgba(217, 182, 111, ${glow})`;
            ctx.fill();
            ctx.strokeStyle = 'rgba(217, 182, 111, 0.22)';
            ctx.stroke();
          } else if (isFrontline) {
            ctx.fillStyle = 'rgba(111, 176, 255, 0.025)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(111, 176, 255, 0.12)';
            ctx.stroke();
          } else {
            ctx.strokeStyle = 'rgba(40, 65, 95, 0.25)';
            ctx.stroke();
          }

          if ((col + row * 3) % 8 === 0) {
            ctx.fillStyle = isTerritory ? 'rgba(217, 182, 111, 0.4)' : 'rgba(111, 176, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(cx, cy, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Tactical Concentric Radar Range Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(217, 182, 111, 0.09)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      [140, 260, 420, 600].forEach((r) => {
        ctx.beginPath();
        ctx.arc(radarX, radarY, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Tactical Crosshairs at Radar HQ
      ctx.strokeStyle = 'rgba(217, 182, 111, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(radarX - 35, radarY);
      ctx.lineTo(radarX + 35, radarY);
      ctx.moveTo(radarX, radarY - 35);
      ctx.lineTo(radarX, radarY + 35);
      ctx.stroke();

      // Golden diamond at HQ center
      ctx.fillStyle = '#d9b66f';
      ctx.beginPath();
      ctx.moveTo(radarX, radarY - 6);
      ctx.lineTo(radarX + 6, radarY);
      ctx.lineTo(radarX, radarY + 6);
      ctx.lineTo(radarX - 6, radarY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 3. Rotating Military Radar Sweep
      if (!prefersReducedMotion) {
        radarAngle += 0.012;
        pulsePhase += 0.03;
      }

      ctx.save();
      const sweepGradient = ctx.createRadialGradient(radarX, radarY, 0, radarX, radarY, radarRadius);
      sweepGradient.addColorStop(0, 'rgba(217, 182, 111, 0.15)');
      sweepGradient.addColorStop(0.5, 'rgba(111, 176, 255, 0.08)');
      sweepGradient.addColorStop(1, 'rgba(8, 18, 31, 0)');

      ctx.beginPath();
      ctx.moveTo(radarX, radarY);
      ctx.arc(radarX, radarY, radarRadius, radarAngle - 0.45, radarAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Sweep leading beam
      ctx.beginPath();
      ctx.moveTo(radarX, radarY);
      ctx.lineTo(radarX + Math.cos(radarAngle) * radarRadius, radarY + Math.sin(radarAngle) * radarRadius);
      ctx.strokeStyle = 'rgba(217, 182, 111, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(217, 182, 111, 0.8)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // 4. Tactical Units & Patrol Blips with Trails
      units.forEach((u) => {
        if (!prefersReducedMotion) {
          u.x += u.vx;
          u.y += u.vy;

          if (u.x < 50) u.vx = Math.abs(u.vx);
          if (u.x > width - 50) u.vx = -Math.abs(u.vx);
          if (u.y < 50) u.vy = Math.abs(u.vy);
          if (u.y > height - 50) u.vy = -Math.abs(u.vy);

          u.trail.unshift({ x: u.x, y: u.y });
          if (u.trail.length > 10) u.trail.pop();
        }

        ctx.beginPath();
        ctx.moveTo(u.x, u.y);
        u.trail.forEach((t) => {
          ctx.lineTo(t.x, t.y);
        });
        ctx.strokeStyle = u.faction === 'allied' ? 'rgba(217, 182, 111, 0.18)' : 'rgba(111, 176, 255, 0.18)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.shadowColor = u.faction === 'allied' ? '#d9b66f' : '#6fb0ff';
        ctx.shadowBlur = 8;
        ctx.fillStyle = u.faction === 'allied' ? '#d9b66f' : '#6fb0ff';

        if (u.type === 'air') {
          ctx.beginPath();
          ctx.arc(u.x, u.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (u.type === 'naval') {
          ctx.beginPath();
          ctx.moveTo(u.x, u.y - 3.5);
          ctx.lineTo(u.x + 3.5, u.y);
          ctx.lineTo(u.x, u.y + 3.5);
          ctx.lineTo(u.x - 3.5, u.y);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(u.x - 2, u.y - 2, 4, 4);
        }

        ctx.font = '8px monospace';
        ctx.fillStyle = 'rgba(157, 176, 200, 0.5)';
        ctx.fillText(u.type.toUpperCase(), u.x + 6, u.y + 3);
        ctx.restore();
      });

      // 5. Mouse Tactical Target Reticle
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        ctx.save();
        ctx.strokeStyle = '#d9b66f';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(mx - 24, my);
        ctx.lineTo(mx - 6, my);
        ctx.moveTo(mx + 6, my);
        ctx.lineTo(mx + 24, my);
        ctx.moveTo(mx, my - 24);
        ctx.lineTo(mx, my - 6);
        ctx.moveTo(mx, my + 6);
        ctx.lineTo(mx, my + 24);
        ctx.stroke();

        ctx.font = '9px monospace';
        ctx.fillStyle = '#d9b66f';
        ctx.fillText(`TARGET: [${Math.round(mx)}, ${Math.round(my)}]`, mx + 22, my - 6);
        ctx.restore();
      }

      // 6. Atmospheric Floating Embers / Tactical Particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        }

        ctx.fillStyle = p.hue;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-auto absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Tactical Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70 cursor-crosshair" />

      {/* Military CRT scanline effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 42, 71, 0) 50%, rgba(0, 0, 0, 0.5) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Atmospheric vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--dm-bg)] via-transparent to-[var(--dm-bg)]/80" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[var(--dm-bg)]/40 to-[var(--dm-bg)]" />
    </div>
  );
}
