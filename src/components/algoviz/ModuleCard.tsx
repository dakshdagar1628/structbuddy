import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  principle: string;
  color?: "green" | "cyan" | "purple" | "yellow" | "pink" | "orange";
  delay?: number;
  featured?: boolean;
}

const colorMap = {
  green:  { glow: "rgba(16, 185, 129, 0.06)", text: "text-emerald-800 dark:text-emerald-400" },
  cyan:   { glow: "rgba(59, 130, 246, 0.06)", text: "text-blue-800 dark:text-blue-400" },
  purple: { glow: "rgba(139, 92, 246, 0.06)", text: "text-violet-800 dark:text-violet-400" },
  yellow: { glow: "rgba(245, 158, 11, 0.06)", text: "text-amber-800 dark:text-amber-400" },
  pink:   { glow: "rgba(236, 72, 153, 0.06)", text: "text-rose-800 dark:text-rose-400" },
  orange: { glow: "rgba(249, 115, 22, 0.06)", text: "text-orange-800 dark:text-orange-400" },
};

const ModuleCard = ({
  title,
  description,
  icon: Icon,
  path,
  principle,
  color = "green",
  delay = 0,
  featured = false,
}: ModuleCardProps) => {
  const { glow, text } = colorMap[color];

  // Inline visual previews for featured cards to create premium asymmetric layout
  const renderVisualPreview = () => {
    if (title === "Arrays") {
      return (
        <div className="flex gap-1.5 mt-6 justify-start pointer-events-none select-none">
          {[10, 20, 30, 40].map((val, idx) => (
            <div 
              key={idx} 
              className="w-10 h-10 rounded bg-secondary/80 flex items-center justify-center text-xs font-mono font-bold text-foreground/80 shadow-soft-sm"
            >
              {val}
            </div>
          ))}
          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-xs font-mono font-bold text-primary animate-pulse">
            +
          </div>
        </div>
      );
    }
    if (title === "Trees") {
      return (
        <div className="relative h-16 mt-6 justify-start pointer-events-none select-none font-mono">
          <div className="absolute left-12 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shadow-soft-sm">
            50
          </div>
          <div className="absolute left-6 top-8 w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center text-[9px] text-foreground/80">
            30
          </div>
          <div className="absolute left-18 top-8 w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center text-[9px] text-foreground/80">
            70
          </div>
          {/* Subtle connecting lines */}
          <svg className="absolute left-0 top-0 w-32 h-16 text-muted-foreground/30 -z-10" stroke="currentColor" strokeWidth="1.5">
            <line x1="56" y1="20" x2="36" y2="36" />
            <line x1="60" y1="20" x2="80" y2="36" />
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full ${featured ? "md:col-span-2" : ""}`}
    >
      <Link 
        to={path} 
        className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <motion.div
          className="relative flex flex-col justify-between h-full p-8 bg-card rounded-xl shadow-soft-md border border-border/40 dark:border-white/5 cursor-pointer overflow-hidden group"
          whileHover={{
            y: -6,
            backgroundColor: "hsl(var(--card) / 0.95)",
            boxShadow: "var(--shadow-soft-lg)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Subtle light glow behind the card */}
          <div 
            className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
            style={{ backgroundColor: glow }}
          />

          {/* Top Content */}
          <div className="relative z-10">
            {/* Header row with Icon & Category */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-lg shadow-soft-sm transition-colors duration-200 group-hover:bg-primary/5">
                  <Icon className="w-5 h-5 text-foreground/80 transition-colors duration-200 group-hover:text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-extrabold text-foreground tracking-tight">
                    {title}
                  </h3>
                  <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold block ${text}`}>
                    {principle}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed font-sans font-medium">
              {description}
            </p>

            {/* Show visual preview on featured layouts */}
            {featured && renderVisualPreview()}
          </div>

          {/* Bottom Interactive Arrow CTA */}
          <div className="relative z-10 mt-8 pt-5 flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-200">
              Interactive Lab
            </span>
            <div
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary/80 group-hover:text-primary transition-colors duration-200"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;
