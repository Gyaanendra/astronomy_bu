"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Lenis styles are defined in app/globals.css to ensure reliable bundling

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with high-performance, snappy settings
    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker; lagSmoothing(0) prevents timestamp dilation
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
