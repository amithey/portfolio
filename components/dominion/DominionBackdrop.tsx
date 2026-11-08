'use client';

import { useEffect, useRef } from 'react';
import { soundFX } from './DominionAudio';

export type DominionSeason = 'spring' | 'winter' | 'night';

interface UnitBlip {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'tank' | 'naval' | 'air';
  faction: 'allied' | 'scout';
  trail: { x: number; y: number }[];
}

interface Projectile {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  progress: number;
  speed: number;
  trail: { x: number; y: number }[];
  impacted: boolean;
  impactRadius: number;
}

export function DominionBackdrop({ season = 'spring' }: { season?: DominionSeason }) {
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
    let tickCount = 0;

    let units: UnitBlip[] = [];
    const projectiles: Projectile[] = [];

    // Hexagon math
    const hexR = 34;
    const hexW = Math.sqrt(3) * hexR;
    const hexH = 2 * hexR;
    const vertDist = hexH * 0.75;

    // Environmental particles (Snowflakes for winter, embers for spring, scan-photons for night)
    const particleCount = season === 'winter' ? 110 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 800,
      size: season === 'winter' ? 1.5 + Math.random() * 2.5 : 1 + Math.random() * 2,
      vy: season === 'winter' ? 0.8 + Math.random() * 1.6 : -(0.2 + Math.random() * 0.4),
      vx: season === 'winter' ? 0.4 + Math.sin(Math.random() * 10) * 0.5 : (Math.random() - 0.5) * 0.2,
      opacity: season === 'winter' ? 0.3 + Math.random() * 0.5 : 0.15 + Math.random() * 0.4,
    }));

    const initUnits = () => {
      units = [
        { x: width * 0.28, y: height * 0.45, vx: 0.15, vy: 0.08, type: 'tank', faction: 'allied', trail: [] },
        { x: width * 0.35, y: height * 0.52, vx: 0.12, vy: -0.05, type: 'tank', faction: 'allied', trail: [] },
        { x: width * 0.22, y: height * 0.58, vx: 0.08, vy: 0.12, type: 'tank', faction: 'allied', trail: [] },
        { x: width * 0.62, y: height * 0.28, vx: -0.35, vy: 0.18, type: 'air', faction: 'allied', trail: [] },
        { x: width * 0.70, y: height * 0.35, vx: -0.4, vy: 0.15, type: 'air', faction: 'allied', trail: [] },
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

    const spawnCombatTracer = (targetX: number, targetY: number) => {
      const startX = width * 0.3 + (Math.random() - 0.5) * 80;
      const startY = height * 0.55 + (Math.random() - 0.5) * 60;
      projectiles.push({
        startX,
        startY,
        targetX,
        targetY,
        x: startX,
        y: startY,
        progress: 0,
        speed: 0.02 + Math.random() * 0.015,
        trail: [],
        impacted: false,
        impactRadius: 0,
      });
      soundFX.playArtilleryBlast();
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      soundFX.playTargetLock();
      spawnCombatTracer(clickX, clickY);
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
      tickCount++;

      // Automated ambient artillery exchange every 140 ticks
      if (!prefersReducedMotion && tickCount % 140 === 0 && projectiles.length < 3) {
        const targetX = width * 0.75 + (Math.random() - 0.5) * 150;
        const targetY = height * 0.4 + (Math.random() - 0.5) * 120;
        spawnCombatTracer(targetX, targetY);
      }

      const radarX = width * 0.42;
      const radarY = height * 0.48;
      const radarRadius = Math.max(width, height) * 0.65;

      // Theme Colors
      const isNight = season === 'night';
      const isWinter = season === 'winter';

      const gridStroke = isNight
        ? 'rgba(74, 222, 128, 0.2)'
        : isWinter
        ? 'rgba(186, 230, 253, 0.22)'
        : 'rgba(40, 65, 95, 0.28)';

      const primaryGlow = isNight ? '#4ade80' : isWinter ? '#bae6fd' : '#d9b66f';

      // 1. Draw Hexagonal Grid
      const cols = Math.ceil(width / hexW) + 2;
      const rows = Math.ceil(height / vertDist) + 2;

      ctx.lineWidth = 0.8;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * hexW + ((row % 2) * hexW) / 2;
          const cy = row * vertDist;

          const isTerritory = (col * 3 + row * 7) % 11 === 0;
          const isFrontline = (col * 5 + row * 2) % 13 === 0;

          const mouseDist = mouseRef.current.active
            ? Math.hypot(cx - mouseRef.current.x, cy - mouseRef.current.y)
            : 999;
          const isHovered = mouseDist < hexR * 1.4;

          drawHex(cx, cy, hexR - 1);

          if (isHovered) {
            ctx.fillStyle = isNight
              ? 'rgba(74, 222, 128, 0.28)'
              : isWinter
              ? 'rgba(186, 230, 253, 0.3)'
              : 'rgba(217, 182, 111, 0.3)';
            ctx.fill();
            ctx.strokeStyle = primaryGlow;
            ctx.lineWidth = 1.6;
            ctx.stroke();
            ctx.lineWidth = 0.8;
          } else if (isTerritory) {
            const glow = 0.04 + Math.sin(pulsePhase + col) * 0.025;
            ctx.fillStyle = isNight
              ? `rgba(74, 222, 128, ${glow * 1.5})`
              : isWinter
              ? `rgba(186, 230, 253, ${glow * 1.8})`
              : `rgba(217, 182, 111, ${glow * 1.2})`;
            ctx.fill();
            ctx.strokeStyle = isNight
              ? 'rgba(74, 222, 128, 0.35)'
              : isWinter
              ? 'rgba(186, 230, 253, 0.35)'
              : 'rgba(217, 182, 111, 0.28)';
            ctx.stroke();
          } else if (isFrontline) {
            ctx.fillStyle = 'rgba(111, 176, 255, 0.04)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(111, 176, 255, 0.16)';
            ctx.stroke();
          } else {
            ctx.strokeStyle = gridStroke;
            ctx.stroke();
          }

          if ((col + row * 3) % 8 === 0) {
            ctx.fillStyle = isTerritory ? primaryGlow : 'rgba(111, 176, 255, 0.35)';
            ctx.beginPath();
            ctx.arc(cx, cy, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Tactical Concentric Radar Rings & HQ
      ctx.save();
      ctx.strokeStyle = isNight
        ? 'rgba(74, 222, 128, 0.12)'
        : isWinter
        ? 'rgba(186, 230, 253, 0.12)'
        : 'rgba(217, 182, 111, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      [140, 260, 420, 600].forEach((r) => {
        ctx.beginPath();
        ctx.arc(radarX, radarY, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Tactical Crosshairs at Radar HQ
      ctx.strokeStyle = isNight ? 'rgba(74, 222, 128, 0.3)' : 'rgba(217, 182, 111, 0.25)';
      ctx.beginPath();
      ctx.moveTo(radarX - 35, radarY);
      ctx.lineTo(radarX + 35, radarY);
      ctx.moveTo(radarX, radarY - 35);
      ctx.lineTo(radarX, radarY + 35);
      ctx.stroke();

      ctx.fillStyle = primaryGlow;
      ctx.beginPath();
      ctx.moveTo(radarX, radarY - 6);
      ctx.lineTo(radarX + 6, radarY);
      ctx.lineTo(radarX, radarY + 6);
      ctx.lineTo(radarX - 6, radarY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 3. Rotating Radar Sweep
      if (!prefersReducedMotion) {
        radarAngle += 0.012;
        pulsePhase += 0.03;
      }

      ctx.save();
      const sweepGradient = ctx.createRadialGradient(radarX, radarY, 0, radarX, radarY, radarRadius);
      sweepGradient.addColorStop(
        0,
        isNight
          ? 'rgba(74, 222, 128, 0.22)'
          : isWinter
          ? 'rgba(186, 230, 253, 0.2)'
          : 'rgba(217, 182, 111, 0.2)'
      );
      sweepGradient.addColorStop(0.5, 'rgba(111, 176, 255, 0.08)');
      sweepGradient.addColorStop(1, 'rgba(8, 18, 31, 0)');

      ctx.beginPath();
      ctx.moveTo(radarX, radarY);
      ctx.arc(radarX, radarY, radarRadius, radarAngle - 0.45, radarAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(radarX, radarY);
      ctx.lineTo(radarX + Math.cos(radarAngle) * radarRadius, radarY + Math.sin(radarAngle) * radarRadius);
      ctx.strokeStyle = primaryGlow;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = primaryGlow;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // 4. Combat Projectiles & Impact Bursts
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        if (!p.impacted) {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.impacted = true;
            p.x = p.targetX;
            p.y = p.targetY;
          } else {
            // Ballistic arc height
            const arcH = Math.sin(p.progress * Math.PI) * 90;
            p.x = p.startX + (p.targetX - p.startX) * p.progress;
            p.y = p.startY + (p.targetY - p.startY) * p.progress - arcH;
            p.trail.unshift({ x: p.x, y: p.y });
            if (p.trail.length > 8) p.trail.pop();
          }

          // Draw tracer
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          p.trail.forEach((t) => ctx.lineTo(t.x, t.y));
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Expanding impact burst
          p.impactRadius += 1.8;
          const alpha = Math.max(0, 1 - p.impactRadius / 26);
          ctx.save();
          ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.targetX, p.targetY, p.impactRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();

          if (p.impactRadius >= 26) {
            projectiles.splice(i, 1);
          }
        }
      }

      // 5. Units Patrol with Trails
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
        u.trail.forEach((t) => ctx.lineTo(t.x, t.y));
        ctx.strokeStyle = u.faction === 'allied' ? 'rgba(217, 182, 111, 0.22)' : 'rgba(111, 176, 255, 0.22)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.shadowColor = u.faction === 'allied' ? primaryGlow : '#6fb0ff';
        ctx.shadowBlur = 8;
        ctx.fillStyle = u.faction === 'allied' ? primaryGlow : '#6fb0ff';

        if (u.type === 'air') {
          ctx.beginPath();
          ctx.arc(u.x, u.y, 2.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (u.type === 'naval') {
          ctx.beginPath();
          ctx.moveTo(u.x, u.y - 4);
          ctx.lineTo(u.x + 4, u.y);
          ctx.lineTo(u.x, u.y + 4);
          ctx.lineTo(u.x - 4, u.y);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(u.x - 2.5, u.y - 2.5, 5, 5);
        }

        ctx.font = '8px monospace';
        ctx.fillStyle = 'rgba(157, 176, 200, 0.6)';
        ctx.fillText(u.type.toUpperCase(), u.x + 6, u.y + 3);
        ctx.restore();
      });

      // 6. Mouse Reticle
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        ctx.save();
        ctx.strokeStyle = primaryGlow;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mx, my, 20, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(mx - 28, my);
        ctx.lineTo(mx - 8, my);
        ctx.moveTo(mx + 8, my);
        ctx.lineTo(mx + 28, my);
        ctx.moveTo(mx, my - 28);
        ctx.lineTo(mx, my - 8);
        ctx.moveTo(mx, my + 8);
        ctx.lineTo(mx, my + 28);
        ctx.stroke();

        ctx.font = '9px monospace';
        ctx.fillStyle = primaryGlow;
        ctx.fillText(`TARGET: [${Math.round(mx)}, ${Math.round(my)}] CLICK TO FIRE`, mx + 24, my - 6);
        ctx.restore();
      }

      // 7. Atmospheric Snow / Embers
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.y += p.vy;
          p.x += p.vx;
          if (isWinter) {
            if (p.y > height) {
              p.y = 0;
              p.x = Math.random() * width;
            }
          } else {
            if (p.y < 0) {
              p.y = height;
              p.x = Math.random() * width;
            }
          }
        }

        ctx.fillStyle = isNight ? '#4ade80' : isWinter ? '#ffffff' : primaryGlow;
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
  }, [season]);

  return (
    <div className="pointer-events-auto absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-75 cursor-crosshair" />

      {/* Night vision / CRT scanline effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            season === 'night'
              ? 'linear-gradient(rgba(74, 222, 128, 0) 50%, rgba(0, 0, 0, 0.7) 50%)'
              : 'linear-gradient(rgba(18, 42, 71, 0) 50%, rgba(0, 0, 0, 0.5) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {season === 'night' && (
        <div className="pointer-events-none absolute inset-0 bg-emerald-950/20 mix-blend-color" />
      )}

      {/* Atmospheric vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--dm-bg)] via-transparent to-[var(--dm-bg)]/80" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[var(--dm-bg)]/40 to-[var(--dm-bg)]" />
    </div>
  );
}
