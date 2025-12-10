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
    <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full p-8 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 overflow-visible">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 bg-gray-900/30 rounded-t-xl">
        <h3 className="text-sm font-mono text-white" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.3)' }}>
          Linked List Visualization
        </h3>
        <p className="text-xs text-gray-400 font-mono mt-1">
          A scavenger hunt where each item points to the next
        </p>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-center overflow-x-auto overflow-y-visible py-8">
        <div className="flex items-center gap-2 px-4 overflow-visible">
          {/* HEAD Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mr-2"
          >
            <span className="text-xs font-mono text-primary mb-1 whitespace-nowrap" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.6)' }}>
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
                className="px-6 py-4 border border-gray-700/50 bg-gray-800/30 rounded-xl"
              >
                <span className="text-gray-500 font-mono text-lg animate-pulse whitespace-nowrap">
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
                  className="flex items-center"
                >
                  {/* Node Capsule */}
                  <div className="flex flex-col overflow-visible">
                    {/* Address label above node */}
                    <span className="text-[10px] font-mono text-gray-400 text-center mb-1 whitespace-nowrap">
                      {node.address}
                    </span>
                    <div className="flex rounded-lg overflow-hidden border border-gray-700/50 bg-gray-900/70 shadow-2xl shadow-primary/10">
                      {/* Value Section */}
                      <div className="px-4 py-3 bg-primary/10 border-r border-gray-700/50">
                        <span className="text-lg font-mono font-bold text-white">
                          {node.value}
                        </span>
                      </div>
                      {/* Next Pointer Section - Shows address of next node */}
                      <div className="px-3 py-3 bg-gray-800/50 flex items-center justify-center min-w-[55px]">
                        <span
                          className={`text-[10px] font-mono font-bold whitespace-nowrap ${
                            getNextAddress(index) === "NULL"
                              ? "text-destructive"
                              : "text-accent"
                          }`}
                          style={{ textShadow: getNextAddress(index) === "NULL" ? '0 0 8px hsl(var(--destructive) / 0.5)' : '0 0 8px hsl(var(--accent) / 0.5)' }}
                        >
                          {getNextAddress(index)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow to next node */}
                  {index < nodes.length - 1 ? (
                    <motion.div layout className="flex items-center mx-1">
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
                    <motion.div layout className="flex items-center ml-2">
                      <div className="w-6 h-0.5 bg-gray-600" />
                      <div className="ml-1 px-2 py-1 rounded border border-destructive/50 bg-destructive/10">
                        <span className="text-xs font-mono text-destructive font-bold whitespace-nowrap" style={{ textShadow: '0 0 8px hsl(var(--destructive) / 0.5)' }}>
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
        className="flex flex-wrap justify-center gap-3 p-4 border-t border-gray-700/50 bg-gray-900/30"
      >
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-50"
          onClick={addToStart}
          disabled={isAnimating}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Start
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-accent/50 text-accent hover:bg-accent/10 disabled:opacity-50"
          onClick={addToEnd}
          disabled={isAnimating}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to End
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-destructive/50 text-destructive hover:bg-destructive/10 disabled:opacity-50"
          onClick={removeStart}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove Start
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-mono border-destructive/50 text-destructive hover:bg-destructive/10 disabled:opacity-50"
          onClick={removeEnd}
          disabled={isAnimating || nodes.length === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove End
        </Button>
      </motion.div>

      {/* Node Count */}
      <p className="text-center text-xs text-gray-400 font-mono py-2 bg-gray-900/30 rounded-b-xl">
        Nodes: <span className="text-white">{nodes.length}</span>
      </p>
    </div>
  );
};

export default LinkedListVisualizer;