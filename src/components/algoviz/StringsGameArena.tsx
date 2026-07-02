import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CharState = "idle" | "checking" | "match" | "mismatch" | "success";

interface CharBox {
  char: string;
  state: CharState;
}

const StringsGameArena = () => {
  const [inputText, setInputText] = useState("RADAR");
  const [chars, setChars] = useState<CharBox[]>([]);
  const [scanning, setScanning] = useState(false);
  const [leftPointer, setLeftPointer] = useState<number | null>(null);
  const [rightPointer, setRightPointer] = useState<number | null>(null);
  const [result, setResult] = useState<"palindrome" | "not-palindrome" | null>(null);

  const initializeChars = (text: string) => {
    const cleanText = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setChars(cleanText.split("").map((char) => ({ char, state: "idle" })));
    setLeftPointer(null);
    setRightPointer(null);
    setResult(null);
  };

  useEffect(() => {
    initializeChars(inputText);
  }, []);

  const handleScan = async () => {
    const cleanText = inputText.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleanText.length === 0) return;

    initializeChars(inputText);
    setScanning(true);
    setResult(null);

    const charArray = cleanText.split("").map((char) => ({ char, state: "idle" as CharState }));
    setChars(charArray);

    let left = 0;
    let right = cleanText.length - 1;
    let isPalindrome = true;

    // Animation loop
    while (left < right) {
      setLeftPointer(left);
      setRightPointer(right);

      // Highlight current comparison
      await new Promise((r) => setTimeout(r, 600));
      setChars((prev) =>
        prev.map((c, i) => ({
          ...c,
          state: i === left || i === right ? "checking" : c.state === "match" ? "match" : "idle",
        }))
      );

      await new Promise((r) => setTimeout(r, 600));

      if (cleanText[left] !== cleanText[right]) {
        // Mismatch found
        setChars((prev) =>
          prev.map((c, i) => ({
            ...c,
            state: i === left || i === right ? "mismatch" : c.state,
          }))
        );
        isPalindrome = false;
        await new Promise((r) => setTimeout(r, 800));
        break;
      } else {
        // Match found
        setChars((prev) =>
          prev.map((c, i) => ({
            ...c,
            state: i === left || i === right ? "match" : c.state,
          }))
        );
      }

      await new Promise((r) => setTimeout(r, 400));
      left++;
      right--;
    }

    // Final result
    if (isPalindrome) {
      setChars((prev) => prev.map((c) => ({ ...c, state: "success" })));
      setResult("palindrome");
    } else {
      setResult("not-palindrome");
    }

    setLeftPointer(null);
    setRightPointer(null);
    setScanning(false);
  };

  const handleReset = () => {
    initializeChars(inputText);
    setScanning(false);
  };

  const getCharStyle = (state: CharState) => {
    switch (state) {
      case "checking":
        return "border-amber-500 bg-amber-500/20 shadow-md";
      case "match":
        return "border-emerald-600 bg-emerald-500/20 shadow-md text-emerald-800 dark:text-emerald-300";
      case "mismatch":
        return "border-red-600 bg-red-500/20 shadow-md text-red-800 dark:text-red-300";
      case "success":
        return "border-emerald-600 bg-emerald-500/30 shadow-md text-emerald-800 dark:text-emerald-300";
      default:
        return "border-primary/50 bg-primary/10";
    }
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
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Palindrome Scanner
        </h2>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
          Watch the two-pointer technique in action
        </p>
      </motion.div>

      {/* Input Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 w-full max-w-md">
        <Input
          type="text"
          value={inputText}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
            setInputText(sanitized);
            initializeChars(sanitized);
          }}
          placeholder="Enter a word..."
          className="w-40 sm:w-48 font-mono bg-card border-border shadow-sm text-center uppercase"
          disabled={scanning}
          maxLength={12}
        />
        <Button
          onClick={handleScan}
          disabled={scanning || inputText.length === 0}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-sm"
        >
          <Search className="w-4 h-4 mr-2" />
          SCAN
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="font-mono border-border bg-card shadow-sm"
          disabled={scanning}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* String Visualization */}
      <div className="w-full max-w-full relative border border-border bg-card rounded-xl shadow-md p-4 sm:p-8 min-h-[180px] flex items-center justify-center overflow-x-auto">
        {chars.length === 0 ? (
          <span className="text-muted-foreground font-mono text-base sm:text-lg animate-pulse">
            Enter a word to scan
          </span>
        ) : (
          <div className="relative flex gap-2 min-w-max justify-center mx-auto pt-10 pb-4 px-2">
            {/* Left Pointer */}
            <AnimatePresence>
              {leftPointer !== null && (
                <motion.div
                  key="left-pointer"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    x: leftPointer * 56 // 56px per character box
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute top-0 left-2 flex flex-col items-center"
                  style={{ width: 48 }}
                >
                  <span className="text-[11px] text-accent font-mono font-bold">LEFT</span>
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-accent" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right Pointer */}
            <AnimatePresence>
              {rightPointer !== null && (
                <motion.div
                  key="right-pointer"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    x: rightPointer * 56
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute top-0 left-2 flex flex-col items-center"
                  style={{ width: 48 }}
                >
                  <span className="text-[11px] text-primary font-mono font-bold">RIGHT</span>
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-primary" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Character Boxes */}
            {chars.map((charBox, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: charBox.state === "checking" ? 1.1 : 1 
                }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-all duration-300 ${getCharStyle(charBox.state)}`}
                  animate={
                    charBox.state === "mismatch"
                      ? { x: [0, -5, 5, -5, 5, 0] }
                      : charBox.state === "success"
                      ? { scale: [1, 1.05, 1] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-lg font-mono font-bold text-foreground">
                    {charBox.char}
                  </span>
                </motion.div>
                <span className="text-xs text-muted-foreground font-mono mt-1">
                  [{idx}]
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`mt-6 px-4 sm:px-6 py-3 rounded-xl flex items-center justify-center gap-3 w-full max-w-md text-center ${
              result === "palindrome"
                ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                : "bg-red-500/15 border border-red-500/30 text-red-800 dark:text-red-300"
            }`}
          >
            {result === "palindrome" ? (
              <>
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-mono font-bold text-base sm:text-lg">
                  ✓ PALINDROME CONFIRMED!
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400 shrink-0" />
                <span className="font-mono font-bold text-base sm:text-lg">
                  ✗ NOT A PALINDROME
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StringsGameArena;
