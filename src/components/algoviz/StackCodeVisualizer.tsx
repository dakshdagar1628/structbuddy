import { motion, AnimatePresence } from "framer-motion";

interface StackCodeVisualizerProps {
  currentLine: number;
  variables: Record<string, string>;
}

const StackCodeVisualizer = ({ currentLine, variables }: StackCodeVisualizerProps) => {
  // Parse items from variables
  const parseItems = (): (number | string)[] => {
    const itemsStr = variables["self.items"];
    if (!itemsStr || itemsStr === "[]") return [];
    
    try {
      // Parse array string like "[10, 20, 30]" or "['A', 'B']"
      const match = itemsStr.match(/\[(.*)\]/);
      if (match && match[1]) {
        return match[1].split(",").map(s => {
          const trimmed = s.trim().replace(/'/g, "");
          const num = parseInt(trimmed);
          return isNaN(num) ? trimmed : num;
        });
      }
    } catch {
      return [];
    }
    return [];
  };

  // Determine action from current code context
  const getAction = (): "idle" | "push" | "pop" | "peek" => {
    if (currentLine >= 4 && currentLine <= 8) return "push";
    if (currentLine >= 9 && currentLine <= 13) return "pop";
    if (currentLine >= 14) return "peek";
    return "idle";
  };

  const items = parseItems();
  const action = getAction();
  const highlightTop = action === "peek" || action === "push" || action === "pop";
  
  // Get the item being pushed/popped for display
  const currentItem = variables["item"] || variables["returned"];

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
                key={`${item}-${index}`}
                className={`w-full h-14 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all ${
                  highlightTop && index === items.length - 1
                    ? "bg-primary text-primary-foreground neon-border"
                    : "bg-accent/80 text-accent-foreground"
                }`}
                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: highlightTop && index === items.length - 1 
                    ? "0 0 20px hsl(var(--primary) / 0.5)" 
                    : "none"
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
        {action !== "idle" && (
          <motion.div
            key={action}
            className={`px-4 py-2 rounded-lg text-sm font-mono ${
              action === "push" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
              action === "pop" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
              "bg-primary/20 text-primary border border-primary/50"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {action === "push" && `↓ PUSH: Adding ${currentItem || "item"} to top`}
            {action === "pop" && `↑ POP: Removing ${currentItem || "item"} from top`}
            {action === "peek" && `👁 PEEK: Looking at top (${items[items.length - 1] || "empty"})`}
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
          <div className="w-4 h-4 bg-accent/80 rounded" />
          <span>Item</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded" />
          <span>Active</span>
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
