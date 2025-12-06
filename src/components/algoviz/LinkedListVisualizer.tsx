import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface NodeData {
  id: number;
  value: number;
}

let nodeIdCounter = 5;

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 1, value: 10 },
    { id: 2, value: 25 },
    { id: 3, value: 42 },
    { id: 4, value: 7 },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomValue = () => Math.floor(Math.random() * 90) + 10;

  const addToStart = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newNode: NodeData = {
      id: nodeIdCounter++,
      value: generateRandomValue(),
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

  return (
    <div className="h-full flex flex-col bg-card/50 border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/80">
        <h3 className="text-sm font-display text-foreground">
          Linked List Visualization
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          A scavenger hunt where each item points to the next
        </p>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-center overflow-x-auto py-8">
        <div className="flex items-center gap-2 px-4">
          {/* HEAD Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mr-2"
          >
            <span className="text-xs font-mono text-primary mb-1 neon-glow">
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
                className="px-4 py-3 border-2 border-dashed border-muted-foreground/30 rounded-lg"
              >
                <span className="text-sm font-mono text-muted-foreground">
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
                  exit={{ opacity: 0, scale: 0.5, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-center"
                >
                  {/* Node Capsule */}
                  <div className="flex rounded-lg overflow-hidden border-2 border-primary/50 bg-card shadow-lg shadow-primary/20">
                    {/* Value Section */}
                    <div className="px-4 py-3 bg-primary/10 border-r border-primary/30">
                      <span className="text-lg font-mono font-bold text-foreground">
                        {node.value}
                      </span>
                    </div>
                    {/* Next Pointer Section */}
                    <div className="px-3 py-3 bg-card flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-accent shadow-md shadow-accent/50" />
                    </div>
                  </div>

                  {/* Arrow to next node */}
                  {index < nodes.length - 1 ? (
                    <motion.div
                      layout
                      className="flex items-center mx-1"
                    >
                      <div className="w-8 h-0.5 bg-accent" />
                      <svg
                        width="12"
                        height="12"
                        className="text-accent -ml-1"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M0 6 L8 6 M5 3 L9 6 L5 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </motion.div>
                  ) : (
                    /* NULL pointer for last node */
                    <motion.div
                      layout
                      className="flex items-center ml-2"
                    >
                      <div className="w-6 h-0.5 bg-muted-foreground/50" />
                      <div className="ml-1 px-2 py-1 rounded border border-destructive/50 bg-destructive/10">
                        <span className="text-xs font-mono text-destructive font-bold">
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
        className="flex justify-center gap-4 p-4 border-t border-border bg-card/80"
      >
        <Button
          variant="outline"
          className="font-mono border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-50"
          onClick={addToStart}
          disabled={isAnimating}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Start
        </Button>
        <Button
          variant="outline"
          className="font-mono border-accent/50 text-accent hover:bg-accent/10 disabled:opacity-50"
          onClick={addToEnd}
          disabled={isAnimating}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to End
        </Button>
        <Button
          variant="outline"
          className="font-mono border-destructive/50 text-destructive hover:bg-destructive/10 disabled:opacity-50"
          onClick={removeStart}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove Start
        </Button>
      </motion.div>

      {/* Node Count */}
      <p className="text-center text-xs text-muted-foreground font-mono py-2 bg-card/50">
        Nodes: {nodes.length}
      </p>
    </div>
  );
};

export default LinkedListVisualizer;
