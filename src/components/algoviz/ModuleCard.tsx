import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  principle: string;
  color?: "green" | "cyan" | "purple";
  delay?: number;
}

const ModuleCard = ({
  title,
  description,
  icon: Icon,
  path,
  principle,
  color = "green",
  delay = 0,
}: ModuleCardProps) => {
  const colorClasses = {
    green: {
      border: "border-primary/30 hover:border-primary/60",
      glow: "neon-border",
      text: "text-primary",
      bg: "bg-primary/10",
    },
    cyan: {
      border: "border-neon-cyan/30 hover:border-neon-cyan/60",
      glow: "shadow-[0_0_5px_hsl(var(--neon-cyan)/0.5),0_0_10px_hsl(var(--neon-cyan)/0.3)]",
      text: "text-neon-cyan",
      bg: "bg-neon-cyan/10",
    },
    purple: {
      border: "border-neon-purple/30 hover:border-neon-purple/60",
      glow: "shadow-[0_0_5px_hsl(var(--neon-purple)/0.5),0_0_10px_hsl(var(--neon-purple)/0.3)]",
      text: "text-neon-purple",
      bg: "bg-neon-purple/10",
    },
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={path}>
        <motion.div
          className={`relative p-6 bg-card border ${classes.border} rounded-lg ${classes.glow} transition-all duration-300 cursor-pointer overflow-hidden group`}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className={`w-16 h-16 ${classes.bg} rounded-lg flex items-center justify-center mb-4`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className={`w-8 h-8 ${classes.text}`} />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:neon-glow transition-all duration-300">
              {title}
            </h3>

            {/* Principle badge */}
            <div
              className={`inline-block px-3 py-1 ${classes.bg} rounded-full mb-3`}
            >
              <span className={`text-xs font-mono ${classes.text}`}>
                {principle}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>

            {/* Hover indicator */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-1 ${classes.text.replace("text-", "bg-")}`}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;
