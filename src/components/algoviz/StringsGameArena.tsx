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
        return "border-yellow-500 bg-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.4)]";
      case "match":
        return "border-green-500 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
      case "mismatch":
        return "border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
      case "success":
        return "border-green-500 bg-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.5)]";
      default:
        return "border-emerald-500/50 bg-emerald-500/10";
    }
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
          <Search className="w-6 h-6 text-emerald-400" />
          Palindrome Scanner
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          Watch the two-pointer technique in action
        </p>
      </motion.div>

      {/* Input Controls */}
      <div className="flex gap-3 mb-8">
        <Input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            initializeChars(e.target.value);
          }}
          placeholder="Enter a word..."
          className="w-48 font-mono bg-gray-900/50 border-gray-700/50 text-center uppercase"
          disabled={scanning}
          maxLength={12}
        />
        <Button
          onClick={handleScan}
          disabled={scanning || inputText.length === 0}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono"
        >
          <Search className="w-4 h-4 mr-2" />
          SCAN
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="font-mono border-gray-700/50"
          disabled={scanning}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* String Visualization */}
      <div className="relative border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm p-8 min-h-[180px] flex items-center justify-center">
        {chars.length === 0 ? (
          <span className="text-gray-500 font-mono text-lg animate-pulse">
            Enter a word to scan
          </span>
        ) : (
          <div className="relative flex gap-2">
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
                  className="absolute -top-10 left-0 flex flex-col items-center"
                  style={{ width: 48 }}
                >
                  <span className="text-xs text-purple-400 font-mono font-bold">LEFT</span>
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-purple-400" />
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
                  className="absolute -top-10 left-0 flex flex-col items-center"
                  style={{ width: 48 }}
                >
                  <span className="text-xs text-cyan-400 font-mono font-bold">RIGHT</span>
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-cyan-400" />
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
            className={`mt-6 px-6 py-3 rounded-xl flex items-center gap-3 ${
              result === "palindrome"
                ? "bg-green-500/20 border border-green-500/30"
                : "bg-red-500/20 border border-red-500/30"
            }`}
          >
            {result === "palindrome" ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-mono font-bold text-lg">
                  ✓ PALINDROME CONFIRMED!
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-400" />
                <span className="text-red-400 font-mono font-bold text-lg">
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
