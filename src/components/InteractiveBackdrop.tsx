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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Update mouse position for CSS Spotlight (Light Mode)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (theme === "light") {
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          container.style.setProperty("--mouse-x", `${x}px`);
          container.style.setProperty("--mouse-y", `${y}px`);
        }
      } else {
        setMouse({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  // Dark Mode Particle Canvas Simulation
  useEffect(() => {
    if (theme !== "dark" || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleCount = 45;
    const interactionRadius = 160;

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
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.25 + 0.1,
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stardust Aurora aura (subtle background gradient)
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 4,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.2
      );
      grad.addColorStop(0, "rgba(23, 26, 34, 0.2)");
      grad.addColorStop(1, "rgba(16, 18, 22, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((p) => {
        // Natural float
        p.originX += p.vx;
        p.originY += p.vy;

        // Wrap around boundaries
        if (p.originX < 0) p.originX = canvas.width;
        if (p.originX > canvas.width) p.originX = 0;
        if (p.originY < 0) p.originY = canvas.height;
        if (p.originY > canvas.height) p.originY = 0;

        // Calculate magnetic cursor reaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.originX;
        let targetY = p.originY;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          // Subtly repel particles away from the cursor
          targetX += (dx / distance) * force * 35;
          targetY += (dy / distance) * force * 35;
        }

        // Return naturally to original path with spring physics
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

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
  }, [theme, mouse, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {theme === "light" ? (
        // Premium minimal spotlight overlay for light mode
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(160, 132, 91, 0.035), transparent 80%)`
          }}
        />
      ) : (
        // Canvas for stardust Aurora particles
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full block" 
        />
      )}
    </div>
  );
};
