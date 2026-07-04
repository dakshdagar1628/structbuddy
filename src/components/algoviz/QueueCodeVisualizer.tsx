import { motion, AnimatePresence } from "framer-motion";
import type { VisualState } from "./IntegratedCodeLab";

interface QueueCodeVisualizerProps {
  visualState: VisualState;
}

const QueueCodeVisualizer = ({ visualState }: QueueCodeVisualizerProps) => {
  const { items = [], activeIndices = [], action = 'none' } = visualState;

  const getItemColor = (index: number) => {
    if (activeIndices.includes(index)) {
      if (action === 'add') return "bg-emerald-500 text-white border-emerald-600";
      if (action === 'remove') return "bg-destructive text-destructive-foreground border-destructive";
      return "bg-primary text-primary-foreground border-primary";
    }
    return "bg-secondary text-secondary-foreground border-border";
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 relative">
      {/* Legend - Top Right */}
      <motion.div
        className="absolute top-4 right-4 flex gap-3 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
          <span className="text-xs font-mono text-muted-foreground">Enqueue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-destructive rounded-sm" />
          <span className="text-xs font-mono text-muted-foreground">Dequeue</span>
        </div>
      </motion.div>

      <motion.h3 className="text-xl font-mono text-primary neon-glow mb-6">Queue Visualization</motion.h3>

      <div className="relative mb-12">
        <div className="flex justify-between mb-2 px-2">
          <div className="px-3 py-1 bg-destructive/10 border border-destructive/30 rounded text-xs font-mono text-destructive">FRONT ↓</div>
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-mono text-emerald-600 dark:text-emerald-400">REAR ↓</div>
        </div>

        <motion.div className="min-w-[300px] h-20 border-4 border-border rounded-lg bg-card/30 flex items-center justify-start p-2 gap-2">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${index}-${item}`}
                className={`h-14 w-14 rounded-lg flex items-center justify-center font-mono font-bold text-lg border-2 shrink-0 ${getItemColor(index)}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && <span className="text-muted-foreground font-mono text-sm mx-auto">Empty Queue</span>}
        </motion.div>
        
        {/* Container Label - Polished */}
        <div className="mt-3 text-center text-sm font-mono text-muted-foreground/70">self.items</div>
      </div>

      {/* Action Indicator */}
      <AnimatePresence mode="wait">
        {action !== 'none' && activeIndices.length > 0 && (
          <motion.div
            className={`px-4 py-2 rounded-lg text-sm font-mono ${action === "add" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {action === "add" && `→ ENQUEUE: Adding '${items[activeIndices[0]]}' to rear`}
            {action === "remove" && `← DEQUEUE: Removing '${items[activeIndices[0]]}' from front`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIFO Description - Bottom */}
      <motion.p
        className="text-xs text-muted-foreground/60 text-center font-mono mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        FIFO: First In, First Out
      </motion.p>
    </div>
  );
};

export default QueueCodeVisualizer;
