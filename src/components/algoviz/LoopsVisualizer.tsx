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
    <div className="h-full flex flex-col items-center justify-center gap-6 p-6">
      <motion.h3
        className="text-xl font-mono text-primary neon-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loop Visualization: The Robot Arm
      </motion.h3>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Prices List (The Shelf) */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground">prices</span>
          <motion.div
            className="flex gap-2 p-3 bg-card/50 border-2 border-border rounded-lg relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: currentLine >= 0 ? 1 : 0.3, scale: 1 }}
          >
            {prices.map((price, index) => (
              <motion.div
                key={index}
                className={`relative w-16 h-16 border-2 rounded-lg flex items-center justify-center bg-background transition-all ${
                  activeIndex === index
                    ? "border-warning neon-border-warning"
                    : "border-border"
                }`}
                animate={{
                  boxShadow: activeIndex === index
                    ? "0 0 25px hsl(var(--warning) / 0.6)"
                    : "none",
                  scale: activeIndex === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className={`text-xl font-bold font-mono ${
                  activeIndex === index ? "text-warning" : "text-foreground"
                }`}>
                  {price}
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
            
            {/* Index labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-around px-3">
              {prices.map((_, index) => (
                <span key={index} className="text-xs font-mono text-muted-foreground">
                  [{index}]
                </span>
              ))}
            </div>
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

        {/* Total Box */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground">total</span>
          <motion.div
            className={`w-24 h-24 border-2 rounded-lg flex items-center justify-center bg-card transition-all ${
              isAdding
                ? "border-success neon-border-success"
                : total !== null
                ? "border-primary"
                : "border-border border-dashed"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: currentLine >= 1 ? 1 : 0.3, 
              scale: 1,
              boxShadow: isAdding
                ? "0 0 30px hsl(var(--success) / 0.6)"
                : "none"
            }}
          >
            <AnimatePresence mode="wait">
              {total !== null && (
                <motion.span
                  key={total}
                  className={`text-3xl font-bold font-mono ${
                    isAdding ? "text-success" : "text-primary"
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

      {/* Loop Status */}
      <motion.div
        className="mt-4 p-3 bg-card border border-border rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLine >= 2 ? 1 : 0.3 }}
      >
        <div className="flex items-center gap-4 text-sm font-mono">
          <span className="text-muted-foreground">Loop Status:</span>
          {loopIteration === -1 && (
            <span className="text-muted-foreground">Not started</span>
          )}
          {loopIteration !== -1 && loopIteration !== "done" && (
            <span className="text-warning">
              Iteration {(loopIteration as number) + 1} of {prices.length} • price = {prices[loopIteration as number]}
            </span>
          )}
          {loopIteration === "done" && (
            <span className="text-success">✓ Complete! All items processed.</span>
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
