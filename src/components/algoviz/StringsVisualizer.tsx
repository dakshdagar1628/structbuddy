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
      return "border-gray-600 bg-gray-800/80";
    }
    switch (action) {
      case 'add': // Match - green
        return "border-green-400 bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.5)]";
      case 'remove': // Mismatch - red
        return "border-red-400 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.5)]";
      case 'read': // Comparing - yellow
        return "border-yellow-400 bg-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.4)]";
      default:
        return "border-primary bg-primary/20";
    }
  };

  const getPointerForIndex = (index: number) => {
    return pointers.filter(p => p.targetId === String(index));
  };

  // Check if all characters should glow (palindrome success)
  const isFullSuccess = action === 'add' && activeIndices.length === items.length;

  if (items.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm">
        <span className="text-gray-500 font-mono text-lg animate-pulse">
          Empty String
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm overflow-x-auto">
      {/* Title */}
      <div className="absolute top-4 left-4">
        <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">
          String Visualization
        </span>
      </div>

      {/* String Status */}
      <AnimatePresence>
        {isFullSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 px-3 py-1 bg-green-500/30 border border-green-500/50 rounded-full"
          >
            <span className="text-green-300 font-mono text-xs font-bold">
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
                              ? 'bg-cyan-500/30 text-cyan-300' 
                              : 'bg-pink-500/30 text-pink-300'
                          }`}
                          style={{ textShadow: '0 0 10px currentColor' }}
                        >
                          {pointer.label}
                        </span>
                        <motion.div
                          animate={{ y: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent ${
                            pointer.label === 'left' 
                              ? 'border-t-cyan-400' 
                              : 'border-t-pink-400'
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
                    border-2 rounded-lg transition-all duration-300
                    ${isFullSuccess 
                      ? "border-green-400 bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.5)]" 
                      : getBoxStyle(index)
                    }
                  `}
                >
                  <motion.span
                    key={char}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-mono font-bold text-white"
                  >
                    {char}
                  </motion.span>
                </motion.div>

                {/* Index Label */}
                <span className="mt-2 text-xs font-mono text-gray-500">
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
            className="mt-6 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg"
          >
            <span className="text-yellow-300 font-mono text-sm">
              🔍 Comparing: '{items[activeIndices[0]]}' vs '{items[activeIndices[1]]}'
            </span>
          </motion.div>
        )}
        {action === 'add' && activeIndices.length === 2 && !isFullSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg"
          >
            <span className="text-green-300 font-mono text-sm">
              ✓ Match! '{items[activeIndices[0]]}' == '{items[activeIndices[1]]}'
            </span>
          </motion.div>
        )}
        {action === 'remove' && activeIndices.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg"
          >
            <span className="text-red-300 font-mono text-sm">
              ✗ Mismatch! Not a palindrome.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StringsVisualizer;
