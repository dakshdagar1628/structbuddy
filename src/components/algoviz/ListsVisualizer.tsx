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
    <div className="relative flex flex-col items-center justify-center min-h-[350px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 gap-8 overflow-x-auto">
      <motion.h3
        className="text-xl font-mono text-white"
        style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        List Visualization: inventory
      </motion.h3>

      {/* The Shelf */}
      <div className="relative">
        <motion.div
          className="flex gap-2 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {inventory.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Slot - Miniature Stack Style */}
              <motion.div
                className={`w-32 h-20 rounded-lg flex items-center justify-center transition-all ${
                  highlightedIndex === index
                    ? "border-solid border-2 border-blue-500 bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : item
                    ? "border-solid border-2 border-blue-500/50 bg-blue-900/10"
                    : "border-dashed border-2 border-gray-600 bg-transparent"
                }`}
                animate={{
                  boxShadow: highlightedIndex === index
                    ? "0 0 20px rgba(59, 130, 246, 0.5)"
                    : "none"
                }}
              >
                <AnimatePresence mode="wait">
                  {item ? (
                    <motion.span
                      key={item}
                      className={`text-sm font-bold font-mono ${
                        highlightedIndex === index ? "text-blue-100" : "text-blue-200"
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
                  ) : (
                    <span className="text-gray-500 font-mono text-xs">empty</span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Index Label */}
              <motion.div
                className={`mt-2 px-3 py-1 rounded text-xs font-mono ${
                  highlightedIndex === index
                    ? "bg-blue-500/30 text-blue-300"
                    : "bg-gray-800 text-gray-500"
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
          className="absolute -top-3 left-4 px-2 bg-gray-900 text-xs font-mono text-gray-400"
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
            className="p-4 bg-gray-800/50 border border-green-500/50 rounded-lg border-l-4 border-l-green-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <span className="text-xs font-mono text-gray-400">
              first_item =
            </span>
            <motion.span
              className="ml-2 font-mono text-lg text-green-400"
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
        className="flex gap-6 text-xs font-mono text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-dashed border-gray-600 rounded bg-transparent" />
          <span>Empty Slot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-500/50 rounded bg-blue-900/10" />
          <span>Filled Slot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-500 rounded bg-blue-900/20 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
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
