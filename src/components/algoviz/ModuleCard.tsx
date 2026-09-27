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
  green:  { glow: "rgba(16, 185, 129, 0.06)", text: "text-primary" },
  cyan:   { glow: "rgba(59, 130, 246, 0.06)", text: "text-primary" },
  purple: { glow: "rgba(139, 92, 246, 0.06)", text: "text-primary" },
  yellow: { glow: "rgba(245, 158, 11, 0.06)", text: "text-primary" },
  pink:   { glow: "rgba(236, 72, 153, 0.06)", text: "text-primary" },
  orange: { glow: "rgba(249, 115, 22, 0.06)", text: "text-primary" },
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

  // Consistent visual previews for every data structure card to maintain uniform level of detail
  const renderVisualPreview = () => {
    let content = null;

    if (title === "Arrays") {
      content = (
        <div className="flex items-center gap-1.5">
          {[10, 20, 30, 40].map((val, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[10px] text-muted-foreground font-mono leading-none mb-1">{idx}</span>
              <div className="w-8 h-8 rounded bg-card border border-border/60 flex items-center justify-center text-xs font-mono font-bold text-foreground shadow-soft-sm">
                {val}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (title === "Strings") {
      content = (
        <div className="flex items-center gap-1.5">
          {["C", "O", "D", "E"].map((char, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[10px] text-muted-foreground font-mono leading-none mb-1">{idx}</span>
              <div className="w-8 h-8 rounded bg-card border border-border/60 flex items-center justify-center text-xs font-mono font-bold text-primary shadow-soft-sm">
                '{char}'
              </div>
            </div>
          ))}
        </div>
      );
    } else if (title === "Stack") {
      content = (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono font-semibold text-primary leading-none mb-1">
            top ↓
          </span>
          <div className="flex flex-col-reverse gap-1 border-b-2 border-l-2 border-r-2 border-primary/40 px-2 py-0.5 rounded-b">
            {[10, 20, 30].map((val, idx) => (
              <div
                key={idx}
                className={`w-16 h-3.5 rounded-sm flex items-center justify-center text-[10px] font-mono font-bold shadow-soft-sm ${
                  idx === 2 ? "bg-primary text-primary-foreground" : "bg-card border border-border/50 text-foreground"
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (title === "Queue") {
      content = (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground font-mono font-semibold">out ←</span>
          {[10, 20, 30].map((val, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded flex items-center justify-center text-xs font-mono font-bold shadow-soft-sm ${
                idx === 0 ? "bg-primary text-primary-foreground" : "bg-card border border-border/60 text-foreground"
              }`}
            >
              {val}
            </div>
          ))}
          <span className="text-[10px] text-muted-foreground font-mono font-semibold">← in</span>
        </div>
      );
    } else if (title === "Singly Linked List") {
      content = (
        <div className="flex items-center gap-1">
          {[12, 24].map((val, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <div className="h-8 rounded bg-card border border-border/60 flex items-center divide-x divide-border/60 shadow-soft-sm overflow-hidden text-xs font-mono">
                <span className="px-2 font-bold text-foreground">{val}</span>
                <span className="px-1.5 text-primary text-[10px]">●</span>
              </div>
              <span className="text-xs text-muted-foreground font-bold">→</span>
            </div>
          ))}
          <div className="h-8 px-2 rounded bg-card border border-border/60 flex items-center text-xs font-mono font-bold text-muted-foreground shadow-soft-sm">
            null
          </div>
        </div>
      );
    } else if (title === "Doubly Linked List") {
      content = (
        <div className="flex items-center gap-1.5">
          {[10, 20].map((val, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div className="h-8 rounded bg-card border border-border/60 flex items-center divide-x divide-border/60 shadow-soft-sm overflow-hidden text-xs font-mono">
                <span className="px-1 text-primary text-[10px]">●</span>
                <span className="px-2 font-bold text-foreground">{val}</span>
                <span className="px-1 text-primary text-[10px]">●</span>
              </div>
              {idx === 0 && <span className="text-xs text-primary font-bold">⇄</span>}
            </div>
          ))}
        </div>
      );
    } else if (title === "Trees") {
      content = (
        <div className="relative w-36 h-12 flex items-center justify-center font-mono">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shadow-soft-sm">
            50
          </div>
          <div className="absolute bottom-0 left-3 w-5 h-5 rounded-full bg-card border border-border/60 text-foreground flex items-center justify-center text-[9px] font-bold shadow-soft-sm">
            30
          </div>
          <div className="absolute bottom-0 right-3 w-5 h-5 rounded-full bg-card border border-border/60 text-foreground flex items-center justify-center text-[9px] font-bold shadow-soft-sm">
            70
          </div>
          <svg className="absolute inset-0 w-full h-full text-border/80 pointer-events-none -z-10" stroke="currentColor" strokeWidth="1.5">
            <line x1="68" y1="12" x2="22" y2="38" />
            <line x1="76" y1="12" x2="122" y2="38" />
          </svg>
        </div>
      );
    }

    if (!content) return null;

    return (
      <div
        aria-hidden="true"
        className="h-16 mt-6 p-2 rounded-lg bg-secondary/40 dark:bg-card/40 border border-border/30 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        {content}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link 
        to={path} 
        className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <motion.div
          className="relative flex flex-col justify-between h-full p-8 bg-card rounded-xl shadow-soft-md border border-border/40 dark:border-white/5 cursor-pointer overflow-hidden group transition-[background-color,box-shadow,transform] duration-250 hover:bg-card/90 hover:shadow-soft-lg hover:-translate-y-1.5"
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
                <div className="w-10 h-10 bg-card border border-border/40 dark:border-white/5 flex items-center justify-center rounded-lg shadow-soft-sm transition-all duration-200 group-hover:shadow-soft-md group-hover:-translate-y-0.5 group-hover:bg-accent/5 group-hover:border-accent/25">
                  <Icon className="w-5 h-5 text-foreground/80 transition-colors duration-200 group-hover:text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-extrabold text-foreground tracking-tight">
                    {title}
                  </h3>
                  <span className={`text-xs font-mono font-medium block mt-0.5 ${text}`}>
                    {principle}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed font-sans font-medium">
              {description}
            </p>

            {/* Visual preview graphic */}
            {renderVisualPreview()}
          </div>

          {/* Bottom Unified Interactive CTA */}
          <div className="relative z-10 mt-8 pt-5 border-t border-border/30 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary transition-colors duration-200">
              <span>Launch Interactive Lab</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;
