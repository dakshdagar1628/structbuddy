import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Search, RotateCcw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BSTNode, bstInsert, layoutTree, renderTree, treeBounds } from "./treeUtils";

type Mode = "insert" | "search";

interface SearchStep {
  val: number;
  message: string;
  found: boolean;
}

function bstSearch(root: BSTNode | null, val: number): SearchStep[] {
  const steps: SearchStep[] = [];
  let cur = root;
  while (cur) {
    if (val === cur.val) {
      steps.push({ val: cur.val, message: `Found ${val}! ✓`, found: true });
      return steps;
    }
    if (val < cur.val) {
      steps.push({ val: cur.val, message: `${val} < ${cur.val} → go left`, found: false });
      cur = cur.left;
    } else {
      steps.push({ val: cur.val, message: `${val} > ${cur.val} → go right`, found: false });
      cur = cur.right;
    }
  }
  steps.push({ val: -1, message: `${val} not found in tree`, found: false });
  return steps;
}

const TreeGameArena = () => {
  const [tree, setTree] = useState<BSTNode | null>(null);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("insert");
  const [status, setStatus] = useState("");
  const [activeVals, setActiveVals] = useState<Set<number>>(new Set());
  const [foundVal, setFoundVal] = useState<number | null>(null);
  const [error, setError] = useState("");

  const svgTree = useMemo(() => layoutTree(tree), [tree]);
  const bounds = useMemo(() => treeBounds(svgTree), [svgTree]);
  const pad = 40;
  const vbW = Math.max(bounds.maxX - bounds.minX + pad * 2, 160);
  const vbH = Math.max(bounds.maxY - bounds.minY + pad * 2, 100);
  const vbX = bounds.minX - pad;
  const vbY = bounds.minY - pad;

  const countNodes = (n: BSTNode | null): number =>
    n ? 1 + countNodes(n.left) + countNodes(n.right) : 0;

  const handleAction = () => {
    const val = parseInt(input.trim());
    if (isNaN(val) || val < -999 || val > 999) {
      setError("Enter a number between -999 and 999");
      return;
    }
    setError("");
    setFoundVal(null);

    if (mode === "insert") {
      setTree((prev) => bstInsert(prev, val));
      setActiveVals(new Set([val]));
      setStatus(`✓ Inserted ${val} into the BST`);
      setTimeout(() => setActiveVals(new Set()), 1200);
    } else {
      // search: animate steps one by one
      const steps = bstSearch(tree, val);
      let i = 0;
      const tick = () => {
        if (i >= steps.length) return;
        const s = steps[i];
        setStatus(s.message);
        setActiveVals(s.val !== -1 ? new Set([s.val]) : new Set());
        if (s.found) setFoundVal(s.val);
        i++;
        if (i < steps.length) setTimeout(tick, 700);
      };
      tick();
    }
    setInput("");
  };

  const handleReset = () => {
    setTree(null);
    setInput("");
    setStatus("");
    setError("");
    setActiveVals(new Set());
    setFoundVal(null);
  };

  const nodeCount = countNodes(tree);

  return (
    <div className="w-full flex flex-col items-center p-4 sm:p-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 flex items-center justify-center gap-2">
          <GitBranch className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          BST Playground
        </h2>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
          Build your own Binary Search Tree — then search it
        </p>
      </motion.div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6 bg-card border border-border rounded-lg p-1">
        {(["insert", "search"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setStatus(""); setError(""); setFoundVal(null); setActiveVals(new Set()); }}
            className={`px-4 py-2 rounded-md font-mono text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
              mode === m
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {m === "insert" ? <Plus className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Tree SVG Display */}
      <div className="w-full max-w-2xl border border-border bg-card rounded-xl shadow-md p-4 sm:p-6 mb-6 min-h-[220px] flex items-center justify-center relative">
        {!tree ? (
          <span className="text-muted-foreground font-mono text-sm">
            Insert a number to start building the tree
          </span>
        ) : (
          <svg
            viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
            className="w-full max-h-[280px]"
            style={{ overflow: "visible" }}
          >
            {renderTree(svgTree, { activeVals, foundVal, action: mode === "insert" ? "add" : "read" })}
          </svg>
        )}
        {nodeCount > 0 && (
          <span className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground bg-background border border-border px-2 py-0.5 rounded">
            {nodeCount} node{nodeCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Status message */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-4 px-4 py-2 rounded-lg border font-mono text-sm text-center ${
              foundVal !== null
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                : "bg-primary/10 border-primary/30 text-primary"
            }`}
          >
            {status}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <div className="flex gap-2 w-full">
          <label htmlFor="tree-input" className="sr-only">Tree value input</label>
          <Input
            id="tree-input"
            type="text"
            inputMode="numeric"
            placeholder={mode === "insert" ? "Value to insert…" : "Value to search…"}
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/[^0-9-]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && handleAction()}
            className="flex-1 font-mono bg-card border-border"
            autoComplete="off"
            spellCheck={false}
          />
          <Button
            onClick={handleAction}
            disabled={!input.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
          >
            {mode === "insert" ? <Plus className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            <span className="ml-1 hidden sm:inline">{mode === "insert" ? "Insert" : "Search"}</span>
          </Button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 font-mono text-xs text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          onClick={handleReset}
          variant="outline"
          className="font-mono border-border bg-card w-full sm:w-auto"
          disabled={!tree}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Tree
        </Button>
      </div>
    </div>
  );
};

export default TreeGameArena;
