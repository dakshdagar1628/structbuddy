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

const DoublyLinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 1, value: 10, address: "0x1A" },
    { id: 2, value: 25, address: "0x4B" },
    { id: 3, value: 42, address: "0x7C" },
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

  // Get the address of the next/prev node
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
    <div className="w-full flex flex-col bg-card border border-border rounded-xl shadow-md overflow-hidden min-h-[420px]">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/80">
        <h3 className="text-sm font-display font-bold text-foreground">
          Doubly Linked List Visualization
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          A two-way street where every node knows its neighbors
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
            <span className="text-xs font-mono font-bold text-primary mb-1">
              HEAD
            </span>
            <svg width="16" height="20" className="text-primary">
              <path
                d="M8 0 L8 12 M4 9 L8 14 L12 9"
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
                <span className="text-sm font-mono text-muted-foreground animate-pulse">
                  Empty List (NULL)
                </span>
              </motion.div>
            ) : (
              nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-center shrink-0"
                >
                  {/* Backward Arrow */}
                  {index > 0 && (
                    <motion.div layout className="flex flex-col items-center mx-1">
                      <svg width="20" height="12" className="text-accent">
                        <path d="M18 6 L2 6 M6 2 L0 6 L6 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </motion.div>
                  )}

                  {/* Node Capsule - Three Parts */}
                  <div className="flex flex-col">
                    {/* Address label above node */}
                    <span className="text-[10px] font-mono text-muted-foreground text-center mb-1">
                      {node.address}
                    </span>
                    <div className="flex rounded-xl overflow-hidden border-2 border-primary bg-card shadow-sm">
                      {/* Prev Pointer */}
                      <div className="px-2.5 py-2.5 bg-secondary/80 border-r border-border flex flex-col items-center justify-center min-w-[45px]">
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">prev</span>
                        <span className="text-[10px] font-mono font-bold text-accent">
                          {getPrevAddress(index)}
                        </span>
                      </div>
                      
                      {/* Value Section */}
                      <div className="px-3.5 py-2.5 bg-primary/10 border-r border-border flex flex-col items-center justify-center min-w-[50px]">
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">data</span>
                        <span className="text-base font-mono font-bold text-foreground">
                          {node.value}
                        </span>
                      </div>
                      
                      {/* Next Pointer */}
                      <div className="px-2.5 py-2.5 bg-secondary/80 flex flex-col items-center justify-center min-w-[45px]">
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">next</span>
                        <span className="text-[10px] font-mono font-bold text-primary">
                          {getNextAddress(index)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Forward Arrow */}
                  {index < nodes.length - 1 && (
                    <motion.div layout className="flex flex-col items-center mx-1">
                      <svg width="20" height="12" className="text-primary">
                        <path d="M2 6 L18 6 M14 2 L20 6 L14 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </motion.div>
                  )}

                  {/* NULL indicator for last node */}
                  {index === nodes.length - 1 && (
                    <motion.div layout className="flex items-center ml-2">
                      <div className="w-4 h-0.5 bg-muted-foreground/50" />
                      <div className="ml-1 px-2 py-1 rounded border border-dashed border-muted-foreground bg-secondary/50">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground">NULL</span>
                      </div>
                    </motion.div>
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
              <span className="text-xs font-mono font-bold text-accent mb-1">
                TAIL
              </span>
              <svg width="16" height="20" className="text-accent">
                <path
                  d="M8 0 L8 12 M4 9 L8 14 L12 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.div>
          )}
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
          className="font-mono text-xs border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-50 shadow-sm"
          onClick={addToStart}
          disabled={isAnimating}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add to Start
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono text-xs border-accent/50 text-accent hover:bg-accent/10 disabled:opacity-50 shadow-sm"
          onClick={addToEnd}
          disabled={isAnimating}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add to End
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono text-xs border-destructive/50 text-destructive hover:bg-destructive/10 disabled:opacity-50 shadow-sm"
          onClick={removeStart}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Remove Start
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono text-xs border-destructive/50 text-destructive hover:bg-destructive/10 disabled:opacity-50 shadow-sm"
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

export default DoublyLinkedListVisualizer;
