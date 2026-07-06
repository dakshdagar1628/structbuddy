import { motion, AnimatePresence } from "framer-motion";
import type { PointerModel, VisualState } from "./IntegratedCodeLab";

interface StringsVisualizerProps {
  visualState: VisualState;
}

const StringsVisualizer = ({ visualState }: StringsVisualizerProps) => {
  const { items = [], activeIndices = [], action = 'none', pointers = [] } = visualState;

  const getPointerForIndex = (index: number): PointerModel[] => {
    return pointers.filter((p) => p.targetId === String(index));
  };

  const isFullSuccess = action === 'none' && items.length > 0 && activeIndices.length === 0;

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
    <div className="relative flex flex-col items-center justify-center min-h-[260px] w-full p-6 bg-transparent select-none">
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
            <span className="text-emerald-750 dark:text-emerald-450 font-mono text-[10px] font-bold uppercase tracking-wider">
              ✓ Palindrome
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Boxes */}
      <div className="flex items-end gap-2.5 mt-8 overflow-x-auto w-full max-w-full justify-start md:justify-center px-4 py-2 custom-scrollbar">
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
                className="flex flex-col items-center shrink-0"
              >
                {/* Pointers above */}
                <div className="min-h-[50px] flex flex-col items-center justify-end pb-1.5">
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
                          className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-soft-sm ${
                            pointer.label === 'left' 
                              ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20' 
                              : 'bg-pink-500/10 text-rose-700 dark:text-rose-455 border-pink-500/20'
                          }`}
                        >
                          {pointer.label}
                        </span>
                        <motion.div
                          animate={{ y: [0, 2, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent ${
                            pointer.label === 'left' 
                              ? 'border-t-cyan-550 dark:border-t-cyan-400' 
                              : 'border-t-pink-550 dark:border-t-pink-400'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Character Box */}
                <motion.div
                  animate={{
                    scale: activeIndices.includes(index) ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-12 h-12 flex items-center justify-center
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
                    className="text-base font-mono font-extrabold text-foreground"
                  >
                    {char}
                  </motion.span>
                </motion.div>

                {/* Index Label */}
                <span className="mt-2 text-[10px] font-mono font-bold text-muted-foreground/35 select-none">
                  [{index}]
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Action indicator */}
      <div className="h-10 flex items-center justify-center mt-4">
        {action !== 'none' && activeIndices.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-4 py-1.5 rounded-full shadow-soft-sm ${
              action === 'add' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-destructive/10 border border-destructive/20'
            }`}
          >
            <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
              action === 'add' ? 'text-emerald-750 dark:text-emerald-450' : 'text-destructive'
            }`}>
              {action === 'add' ? `Match found: '${items[activeIndices[0]]}' == '${items[activeIndices[1]]}'` : `Mismatch: '${items[activeIndices[0]]}' != '${items[activeIndices[1]]}'`}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StringsVisualizer;
