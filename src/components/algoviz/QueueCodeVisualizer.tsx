import { motion, AnimatePresence } from "framer-motion";
import type { VisualState } from "./IntegratedCodeLab";

interface QueueCodeVisualizerProps {
  visualState: VisualState;
}

const QueueCodeVisualizer = ({ visualState }: QueueCodeVisualizerProps) => {
  const { items = [], activeIndices = [], action = 'none' } = visualState;

  const getItemColor = (index: number) => {
    if (activeIndices.includes(index)) {
      if (action === 'add') return "bg-green-500 text-green-50 border-green-400";
      if (action === 'remove') return "bg-red-500 text-red-50 border-red-400";
      return "bg-primary text-primary-foreground border-primary";
    }
    return "bg-accent/80 text-accent-foreground border-accent";
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <motion.h3 className="text-xl font-mono text-primary neon-glow">Queue Visualization</motion.h3>

      <div className="relative">
        <div className="flex justify-between mb-2 px-2">
          <div className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-xs font-mono text-red-400">FRONT ↓</div>
          <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs font-mono text-green-400">REAR ↓</div>
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
        <div className="mt-2 text-center text-xs font-mono text-muted-foreground">self.items</div>
      </div>

      <AnimatePresence mode="wait">
        {action !== 'none' && activeIndices.length > 0 && (
          <motion.div
            className={`px-4 py-2 rounded-lg text-sm font-mono ${action === "add" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {action === "add" && `→ ENQUEUE: Adding '${items[activeIndices[0]]}' to rear`}
            {action === "remove" && `← DEQUEUE: Removing '${items[activeIndices[0]]}' from front`}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-muted-foreground text-center max-w-md font-mono">FIFO: First In, First Out</p>
    </div>
  );
};

export default QueueCodeVisualizer;
