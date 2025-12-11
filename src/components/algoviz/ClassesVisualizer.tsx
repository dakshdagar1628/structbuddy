import { motion, AnimatePresence } from "framer-motion";
import { FileCode, User, Zap } from "lucide-react";

interface ClassesVisualizerProps {
  currentLine: number;
}

const ClassesVisualizer = ({ currentLine }: ClassesVisualizerProps) => {
  const showBlueprint = currentLine >= 0;
  const showMario = currentLine >= 4;
  const showLuigi = currentLine >= 5;
  const luigiDamaged = currentLine >= 6;
  const highlightBlueprint = currentLine >= 0 && currentLine <= 3;
  const highlightMario = currentLine === 4;
  const highlightLuigi = currentLine === 5 || currentLine === 6;
  const marioBeam = currentLine === 4;
  const luigiBeam = currentLine === 5;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Title */}
      <motion.h3
        className="text-lg font-mono text-primary mb-4"
        style={{ textShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🏭 The Blueprint Factory
      </motion.h3>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full max-w-4xl">
        {/* LEFT: Blueprint Section */}
        <motion.div
          className={`relative flex-1 p-5 rounded-xl transition-all duration-500 ${
            highlightBlueprint
              ? "bg-blue-950 border-2 border-blue-500"
              : "bg-blue-950/50 border-2 border-blue-900/50"
          }`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ 
            opacity: showBlueprint ? 1 : 0.3, 
            x: 0,
            boxShadow: highlightBlueprint
              ? "0 0 40px hsl(210 100% 50% / 0.3), inset 0 0 30px hsl(210 100% 50% / 0.1)"
              : "none"
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Label */}
          <div className="absolute -top-3 left-4 px-3 py-0.5 bg-blue-900 text-blue-300 text-xs font-mono rounded-full border border-blue-700">
            THE CLASS (Definition)
          </div>

          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(210 100% 70% / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(210 100% 70% / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px"
            }}
          />

          <div className="relative flex items-center gap-4">
            <motion.div 
              className="p-3 bg-blue-800/50 rounded-lg border border-blue-600/50"
              animate={{
                boxShadow: highlightBlueprint 
                  ? "0 0 20px hsl(210 100% 60% / 0.5)" 
                  : "none"
              }}
            >
              <FileCode className="w-10 h-10 text-blue-400" />
            </motion.div>
            
            <div className="text-left">
              <h4 className="text-xl font-mono font-bold text-blue-300"
                style={{ textShadow: "0 0 10px hsl(210 100% 70% / 0.5)" }}
              >
                class Hero
              </h4>
              <div className="text-sm font-mono text-blue-400/80 mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  <span>name: <span className="text-blue-200">string</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  <span>hp: <span className="text-blue-200">100</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Creation Beam Origin */}
          <AnimatePresence>
            {(marioBeam || luigiBeam) && (
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Zap className="w-6 h-6 text-yellow-400" 
                  style={{ filter: "drop-shadow(0 0 10px hsl(45 100% 50% / 0.8))" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Light Beam Animation */}
        <AnimatePresence>
          {(marioBeam || luigiBeam) && (
            <motion.div
              className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: "0 0 20px hsl(45 100% 50% / 0.8), 0 0 40px hsl(210 100% 50% / 0.5)"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT: Heap/Memory Section */}
        <motion.div
          className="relative flex-1 p-5 rounded-xl bg-gray-950/50 border-2 border-gray-700/50 min-h-[200px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Section Label */}
          <div className="absolute -top-3 left-4 px-3 py-0.5 bg-gray-800 text-gray-400 text-xs font-mono rounded-full border border-gray-600">
            THE HEAP (Memory)
          </div>

          {/* Objects Stage */}
          <div className="flex flex-wrap justify-center items-center gap-4 h-full py-4">
            {/* Empty State */}
            <AnimatePresence>
              {!showMario && !showLuigi && (
                <motion.div
                  className="text-gray-600 font-mono text-sm animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  No objects created yet...
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mario Card */}
            <AnimatePresence>
              {showMario && (
                <motion.div
                  className={`relative p-4 rounded-xl min-w-[140px] transition-all duration-300 border-gray-700/50 bg-gray-900/50 backdrop-blur-sm ${
                    highlightMario
                      ? "border-2 border-red-500"
                      : "border-2 border-yellow-500/50"
                  }`}
                  initial={{ opacity: 0, scale: 0, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    boxShadow: highlightMario
                      ? "0 0 30px hsl(0 100% 50% / 0.4), inset 0 0 20px hsl(0 100% 50% / 0.1)"
                      : "0 0 15px hsl(45 100% 50% / 0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute -top-3 left-3 px-2 py-0.5 bg-red-900 text-red-300 text-xs font-mono rounded-full border border-red-700">
                    p1
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                      <User className="w-6 h-6 text-red-400" />
                    </div>
                    <h5 className="text-lg font-mono font-bold text-red-400"
                      style={{ textShadow: "0 0 8px hsl(0 100% 60% / 0.5)" }}
                    >
                      Mario
                    </h5>
                  </div>
                  
                  <div className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-between text-sm font-mono">
                      <span className="text-gray-500">hp:</span>
                      <motion.span
                        className="text-success font-bold"
                        style={{ textShadow: "0 0 6px hsl(var(--success) / 0.5)" }}
                        animate={{ scale: highlightMario ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        100
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Luigi Card */}
            <AnimatePresence>
              {showLuigi && (
                <motion.div
                  className={`relative p-4 rounded-xl min-w-[140px] transition-all duration-300 border-gray-700/50 bg-gray-900/50 backdrop-blur-sm ${
                    luigiDamaged
                      ? "border-2 border-destructive"
                      : highlightLuigi
                      ? "border-2 border-green-500"
                      : "border-2 border-yellow-500/50"
                  }`}
                  initial={{ opacity: 0, scale: 0, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: luigiDamaged ? [0, -5, 5, -5, 5, 0] : 0,
                    boxShadow: luigiDamaged
                      ? "0 0 30px hsl(var(--destructive) / 0.5), inset 0 0 20px hsl(var(--destructive) / 0.1)"
                      : highlightLuigi
                      ? "0 0 30px hsl(120 100% 40% / 0.4), inset 0 0 20px hsl(120 100% 40% / 0.1)"
                      : "0 0 15px hsl(45 100% 50% / 0.2)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    x: { duration: 0.4, ease: "easeInOut" }
                  }}
                >
                  <div className={`absolute -top-3 left-3 px-2 py-0.5 text-xs font-mono rounded-full border ${
                    luigiDamaged 
                      ? "bg-red-900 text-red-300 border-red-700" 
                      : "bg-green-900 text-green-300 border-green-700"
                  }`}>
                    p2
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg border ${
                      luigiDamaged 
                        ? "bg-red-500/20 border-red-500/30" 
                        : "bg-green-500/20 border-green-500/30"
                    }`}>
                      <User className={`w-6 h-6 ${luigiDamaged ? "text-red-400" : "text-green-400"}`} />
                    </div>
                    <h5 className={`text-lg font-mono font-bold ${luigiDamaged ? "text-red-400" : "text-green-400"}`}
                      style={{ textShadow: luigiDamaged ? "0 0 8px hsl(0 100% 60% / 0.5)" : "0 0 8px hsl(120 100% 50% / 0.5)" }}
                    >
                      Luigi
                    </h5>
                  </div>
                  
                  <div className={`p-2 rounded-lg border ${
                    luigiDamaged 
                      ? "bg-red-900/30 border-red-700/50" 
                      : "bg-gray-800/50 border-gray-700/50"
                  }`}>
                    <div className="flex items-center justify-between text-sm font-mono">
                      <span className="text-gray-500">hp:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={luigiDamaged ? "90" : "100"}
                          className={`font-bold ${luigiDamaged ? "text-destructive" : "text-success"}`}
                          style={{ textShadow: luigiDamaged ? "0 0 8px hsl(var(--destructive) / 0.8)" : "0 0 6px hsl(var(--success) / 0.5)" }}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: highlightLuigi ? [1, 1.3, 1] : 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {luigiDamaged ? "90" : "100"}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Damage Indicator */}
                  <AnimatePresence>
                    {luigiDamaged && (
                      <motion.div
                        className="absolute -top-2 -right-2 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-mono rounded-full font-bold"
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        style={{ boxShadow: "0 0 15px hsl(var(--destructive) / 0.8)" }}
                      >
                        -10 HP!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Key Insight */}
      <AnimatePresence>
        {currentLine >= 6 && (
          <motion.div
            className="mt-4 p-3 bg-gray-800/50 border border-primary/50 rounded-lg max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm font-mono text-center">
              <span className="text-primary">💡 Key Insight:</span>
              <span className="text-gray-400"> Mario's HP is still </span>
              <span className="text-success font-bold">100</span>
              <span className="text-gray-400">!</span>
              <br />
              <span className="text-gray-500 text-xs">Objects are independent—changing one doesn't affect others.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClassesVisualizer;