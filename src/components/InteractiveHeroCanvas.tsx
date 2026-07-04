import { useEffect, useRef, useState } from "react";

interface NodePoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  val: number;
  hovered: boolean;
}

export const InteractiveHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMouse({ x: -1000, y: -1000 });
      setHoveredValue(null);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: NodePoint[] = [];
    const nodeCount = 10;
    const nodeValues = [12, 24, 37, 45, 50, 63, 72, 85, 90, 99];

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < nodeCount; i++) {
        // Arrange roughly in a tree-like hierarchy or graph structure
        const level = Math.floor(i / 3);
        const x = w * 0.15 + Math.random() * (w * 0.7);
        const y = h * 0.2 + level * (h * 0.25) + (Math.random() - 0.5) * 30;
        nodes.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          val: nodeValues[i % nodeValues.length],
          hovered: false,
        });
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const primaryColor = isDark ? "#f8fafc" : "#0f172a";
      const secondaryColor = isDark ? "#1e293b" : "#f1f5f9";
      const accentColor = isDark ? "#bfa280" : "#a0845b";
      const lineColor = isDark ? "rgba(248, 250, 252, 0.08)" : "rgba(15, 23, 42, 0.06)";

      // 1. Draw connecting lines (edges)
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = lineColor;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nodes that are close to simulate a clean graph structure
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      let currentHovered: number | null = null;

      // 2. Draw and update nodes
      nodes.forEach((n) => {
        // Soft drift logic
        n.originX += n.vx;
        n.originY += n.vy;

        // Wrap drift boundaries
        if (n.originX < 30 || n.originX > canvas.width - 30) n.vx *= -1;
        if (n.originY < 30 || n.originY > canvas.height - 30) n.vy *= -1;

        // Magnetic physics to cursor
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = n.originX;
        let targetY = n.originY;

        // Node hover check
        if (distance < 24) {
          n.hovered = true;
          currentHovered = n.val;
        } else {
          n.hovered = false;
        }

        if (distance < 140) {
          const force = (140 - distance) / 140;
          // Gently pull nodes toward cursor
          targetX -= (dx / distance) * force * 12;
          targetY -= (dy / distance) * force * 12;
        }

        // Very slow spring return — calm, premium feel
        n.x += (targetX - n.x) * 0.04;
        n.y += (targetY - n.y) * 0.04;

        // Draw shadow/glow behind hovered nodes
        if (n.hovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(191, 162, 128, 0.15)" : "rgba(160, 132, 91, 0.1)";
          ctx.fill();
        }

        // Draw outer node body
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = n.hovered ? accentColor : secondaryColor;
        ctx.fill();

        // Draw text value inside node
        ctx.fillStyle = n.hovered ? (isDark ? "#101216" : "#ffffff") : primaryColor;
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(n.val), n.x, n.y);
      });

      setHoveredValue(currentHovered);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [mouse]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative bg-card/40 backdrop-blur-xs rounded-xl overflow-hidden shadow-soft-sm"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {hoveredValue !== null && (
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-card rounded shadow-soft-sm border-l-2 border-accent font-mono text-[10px] text-foreground font-bold animate-fade-in pointer-events-none">
          Node Value: {hoveredValue} (Active)
        </div>
      )}
    </div>
  );
};
