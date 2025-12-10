import { motion, AnimatePresence } from "framer-motion";
import type { VisualState } from "./IntegratedCodeLab";

interface StackCodeVisualizerProps {
  visualState: VisualState;
}

const StackCodeVisualizer = ({ visualState }: StackCodeVisualizerProps) => {
  const { items = [], activeIndices = [], action = 'none' } = visualState;

  const getItemColor = (index: number) => {
    if (activeIndices.includes(index)) {
      if (action === 'add') return "bg-green-500 text-green-50 border-green-400";
      if (action === 'remove') return "bg-red-500 text-red-50 border-red-400";
      if (action === 'read') return "bg-yellow-500 text-yellow-50 border-yellow-400";
      return "bg-primary text-primary-foreground border-primary";
    }
    return "bg-accent/80 text-accent-foreground border-accent";
  };

  const getGlowColor = (index: number) => {
    if (activeIndices.includes(index)) {
      if (action === 'add') return "0 0 20px hsl(142 76% 36% / 0.6)";
      if (action === 'remove') return "0 0 20px hsl(0 84% 60% / 0.6)";
      if (action === 'read') return "0 0 20px hsl(45 93% 47% / 0.6)";
      return "0 0 20px hsl(var(--primary) / 0.5)";
    }
    return "none";
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <motion.h3
        className="text-xl font-mono text-primary neon-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Stack Visualization
      </motion.h3>

      {/* Stack Container */}
      <div className="relative">
        <motion.div
          className="w-40 min-h-[200px] border-l-4 border-r-4 border-b-4 border-border rounded-b-lg bg-card/30 flex flex-col-reverse items-center justify-start p-2 gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stack Items */}
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${index}-${item}`}
                className={`w-full h-14 rounded-lg flex items-center justify-center font-mono font-bold text-lg border-2 transition-colors ${getItemColor(index)}`}
                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: getGlowColor(index)
                }}
                exit={{ opacity: 0, y: -50, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {items.length === 0 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-muted-foreground font-mono text-sm">
                Empty Stack
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* TOP Label */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/20 border border-primary/50 rounded text-xs font-mono text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: items.length > 0 ? 1 : 0.3 }}
        >
          TOP ↓
        </motion.div>

        {/* Container Label */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          self.items
        </motion.div>
      </div>

      {/* Action Indicator */}
      <AnimatePresence mode="wait">
        {action !== 'none' && activeIndices.length > 0 && (
          <motion.div
            key={action}
            className={`px-4 py-2 rounded-lg text-sm font-mono ${
              action === "add" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
              action === "remove" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
              "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {action === "add" && `↓ PUSH: Adding ${items[activeIndices[0]]} to top`}
            {action === "remove" && `↑ POP: Removing ${items[activeIndices[0]]} from top`}
            {action === "read" && `👁 PEEK: Looking at top (${items[activeIndices[0]]})`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        className="flex gap-6 text-xs font-mono text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span>Add</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span>Remove</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded" />
          <span>Read</span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-sm text-muted-foreground text-center max-w-md font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        LIFO: Last In, First Out. Items are added and removed from the top only.
      </motion.p>
    </div>
  );
};

export default StackCodeVisualizer;
