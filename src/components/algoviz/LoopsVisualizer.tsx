import { motion, AnimatePresence } from "framer-motion";

interface LoopsVisualizerProps {
  currentLine: number;
}

const LoopsVisualizer = ({ currentLine }: LoopsVisualizerProps) => {
  const prices = [10, 5, 8];
  
  // Determine state based on current line
  const getTotal = () => {
    if (currentLine === 0) return null; // prices = [10, 5, 8]
    if (currentLine === 1) return 0;    // total = 0
    if (currentLine === 2) return 0;    // for price in prices (first iteration start)
    if (currentLine === 3) return 10;   // total = total + price (10)
    if (currentLine === 4) return 23;   // print(total) - final
    return null;
  };

  const getActiveIndex = () => {
    if (currentLine === 2) return 0; // Highlighting first item
    if (currentLine === 3) return 0; // Adding first item
    return -1;
  };

  const getLoopIteration = () => {
    if (currentLine >= 2 && currentLine <= 3) return 0;
    if (currentLine >= 4) return "done";
    return -1;
  };

  const total = getTotal();
  const activeIndex = getActiveIndex();
  const loopIteration = getLoopIteration();
  const isAdding = currentLine === 3;

  // Show animated flying number
  const flyingValue = isAdding ? prices[activeIndex] : null;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[350px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 gap-6 overflow-x-auto">
      <motion.h3
        className="text-xl font-mono text-white" 
        style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loop Visualization: The Robot Arm
      </motion.h3>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Prices List (The Shelf) */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-mono text-gray-400">prices</span>
          <motion.div
            className="flex gap-2 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl relative shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: currentLine >= 0 ? 1 : 0.3, scale: 1 }}
          >
            {prices.map((price, index) => (
              <motion.div
                key={index}
                className={`relative w-16 h-16 rounded-lg flex flex-col items-center justify-center transition-all ${
                  activeIndex === index
                    ? "border-solid border-2 border-blue-500 bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "border-solid border-2 border-blue-500/50 bg-blue-900/10"
                }`}
                animate={{
                  boxShadow: activeIndex === index
                    ? "0 0 25px rgba(59, 130, 246, 0.6)"
                    : "none",
                  scale: activeIndex === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className={`text-xl font-bold font-mono ${
                  activeIndex === index ? "text-blue-100" : "text-blue-200"
                }`}>
                  {price}
                </span>
                {/* Index indicator inside slot */}
                <span className={`text-[10px] font-mono mt-1 ${
                  activeIndex === index ? "text-yellow-400 font-bold" : "text-gray-500"
                }`}>
                  [{index}]
                </span>
                
                {/* Robot Arm indicator */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span className="text-2xl">🤖</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Flying Animation */}
        <AnimatePresence>
          {flyingValue !== null && (
            <motion.div
              className="absolute z-10"
              initial={{ x: -100, y: 0, opacity: 1, scale: 1.2 }}
              animate={{ x: 100, y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="px-4 py-2 bg-warning text-warning-foreground rounded-lg font-mono font-bold text-xl shadow-lg">
                +{flyingValue}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total Box (Memory Chip Style) */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-mono text-gray-400">total</span>
          <motion.div
            className={`w-24 h-24 rounded-lg flex items-center justify-center bg-gray-800/80 transition-all border-l-4 border-l-green-500 border-t border-r border-b border-gray-600 ${
              isAdding
                ? "shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                : total !== null
                ? ""
                : "border-dashed"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: currentLine >= 1 ? 1 : 0.3, 
              scale: 1,
              boxShadow: isAdding
                ? "0 0 30px rgba(34, 197, 94, 0.6)"
                : "none"
            }}
          >
            <AnimatePresence mode="wait">
              {total !== null && (
                <motion.span
                  key={total}
                  className={`text-3xl font-bold font-mono ${
                    isAdding ? "text-green-400" : "text-white"
                  }`}
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  {total}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Loop Status with Index Highlight */}
      <motion.div
        className="mt-4 p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLine >= 2 ? 1 : 0.3 }}
      >
        <div className="flex items-center gap-4 text-sm font-mono">
          <span className="text-gray-400">Loop Status:</span>
          {loopIteration === -1 && (
            <span className="text-gray-500">Not started</span>
          )}
          {loopIteration !== -1 && loopIteration !== "done" && (
            <span className="text-yellow-400">
              Iteration {(loopIteration as number) + 1} of {prices.length} • <span className="text-blue-400">index = {loopIteration}</span> • price = {prices[loopIteration as number]}
            </span>
          )}
          {loopIteration === "done" && (
            <span className="text-green-400">✓ Complete! All items processed.</span>
          )}
        </div>
      </motion.div>

      {/* Console Output */}
      <AnimatePresence>
        {currentLine >= 4 && (
          <motion.div
            className="p-4 bg-card border border-success rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="text-xs font-mono text-muted-foreground mb-2 block">
              Console Output:
            </span>
            <motion.div
              className="font-mono text-xl text-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              23
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.p
        className="text-sm text-muted-foreground text-center max-w-md font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        The Robot Arm picks up each item one by one and adds it to the total.
      </motion.p>
    </div>
  );
};

export default LoopsVisualizer;
