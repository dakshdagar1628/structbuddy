import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface NodeData {
  id: number;
  value: number;
}

const initialNodes: NodeData[] = [
  { id: 1, value: 10 },
  { id: 2, value: 25 },
  { id: 3, value: 42 },
  { id: 4, value: 7 },
];

const LinkedListVisualizer = () => {
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
          {initialNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
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
              {index < initialNodes.length - 1 ? (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
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
          ))}
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
          className="font-mono border-primary/50 text-primary hover:bg-primary/10"
          disabled
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Start
        </Button>
        <Button
          variant="outline"
          className="font-mono border-accent/50 text-accent hover:bg-accent/10"
          disabled
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to End
        </Button>
        <Button
          variant="outline"
          className="font-mono border-destructive/50 text-destructive hover:bg-destructive/10"
          disabled
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete First
        </Button>
      </motion.div>

      {/* Status hint */}
      <p className="text-center text-xs text-muted-foreground font-mono py-2 bg-card/50">
        [ Controls coming soon ]
      </p>
    </div>
  );
};

export default LinkedListVisualizer;
