import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Grip } from "lucide-react";

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
  const flyingValue = isAdding ? prices[activeIndex] : null;

  // Calculate arm position based on active index
  const getArmPosition = () => {
    if (activeIndex === -1) return 0;
    return activeIndex;
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center gap-4 p-4 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Title */}
      <motion.h3
        className="text-lg font-mono text-primary"
        style={{ textShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🤖 The Robot Arm
      </motion.h3>

      <div className="relative flex flex-col items-center gap-8 w-full max-w-lg">
        {/* Robot Arm Track System */}
        <div className="relative w-full">
          {/* Track Rail */}
          <motion.div
            className="absolute top-0 left-8 right-8 h-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-full border border-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentLine >= 0 ? 1 : 0.3 }}
          />
          
          {/* Robot Arm Assembly */}
          <motion.div
            className="absolute top-0 z-20"
            initial={{ left: "calc(8px + 32px)" }}
            animate={{ 
              left: `calc(32px + ${getArmPosition() * 72}px)`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Arm Carriage */}
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-t-lg border border-gray-500" />
              
              {/* Telescoping Arm */}
              <motion.div
                className="w-1 bg-gradient-to-b from-gray-500 to-gray-600"
                animate={{ 
                  height: activeIndex >= 0 ? 32 : 16,
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Claw */}
              <motion.div
                className="relative"
                animate={{ 
                  scale: isAdding ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Grip 
                  className={`w-8 h-8 transition-colors duration-300 ${
                    activeIndex >= 0 ? "text-warning" : "text-gray-500"
                  }`}
                  style={{
                    filter: activeIndex >= 0 ? "drop-shadow(0 0 8px hsl(var(--warning) / 0.8))" : "none"
                  }}
                />
                {activeIndex >= 0 && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ArrowDown className="w-4 h-4 text-warning animate-bounce" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Conveyor Belt */}
          <motion.div
            className="relative mt-20 mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentLine >= 0 ? 1 : 0.3, y: 0 }}
          >
            {/* Belt Track */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-full border border-gray-700">
              {/* Belt Pattern */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <motion.div
                  className="flex gap-4 h-full items-center px-2"
                  animate={{ x: currentLine >= 2 ? [-8, 0] : 0 }}
                  transition={{ repeat: currentLine >= 2 && currentLine < 4 ? Infinity : 0, duration: 1 }}
                >
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 h-2 bg-gray-600 rounded-full" />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Items on Belt */}
            <div className="relative flex justify-center gap-4 py-4">
              {prices.map((price, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Item Container */}
                  <motion.div
                    className={`relative w-16 h-16 border-2 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index
                        ? "border-warning bg-warning/20"
                        : "border-gray-600 bg-gray-800/80"
                    }`}
                    animate={{
                      boxShadow: activeIndex === index
                        ? "0 0 25px hsl(var(--warning) / 0.6), inset 0 0 15px hsl(var(--warning) / 0.2)"
                        : "none",
                      y: activeIndex === index ? -4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={`text-xl font-bold font-mono transition-colors ${
                      activeIndex === index ? "text-warning" : "text-gray-300"
                    }`}>
                      {price}
                    </span>
                  </motion.div>
                  
                  {/* Index Label */}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500">
                    [{index}]
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Label */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full">
              <span className="text-xs font-mono text-gray-400 whitespace-nowrap">prices</span>
            </div>
          </motion.div>
        </div>

        {/* Flying Number Animation */}
        <AnimatePresence>
          {flyingValue !== null && (
            <motion.div
              className="absolute z-30 pointer-events-none"
              initial={{ 
                top: "45%",
                left: `calc(50% + ${(activeIndex - 1) * 40}px)`,
                opacity: 1, 
                scale: 1.2 
              }}
              animate={{ 
                top: "70%",
                left: "calc(50% + 120px)",
                opacity: 1, 
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="px-3 py-1 bg-warning text-gray-900 rounded-lg font-mono font-bold text-lg shadow-lg"
                style={{ boxShadow: "0 0 20px hsl(var(--warning) / 0.8)" }}
              >
                +{flyingValue}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total Bucket */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/4 flex flex-col items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: currentLine >= 1 ? 1 : 0.3, x: 0 }}
        >
          <span className="text-xs font-mono text-gray-400">total</span>
          
          {/* Bucket Container */}
          <motion.div
            className={`relative w-20 h-20 border-2 rounded-xl flex items-center justify-center transition-all duration-300 border-gray-700/50 bg-gray-900/50 backdrop-blur-sm ${
              isAdding ? "border-success" : total !== null ? "border-primary" : "border-dashed"
            }`}
            animate={{ 
              scale: isAdding ? [1, 1.1, 1] : 1,
              boxShadow: isAdding
                ? "0 0 30px hsl(var(--success) / 0.6), inset 0 0 20px hsl(var(--success) / 0.2)"
                : total !== null
                ? "0 0 15px hsl(var(--primary) / 0.3)"
                : "none"
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Bucket Opening */}
            <div className="absolute -top-1 inset-x-2 h-2 bg-gray-700 rounded-t-lg border-t border-x border-gray-600" />
            
            <AnimatePresence mode="wait">
              {total !== null && (
                <motion.span
                  key={total}
                  className={`text-2xl font-bold font-mono ${
                    isAdding ? "text-success" : "text-primary"
                  }`}
                  style={{ textShadow: isAdding ? "0 0 10px hsl(var(--success) / 0.8)" : "none" }}
                  initial={{ opacity: 0, scale: 0.5, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  {total}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Loop Status */}
      <motion.div
        className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLine >= 2 ? 1 : 0.3 }}
      >
        <div className="flex items-center gap-4 text-sm font-mono">
          <span className="text-gray-400">Loop:</span>
          {loopIteration === -1 && (
            <span className="text-gray-500">Not started</span>
          )}
          {loopIteration !== -1 && loopIteration !== "done" && (
            <span className="text-warning">
              Iteration {(loopIteration as number) + 1}/{prices.length} • price = {prices[loopIteration as number]}
            </span>
          )}
          {loopIteration === "done" && (
            <span className="text-success">✓ Complete!</span>
          )}
        </div>
      </motion.div>

      {/* Console Output */}
      <AnimatePresence>
        {currentLine >= 4 && (
          <motion.div
            className="p-3 bg-gray-800/50 border border-success/50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-mono text-gray-500 block mb-1">Output:</span>
            <motion.span
              className="font-mono text-lg text-success"
              style={{ textShadow: "0 0 8px hsl(var(--success) / 0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              23
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoopsVisualizer;