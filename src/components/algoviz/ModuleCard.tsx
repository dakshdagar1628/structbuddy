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
  green:  { hex: "#22c55e", glow: "0 0 10px rgba(34,197,94,0.7),  0 0 25px rgba(34,197,94,0.3)",  text: "text-green-400",  bg: "bg-green-500/10"  },
  cyan:   { hex: "#06b6d4", glow: "0 0 10px rgba(6,182,212,0.7),   0 0 25px rgba(6,182,212,0.3)",   text: "text-cyan-400",   bg: "bg-cyan-500/10"   },
  purple: { hex: "#a855f7", glow: "0 0 10px rgba(168,85,247,0.7),  0 0 25px rgba(168,85,247,0.3)",  text: "text-purple-400", bg: "bg-purple-500/10" },
  yellow: { hex: "#eab308", glow: "0 0 10px rgba(234,179,8,0.7),   0 0 25px rgba(234,179,8,0.3)",   text: "text-yellow-400", bg: "bg-yellow-500/10" },
  pink:   { hex: "#ec4899", glow: "0 0 10px rgba(236,72,153,0.7),  0 0 25px rgba(236,72,153,0.3)",  text: "text-pink-400",   bg: "bg-pink-500/10"   },
  orange: { hex: "#f97316", glow: "0 0 10px rgba(249,115,22,0.7),  0 0 25px rgba(249,115,22,0.3)",  text: "text-orange-400", bg: "bg-orange-500/10" },
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
  const { hex, glow, text, bg } = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link to={path} className="block h-full">
        <motion.div
          className="relative flex flex-col justify-between h-full p-7 bg-card/95 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden group border-2 shadow-sm"
          style={{
            borderColor: `${hex}55`,
            boxShadow: `inset 0 0 16px ${hex}0a`,
          }}
          whileHover={{
            scale: 1.02,
            y: -5,
            borderColor: hex,
            boxShadow: glow,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Top Content */}
          <div className="relative z-10">
            {/* Header row with Icon & Principle */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <motion.div
                className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center shrink-0 border`}
                style={{ borderColor: `${hex}40` }}
                whileHover={{ rotate: 5 }}
              >
                <Icon className={`w-7 h-7 ${text}`} />
              </motion.div>

              <div
                className={`px-3 py-1 ${bg} rounded-full border text-right`}
                style={{ borderColor: `${hex}40` }}
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 bg-background border border-border group-hover:bg-foreground group-hover:text-background"
              style={{
                boxShadow: `0 0 0 0 ${hex}`,
              }}
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          {/* Bottom glow bar on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
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

