import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
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
    >
      <Link to={path}>
        <motion.div
          className="relative p-6 bg-card rounded-xl transition-all duration-300 cursor-pointer overflow-hidden group border-2"
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

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className={`w-14 h-14 ${bg} rounded-lg flex items-center justify-center mb-4`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className={`w-7 h-7 ${text}`} />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-display font-bold text-foreground mb-2 transition-all duration-300">
              {title}
            </h3>

            {/* Principle badge */}
            <div className={`inline-block px-3 py-1 ${bg} rounded-full mb-3 border`}
              style={{ borderColor: `${hex}40` }}
            >
              <span className={`text-xs font-mono ${text}`}>
                {principle}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Bottom glow bar on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
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
