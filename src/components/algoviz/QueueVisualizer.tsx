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
  const maxSize = 6; // smaller size to prevent overflow on mobile

  const showError = (message: string) => {
    setError(message);
    setIsShaking(true);
    setTimeout(() => {
      setError(null);
      setIsShaking(false);
    }, 2200);
  };

  const enqueue = () => {
    if (queue.length >= maxSize) {
      showError("Queue Overflow! Limit reached.");
      return;
    }
    const value = inputValue
      ? parseInt(inputValue)
      : Math.floor(Math.random() * 90) + 10;
    const newItem: QueueItem = {
      id: `item-${Date.now()}`,
      value: isNaN(value) ? Math.floor(Math.random() * 90) + 10 : value,
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

      {/* Queue Labels */}
      <div className="flex items-center gap-6 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span>Front (Out)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span>Rear (In)</span>
        </div>
      </div>

      {/* Queue Container - Horizontal Pipe */}
      <div className="w-full max-w-lg overflow-x-auto py-4 px-2 flex justify-center custom-scrollbar">
        <div className="flex items-center gap-4 min-w-[320px] sm:min-w-[460px]">
          {/* Front indicator */}
          <motion.div
            className="flex flex-col items-center gap-1.5 shrink-0"
            animate={{ x: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <LogOut className="w-6 h-6 text-primary" aria-hidden="true" />
            <span className="text-[9px] font-mono font-bold uppercase text-primary tracking-wider">FRONT</span>
          </motion.div>

          {/* Pipe/Conveyor */}
          <motion.div
            animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative flex-1 min-w-[220px] sm:min-w-[340px] h-20 bg-secondary/15 border-y border-border/40 rounded-xl shadow-inner flex items-center px-4 gap-3 overflow-visible"
          >
            {/* Conveyor belt animation pattern */}
            <div className="absolute inset-0 opacity-5 rounded-xl overflow-hidden pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 20px, hsl(var(--primary)) 20px, hsl(var(--primary)) 40px)",
                }}
              />
            </div>

            {/* Empty state */}
            {queue.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-muted-foreground/45 font-mono text-xs uppercase tracking-wider">
                  Empty Queue
                </span>
              </div>
            )}

            {/* Queue items */}
            <AnimatePresence mode="popLayout">
              {queue.map((item, index) => {
                const isFront = index === 0;
                const isRear = index === queue.length - 1;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      boxShadow: "var(--shadow-soft-sm)"
                    }}
                    exit={{ opacity: 0, x: -50, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className={`relative w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 shrink-0 ${
                      isFront
                        ? "bg-primary/10 text-primary"
                        : isRear
                          ? "bg-accent/15 text-accent"
                          : "bg-secondary text-foreground/80"
                    }`}
                  >
                    <span className="font-mono font-bold text-xs">
                      {item.value}
                    </span>

                    {/* Position indicator */}
                    <span className="absolute -bottom-5 text-[8px] font-mono font-bold text-muted-foreground/35 select-none">
                      {index}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Rear indicator */}
          <motion.div
            className="flex flex-col items-center gap-1.5 shrink-0"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <LogIn className="w-6 h-6 text-accent" aria-hidden="true" />
            <span className="text-[9px] font-mono font-bold uppercase text-accent tracking-wider">REAR</span>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-sm pt-2">
        <input
          id="queue-input"
          type="text"
          inputMode="numeric"
          maxLength={3}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.replace(/[^0-9-]/g, "").slice(0, 3))}
          placeholder="Val"
          className="w-16 px-2.5 py-1.5 bg-card border border-border/40 rounded-lg font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-center shadow-soft-sm"
          autoComplete="off"
          spellCheck={false}
        />
        <motion.button
          onClick={enqueue}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-primary/95 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Enqueue</span>
        </motion.button>

        <motion.button
          onClick={dequeue}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-secondary text-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-secondary/80 transition-all border border-border/30"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Dequeue</span>
        </motion.button>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-5 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 border-t border-border/30 pt-4 w-full max-w-xs justify-between">
        <div>
          <span>Size: </span>
          <span className="text-foreground">{queue.length}</span>
          <span>/{maxSize}</span>
        </div>
        <div>
          <span>Front: </span>
          <span className="text-foreground">
            {queue.length > 0 ? queue[0].value : "null"}
          </span>
        </div>
        <div>
          <span>Rear: </span>
          <span className="text-foreground">
            {queue.length > 0 ? queue[queue.length - 1].value : "null"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
