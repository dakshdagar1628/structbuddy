import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const InteractiveBackdrop = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Store mouse in a ref so dark-mode canvas doesn't restart on every move
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // CSS custom props for the light-mode spotlight (updated directly on DOM, no re-render)
  const lightOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  // Single mousemove listener — updates refs/DOM directly, zero re-renders
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Light mode: update the CSS variable on the overlay directly
      if (lightOverlayRef.current) {
        lightOverlayRef.current.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(160, 132, 91, 0.14), transparent 80%)`;
      }
    };

    const handleMouseLeave = () => {
      // Reset spotlight when cursor leaves window
      if (lightOverlayRef.current) {
        lightOverlayRef.current.style.background = "none";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // no deps — runs once, reads refs at draw time

  // Dark Mode Particle Canvas — only restarts when theme or reducedMotion changes, NOT on mouse
  useEffect(() => {
    if (theme !== "dark" || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleCount = 50;
    const interactionRadius = 180;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.6 + 0.7,
          alpha: Math.random() * 0.3 + 0.12,
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Read mouse from ref — no re-render triggered
      const mouse = mouseRef.current;

      // Draw and update particles
      particles.forEach((p) => {
        // Natural ambient drift
        p.originX += p.vx;
        p.originY += p.vy;

        // Wrap boundaries
        if (p.originX < 0) p.originX = canvas.width;
        if (p.originX > canvas.width) p.originX = 0;
        if (p.originY < 0) p.originY = canvas.height;
        if (p.originY > canvas.height) p.originY = 0;

        // Magnetic repulsion from cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.originX;
        let targetY = p.originY;

        if (dist < interactionRadius && dist > 0) {
          const force = (interactionRadius - dist) / interactionRadius;
          targetX += (dx / dist) * force * 40;
          targetY += (dy / dist) * force * 40;
        }

        // Smooth spring return — slower lerp = more natural feel
        p.x += (targetX - p.x) * 0.06;
        p.y += (targetY - p.y) * 0.06;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${p.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme, prefersReducedMotion]); // mouse removed — canvas reads ref instead

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Light mode: CSS spotlight overlay — always rendered but only visible in light */}
      <div
        ref={lightOverlayRef}
        className="absolute inset-0"
        style={{
          // Smooth fade when switching themes
          opacity: theme === "light" ? 1 : 0,
          transition: "opacity 600ms ease",
          background: "none",
        }}
      />

      {/* Dark mode: stardust Aurora canvas — always rendered for smooth fade-in */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      />
    </div>
  );
};
