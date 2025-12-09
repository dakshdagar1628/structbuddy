import { motion, AnimatePresence } from "framer-motion";

interface QueueCodeVisualizerProps {
  currentLine: number;
  variables: Record<string, string>;
}

const QueueCodeVisualizer = ({ currentLine, variables }: QueueCodeVisualizerProps) => {
  // Parse items from variables
  const parseItems = (): string[] => {
    const itemsStr = variables["self.items"];
    if (!itemsStr || itemsStr === "[]") return [];
    
    try {
      // Parse array string like "['A', 'B', 'C']"
      const match = itemsStr.match(/\[(.*)\]/);
      if (match && match[1]) {
        return match[1].split(",").map(s => s.trim().replace(/'/g, ""));
      }
    } catch {
      return [];
    }
    return [];
  };

  // Determine action from current code context
  const getAction = (): "idle" | "enqueue" | "dequeue" => {
    if (currentLine >= 4 && currentLine <= 8) return "enqueue";
    if (currentLine >= 9 && currentLine <= 13) return "dequeue";
    return "idle";
  };

  const items = parseItems();
  const action = getAction();
  const highlightFront = action === "dequeue" && items.length > 0;
  const highlightRear = action === "enqueue" && items.length > 0;
  
  // Get the item being enqueued/dequeued for display
  const currentItem = variables["item"]?.replace(/'/g, "") || variables["returned"]?.replace(/'/g, "");

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <motion.h3
        className="text-xl font-mono text-primary neon-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Queue Visualization
      </motion.h3>

      {/* Queue Container - Horizontal Pipe */}
      <div className="relative">
        {/* Front Label */}
        <motion.div
          className="absolute -left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-primary/20 border border-primary/50 rounded text-xs font-mono text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: items.length > 0 ? 1 : 0.3 }}
        >
          FRONT
        </motion.div>

        {/* Rear Label */}
        <motion.div
          className="absolute -right-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-accent/20 border border-accent/50 rounded text-xs font-mono text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: items.length > 0 ? 1 : 0.3 }}
        >
          REAR
        </motion.div>

        <motion.div
          className="min-w-[300px] h-20 border-4 border-border rounded-lg bg-card/30 flex items-center justify-center px-4 gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Queue Items */}
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                className={`w-14 h-14 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all ${
                  (highlightFront && index === 0) 
                    ? "bg-primary text-primary-foreground neon-border" 
                    : (highlightRear && index === items.length - 1)
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground"
                }`}
                initial={{ opacity: 0, x: 50, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  boxShadow: (highlightFront && index === 0) 
                    ? "0 0 20px hsl(var(--primary) / 0.5)" 
                    : "none"
                }}
                exit={{ opacity: 0, x: -50, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                "{item}"
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {items.length === 0 && (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-muted-foreground font-mono text-sm">
                Empty Queue
              </span>
            </motion.div>
          )}
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

      {/* Flow Arrows */}
      <motion.div 
        className="flex items-center gap-4 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-xs font-mono">← dequeue()</span>
        <div className="w-24 h-px bg-border" />
        <span className="text-xs font-mono">enqueue() →</span>
      </motion.div>

      {/* Action Indicator */}
      <AnimatePresence mode="wait">
        {action !== "idle" && (
          <motion.div
            key={action}
            className={`px-4 py-2 rounded-lg text-sm font-mono ${
              action === "enqueue" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
              "bg-red-500/20 text-red-400 border border-red-500/50"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {action === "enqueue" && `→ ENQUEUE: Adding "${currentItem || "?"}" to rear`}
            {action === "dequeue" && `← DEQUEUE: Removing "${currentItem || items[0] || "?"}" from front`}
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
          <div className="w-4 h-4 border-2 border-dashed border-border rounded" />
          <span>Empty</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded" />
          <span>Front</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded" />
          <span>Rear</span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-sm text-muted-foreground text-center max-w-md font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        FIFO: First In, First Out. Items enter at the rear and leave from the front.
      </motion.p>
    </div>
  );
};

export default QueueCodeVisualizer;
