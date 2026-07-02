import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const generateRandomArray = () => {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10);
};

const ArraysGameArena = () => {
  const [array, setArray] = useState<number[]>(generateRandomArray);
  const [indexA, setIndexA] = useState<string>("0");
  const [indexB, setIndexB] = useState<string>("4");
  const [swapping, setSwapping] = useState<[number, number] | null>(null);
  const [swapSuccess, setSwapSuccess] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string>("");

  const handleSwap = () => {
    const a = parseInt(indexA);
    const b = parseInt(indexB);

    // Validation
    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers");
      return;
    }
    if (a < 0 || a > 4 || b < 0 || b > 4) {
      setError("Index must be between 0 and 4");
      return;
    }
    if (a === b) {
      setError("Cannot swap an element with itself");
      return;
    }

    setError("");
    setSwapping([a, b]);
    setSwapSuccess(null);

    // Perform swap after animation
    setTimeout(() => {
      setArray((prev) => {
        const newArr = [...prev];
        [newArr[a], newArr[b]] = [newArr[b], newArr[a]];
        return newArr;
      });
      setSwapping(null);
      setSwapSuccess([a, b]);

      // Clear success highlight after a moment
      setTimeout(() => setSwapSuccess(null), 1000);
    }, 1000);
  };

  const handleReset = () => {
    setArray(generateRandomArray());
    setSwapping(null);
    setSwapSuccess(null);
    setError("");
  };

  const getBoxStyle = (idx: number) => {
    if (swapSuccess?.includes(idx)) {
      return "border-emerald-600 bg-emerald-500/20 shadow-md text-emerald-800 dark:text-emerald-300";
    }
    if (swapping?.includes(idx)) {
      return "border-amber-500 bg-amber-500/20";
    }
    return "border-primary/50 bg-primary/10";
  };

  const getSwapOffset = (idx: number) => {
    if (!swapping) return { x: 0, y: 0 };
    const [a, b] = swapping;
    if (idx === a) {
      const distance = (b - a) * 68; // responsive spacing
      return { x: distance, y: -35 };
    }
    if (idx === b) {
      const distance = (a - b) * 68;
      return { x: distance, y: 35 };
    }
    return { x: 0, y: 0 };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 flex items-center justify-center gap-2">
          <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          The Swapper
        </h2>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
          Practice swapping elements by their indices
        </p>
      </motion.div>

      {/* Array Visualization */}
      <div className="w-full max-w-full relative border border-border bg-card rounded-xl shadow-md p-4 sm:p-8 mb-6 overflow-x-auto">
        <div className="flex gap-2 sm:gap-3 min-w-max justify-center mx-auto py-2">
          {array.map((val, idx) => (
            <motion.div
              key={`${idx}-${val}`}
              animate={getSwapOffset(idx)}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                duration: 1
              }}
              className="flex flex-col items-center"
            >
              <motion.div
                className={`w-12 h-12 sm:w-16 sm:h-16 border-2 rounded-lg flex items-center justify-center transition-all duration-300 ${getBoxStyle(idx)}`}
                animate={swapSuccess?.includes(idx) ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <span className="text-lg sm:text-xl font-mono font-bold text-foreground">
                  {val}
                </span>
              </motion.div>
              <span className="text-xs sm:text-sm text-muted-foreground font-mono mt-2">
                [{idx}]
              </span>
            </motion.div>
          ))}
        </div>

        {/* Swap Animation Indicator */}
        <AnimatePresence>
          {swapping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none bg-card/60 backdrop-blur-[1px]"
            >
              <div className="text-amber-600 dark:text-amber-400 font-mono text-sm animate-pulse font-bold">
                Swapping...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex flex-col items-center">
            <label className="text-xs text-muted-foreground font-mono mb-1">
              Index A
            </label>
            <Input
              type="number"
              min={0}
              max={4}
              value={indexA}
              onChange={(e) => setIndexA(e.target.value)}
              className="w-16 sm:w-20 text-center font-mono bg-card border-border shadow-sm"
              disabled={!!swapping}
            />
          </div>

          <ArrowLeftRight className="w-5 h-5 text-muted-foreground mt-4" />

          <div className="flex flex-col items-center">
            <label className="text-xs text-muted-foreground font-mono mb-1">
              Index B
            </label>
            <Input
              type="number"
              min={0}
              max={4}
              value={indexB}
              onChange={(e) => setIndexB(e.target.value)}
              className="w-16 sm:w-20 text-center font-mono bg-card border-border shadow-sm"
              disabled={!!swapping}
            />
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-600 dark:text-red-400 font-mono text-xs sm:text-sm text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            onClick={handleSwap}
            disabled={!!swapping}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            SWAP!
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="font-mono border-border bg-card shadow-sm"
            disabled={!!swapping}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Success Feedback */}
      <AnimatePresence>
        {swapSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg"
          >
            <span className="text-emerald-700 dark:text-emerald-400 font-mono text-xs sm:text-sm text-center block">
              ✓ Successfully swapped indices {swapSuccess[0]} and {swapSuccess[1]}!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArraysGameArena;
