import { motion, AnimatePresence } from "framer-motion";
import { VisualState } from "./IntegratedCodeLab";

interface StringsVisualizerProps {
  visualState: VisualState;
}

const StringsVisualizer = ({ visualState }: StringsVisualizerProps) => {
  const { 
    items = ['R', 'A', 'D', 'A', 'R'], 
    activeIndices = [], 
    action = 'none',
    pointers = []
  } = visualState;

  const getBoxStyle = (index: number) => {
    if (!activeIndices.includes(index)) {
      return "border-border bg-muted/40";
    }
    switch (action) {
      case 'add': // Match - green
        return "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
      case 'remove': // Mismatch - red
        return "border-destructive bg-destructive/10 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.2)]";
      case 'read': // Comparing - yellow
        return "border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(245,158,11,0.2)]";
      default:
        return "border-primary bg-primary/10 text-primary";
    }
  };

  const getPointerForIndex = (index: number) => {
    return pointers.filter(p => p.targetId === String(index));
  };

  // Check if all characters should glow (palindrome success)
  const isFullSuccess = action === 'add' && activeIndices.length === items.length;

  if (items.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full p-8 border border-border bg-card rounded-xl shadow-xs">
        <span className="text-muted-foreground font-mono text-lg animate-pulse">
          Empty String
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full p-8 border border-border bg-card rounded-xl shadow-xs overflow-x-auto">
      {/* Title */}
      <div className="absolute top-4 left-4">
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">
          String Visualization
        </span>
      </div>

      {/* String Status */}
      <AnimatePresence>
        {isFullSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
              ✓ PALINDROME
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Boxes */}
      <div className="flex items-end gap-1 mt-8">
        <AnimatePresence mode="popLayout">
          {items.map((char, index) => {
            const pointersForIndex = getPointerForIndex(index);
            
            return (
              <motion.div
                key={`${index}-${char}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                {/* Pointers above */}
                <div className="min-h-[60px] flex flex-col items-center justify-end pb-2">
                  <AnimatePresence>
                    {pointersForIndex.map((pointer) => (
                      <motion.div
                        key={pointer.label}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center"
                      >
                        <span 
                          className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                            pointer.label === 'left' 
                              ? 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/30 dark:text-cyan-300' 
                              : 'bg-pink-500/10 text-pink-600 dark:bg-pink-500/30 dark:text-pink-300'
                          }`}
                        >
                          {pointer.label}
                        </span>
                        <motion.div
                          animate={{ y: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent ${
                            pointer.label === 'left' 
                              ? 'border-t-cyan-500 dark:border-t-cyan-400' 
                              : 'border-t-pink-500 dark:border-t-pink-400'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Character Box */}
                <motion.div
                  animate={{
                    scale: activeIndices.includes(index) ? [1, 1.08, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-14 h-14 flex items-center justify-center
                    border-2 rounded-lg transition-[background-color,border-color,box-shadow,transform] duration-300
                    ${isFullSuccess 
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
                      : getBoxStyle(index)
                    }
                  `}
                >
                  <motion.span
                    key={char}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-mono font-bold text-foreground"
                  >
                    {char}
                  </motion.span>
                </motion.div>

                {/* Index Label */}
                <span className="mt-2 text-xs font-mono text-muted-foreground">
                  [{index}]
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Comparison Status */}
      <AnimatePresence>
        {action === 'read' && activeIndices.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg"
          >
            <span className="text-accent font-mono text-sm font-semibold">
              🔍 Comparing: '{items[activeIndices[0]]}' vs '{items[activeIndices[1]]}'
            </span>
          </motion.div>
        )}
        {action === 'add' && activeIndices.length === 2 && !isFullSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">
              ✓ Match! '{items[activeIndices[0]]}' == '{items[activeIndices[1]]}'
            </span>
          </motion.div>
        )}
        {action === 'remove' && activeIndices.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-lg"
          >
            <span className="text-destructive font-mono text-sm font-semibold">
              ✗ Mismatch! Not a palindrome.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StringsVisualizer;
