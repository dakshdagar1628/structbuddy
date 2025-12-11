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
      return "border-green-500 bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.4)]";
    }
    if (swapping?.includes(idx)) {
      return "border-yellow-500 bg-yellow-500/20";
    }
    return "border-orange-500/50 bg-orange-500/10";
  };

  const getSwapOffset = (idx: number) => {
    if (!swapping) return { x: 0, y: 0 };
    const [a, b] = swapping;
    if (idx === a) {
      const distance = (b - a) * 76; // 76px per box (w-16 + gap)
      return { x: distance, y: -40 };
    }
    if (idx === b) {
      const distance = (a - b) * 76;
      return { x: distance, y: 40 };
    }
    return { x: 0, y: 0 };
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center justify-center gap-2">
          <ArrowLeftRight className="w-6 h-6 text-orange-400" />
          The Swapper
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          Practice swapping elements by their indices
        </p>
      </motion.div>

      {/* Array Visualization */}
      <div className="relative border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm p-8 mb-8">
        <div className="flex gap-3">
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
                className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center transition-all duration-300 ${getBoxStyle(idx)}`}
                animate={swapSuccess?.includes(idx) ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl font-mono font-bold text-foreground">
                  {val}
                </span>
              </motion.div>
              <span className="text-sm text-muted-foreground font-mono mt-2">
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
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-yellow-400 font-mono text-sm animate-pulse">
                Swapping...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
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
              className="w-20 text-center font-mono bg-gray-900/50 border-gray-700/50"
              disabled={!!swapping}
            />
          </div>

          <ArrowLeftRight className="w-6 h-6 text-muted-foreground mt-4" />

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
              className="w-20 text-center font-mono bg-gray-900/50 border-gray-700/50"
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
              className="text-red-400 font-mono text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          <Button
            onClick={handleSwap}
            disabled={!!swapping}
            className="bg-orange-500 hover:bg-orange-600 text-white font-mono"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            SWAP!
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="font-mono border-gray-700/50"
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
            className="mt-6 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg"
          >
            <span className="text-green-400 font-mono text-sm">
              ✓ Successfully swapped indices {swapSuccess[0]} and {swapSuccess[1]}!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArraysGameArena;
