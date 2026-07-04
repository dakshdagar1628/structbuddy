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
      return "bg-secondary text-foreground/80 shadow-soft-sm";
    }
    switch (action) {
      case 'add': // Match - green
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-soft-sm";
      case 'remove': // Mismatch - red
        return "bg-destructive/10 text-destructive shadow-soft-sm";
      case 'read': // Comparing - yellow
        return "bg-accent/15 text-accent shadow-soft-sm";
      default:
        return "bg-primary/10 text-primary shadow-soft-sm";
    }
  };

  const getPointerForIndex = (index: number) => {
    return pointers.filter(p => p.targetId === String(index));
  };

  // Check if all characters should glow (palindrome success)
  const isFullSuccess = action === 'add' && activeIndices.length === items.length;

  if (items.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[260px] w-full p-8 bg-transparent">
        <span className="text-muted-foreground/60 font-mono text-sm animate-pulse">
          Empty String
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[260px] w-full p-8 bg-transparent overflow-x-auto">
      {/* Title */}
      <div className="absolute top-4 left-4">
        <span className="text-muted-foreground/40 font-mono text-[10px] font-bold uppercase tracking-wider">
          String Stage
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
                    w-12.5 h-12.5 flex items-center justify-center
                    rounded-lg transition-[background-color,box-shadow,transform] duration-300
                    ${isFullSuccess 
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-soft-sm" 
                      : getBoxStyle(index)
                    }
                  `}
                >
                  <motion.span
                    key={char}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xl font-mono font-extrabold text-foreground"
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
