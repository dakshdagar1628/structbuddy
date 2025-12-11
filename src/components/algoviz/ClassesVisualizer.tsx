import { motion, AnimatePresence } from "framer-motion";
import { FileCode, User } from "lucide-react";

interface ClassesVisualizerProps {
  currentLine: number;
}

const ClassesVisualizer = ({ currentLine }: ClassesVisualizerProps) => {
  // Determine state based on current line
  const showBlueprint = currentLine >= 0;
  const showMario = currentLine >= 4;
  const showLuigi = currentLine >= 5;
  const luigiDamaged = currentLine >= 6;
  const highlightBlueprint = currentLine >= 0 && currentLine <= 3;
  const highlightMario = currentLine === 4;
  const highlightLuigi = currentLine === 5 || currentLine === 6;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[350px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 gap-6 overflow-x-auto overflow-y-auto">
      <motion.h3
        className="text-xl font-mono text-white"
        style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Classes & Objects: The Blueprint Factory
      </motion.h3>

      <div className="flex flex-col items-center gap-8">
        {/* Blueprint Section - Gold Border for special "Class" type */}
        <motion.div
          className={`relative p-6 border-2 rounded-xl bg-gray-800/50 transition-all ${
            highlightBlueprint
              ? "border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
              : "border-yellow-500/50"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: showBlueprint ? 1 : 0.3, 
            scale: 1,
            boxShadow: highlightBlueprint
              ? "0 0 30px rgba(234, 179, 8, 0.4)"
              : "none"
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-3 left-4 px-2 bg-gray-900 text-xs font-mono text-yellow-500 font-bold">
            CLASS (Blueprint)
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <FileCode className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-mono font-bold text-yellow-400">Hero</h4>
              <div className="text-sm font-mono text-gray-400 mt-1 space-y-1">
                <div>• name: <span className="text-white">string</span></div>
                <div>• hp: <span className="text-white">100</span> <span className="text-xs text-gray-500">(default)</span></div>
              </div>
            </div>
          </div>
          
          {/* Factory Arrow */}
          <AnimatePresence>
            {(showMario || showLuigi) && (
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-0.5 h-6 bg-gray-500" />
                <div className="text-xs font-mono text-gray-400">creates</div>
                <div className="w-0.5 h-4 bg-gray-500" />
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Objects Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {/* Mario Card - Object instance */}
          <AnimatePresence>
            {showMario && (
              <motion.div
                className={`relative p-4 border-2 rounded-xl bg-gray-800/80 min-w-[160px] transition-all ${
                  highlightMario
                    ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                    : "border-gray-600"
                }`}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: highlightMario
                    ? "0 0 25px rgba(34, 197, 94, 0.5)"
                    : "none"
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -top-3 left-4 px-2 bg-gray-900 text-xs font-mono text-green-400 font-bold">
                  OBJECT (p1)
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                    <User className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-md font-mono font-bold text-red-400">Mario</h5>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="text-gray-400">hp:</span>
                    <motion.span
                      className="text-green-400 font-bold"
                      initial={{ scale: 1 }}
                      animate={{ scale: highlightMario ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      100
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Luigi Card - Object instance */}
          <AnimatePresence>
            {showLuigi && (
              <motion.div
                className={`relative p-4 border-2 rounded-xl bg-gray-800/80 min-w-[160px] transition-all ${
                  highlightLuigi
                    ? luigiDamaged
                      ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                      : "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                    : "border-gray-600"
                }`}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: highlightLuigi
                    ? luigiDamaged
                      ? "0 0 25px rgba(239, 68, 68, 0.5)"
                      : "0 0 25px rgba(34, 197, 94, 0.5)"
                    : "none"
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <div className={`absolute -top-3 left-4 px-2 bg-gray-900 text-xs font-mono font-bold ${
                  luigiDamaged ? "text-red-400" : "text-green-400"
                }`}>
                  OBJECT (p2)
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                    <User className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-md font-mono font-bold text-green-400">Luigi</h5>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="text-gray-400">hp:</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={luigiDamaged ? "damaged" : "full"}
                        className={`font-bold ${luigiDamaged ? "text-red-400" : "text-green-400"}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ 
                          scale: highlightLuigi ? [1, 1.3, 1] : 1, 
                          opacity: 1 
                        }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {luigiDamaged ? "90" : "100"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Damage indicator */}
                <AnimatePresence>
                  {luigiDamaged && (
                    <motion.div
                      className="absolute -top-2 -right-2 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-mono rounded-full"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      -10 HP!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Key Insight */}
      <AnimatePresence>
        {currentLine >= 6 && (
          <motion.div
            className="mt-4 p-4 bg-gray-800/50 border border-primary/50 rounded-lg max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm font-mono text-primary text-center">
              💡 Mario's HP is still <span className="text-green-400 font-bold">100</span>!
              <br />
              <span className="text-gray-400 text-xs">
                Each object is independent. Changing one doesn't affect others.
              </span>
            </div>
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
        A class is a blueprint. Objects are created from that blueprint, each with their own data.
      </motion.p>
    </div>
  );
};

export default ClassesVisualizer;
