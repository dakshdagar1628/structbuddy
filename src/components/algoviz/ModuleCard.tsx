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
}

const colorMap = {
  green:  { hex: "#1be349", text: "text-[#1be349]", bg: "bg-[#1be349]/10" },
  cyan:   { hex: "#0061ff", text: "text-[#0061ff]", bg: "bg-[#0061ff]/10" },
  purple: { hex: "#a855f7", text: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
  yellow: { hex: "#ffb200", text: "text-[#ffb200]", bg: "bg-[#ffb200]/10" },
  pink:   { hex: "#ec4899", text: "text-[#ec4899]", bg: "bg-[#ec4899]/10" },
  orange: { hex: "#ff6100", text: "text-[#ff6100]", bg: "bg-[#ff6100]/10" },
};

const ModuleCard = ({
  title,
  description,
  icon: Icon,
  path,
  principle,
  color = "green",
  delay = 0,
}: ModuleCardProps) => {
  const { hex, text, bg } = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link 
        to={path} 
        className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <motion.div
          className="relative flex flex-col justify-between h-full p-7 bg-card rounded-2xl transition-[border-color,box-shadow,transform] duration-300 cursor-pointer overflow-hidden group border-2"
          style={{
            borderColor: `${hex}33`,
          }}
          whileHover={{
            scale: 1.02,
            y: -5,
            borderColor: hex,
            boxShadow: "0 12px 24px -10px rgba(79, 67, 59, 0.15)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Subtle pattern grid */}
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

          {/* Top Content */}
          <div className="relative z-10">
            {/* Header row with Icon & Principle */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <motion.div
                className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center shrink-0 border`}
                style={{ borderColor: `${hex}30` }}
                whileHover={{ rotate: 5 }}
              >
                <Icon className={`w-7 h-7 ${text}`} aria-hidden="true" />
              </motion.div>

              <div
                className={`px-3 py-1 ${bg} rounded-full border text-right`}
                style={{ borderColor: `${hex}30` }}
              >
                <span className={`text-[11px] font-mono tracking-wider uppercase ${text}`}>
                  {principle}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-display font-extrabold text-foreground mb-3 tracking-tight group-hover:translate-x-0.5 transition-transform duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed font-mono">
              {description}
            </p>
          </div>

          {/* Bottom Interactive Pill CTA */}
          <div className="relative z-10 mt-8 pt-5 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
              Interactive Lab
            </span>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-[background-color,color] duration-300 bg-background border border-border group-hover:bg-foreground group-hover:text-background"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </div>

          {/* Bottom glow bar on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: hex, originX: 0 }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;


