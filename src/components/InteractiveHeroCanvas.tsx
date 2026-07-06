import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  val: number;
  targetX: number;
  targetY: number;
  hovered: boolean;
}

interface EdgeLink {
  source: number;
  target: number;
}

export const InteractiveHeroCanvas = () => {
  const { theme } = useTheme();
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
    
    // Set up intentional BST tree structure values and static links
    const nodeValues = [50, 30, 70, 15, 42, 62, 88, 10, 45, 99];
    const links: EdgeLink[] = [
      { source: 0, target: 1 }, // 50 -> 30
      { source: 0, target: 2 }, // 50 -> 70
      { source: 1, target: 3 }, // 30 -> 15
      { source: 1, target: 4 }, // 30 -> 42
      { source: 2, target: 5 }, // 70 -> 62
      { source: 2, target: 6 }, // 70 -> 88
      { source: 3, target: 7 }, // 15 -> 10
      { source: 4, target: 8 }, // 42 -> 45
      { source: 6, target: 9 }, // 88 -> 99
    ];

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      calculateTargetPositions();
    };

    const calculateTargetPositions = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Define stable target positions in a clean hierarchical layout
      const targetCoords = [
        { x: cx, y: cy - 100 },         // 0: 50 (Root)
        { x: cx - 75, y: cy - 35 },     // 1: 30
        { x: cx + 75, y: cy - 35 },     // 2: 70
        { x: cx - 115, y: cy + 30 },    // 3: 15
        { x: cx - 35, y: cy + 30 },     // 4: 42
        { x: cx + 35, y: cy + 30 },     // 5: 62
        { x: cx + 115, y: cy + 30 },    // 6: 88
        { x: cx - 135, y: cy + 90 },    // 7: 10
        { x: cx - 25, y: cy + 90 },     // 8: 45
        { x: cx + 135, y: cy + 90 },    // 9: 99
      ];

      if (nodes.length === 0) {
        // Initialize at target positions
        nodes = targetCoords.map((coord, idx) => ({
          x: coord.x,
          y: coord.y,
          vx: 0,
          vy: 0,
          val: nodeValues[idx],
          targetX: coord.x,
          targetY: coord.y,
          hovered: false,
        }));
      } else {
        // Update targets for scaling
        targetCoords.forEach((coord, idx) => {
          if (nodes[idx]) {
            nodes[idx].targetX = coord.x;
            nodes[idx].targetY = coord.y;
          }
        });
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const primaryColor = isDark ? "#f8fafc" : "#0f172a";
      const secondaryColor = isDark ? "#171a22" : "#f8f9fa";
      const accentColor = isDark ? "#bfa280" : "#a0845b";
      const lineColor = isDark ? "rgba(248, 250, 252, 0.08)" : "rgba(15, 23, 42, 0.06)";

      // Update Node Physics using a structured force-directed system
      nodes.forEach((n, idx) => {
        let ax = 0;
        let ay = 0;

        // 1. Spring force to target position (stable centering force)
        ax += (n.targetX - n.x) * 0.035;
        ay += (n.targetY - n.y) * 0.035;

        // 2. Repulsion between node pairs (prevent overlap)
        nodes.forEach((other, otherIdx) => {
          if (idx === otherIdx) return;
          const dx = n.x - other.x;
          const dy = n.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = 55;
          if (dist < minDist) {
            const force = (minDist - dist) * 0.015;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        });

        // 3. Mouse influence (mild repulsion so user can poke the graph)
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy) || 1;
        const mouseRadius = 110;
        if (mdist < mouseRadius) {
          const force = (mouseRadius - mdist) / mouseRadius;
          ax += (mdx / mdist) * force * 0.6;
          ay += (mdy / mdist) * force * 0.6;
          n.hovered = mdist < 20; // Exact hover trigger
        } else {
          n.hovered = false;
        }

        // Apply forces, damping (friction), and update
        n.vx = (n.vx + ax) * 0.88;
        n.vy = (n.vy + ay) * 0.88;
        n.x += n.vx;
        n.y += n.vy;

        // 4. Bound constraint to prevent clipping at the canvas edge
        const margin = 24;
        n.x = Math.max(margin, Math.min(canvas.width - margin, n.x));
        n.y = Math.max(margin, Math.min(canvas.height - margin, n.y));
      });

      // Render intentional tree links
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = lineColor;
      links.forEach((link) => {
        const sourceNode = nodes[link.source];
        const targetNode = nodes[link.target];
        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        }
      });

      let currentHovered: number | null = null;

      // Render nodes
      nodes.forEach((n) => {
        if (n.hovered) {
          currentHovered = n.val;
          // Clean cursor indicator glow ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(191, 162, 128, 0.08)" : "rgba(160, 132, 91, 0.05)";
          ctx.fill();
        }

        // Outer shape elevation
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = n.hovered ? accentColor : secondaryColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
        ctx.fill();
        ctx.shadowColor = "transparent"; // Reset shadow

        // Subtle borders without hard colors
        ctx.lineWidth = 1;
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)";
        ctx.stroke();

        // Node Value text
        ctx.fillStyle = n.hovered ? (isDark ? "#171a22" : "#ffffff") : primaryColor;
        ctx.font = "bold 9px monospace";
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
  }, [mouse, theme]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative bg-card/10 border border-border/40 rounded-xl overflow-hidden shadow-soft-sm"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {hoveredValue !== null && (
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-card rounded shadow-soft-sm border-l-2 border-accent font-mono text-[10px] text-foreground font-bold animate-fade-in pointer-events-none">
          BST Node: {hoveredValue}
        </div>
      )}
    </div>
  );
};
