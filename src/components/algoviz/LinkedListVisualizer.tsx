import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

interface NodeData {
  id: number;
  value: number;
  address: string;
}

// Generate random hex address
const generateAddress = () => {
  const hex = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0");
  return `0x${hex}`;
};

let nodeIdCounter = 5;

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 1, value: 10, address: "0x1A" },
    { id: 2, value: 25, address: "0x4B" },
    { id: 3, value: 42, address: "0x7C" },
    { id: 4, value: 7, address: "0xD2" },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const MAX_NODES = 6; // smaller limit to prevent horizontal clipping on medium viewports

  const generateRandomValue = () => Math.floor(Math.random() * 90) + 10;

  const addToStart = () => {
    if (isAnimating || nodes.length >= MAX_NODES) return;
    setIsAnimating(true);
    const newNode: NodeData = {
      id: nodeIdCounter++,
      value: generateRandomValue(),
      address: generateAddress(),
    };
    setNodes([newNode, ...nodes]);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const addToEnd = () => {
    if (isAnimating || nodes.length >= MAX_NODES) return;
    setIsAnimating(true);
    const newNode: NodeData = {
      id: nodeIdCounter++,
      value: generateRandomValue(),
      address: generateAddress(),
    };
    setNodes([...nodes, newNode]);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const removeStart = () => {
    if (isAnimating || nodes.length === 0) return;
    setIsAnimating(true);
    setNodes(nodes.slice(1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const removeEnd = () => {
    if (isAnimating || nodes.length === 0) return;
    setIsAnimating(true);
    setNodes(nodes.slice(0, -1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getNextAddress = (index: number) => {
    if (index < nodes.length - 1) {
      return nodes[index + 1].address;
    }
    return "NULL";
  };

  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 bg-transparent border-b border-border/30 shrink-0">
        <h3 className="text-sm font-display font-extrabold text-foreground">
          Linked List Interactive Sandbox
        </h3>
        <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-wider mt-0.5">
          Nodes linked sequentially via pointer references
        </p>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-start sm:justify-center overflow-x-auto py-8 px-4 custom-scrollbar">
        <div className="flex items-center gap-2 px-2 min-w-max mx-auto">
          {/* HEAD Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mr-2 shrink-0"
          >
            <span className="text-[10px] font-mono font-bold text-primary tracking-wider mb-1">
              HEAD
            </span>
            <svg width="16" height="20" className="text-primary/60">
              <path d="M8 0 L8 12 M4 8 L8 12 L12 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </motion.div>

          {/* Nodes */}
          <AnimatePresence mode="popLayout">
            {nodes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 py-4 bg-secondary/20 rounded-xl border border-border/30"
              >
                <span className="text-muted-foreground/50 font-mono text-xs uppercase tracking-wider">
                  Empty List (head = None)
                </span>
              </motion.div>
            ) : (
              nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: index === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -40 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="flex items-center shrink-0"
                >
                  <div className="flex flex-col overflow-visible">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground/35 text-center mb-1">
                      {node.address}
                    </span>

                    <div className="flex rounded-xl overflow-hidden border border-border/40 dark:border-white/5 bg-card shadow-soft-sm">
                      {/* Data Segment */}
                      <div className="px-4 py-3 bg-secondary/30 flex flex-col items-center justify-center min-w-[55px]">
                        <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">
                          Data
                        </span>
                        <span className="text-sm font-mono font-bold text-foreground mt-0.5">
                          {node.value}
                        </span>
                      </div>

                      <div className="w-[1px] h-12 bg-border/40" />

                      {/* Next Pointer Segment */}
                      <div className={`px-3 py-3 flex flex-col items-center justify-center min-w-[65px] ${getNextAddress(index) === 'NULL' ? 'bg-destructive/5' : 'bg-card'}`}>
                        <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">
                          Next
                        </span>
                        <span className={`text-xs font-mono font-semibold mt-0.5 ${getNextAddress(index) === 'NULL' ? 'text-destructive' : 'text-primary/70'}`}>
                          {getNextAddress(index)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow to next node or NULL */}
                  {index < nodes.length - 1 ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mx-2 flex items-center text-primary/60"
                    >
                      <div className="w-6 h-[1.5px] bg-primary/40 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3.5px] border-t-transparent border-b-[3.5px] border-b-transparent border-l-[5.5px] border-l-primary/40" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3 flex items-center shrink-0"
                    >
                      <div className="px-2.5 py-1 bg-secondary/50 rounded-lg border border-border/40">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground/50 uppercase tracking-wider">
                          NULL
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2.5 p-4 border-t border-border/30 bg-secondary/20 shrink-0"
      >
        <button
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-primary/95 transition-all disabled:opacity-40"
          onClick={addToStart}
          disabled={isAnimating || nodes.length >= MAX_NODES}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Start
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-secondary/80 border border-border/30 transition-all disabled:opacity-40"
          onClick={addToEnd}
          disabled={isAnimating || nodes.length >= MAX_NODES}
        >
          <Plus className="w-3.5 h-3.5" />
          Add End
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-secondary/80 border border-border/30 transition-all disabled:opacity-40"
          onClick={removeStart}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-3.5 h-3.5 text-destructive" />
          Del Start
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-secondary/80 border border-border/30 transition-all disabled:opacity-40"
          onClick={removeEnd}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-3.5 h-3.5 text-destructive" />
          Del End
        </button>
      </motion.div>

      {/* Node Count */}
      <div className="py-2.5 bg-secondary/40 border-t border-border/30 shrink-0 text-center text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60">
        Active Nodes: <span className="text-foreground font-extrabold">{nodes.length}</span>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;