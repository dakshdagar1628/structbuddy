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
  const maxSize = 8;

  const showError = (message: string) => {
    setError(message);
    setIsShaking(true);
    setTimeout(() => {
      setError(null);
      setIsShaking(false);
    }, 2000);
  };

  const push = () => {
    if (stack.length >= maxSize) {
      showError("Stack Overflow! Maximum capacity reached.");
      return;
    }
    const newItem: StackItem = {
      id: `item-${Date.now()}`,
      value: Math.floor(Math.random() * 99) + 1,
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
      showError("Stack is LIFO! Only top element is accessible.");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-3 bg-accent/20 border border-accent rounded-lg neon-border-red z-50"
          >
            <AlertTriangle className="w-5 h-5 text-accent" />
            <span className="text-sm font-mono text-accent">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stack Container */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-muted-foreground">
          ↓ TOP (Push/Pop here)
        </span>

        <motion.div
          className={`relative w-48 min-h-[400px] glass-container rounded-t-none rounded-b-xl flex flex-col-reverse items-center justify-start p-4 gap-2 ${
            isShaking ? "shake" : ""
          }`}
        >
          {/* Empty state */}
          {stack.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground font-mono text-sm">
                Stack is empty
              </span>
            </div>
          )}

          {/* Stack items */}
          <AnimatePresence mode="popLayout">
            {stack.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  boxShadow:
                    peekIndex === index
                      ? "0 0 20px hsl(160 100% 50% / 0.8)"
                      : "none",
                }}
                exit={{ opacity: 0, y: -100, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => handleItemClick(index)}
                className={`w-full h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ${
                  index === stack.length - 1
                    ? "bg-primary/30 border-2 border-primary"
                    : "bg-secondary border border-border"
                } ${peekIndex === index ? "ring-2 ring-primary pulse-glow" : ""}`}
              >
                <span
                  className={`font-mono font-bold text-lg ${
                    index === stack.length - 1
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.value}
                </span>
                {index === stack.length - 1 && (
                  <span className="absolute -right-16 text-xs font-mono text-primary">
                    ← TOP
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <span className="text-xs font-mono text-muted-foreground">
          ↑ BOTTOM (Base)
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          onClick={push}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono font-medium neon-border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Push
        </motion.button>

        <motion.button
          onClick={pop}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-mono font-medium neon-border-red"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Minus className="w-5 h-5" />
          Pop
        </motion.button>

        <motion.button
          onClick={peek}
          className="flex items-center gap-2 px-6 py-3 bg-card border border-neon-cyan text-neon-cyan rounded-lg font-mono font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-5 h-5" />
          Peek
        </motion.button>
      </div>

      {/* Status */}
      <div className="flex items-center gap-6 text-sm font-mono">
        <div>
          <span className="text-muted-foreground">Size: </span>
          <span className="text-primary">{stack.length}</span>
          <span className="text-muted-foreground"> / {maxSize}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Top: </span>
          <span className="text-primary">
            {stack.length > 0 ? stack[stack.length - 1].value : "null"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
