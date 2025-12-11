import { motion, AnimatePresence } from "framer-motion";

interface VariablesVisualizerProps {
  currentLine: number;
}

const VariablesVisualizer = ({ currentLine }: VariablesVisualizerProps) => {
  // Determine variable states based on current line
  const getScoreValue = () => {
    if (currentLine >= 1) return currentLine >= 2 ? 15 : 10;
    return null;
  };

  const getNameValue = () => {
    if (currentLine >= 3) return "Player 1";
    return null;
  };

  const scoreValue = getScoreValue();
  const nameValue = getNameValue();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[350px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 gap-8 overflow-x-auto">
      <motion.h3
        className="text-xl font-mono text-white"
        style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Memory Visualization
      </motion.h3>

      <div className="flex flex-wrap justify-center gap-12">
        {/* Score Box - Memory Chip Style */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: currentLine >= 1 ? 1 : 0.3, 
            scale: currentLine >= 1 ? 1 : 0.8 
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-mono text-gray-400">Variable</span>
          <div className="relative">
            <motion.div
              className={`w-32 h-24 rounded-lg flex items-center justify-center bg-gray-800/80 transition-colors border-l-4 border-l-green-500 border-t border-r border-b ${
                currentLine === 1 || currentLine === 2 
                  ? "border-t-green-500/50 border-r-green-500/50 border-b-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                  : "border-gray-600"
              }`}
              animate={{
                boxShadow: currentLine === 1 || currentLine === 2
                  ? "0 0 20px rgba(34, 197, 94, 0.5)"
                  : "none"
              }}
            >
              <AnimatePresence mode="wait">
                {scoreValue !== null && (
                  <motion.span
                    key={scoreValue}
                    className="text-3xl font-bold font-mono text-green-400"
                    initial={{ opacity: 0, y: -20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                  >
                    {scoreValue}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500/20 rounded text-sm font-mono text-green-400 border border-green-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentLine >= 1 ? 1 : 0 }}
            >
              score
            </motion.div>
          </div>
        </motion.div>

        {/* Name Box - Memory Chip Style */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: currentLine >= 3 ? 1 : 0.3, 
            scale: currentLine >= 3 ? 1 : 0.8 
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-mono text-gray-400">Variable</span>
          <div className="relative">
            <motion.div
              className={`w-40 h-24 rounded-lg flex items-center justify-center bg-gray-800/80 transition-colors border-l-4 border-l-green-500 border-t border-r border-b ${
                currentLine === 3 
                  ? "border-t-cyan-500/50 border-r-cyan-500/50 border-b-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                  : "border-gray-600"
              }`}
              animate={{
                boxShadow: currentLine === 3
                  ? "0 0 20px rgba(6, 182, 212, 0.5)"
                  : "none"
              }}
            >
              <AnimatePresence mode="wait">
                {nameValue !== null && (
                  <motion.span
                    key={nameValue}
                    className="text-xl font-bold font-mono text-cyan-400"
                    initial={{ opacity: 0, y: -20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                  >
                    "{nameValue}"
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500/20 rounded text-sm font-mono text-cyan-400 border border-cyan-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentLine >= 3 ? 1 : 0 }}
            >
              name
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Print Output */}
      <AnimatePresence>
        {currentLine >= 4 && (
          <motion.div
            className="mt-8 p-4 bg-gray-800/50 border border-green-500/50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="text-xs font-mono text-gray-400 mb-2 block">
              Console Output:
            </span>
            <motion.div
              className="font-mono text-lg text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Player 1 15
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
        Watch how values are stored in "boxes" (variables) and can be updated or read.
      </motion.p>
    </div>
  );
};

export default VariablesVisualizer;
