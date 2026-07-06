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

const DoublyLinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 1, value: 10, address: "0x1A" },
    { id: 2, value: 25, address: "0x4B" },
    { id: 3, value: 42, address: "0x7C" },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const MAX_NODES = 5; // limit to prevent horizontal clipping

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

  const getPrevAddress = (index: number) => {
    if (index > 0) {
      return nodes[index - 1].address;
    }
    return "NULL";
  };

  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 bg-transparent border-b border-border/30 shrink-0">
        <h3 className="text-sm font-display font-extrabold text-foreground">
          Doubly Linked List Interactive Sandbox
        </h3>
        <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-wider mt-0.5">
          Bidirectional nodes linked sequentially via forward and backward pointers
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
                  Empty List (head = tail = None)
                </span>
              </motion.div>
            ) : (
              nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: index === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="flex items-center shrink-0"
                >
                  {/* Backward Arrow */}
                  {index > 0 && (
                    <div className="flex flex-col items-center mx-1">
                      <svg width="24" height="20" className="text-accent/60">
                        <path d="M22 10 L4 10 M8 6 L4 10 L8 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  )}

                  <div className="flex flex-col overflow-visible">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground/35 text-center mb-1">
                      {node.address}
                    </span>

                    <div className="flex rounded-xl overflow-hidden border border-border/40 dark:border-white/5 bg-card shadow-soft-sm">
                      {/* Prev Pointer */}
                      <div className={`px-2.5 py-2.5 flex flex-col items-center justify-center min-w-[50px] ${getPrevAddress(index) === 'NULL' ? 'bg-destructive/5' : 'bg-card'}`}>
                        <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">prev</span>
                        <span className={`text-[10px] font-mono font-semibold mt-0.5 whitespace-nowrap ${getPrevAddress(index) === 'NULL' ? 'text-destructive' : 'text-accent/70'}`}>
                          {getPrevAddress(index)}
                        </span>
                      </div>

                      <div className="w-[1px] h-11 bg-border/40" />

                      {/* Data Segment */}
                      <div className="px-4 py-2.5 bg-secondary/30 flex flex-col items-center justify-center min-w-[55px]">
                        <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">data</span>
                        <span className="font-mono font-bold text-sm text-foreground/90 mt-0.5">{node.value}</span>
                      </div>

                      <div className="w-[1px] h-11 bg-border/40" />

                      {/* Next Pointer */}
                      <div className={`px-2.5 py-2.5 flex flex-col items-center justify-center min-w-[50px] ${getNextAddress(index) === 'NULL' ? 'bg-destructive/5' : 'bg-card'}`}>
                        <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">next</span>
                        <span className={`text-[10px] font-mono font-semibold mt-0.5 whitespace-nowrap ${getNextAddress(index) === 'NULL' ? 'text-destructive' : 'text-primary/70'}`}>
                          {getNextAddress(index)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Forward Arrow */}
                  {index < nodes.length - 1 && (
                    <div className="flex flex-col items-center mx-1">
                      <svg width="24" height="20" className="text-primary/60">
                        <path d="M2 10 L20 10 M16 6 L20 10 L16 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  )}

                  {/* NULL indicator for last node */}
                  {index === nodes.length - 1 && (
                    <div className="flex items-center ml-2 shrink-0">
                      <div className="w-4 h-[1.5px] bg-primary/30" />
                      <div className="ml-1 px-2.5 py-1 bg-secondary/50 rounded-lg border border-border/40">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground/50 uppercase tracking-wider">NULL</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {/* TAIL Label */}
          {nodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center ml-2 shrink-0"
            >
              <span className="text-[10px] font-mono font-bold text-accent tracking-wider mb-1">
                TAIL
              </span>
              <svg width="16" height="20" className="text-accent/60">
                <path d="M8 0 L8 12 M4 8 L8 12 L12 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>
          )}
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

export default DoublyLinkedListVisualizer;
