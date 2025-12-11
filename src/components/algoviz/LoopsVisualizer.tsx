import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Container } from "lucide-react";

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

  // Calculate arm position based on active index
  const getArmPosition = () => {
    if (activeIndex === -1) return 0;
    // Each slot is ~80px wide (w-16 = 64px + gap), center on slot
    return activeIndex * 72;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 gap-4 overflow-x-auto">
      <motion.h3
        className="text-xl font-mono text-white" 
        style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        The Robot Arm
      </motion.h3>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full justify-center">
        {/* Left Side: Conveyor Belt with Robot Arm */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-mono text-gray-400">prices[]</span>
          
          {/* Robot Arm Track */}
          <div className="relative">
            {/* Track Rail */}
            <div className="absolute -top-12 left-0 right-0 h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full shadow-inner" />
            
            {/* The Mechanical Arm */}
            <motion.div
              className="absolute -top-10 flex flex-col items-center z-20"
              initial={{ x: 0 }}
              animate={{ 
                x: getArmPosition(),
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                duration: 0.5 
              }}
              style={{ left: '24px' }} // Start position at first slot center
            >
              {/* Arm Body */}
              <div className="w-3 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-lg shadow-lg" />
              
              {/* Arm Claw */}
              <motion.div
                className="relative"
                animate={{
                  y: activeIndex !== -1 ? [0, 8, 0] : 0,
                }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {/* Claw Left */}
                <motion.div 
                  className="absolute -left-3 w-3 h-5 bg-gradient-to-b from-orange-500 to-orange-700 rounded-b-lg origin-top"
                  animate={{
                    rotate: isAdding ? [0, 15, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Claw Right */}
                <motion.div 
                  className="absolute left-3 w-3 h-5 bg-gradient-to-b from-orange-500 to-orange-700 rounded-b-lg origin-top"
                  animate={{
                    rotate: isAdding ? [0, -15, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Claw Center */}
                <div className="w-3 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-b-sm" />
              </motion.div>
              
              {/* Pointer Arrow */}
              <motion.div
                animate={{
                  opacity: activeIndex !== -1 ? 1 : 0,
                  scale: activeIndex !== -1 ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
              >
                <ArrowDown className="w-5 h-5 text-yellow-400 mt-1" />
              </motion.div>
            </motion.div>

            {/* Conveyor Belt */}
            <motion.div
              className="relative flex gap-2 p-4 pt-6 rounded-xl shadow-lg overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: currentLine >= 0 ? 1 : 0.3, scale: 1 }}
            >
              {/* Conveyor Belt Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 flex items-center justify-around">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-1 h-2 bg-gray-600 rounded-full" />
                ))}
              </div>

              {/* List Items */}
              {prices.map((price, index) => (
                <motion.div
                  key={index}
                  className={`relative w-16 h-16 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                    activeIndex === index
                      ? "border-2 border-yellow-400 bg-yellow-900/30 shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                      : "border-2 border-blue-500/50 bg-blue-900/20"
                  }`}
                  animate={{
                    scale: activeIndex === index ? 1.1 : 1,
                    y: activeIndex === index ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-xl font-bold font-mono ${
                    activeIndex === index ? "text-yellow-300" : "text-blue-200"
                  }`}>
                    {price}
                  </span>
                  <span className={`text-[10px] font-mono mt-1 ${
                    activeIndex === index ? "text-yellow-400 font-bold" : "text-gray-500"
                  }`}>
                    [{index}]
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Flying Number Animation */}
        <AnimatePresence>
          {flyingValue !== null && (
            <motion.div
              className="absolute z-30 pointer-events-none"
              initial={{ 
                opacity: 1, 
                scale: 1.3,
                x: -50,
                y: 0 
              }}
              animate={{ 
                opacity: [1, 1, 0.8, 0],
                scale: [1.3, 1.5, 1.2, 0.8],
                x: [0, 50, 100, 150],
                y: [0, -20, 20, 60]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="px-5 py-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900 rounded-xl font-mono font-bold text-2xl shadow-[0_0_30px_rgba(234,179,8,0.8)]">
                  +{flyingValue}
                </div>
                {/* Trail effect */}
                <motion.div
                  className="absolute inset-0 bg-yellow-400/30 rounded-xl blur-lg"
                  animate={{ opacity: [0.8, 0] }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Total Bucket */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-mono text-gray-400">total</span>
          
          <motion.div
            className="relative"
            animate={{
              scale: isAdding ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Bucket Container */}
            <motion.div
              className={`relative w-28 h-28 rounded-xl flex items-center justify-center transition-all duration-500 border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden ${
                isAdding ? "shadow-[0_0_40px_rgba(34,197,94,0.6)]" : ""
              }`}
              style={{
                background: isAdding 
                  ? 'linear-gradient(180deg, rgba(34,197,94,0.2) 0%, rgba(16,185,129,0.1) 100%)'
                  : 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
                border: total !== null 
                  ? '2px solid rgba(34, 197, 94, 0.5)' 
                  : '2px dashed rgba(107, 114, 128, 0.5)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: currentLine >= 1 ? 1 : 0.3, 
                scale: 1,
              }}
            >
              {/* Bucket Icon */}
              <Container className="absolute top-2 right-2 w-4 h-4 text-gray-600" />
              
              {/* Fill Level Indicator */}
              {total !== null && total > 0 && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500/40 to-transparent"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min((total / 30) * 100, 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
              
              {/* Total Value */}
              <AnimatePresence mode="wait">
                {total !== null && (
                  <motion.span
                    key={total}
                    className={`text-4xl font-bold font-mono relative z-10 ${
                      isAdding ? "text-green-300" : "text-white"
                    }`}
                    initial={{ opacity: 0, scale: 0.5, y: -30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    style={{
                      textShadow: isAdding 
                        ? '0 0 20px rgba(34, 197, 94, 0.8)' 
                        : 'none'
                    }}
                  >
                    {total}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Pulse ring when adding */}
              <AnimatePresence>
                {isAdding && (
                  <motion.div
                    className="absolute inset-0 border-2 border-green-400 rounded-xl"
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, repeat: 2 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Label below bucket */}
            <span className="text-xs font-mono text-gray-500 mt-2 block text-center">
              The Bucket
            </span>
          </motion.div>
        </div>
      </div>

      {/* Loop Status with Index Highlight */}
      <motion.div
        className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg"
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
            className="p-4 bg-gray-800/50 border border-green-500/50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="text-xs font-mono text-gray-400 mb-2 block">
              Console Output:
            </span>
            <motion.div
              className="font-mono text-xl text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              23
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoopsVisualizer;