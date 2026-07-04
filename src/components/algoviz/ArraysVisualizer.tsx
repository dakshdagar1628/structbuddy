import { motion, AnimatePresence } from "framer-motion";
import { VisualState } from "./IntegratedCodeLab";

interface ArraysVisualizerProps {
  visualState: VisualState;
}

const ArraysVisualizer = ({ visualState }: ArraysVisualizerProps) => {
  const { 
    items = [1, 2, 3, 4, 5], 
    activeIndices = [], 
    action = 'none',
    pointers = []
  } = visualState;

  const getBoxStyle = (index: number) => {
    if (!activeIndices.includes(index)) {
      return "bg-secondary text-foreground/80 shadow-soft-sm";
    }
    switch (action) {
      case 'add':
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-soft-sm";
      case 'remove':
        return "bg-destructive/10 text-destructive shadow-soft-sm animate-shake";
      case 'read':
        return "bg-accent/15 text-accent shadow-soft-sm";
      default:
        return "bg-primary/10 text-primary shadow-soft-sm";
    }
  };

  const getPointerForIndex = (index: number) => {
    return pointers.filter(p => p.targetId === String(index));
  };

  if (items.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[260px] w-full p-8 bg-transparent">
        <span className="text-muted-foreground/60 font-mono text-sm animate-pulse">
          Empty Array
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[260px] w-full p-8 bg-transparent overflow-x-auto">
      {/* Title */}
      <div className="absolute top-4 left-4">
        <span className="text-muted-foreground/40 font-mono text-[10px] font-bold uppercase tracking-wider">
          Array Stage
        </span>
      </div>

      {/* Array Boxes */}
      <div className="flex items-end gap-1 mt-8">
        <AnimatePresence mode="popLayout">
          {items.map((value, index) => {
            const pointersForIndex = getPointerForIndex(index);
            
            return (
              <motion.div
                key={`${index}-${value}`}
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

                {/* Array Box */}
                <motion.div
                  animate={{
                    scale: activeIndices.includes(index) ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-14 h-14 flex items-center justify-center
                    rounded-lg transition-[background-color,box-shadow,transform] duration-300
                    ${getBoxStyle(index)}
                  `}
                >
                  <motion.span
                    key={value}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-lg font-mono font-extrabold text-foreground"
                  >
                    {value}
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

      {/* Action indicator */}
      {action !== 'none' && activeIndices.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg"
        >
          <span className="text-accent font-mono text-sm font-semibold">
            ↔ Swapping indices {activeIndices[0]} and {activeIndices[1]}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default ArraysVisualizer;
