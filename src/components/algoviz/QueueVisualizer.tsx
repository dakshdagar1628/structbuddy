import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LogIn, LogOut, AlertTriangle } from "lucide-react";

interface QueueItem {
  id: string;
  value: number;
}

const QueueVisualizer = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const maxSize = 8;

  const showError = (message: string) => {
    setError(message);
    setIsShaking(true);
    setTimeout(() => {
      setError(null);
      setIsShaking(false);
    }, 2000);
  };

  const enqueue = () => {
    if (queue.length >= maxSize) {
      showError("Queue Overflow! Maximum capacity reached.");
      return;
    }
    const value = inputValue
      ? parseInt(inputValue)
      : Math.floor(Math.random() * 99) + 1;
    const newItem: QueueItem = {
      id: `item-${Date.now()}`,
      value: isNaN(value) ? Math.floor(Math.random() * 99) + 1 : value,
    };
    setQueue((prev) => [...prev, newItem]);
    setInputValue("");
  };

  const dequeue = () => {
    if (queue.length === 0) {
      showError("Queue Underflow! Queue is empty.");
      return;
    }
    setQueue((prev) => prev.slice(1));
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

      {/* Queue Labels */}
      <div className="flex items-center gap-8 text-sm font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="text-primary font-mono" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>FRONT (Dequeue)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-neon-cyan font-mono" style={{ textShadow: '0 0 10px hsl(var(--neon-cyan) / 0.5)' }}>REAR (Enqueue)</span>
        </div>
      </div>

      {/* Queue Container - Horizontal Pipe */}
      <div className="w-full max-w-full overflow-x-auto py-4 px-2 flex justify-center">
        <div className="flex items-center gap-4 min-w-[320px] sm:min-w-[500px]">
          {/* Front indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 shrink-0"
            animate={{ x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <LogOut className="w-8 h-8 text-primary" />
            <span className="text-xs font-mono text-primary" style={{ textShadow: '0 0 8px hsl(var(--primary) / 0.5)' }}>FRONT</span>
          </motion.div>

          {/* Pipe/Conveyor */}
          <motion.div
            className={`relative flex-1 min-w-[260px] sm:min-w-[420px] h-24 border border-border bg-card rounded-xl shadow-md flex items-center px-4 gap-2 overflow-visible ${
              isShaking ? "shake" : ""
            }`}
          >
          {/* Conveyor belt animation */}
          <div className="absolute inset-0 opacity-20 rounded-xl overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background:
                  "repeating-linear-gradient(90deg, transparent, transparent 20px, hsl(var(--primary) / 0.3) 20px, hsl(var(--primary) / 0.3) 40px)",
                animation: "data-flow 2s linear infinite",
              }}
            />
          </div>

          {/* Empty state */}
          {queue.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-500 font-mono text-lg animate-pulse">
                Empty Queue
              </span>
            </div>
          )}

          {/* Queue items */}
          <AnimatePresence mode="popLayout">
            {queue.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, x: -100, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative w-16 h-16 flex items-center justify-center rounded-lg transition-all duration-300 ${
                  index === 0
                    ? "bg-primary/30 border-2 border-primary"
                    : index === queue.length - 1
                      ? "bg-neon-cyan/20 border-2 border-neon-cyan"
                      : "bg-secondary border border-border"
                }`}
              >
                <span
                  className={`font-mono font-bold text-lg ${
                    index === 0
                      ? "text-primary"
                      : index === queue.length - 1
                        ? "text-neon-cyan"
                        : "text-foreground"
                  }`}
                >
                  {item.value}
                </span>

                {/* Position indicator */}
                <span className="absolute -bottom-6 text-[10px] font-mono text-muted-foreground">
                  [{index}]
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Rear indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 shrink-0"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <LogIn className="w-8 h-8 text-neon-cyan" />
          <span className="text-xs font-mono text-neon-cyan" style={{ textShadow: '0 0 8px hsl(var(--neon-cyan) / 0.5)' }}>REAR</span>
        </motion.div>
      </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.replace(/[^0-9-]/g, "").slice(0, 3))}
            placeholder="Value"
            className="w-20 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-center"
          />
          <motion.button
            onClick={enqueue}
            className="flex items-center gap-2 px-6 py-2.5 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded-lg font-mono font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn className="w-5 h-5" />
            Enqueue
          </motion.button>
        </div>

        <motion.button
          onClick={dequeue}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-mono font-medium neon-border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5" />
          Dequeue
        </motion.button>
      </div>

      {/* Status */}
      <div className="flex items-center gap-6 text-sm font-mono">
        <div>
          <span className="text-muted-foreground">Size: </span>
          <span className="text-primary">{queue.length}</span>
          <span className="text-muted-foreground"> / {maxSize}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Front: </span>
          <span className="text-primary">
            {queue.length > 0 ? queue[0].value : "null"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Rear: </span>
          <span className="text-neon-cyan">
            {queue.length > 0 ? queue[queue.length - 1].value : "null"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
