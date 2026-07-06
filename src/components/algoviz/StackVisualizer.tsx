import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, Eye, AlertTriangle } from "lucide-react";

interface StackItem {
  id: string;
  value: number;
}

const StackVisualizer = () => {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [peekIndex, setPeekIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const maxSize = 6;

  const showError = (message: string) => {
    setError(message);
    setIsShaking(true);
    setTimeout(() => {
      setError(null);
      setIsShaking(false);
    }, 2200);
  };

  const push = () => {
    if (stack.length >= maxSize) {
      showError("Stack Overflow! Limit reached.");
      return;
    }
    const newItem: StackItem = {
      id: `item-${Date.now()}`,
      value: Math.floor(Math.random() * 90) + 10,
    };
    setStack((prev) => [...prev, newItem]);
    setPeekIndex(null);
  };

  const pop = () => {
    if (stack.length === 0) {
      showError("Stack Underflow! Stack is empty.");
      return;
    }
    setStack((prev) => prev.slice(0, -1));
    setPeekIndex(null);
  };

  const peek = () => {
    if (stack.length === 0) {
      showError("Cannot peek! Stack is empty.");
      return;
    }
    setPeekIndex(stack.length - 1);
  };

  const handleItemClick = (index: number) => {
    if (index !== stack.length - 1) {
      showError("LIFO Restriction: Only top item is accessible.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-8 relative select-none">
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -15, x: "-50%" }}
            className="absolute top-4 left-1/2 flex items-center gap-2.5 px-4.5 py-2.5 bg-destructive/10 text-destructive border border-destructive/20 rounded-full shadow-soft-md z-50 font-mono text-[10px] uppercase font-bold tracking-wider"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stack Container */}
      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <span className="text-[10px] font-mono font-bold text-muted-foreground/40 uppercase tracking-wider">
          ↓ TOP (Access point)
        </span>

        <motion.div
          animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-48 sm:w-52 min-h-[260px] bg-secondary/15 border-x border-b border-border/40 rounded-b-2xl shadow-inner flex flex-col-reverse items-center justify-start p-3 gap-2.5"
        >
          {/* Empty state */}
          {stack.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-muted-foreground/40 font-mono text-xs uppercase tracking-wider">
                Empty Stack
              </span>
            </div>
          )}

          {/* Stack items */}
          <AnimatePresence mode="popLayout">
            {stack.map((item, index) => {
              const isTop = index === stack.length - 1;
              const isPeeked = peekIndex === index;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -45, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    boxShadow: isPeeked ? "var(--shadow-soft-md), 0 0 0 1px hsl(var(--primary))" : "var(--shadow-soft-sm)"
                  }}
                  exit={{ opacity: 0, y: -60, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  onClick={() => handleItemClick(index)}
                  className={`relative w-full h-11 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
                    isTop
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-foreground/80 hover:bg-secondary/85"
                  }`}
                >
                  <span className="font-mono font-bold text-sm">
                    {item.value}
                  </span>
                  {isTop && (
                    <span className="absolute right-2.5 text-[8px] font-mono font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded shadow-soft-sm uppercase tracking-wider">
                      TOP
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <span className="text-[10px] font-mono font-bold text-muted-foreground/40 uppercase tracking-wider">
          ↑ BOTTOM
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 w-full max-w-sm pt-2">
        <motion.button
          onClick={push}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-primary/95 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Push</span>
        </motion.button>

        <motion.button
          onClick={pop}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-secondary text-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-secondary/80 transition-all border border-border/30"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Minus className="w-3.5 h-3.5" />
          <span>Pop</span>
        </motion.button>

        <motion.button
          onClick={peek}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-secondary text-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-secondary/80 transition-all border border-border/30"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Peek</span>
        </motion.button>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-5 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 border-t border-border/30 pt-4 w-full max-w-xs justify-between">
        <div>
          <span>Size: </span>
          <span className="text-foreground">{stack.length}</span>
          <span>/{maxSize}</span>
        </div>
        <div>
          <span>Top: </span>
          <span className="text-foreground">
            {stack.length > 0 ? stack[stack.length - 1].value : "null"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
