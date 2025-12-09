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
    <div className="h-full flex flex-col items-center justify-center gap-8 p-8">
      <motion.h3
        className="text-xl font-mono text-primary neon-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Memory Visualization
      </motion.h3>

      <div className="flex flex-wrap justify-center gap-12">
        {/* Score Box */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: currentLine >= 1 ? 1 : 0.3, 
            scale: currentLine >= 1 ? 1 : 0.8 
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-mono text-muted-foreground">Variable</span>
          <div className="relative">
            <motion.div
              className={`w-32 h-24 border-2 rounded-lg flex items-center justify-center bg-card transition-colors ${
                currentLine === 1 || currentLine === 2 
                  ? "border-primary neon-border" 
                  : "border-border"
              }`}
              animate={{
                boxShadow: currentLine === 1 || currentLine === 2
                  ? "0 0 20px hsl(var(--primary) / 0.5)"
                  : "none"
              }}
            >
              <AnimatePresence mode="wait">
                {scoreValue !== null && (
                  <motion.span
                    key={scoreValue}
                    className="text-3xl font-bold font-mono text-primary"
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
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/20 rounded text-sm font-mono text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentLine >= 1 ? 1 : 0 }}
            >
              score
            </motion.div>
          </div>
        </motion.div>

        {/* Name Box */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: currentLine >= 3 ? 1 : 0.3, 
            scale: currentLine >= 3 ? 1 : 0.8 
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-mono text-muted-foreground">Variable</span>
          <div className="relative">
            <motion.div
              className={`w-40 h-24 border-2 rounded-lg flex items-center justify-center bg-card transition-colors ${
                currentLine === 3 
                  ? "border-accent neon-border-accent" 
                  : "border-border"
              }`}
              animate={{
                boxShadow: currentLine === 3
                  ? "0 0 20px hsl(var(--accent) / 0.5)"
                  : "none"
              }}
            >
              <AnimatePresence mode="wait">
                {nameValue !== null && (
                  <motion.span
                    key={nameValue}
                    className="text-xl font-bold font-mono text-accent"
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
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent/20 rounded text-sm font-mono text-accent"
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
            className="mt-8 p-4 bg-card border border-primary rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="text-xs font-mono text-muted-foreground mb-2 block">
              Console Output:
            </span>
            <motion.div
              className="font-mono text-lg text-primary"
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
