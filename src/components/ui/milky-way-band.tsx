"use client";

import { useEffect, useRef } from "react";

export function MilkyWayBand({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let cssWidth = window.innerWidth;
    const cssHeight = 320;

    const handleResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      cssWidth = window.innerWidth;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
      draw();
    };

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    ctx.scale(dpr, dpr);

    window.addEventListener("resize", handleResize);

    // Stable pseudo-random generator
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const draw = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      seed = 42;

      // Sinuous central galactic spine curve across full screen
      const getSpineY = (x: number) => {
        const nx = x / cssWidth;
        const wave1 = Math.sin(nx * Math.PI * 1.8 + 0.35) * 48;
        const wave2 = Math.cos(nx * Math.PI * 3.4) * 22;
        return cssHeight * 0.52 + wave1 + wave2;
      };

      // 1. Nebular Dust Granules (dense stipple clouds)
      const dotCount = Math.floor(cssWidth * 7.5);

      for (let i = 0; i < dotCount; i++) {
        const x = random() * cssWidth;
        const nx = x / cssWidth;
        const spineY = getSpineY(x);

        // Dark Rift split lane around the 55% to 85% width range
        let yOffset = (random() - 0.5) * 80;
        if (nx > 0.52 && nx < 0.88) {
          const riftProgress = (nx - 0.52) / 0.36;
          const riftWidth = Math.sin(riftProgress * Math.PI) * 26;
          if (Math.abs(yOffset) < riftWidth && random() < 0.85) {
            yOffset = (yOffset > 0 ? 1 : -1) * (riftWidth + random() * 22);
          }
        }

        // Secondary filamentary arms
        if (random() < 0.18) {
          yOffset += (random() - 0.5) * 45;
        }

        const y = spineY + yOffset;
        const dist = Math.abs(y - spineY);
        let alpha = Math.max(0, (1 - dist / 90) * (random() * 0.75 + 0.22));

        // Horizontal edge bleed fade
        const edgeFade = Math.min(1, Math.min(x / 120, (cssWidth - x) / 120));
        alpha *= edgeFade;

        if (alpha > 0.02) {
          const radius = random() < 0.94 ? random() * 0.8 + 0.35 : random() * 1.4 + 0.7;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 239, 230, ${alpha})`;
          ctx.fill();
        }
      }

      // 2. Individual Prominent Circular Star Discs (matching Image 3)
      const starNodes = [
        // Upper celestial field
        { rx: 0.08, ry: -65, r: 3.2, a: 0.8 },
        { rx: 0.13, ry: -52, r: 5.0, a: 0.95 },
        { rx: 0.18, ry: -75, r: 3.0, a: 0.75 },
        { rx: 0.24, ry: -45, r: 6.8, a: 0.95 },
        { rx: 0.29, ry: -82, r: 3.8, a: 0.8 },
        { rx: 0.34, ry: -38, r: 5.5, a: 0.9 },
        { rx: 0.41, ry: -68, r: 9.0, a: 0.98 }, // Large prominent disc
        { rx: 0.47, ry: -50, r: 3.5, a: 0.8 },
        { rx: 0.55, ry: -88, r: 6.5, a: 0.9 },
        { rx: 0.63, ry: -52, r: 5.2, a: 0.85 },
        { rx: 0.70, ry: -72, r: 8.0, a: 0.98 }, // Large disc
        { rx: 0.79, ry: -48, r: 3.8, a: 0.75 },
        { rx: 0.86, ry: -62, r: 5.5, a: 0.85 },
        { rx: 0.93, ry: -42, r: 3.2, a: 0.7 },

        // Central Galactic stream nodes
        { rx: 0.06, ry: 4, r: 3.5, a: 0.85 },
        { rx: 0.15, ry: -12, r: 4.5, a: 0.9 },
        { rx: 0.22, ry: 16, r: 7.0, a: 0.95 },
        { rx: 0.35, ry: -9, r: 7.5, a: 0.98 },
        { rx: 0.49, ry: 14, r: 6.0, a: 0.9 },
        { rx: 0.59, ry: -18, r: 8.5, a: 0.98 },
        { rx: 0.67, ry: 22, r: 6.5, a: 0.9 },
        { rx: 0.77, ry: -6, r: 7.8, a: 0.95 },
        { rx: 0.87, ry: 12, r: 4.5, a: 0.85 },
        { rx: 0.96, ry: -2, r: 3.5, a: 0.8 },

        // Lower celestial field
        { rx: 0.11, ry: 50, r: 5.5, a: 0.85 },
        { rx: 0.17, ry: 75, r: 3.8, a: 0.75 },
        { rx: 0.25, ry: 58, r: 8.0, a: 0.95 },
        { rx: 0.32, ry: 84, r: 4.5, a: 0.8 },
        { rx: 0.43, ry: 64, r: 7.2, a: 0.9 },
        { rx: 0.51, ry: 94, r: 4.0, a: 0.75 },
        { rx: 0.65, ry: 62, r: 6.0, a: 0.85 },
        { rx: 0.72, ry: 82, r: 4.2, a: 0.8 },
        { rx: 0.81, ry: 56, r: 7.0, a: 0.9 },
        { rx: 0.90, ry: 78, r: 3.5, a: 0.7 },
      ];

      for (const node of starNodes) {
        const x = node.rx * cssWidth;
        const y = getSpineY(x) + node.ry;

        // Soft outer glow halo
        ctx.beginPath();
        ctx.arc(x, y, node.r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 239, 230, ${node.a * 0.16})`;
        ctx.fill();

        // Solid circular core disc
        ctx.beginPath();
        ctx.arc(x, y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 239, 230, ${node.a})`;
        ctx.fill();

        // Small satellite star particles surrounding key stellar nodes
        if (node.r > 5) {
          for (let p = 0; p < 7; p++) {
            const angle = random() * Math.PI * 2;
            const dist = node.r * (1.5 + random() * 1.8);
            const px = x + Math.cos(angle) * dist;
            const py = y + Math.sin(angle) * dist;

            ctx.beginPath();
            ctx.arc(px, py, random() * 0.8 + 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 239, 230, ${node.a * 0.55})`;
            ctx.fill();
          }
        }
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`w-screen relative left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none select-none my-8 ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "320px" }}
        className="block"
        aria-hidden="true"
      />
    </div>
  );
}
