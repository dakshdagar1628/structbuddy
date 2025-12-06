import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react";

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
    // New items go to the END of array (REAR is at the end, displayed on LEFT)
    setQueue((prev) => [newItem, ...prev]);
    setInputValue("");
  };

  const dequeue = () => {
    if (queue.length === 0) {
      showError("Queue Underflow! Queue is empty.");
      return;
    }
    // Remove from the END of array (FRONT is at the end, displayed on RIGHT)
    setQueue((prev) => prev.slice(0, -1));
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

      {/* Direction Flow Indicator */}
      <div className="flex items-center gap-4 text-sm font-mono">
        <span className="text-neon-cyan font-bold">← ENQUEUE (In)</span>
        <div className="flex items-center gap-1">
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-primary rounded-full" />
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
        <span className="text-primary font-bold">DEQUEUE (Out) →</span>
      </div>

      {/* Queue Container - Horizontal Pipe */}
      <div className="flex items-center gap-2">
        {/* REAR Side - Left (Entry) */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 bg-neon-cyan/20 border border-neon-cyan rounded-lg"
            animate={{ x: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowLeft className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs font-mono font-bold text-neon-cyan">REAR</span>
          </motion.div>
          <span className="text-[10px] font-mono text-muted-foreground">New items enter here</span>
        </div>

        {/* Pipe/Conveyor Belt */}
        <motion.div
          className={`relative min-w-[480px] h-28 glass-container rounded-2xl flex items-center px-4 gap-3 overflow-hidden border-2 border-neon-cyan/30 ${
            isShaking ? "shake" : ""
          }`}
          style={{
            boxShadow: "inset 0 0 30px hsl(var(--neon-cyan) / 0.1), 0 0 20px hsl(var(--primary) / 0.2)",
          }}
        >
          {/* Conveyor belt animation - flows left to right */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                background:
                  "repeating-linear-gradient(90deg, transparent, transparent 30px, hsl(var(--primary) / 0.2) 30px, hsl(var(--primary) / 0.2) 32px)",
                animation: "data-flow 1.5s linear infinite",
              }}
            />
          </div>

          {/* Pipe caps - visual */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-neon-cyan/40 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-primary/40 to-transparent" />

          {/* Empty state */}
          {queue.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground font-mono text-sm opacity-60">
                Queue is empty — Enqueue to add items
              </span>
            </div>
          )}

          {/* Queue items - REAR (newest) on LEFT, FRONT (oldest) on RIGHT */}
          <AnimatePresence mode="popLayout">
            {queue.map((item, index) => {
              const isRear = index === 0; // Newest item (leftmost)
              const isFront = index === queue.length - 1; // Oldest item (rightmost)
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -80, scale: 0.5, rotate: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{ opacity: 0, x: 80, scale: 0.5, rotate: 10 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    mass: 0.8
                  }}
                  className={`relative w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 ${
                    isFront
                      ? "bg-primary/30 border-2 border-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                      : isRear
                        ? "bg-neon-cyan/20 border-2 border-neon-cyan shadow-[0_0_15px_hsl(var(--neon-cyan)/0.5)]"
                        : "bg-secondary/80 border border-border/50"
                  }`}
                >
                  <span
                    className={`font-mono font-bold text-lg ${
                      isFront
                        ? "text-primary"
                        : isRear
                          ? "text-neon-cyan"
                          : "text-foreground"
                    }`}
                  >
                    {item.value}
                  </span>

                  {/* Position label */}
                  {(isRear || isFront) && (
                    <motion.span 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute -top-6 text-[10px] font-mono font-bold ${
                        isFront ? "text-primary" : "text-neon-cyan"
                      }`}
                    >
                      {isFront && isRear ? "FRONT & REAR" : isFront ? "FRONT" : "REAR"}
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* FRONT Side - Right (Exit) */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary rounded-lg"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="text-xs font-mono font-bold text-primary">FRONT</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-[10px] font-mono text-muted-foreground">Items exit here</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value"
            className="w-20 px-3 py-2.5 bg-card border border-border rounded-lg font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50"
          />
          <motion.button
            onClick={enqueue}
            className="flex items-center gap-2 px-5 py-2.5 bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan rounded-lg font-mono font-bold shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)]"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(var(--neon-cyan) / 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Enqueue
          </motion.button>
        </div>

        <motion.button
          onClick={dequeue}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary/20 border-2 border-primary text-primary rounded-lg font-mono font-bold shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(var(--primary) / 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Dequeue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Status Display */}
      <div className="flex items-center gap-8 text-sm font-mono bg-card/50 px-6 py-3 rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Size:</span>
          <span className="text-foreground font-bold">{queue.length}</span>
          <span className="text-muted-foreground">/ {maxSize}</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Front:</span>
          <span className="text-primary font-bold">
            {queue.length > 0 ? queue[queue.length - 1].value : "∅"}
          </span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Rear:</span>
          <span className="text-neon-cyan font-bold">
            {queue.length > 0 ? queue[0].value : "∅"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
