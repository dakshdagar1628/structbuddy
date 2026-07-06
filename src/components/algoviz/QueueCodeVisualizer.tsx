import { motion, AnimatePresence } from "framer-motion";
import type { VisualState } from "./IntegratedCodeLab";

interface QueueCodeVisualizerProps {
  visualState: VisualState;
}

const QueueCodeVisualizer = ({ visualState }: QueueCodeVisualizerProps) => {
  const { items = [], activeIndices = [], action = 'none' } = visualState;

  const getItemColor = (index: number) => {
    if (activeIndices.includes(index)) {
      if (action === 'add') return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-450";
      if (action === 'remove') return "bg-destructive/10 text-destructive";
      return "bg-primary/10 text-primary";
    }
    return "bg-secondary text-foreground/80";
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
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Enqueue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500/20 rounded-full" />
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Dequeue</span>
        </div>
      </motion.div>

      <motion.h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/45 mb-8">Queue Stage</motion.h3>

      <div className="relative mb-12 flex flex-col items-center">
        <div className="flex justify-between w-full max-w-[320px] mb-4 px-1.5">
          <div className="px-2.5 py-0.5 bg-destructive/5 border border-destructive/10 rounded-full text-[9px] font-mono text-destructive font-bold uppercase tracking-wider">FRONT ↓</div>
          <div className="px-2.5 py-0.5 bg-primary/5 border border-primary/10 rounded-full text-[9px] font-mono text-primary font-bold uppercase tracking-wider">REAR ↓</div>
        </div>

        <motion.div 
          className="min-w-[300px] h-20 bg-secondary/15 border-y border-border/40 rounded-xl shadow-inner flex items-center justify-start p-3 gap-2.5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${index}-${item}`}
                className={`h-11 w-11 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-soft-sm ${getItemColor(index)}`}
                initial={{ opacity: 0, x: 40, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <span className="text-muted-foreground/40 font-mono text-xs uppercase tracking-wider mx-auto">Empty Queue</span>
          )}
        </motion.div>
        
        {/* self.items Label */}
        <div className="mt-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest font-semibold">self.items</div>
      </div>

      {/* Action Indicator */}
      <div className="h-10 flex items-center justify-center mt-2">
        <AnimatePresence mode="wait">
          {action !== 'none' && activeIndices.length > 0 && (
            <motion.div
              key={action}
              className={`px-4.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                action === "add" 
                  ? "bg-green-500/10 text-emerald-750 dark:text-emerald-450 border border-green-500/20" 
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {action === "add" && `Enqueue: Added ${items[activeIndices[0]]}`}
              {action === "remove" && `Dequeue: Removed front element`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FIFO Description - Bottom */}
      <motion.p
        className="text-[10px] text-muted-foreground/45 text-center font-mono mt-4 uppercase tracking-wider"
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
