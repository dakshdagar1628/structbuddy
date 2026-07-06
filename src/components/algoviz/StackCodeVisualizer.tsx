import { motion, AnimatePresence } from "framer-motion";
import type { VisualState } from "./IntegratedCodeLab";

interface StackCodeVisualizerProps {
  visualState: VisualState;
}

const StackCodeVisualizer = ({ visualState }: StackCodeVisualizerProps) => {
  const { items = [], activeIndices = [], action = 'none' } = visualState;

  const getItemColor = (index: number) => {
    if (activeIndices.includes(index)) {
      if (action === 'add') return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-450";
      if (action === 'remove') return "bg-destructive/10 text-destructive";
      if (action === 'read') return "bg-accent/15 text-accent";
      return "bg-primary/10 text-primary";
    }
    return "bg-secondary text-foreground/80";
  };

  const getGlowColor = (index: number) => {
    if (activeIndices.includes(index)) {
      if (action === 'add') return "var(--shadow-soft-md), 0 0 0 1px rgba(16, 185, 129, 0.2)";
      if (action === 'remove') return "var(--shadow-soft-md), 0 0 0 1px rgba(239, 68, 68, 0.2)";
      if (action === 'read') return "var(--shadow-soft-md), 0 0 0 1px rgba(245, 158, 11, 0.2)";
      return "var(--shadow-soft-md), 0 0 0 1px rgba(139, 92, 246, 0.2)";
    }
    return "var(--shadow-soft-sm)";
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden select-none">
      {/* Legend - Top Right */}
      <motion.div
        className="absolute top-4 right-4 flex gap-3.5 bg-card/40 backdrop-blur-sm rounded-full px-4.5 py-1.5 border border-border/30 shadow-soft-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-emerald-500/20 rounded-full" />
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Push</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500/20 rounded-full" />
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Pop</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-amber-500/20 rounded-full" />
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Peek</span>
        </div>
      </motion.div>

      <motion.h3
        className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/45 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Stack Stage
      </motion.h3>

      {/* Stack Container with extra bottom margin */}
      <div className="relative mb-12 flex flex-col items-center">
        {/* TOP Label */}
        <motion.div
          className="px-2.5 py-0.5 bg-primary/5 border border-primary/10 rounded-full text-[9px] font-mono text-primary font-bold uppercase tracking-wider mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: items.length > 0 ? 1 : 0.2 }}
        >
          TOP ↓
        </motion.div>

        <motion.div
          className="w-44 min-h-[220px] bg-secondary/15 rounded-b-2xl border-x border-b border-border/40 flex flex-col-reverse items-center justify-start p-3 gap-2.5 shadow-inner"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Stack Items */}
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${index}-${item}`}
                className={`w-full h-11 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-[background-color,box-shadow,transform] duration-200 ${getItemColor(index)}`}
                initial={{ opacity: 0, y: -40, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: getGlowColor(index)
                }}
                exit={{ opacity: 0, y: -40, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {items.length === 0 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
            >
              <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">
                Empty Stack
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* self.items Label */}
        <motion.div
          className="mt-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          self.items
        </motion.div>
      </div>

      {/* Action Indicator */}
      <div className="h-10 flex items-center justify-center mt-2">
        <AnimatePresence mode="wait">
          {action !== 'none' && activeIndices.length > 0 && (
            <motion.div
              key={action}
              className={`px-4.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                action === "add" ? "bg-green-500/10 text-emerald-700 dark:text-emerald-450 border border-green-500/20" :
                action === "remove" ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20" :
                "bg-yellow-500/10 text-amber-700 dark:text-amber-450 border border-yellow-500/20"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {action === "add" && `Push: Added ${items[activeIndices[0]]}`}
              {action === "remove" && `Pop: Removed top element`}
              {action === "read" && `Peek: Top is ${items[activeIndices[0]]}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StackCodeVisualizer;
