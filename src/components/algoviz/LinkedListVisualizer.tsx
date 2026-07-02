import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

  const generateRandomValue = () => Math.floor(Math.random() * 90) + 10;

  const addToStart = () => {
    if (isAnimating) return;
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
    if (isAnimating) return;
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

  // Get the address of the next node, or "NULL" if last
  const getNextAddress = (index: number) => {
    if (index < nodes.length - 1) {
      return nodes[index + 1].address;
    }
    return "NULL";
  };

  return (
    <div className="w-full flex flex-col border border-border bg-card rounded-xl shadow-md overflow-hidden min-h-[420px]">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/80">
        <h3 className="text-sm font-display font-bold text-foreground">
          Linked List Visualization
        </h3>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          A scavenger hunt where each item points to the next
        </p>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-start sm:justify-center overflow-x-auto py-8 px-4">
        <div className="flex items-center gap-2 px-2 min-w-max mx-auto">
          {/* HEAD Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mr-2 shrink-0"
          >
            <span className="text-xs font-mono font-bold text-primary mb-1 whitespace-nowrap">
              HEAD
            </span>
            <svg width="20" height="24" className="text-primary">
              <path
                d="M10 0 L10 16 M5 12 L10 18 L15 12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Nodes */}
          <AnimatePresence mode="popLayout">
            {nodes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 py-4 border border-border bg-secondary/50 rounded-xl shadow-sm"
              >
                <span className="text-muted-foreground font-mono text-base animate-pulse whitespace-nowrap">
                  Empty List
                </span>
              </motion.div>
            ) : (
              nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-center shrink-0"
                >
                  {/* Node Capsule */}
                  <div className="flex flex-col overflow-visible">
                    {/* Address label above node */}
                    <span className="text-[10px] font-mono text-muted-foreground text-center mb-1 whitespace-nowrap">
                      {node.address}
                    </span>

                    <div className="flex items-center rounded-xl overflow-hidden border-2 border-primary bg-card shadow-sm">
                      {/* Data Segment */}
                      <div className="px-3.5 py-3 bg-primary/10 flex flex-col items-center justify-center min-w-[50px]">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                          Data
                        </span>
                        <span className="text-base font-mono font-bold text-foreground">
                          {node.value}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="w-[2px] h-12 bg-primary/40" />

                      {/* Next Pointer Segment */}
                      <div className="px-3 py-3 bg-secondary/80 flex flex-col items-center justify-center min-w-[55px]">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                          Next
                        </span>
                        <span className="text-xs font-mono font-semibold text-primary">
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
                      className="mx-2 flex items-center text-primary"
                    >
                      <div className="w-6 sm:w-8 h-[2px] bg-primary relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-primary" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3 flex items-center"
                    >
                      <div className="px-2.5 py-1.5 border border-dashed border-muted-foreground rounded bg-secondary/50">
                        <span className="text-xs font-mono font-bold text-muted-foreground">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-2.5 p-4 border-t border-border bg-card"
      >
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-50 text-xs shadow-sm"
          onClick={addToStart}
          disabled={isAnimating}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add to Start
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-accent/50 text-accent hover:bg-accent/10 disabled:opacity-50 text-xs shadow-sm"
          onClick={addToEnd}
          disabled={isAnimating}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add to End
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-destructive/50 text-destructive hover:bg-destructive/10 disabled:opacity-50 text-xs shadow-sm"
          onClick={removeStart}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Remove Start
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-destructive/50 text-destructive hover:bg-destructive/10 disabled:opacity-50 text-xs shadow-sm"
          onClick={removeEnd}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Remove End
        </Button>
      </motion.div>

      {/* Node Count */}
      <p className="text-center text-xs text-muted-foreground font-mono py-2.5 bg-secondary/50 border-t border-border">
        Nodes: <span className="font-bold text-foreground">{nodes.length}</span>
      </p>
    </div>
  );
};

export default LinkedListVisualizer;