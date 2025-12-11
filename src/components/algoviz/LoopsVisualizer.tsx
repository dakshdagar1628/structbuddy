import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoopsVisualizerProps {
  currentLine: number;
}

const LoopsVisualizer = ({ currentLine }: LoopsVisualizerProps) => {
  const prices = [10, 5, 8];
  const [showOrb, setShowOrb] = useState(false);
  const [hopperBounce, setHopperBounce] = useState(false);
  
  const getTotal = () => {
    if (currentLine === 0) return null;
    if (currentLine === 1) return 0;
    if (currentLine === 2) return 0;
    if (currentLine === 3) return 10;
    if (currentLine === 4) return 23;
    return null;
  };

  const getActiveIndex = () => {
    if (currentLine === 2) return 0;
    if (currentLine === 3) return 0;
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

  // Trigger orb animation when adding
  useEffect(() => {
    if (isAdding) {
      setShowOrb(true);
      const timer = setTimeout(() => {
        setShowOrb(false);
        setHopperBounce(true);
        setTimeout(() => setHopperBounce(false), 300);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAdding, currentLine]);

  // Claw position calculation (pixels from left)
  const getClawX = () => {
    if (activeIndex === -1) return 80; // Default center-ish
    return 48 + activeIndex * 88; // Adjusted for item spacing
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center p-4 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Title */}
      <motion.h3
        className="text-lg font-mono text-primary mb-2"
        style={{ textShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
      >
        🕹️ The Arcade Claw
      </motion.h3>

      {/* Main Claw Machine Area */}
      <div className="relative w-full max-w-md h-[280px] bg-gray-950 rounded-lg border-2 border-gray-700 overflow-hidden">
        {/* Machine Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        
        {/* Top Rail/Track */}
        <div className="absolute top-4 left-4 right-24 h-3 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full border border-gray-500 shadow-inner">
          {/* Track Grooves */}
          <div className="absolute inset-x-2 top-1 h-1 bg-gray-900 rounded-full" />
        </div>

        {/* === THE CLAW ASSEMBLY === */}
        <motion.div
          className="absolute top-4 z-20"
          initial={{ left: 80 }}
          animate={{ left: getClawX() }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.1, 0.25, 1], // Heavy mechanical feel
          }}
        >
          {/* Claw Carriage (rides on track) */}
          <div className="relative flex flex-col items-center">
            <div className="w-10 h-4 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-t-md border-2 border-yellow-400 shadow-lg" 
              style={{ boxShadow: "0 0 10px hsl(45 100% 50% / 0.4)" }}
            />
            
            {/* Cable/Rod */}
            <motion.div
              className="w-1 bg-gradient-to-b from-gray-400 to-gray-600 origin-top"
              animate={{ 
                height: isAdding ? 90 : 60,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            
            {/* === THE CLAW (C-Shape) === */}
            <motion.div
              className="relative"
              animate={{ 
                y: isAdding ? 10 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Claw Housing */}
              <div className="w-8 h-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-sm border border-gray-400" />
              
              {/* Left Prong */}
              <motion.div
                className="absolute -bottom-5 left-0 w-2 h-6 bg-gradient-to-r from-gray-400 to-gray-600 rounded-b-lg origin-top"
                animate={{ 
                  rotate: isAdding ? -15 : -30,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Right Prong */}
              <motion.div
                className="absolute -bottom-5 right-0 w-2 h-6 bg-gradient-to-l from-gray-400 to-gray-600 rounded-b-lg origin-top"
                animate={{ 
                  rotate: isAdding ? 15 : 30,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Claw Glow when active */}
              {activeIndex >= 0 && (
                <motion.div
                  className="absolute -inset-2 rounded-lg"
                  animate={{ 
                    boxShadow: ["0 0 10px hsl(45 100% 50% / 0.4)", "0 0 20px hsl(45 100% 50% / 0.6)", "0 0 10px hsl(45 100% 50% / 0.4)"]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* === CONVEYOR BELT === */}
        <div className="absolute bottom-16 left-4 right-24">
          {/* Belt Frame */}
          <div className="relative h-20 bg-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden">
            {/* Belt Surface */}
            <div className="absolute inset-x-0 top-2 bottom-2 bg-gray-900 mx-2 rounded overflow-hidden">
              {/* Moving Rollers Pattern */}
              <motion.div
                className="absolute inset-0 flex"
                animate={{ x: currentLine >= 2 && currentLine < 4 ? [-16, 0] : 0 }}
                transition={{ repeat: currentLine >= 2 && currentLine < 4 ? Infinity : 0, duration: 0.5, ease: "linear" }}
              >
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-4 h-full border-r border-gray-700 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-gray-600" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Roller Ends */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-l-lg" />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-gray-500 to-gray-700 rounded-r-lg" />

            {/* Items on Belt */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 px-6">
              {prices.map((price, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Prize Box */}
                  <motion.div
                    className={`relative w-14 h-14 rounded-lg flex items-center justify-center font-mono font-bold text-xl transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-gradient-to-b from-yellow-400 to-yellow-600 text-gray-900 border-2 border-yellow-300"
                        : "bg-gradient-to-b from-purple-600 to-purple-800 text-white border-2 border-purple-400"
                    }`}
                    animate={{
                      boxShadow: activeIndex === index
                        ? "0 0 30px hsl(45 100% 50% / 0.8), 0 5px 20px rgba(0,0,0,0.5)"
                        : "0 5px 15px rgba(0,0,0,0.4)",
                      y: activeIndex === index ? -8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {price}
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent" />
                  </motion.div>
                  
                  {/* Index Label */}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500">
                    [{index}]
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Belt Label */}
          <div className="absolute -left-1 -top-6 px-2 py-0.5 bg-gray-800 text-gray-400 text-xs font-mono rounded border border-gray-600">
            prices
          </div>
        </div>

        {/* === GHOST ORB (Flying Number) === */}
        <AnimatePresence>
          {showOrb && (
            <motion.div
              className="absolute z-50 pointer-events-none"
              initial={{ 
                left: getClawX() + 8,
                top: 130,
                opacity: 1,
                scale: 1.2
              }}
              animate={{ 
                left: "calc(100% - 70px)",
                top: 100,
                opacity: 1,
                scale: 1,
              }}
              exit={{ 
                opacity: 0,
                scale: 0.5 
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Orb Container */}
              <div 
                className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 flex items-center justify-center font-mono font-bold text-gray-900 text-lg"
                style={{ 
                  boxShadow: "0 0 30px hsl(45 100% 50% / 0.9), 0 0 60px hsl(30 100% 50% / 0.5)" 
                }}
              >
                {prices[activeIndex]}
                
                {/* Sparkle Trail */}
                <motion.div
                  className="absolute -inset-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 90}deg) translateY(-12px)`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === HOPPER (Collection Bin) === */}
        <motion.div
          className="absolute right-2 top-12 bottom-4 w-20 flex flex-col items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: currentLine >= 1 ? 1 : 0.3, x: 0 }}
        >
          <span className="text-xs font-mono text-gray-400 mb-1">total</span>
          
          {/* Hopper Container */}
          <motion.div
            className="relative flex-1 w-full"
            animate={{ 
              scale: hopperBounce ? [1, 1.1, 0.95, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Hopper Shape (Trapezoid-ish) */}
            <div 
              className="absolute inset-0 rounded-lg border-2 border-gray-600 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
              }}
            >
              {/* Inner Glow */}
              <div className="absolute inset-2 rounded bg-gradient-to-b from-blue-900/30 to-transparent" />
              
              {/* Collection Area */}
              <div className="absolute inset-x-2 bottom-2 top-1/3 bg-gray-900/50 rounded border border-gray-700/50" />
            </div>
            
            {/* Hopper Opening */}
            <div className="absolute -top-1 inset-x-1 h-3 bg-gradient-to-b from-gray-500 to-gray-700 rounded-t-lg border-2 border-gray-400 border-b-0" />
            
            {/* Total Value Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {total !== null && (
                  <motion.div
                    key={total}
                    className="text-3xl font-bold font-mono"
                    style={{ 
                      color: isAdding ? "hsl(var(--success))" : "hsl(var(--primary))",
                      textShadow: isAdding 
                        ? "0 0 20px hsl(var(--success) / 0.8)" 
                        : "0 0 10px hsl(var(--primary) / 0.5)"
                    }}
                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {total}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Machine Base */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-gray-700 to-gray-800 border-t-2 border-gray-600" />
      </div>

      {/* Loop Status */}
      <motion.div
        className="mt-3 p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLine >= 2 ? 1 : 0.3 }}
      >
        <div className="flex items-center gap-3 text-sm font-mono">
          <span className="text-gray-400">Loop:</span>
          {loopIteration === -1 && <span className="text-gray-500">Waiting...</span>}
          {loopIteration !== -1 && loopIteration !== "done" && (
            <span className="text-warning">
              Grabbing [{loopIteration}] = {prices[loopIteration as number]}
            </span>
          )}
          {loopIteration === "done" && (
            <span className="text-success">✓ All prizes collected!</span>
          )}
        </div>
      </motion.div>

      {/* Console Output */}
      <AnimatePresence>
        {currentLine >= 4 && (
          <motion.div
            className="mt-2 p-2 bg-gray-800/50 border border-success/50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-mono text-gray-500">print(total) → </span>
            <span className="font-mono text-lg text-success" style={{ textShadow: "0 0 8px hsl(var(--success) / 0.6)" }}>
              23
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoopsVisualizer;