'use client';

import { useEffect, useRef } from 'react';

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
  vol: number;
}

export function TradingChartBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Simulation state
    const candleWidth = 9;
    const candleGap = 6;
    const step = candleWidth + candleGap;
    let candles: Candle[] = [];
    let currentPrice = 185;
    let targetPrice = 188;
    let tickCount = 0;
    let offset = 0; // horizontal drift offset

    // Generate initial candlestick history
    const generateInitialData = (count: number) => {
      const data: Candle[] = [];
      let price = 160;
      for (let i = 0; i < count; i++) {
        // Trend with random walk
        const change = (Math.random() - 0.48) * 4.5 + Math.sin(i / 8) * 1.5;
        const open = price;
        const close = price + change;
        const high = Math.max(open, close) + Math.random() * 3.5;
        const low = Math.min(open, close) - Math.random() * 3.5;
        const vol = Math.floor(Math.random() * 80 + 20);
        data.push({ open, close, high, low, vol });
        price = close;
      }
      currentPrice = price;
      targetPrice = price + (Math.random() - 0.48) * 5;
      return data;
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const neededCandles = Math.ceil(width / step) + 8;
      if (candles.length < neededCandles) {
        candles = generateInitialData(neededCandles);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Visibility observer to pause animation when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Animation & price progression
      if (!prefersReducedMotion) {
        offset += 0.35; // gentle continuous drift leftwards
        tickCount++;

        // Live candle tick simulation
        const last = candles[candles.length - 1];
        if (last) {
          currentPrice += (targetPrice - currentPrice) * 0.08;
          last.close = currentPrice;
          if (currentPrice > last.high) last.high = currentPrice;
          if (currentPrice < last.low) last.low = currentPrice;
          last.vol += 0.1;

          if (tickCount % 45 === 0) {
            targetPrice = currentPrice + (Math.random() - 0.49) * 4;
          }
        }

        // When drifted by one candle width, pop old candle and push new one
        if (offset >= step) {
          offset -= step;
          const open = last ? last.close : 180;
          const close = open + (Math.random() - 0.48) * 3;
          const high = Math.max(open, close) + Math.random() * 2.5;
          const low = Math.min(open, close) - Math.random() * 2.5;
          const vol = Math.floor(Math.random() * 60 + 20);
          candles.push({ open, close, high, low, vol });
          if (candles.length > Math.ceil(width / step) + 12) {
            candles.shift();
          }
        }
      }

      // Compute min and max prices for auto-scaling
      let minP = Infinity;
      let maxP = -Infinity;
      let maxVol = 1;
      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        if (c.low < minP) minP = c.low;
        if (c.high > maxP) maxP = c.high;
        if (c.vol > maxVol) maxVol = c.vol;
      }
      const pad = (maxP - minP) * 0.18 || 10;
      minP -= pad;
      maxP += pad;
      const priceRange = maxP - minP;

      const chartTop = height * 0.08;
      const chartBottom = height * 0.88;
      const chartHeight = chartBottom - chartTop;

      const toY = (price: number) => {
        return chartBottom - ((price - minP) / priceRange) * chartHeight;
      };

      // 1. Draw horizontal grid lines & price levels
      ctx.lineWidth = 1;
      const gridLevels = 5;
      for (let i = 0; i <= gridLevels; i++) {
        const y = chartTop + (chartHeight / gridLevels) * i;
        const levelPrice = maxP - (priceRange / gridLevels) * i;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Price label on right
        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(147, 160, 171, 0.35)';
        ctx.fillText(`$${levelPrice.toFixed(1)}`, width - 52, y - 4);
      }
      ctx.setLineDash([]);

      // 2. Draw Candlesticks & Volume bars
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const x = i * step - offset;
        if (x < -step || x > width + step) continue;

        const isBull = c.close >= c.open;
        const color = isBull ? '#62b6a4' : '#ef6b6b';
        const colorAlpha = isBull ? 'rgba(98, 182, 164, 0.65)' : 'rgba(239, 107, 107, 0.65)';
        const fillAlpha = isBull ? 'rgba(98, 182, 164, 0.45)' : 'rgba(239, 107, 107, 0.45)';

        const yOpen = toY(c.open);
        const yClose = toY(c.close);
        const yHigh = toY(c.high);
        const yLow = toY(c.low);

        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);
        const candleCenterX = x + candleWidth / 2;

        // Wick
        ctx.strokeStyle = colorAlpha;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(candleCenterX, yHigh);
        ctx.lineTo(candleCenterX, yLow);
        ctx.stroke();

        // Body
        ctx.fillStyle = fillAlpha;
        ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, bodyTop, candleWidth, bodyHeight);

        // Volume bar at bottom
        const volH = (c.vol / maxVol) * (height * 0.16);
        ctx.fillStyle = isBull ? 'rgba(98, 182, 164, 0.15)' : 'rgba(239, 107, 107, 0.15)';
        ctx.fillRect(x, height - volH - 4, candleWidth, volH);

        // Store close price point for MA line
        points.push({ x: candleCenterX, y: yClose });
      }

      // 3. Draw Moving Average / Trend Line with Glow
      if (points.length > 2) {
        ctx.save();

        // Create smooth path
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const xc = (points[i].x + points[i - 1].x) / 2;
          const yc = (points[i].y + points[i - 1].y) / 2;
          ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

        // Glow layer
        ctx.strokeStyle = 'rgba(98, 182, 164, 0.55)';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(98, 182, 164, 0.7)';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Fill under trendline
        const fillPath = new Path2D();
        fillPath.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const xc = (points[i].x + points[i - 1].x) / 2;
          const yc = (points[i].y + points[i - 1].y) / 2;
          fillPath.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        fillPath.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        fillPath.lineTo(points[points.length - 1].x, chartBottom);
        fillPath.lineTo(points[0].x, chartBottom);
        fillPath.closePath();

        const grad = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
        grad.addColorStop(0, 'rgba(98, 182, 164, 0.08)');
        grad.addColorStop(1, 'rgba(98, 182, 164, 0.0)');
        ctx.fillStyle = grad;
        ctx.shadowBlur = 0;
        ctx.fill(fillPath);

        // Pulse dot on latest price
        const lastPt = points[points.length - 1];
        if (lastPt) {
          ctx.fillStyle = '#62b6a4';
          ctx.shadowColor = '#62b6a4';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(lastPt.x, lastPt.y, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Horizontal pulsing line to the right edge
          ctx.strokeStyle = 'rgba(98, 182, 164, 0.4)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(lastPt.x, lastPt.y);
          ctx.lineTo(width, lastPt.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.restore();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Canvas chart */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-35"
      />

      {/* Radial and vertical fade overlays so text remains crystal clear */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bt-bg)] opacity-90"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(11,13,15,0.7)_0%,transparent_70%)]"
      />
    </div>
  );
}
