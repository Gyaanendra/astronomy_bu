"use client";

import { useEffect, useRef } from "react";

interface StippleCanvasProps {
  className?: string;
  density?: number; // count of stars/particles
}

export function StippleCanvas({ className = "", density = 180 }: StippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };

    window.addEventListener("resize", handleResize);

    // Generate celestial stipple points
    const points: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      speed: number;
      phase: number;
    }> = [];

    for (let i = 0; i < density; i++) {
      // Create a clustered horizontal band around the middle with natural Gaussian scatter
      const isBand = Math.random() > 0.4;
      const ySpread = isBand ? height * 0.5 + (Math.random() - 0.5) * height * 0.4 : Math.random() * height;
      const baseAlpha = Math.random() * 0.6 + 0.15;

      points.push({
        x: Math.random() * width,
        y: ySpread,
        radius: Math.random() < 0.85 ? Math.random() * 1.2 + 0.4 : Math.random() * 2 + 1.2,
        alpha: baseAlpha,
        baseAlpha,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.phase += p.speed;
        p.alpha = p.baseAlpha + Math.sin(p.phase) * (p.baseAlpha * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 239, 235, ${Math.max(0.05, p.alpha)})`;
        ctx.fill();

        // Subtle cross star glow for larger points
        if (p.radius > 1.8) {
          ctx.strokeStyle = `rgba(245, 239, 235, ${p.alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.radius * 2.5, p.y);
          ctx.lineTo(p.x + p.radius * 2.5, p.y);
          ctx.moveTo(p.x, p.y - p.radius * 2.5);
          ctx.lineTo(p.x, p.y + p.radius * 2.5);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none w-full h-full block ${className}`}
      aria-hidden="true"
    />
  );
}

