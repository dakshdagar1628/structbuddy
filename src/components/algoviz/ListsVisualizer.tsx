import { motion, AnimatePresence } from "framer-motion";

interface ListsVisualizerProps {
  currentLine: number;
}

const ListsVisualizer = ({ currentLine }: ListsVisualizerProps) => {
  // Determine list state based on current line
  const getInventory = () => {
    const items: (string | null)[] = [null, null, null];
    
    // Line indices are 0-based: Line 1=index 0, Line 2=index 1, etc.
    if (currentLine >= 1) items[0] = "Sword";      // Line 2 (index 1)
    if (currentLine >= 2) items[1] = "Shield";     // Line 3 (index 2)
    if (currentLine >= 4) items[1] = "Broken Shield"; // Line 5 (index 4)
    
    return items;
  };

  const getFirstItem = () => {
    if (currentLine >= 3) return "Sword"; // Line 4 (index 3)
    return null;
  };

  const inventory = getInventory();
  const firstItem = getFirstItem();
  const highlightedIndex = currentLine === 3 ? 0 : currentLine === 4 ? 1 : null;

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 p-8">
      <motion.h3
        className="text-xl font-mono text-primary neon-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        List Visualization: inventory
      </motion.h3>

      {/* The Shelf */}
      <div className="relative">
        <motion.div
          className="flex gap-1 p-4 bg-card/50 border-2 border-border rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {inventory.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Slot */}
              <motion.div
                className={`w-32 h-20 border-2 rounded-lg flex items-center justify-center bg-background transition-all ${
                  highlightedIndex === index
                    ? "border-primary neon-border"
                    : item
                    ? "border-accent/50"
                    : "border-border border-dashed"
                }`}
                animate={{
                  boxShadow: highlightedIndex === index
                    ? "0 0 20px hsl(var(--primary) / 0.5)"
                    : "none"
                }}
              >
                <AnimatePresence mode="wait">
                  {item && (
                    <motion.span
                      key={item}
                      className={`text-sm font-bold font-mono ${
                        highlightedIndex === index ? "text-primary" : "text-accent"
                      }`}
                      initial={{ opacity: 0, y: -30, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      "{item}"
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Index Label */}
              <motion.div
                className={`mt-2 px-3 py-1 rounded text-xs font-mono ${
                  highlightedIndex === index
                    ? "bg-primary/30 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentLine >= 1 ? 1 : 0 }}
              >
                Index {index}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Shelf Label */}
        <motion.div
          className="absolute -top-3 left-4 px-2 bg-background text-xs font-mono text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          inventory = []
        </motion.div>
      </div>

      {/* Variable Display */}
      <AnimatePresence>
        {firstItem && (
          <motion.div
            className="p-4 bg-card border border-primary/50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <span className="text-xs font-mono text-muted-foreground">
              first_item =
            </span>
            <motion.span
              className="ml-2 font-mono text-lg text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              "{firstItem}"
            </motion.span>
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
          <span>Empty Slot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-accent/50 rounded bg-background" />
          <span>Filled Slot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary rounded neon-border" />
          <span>Accessing</span>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.p
        className="text-sm text-muted-foreground text-center max-w-md font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Lists store items in order. Each slot has an index starting from 0.
      </motion.p>
    </div>
  );
};

export default ListsVisualizer;
