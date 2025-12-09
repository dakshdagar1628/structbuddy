import { motion, AnimatePresence } from "framer-motion";

interface LinkedListCodeVisualizerProps {
  currentLine: number;
}

interface NodeData {
  data: number;
  address: string;
  nextAddress: string | null;
}

const LinkedListCodeVisualizer = ({ currentLine }: LinkedListCodeVisualizerProps) => {
  // Determine linked list state based on current line
  // Lines 0-3: Node class definition
  // Lines 4-6: LinkedList class definition (empty)
  // Lines 7-10: insert_start method
  // Lines 11-19: insert_end method
  // Lines 20-22: delete_start method
  // Lines 23-32: delete_end method
  
  const getListState = () => {
    const nodes: NodeData[] = [];
    let action: "idle" | "insert_start" | "insert_end" | "delete_start" | "delete_end" = "idle";
    let highlightIndex: number | null = null;
    let showHead = false;
    let showTemp = false;
    let tempIndex = 0;
    
    // After LinkedList.__init__ (line 6)
    if (currentLine >= 6) {
      showHead = true;
    }
    
    // insert_start execution (lines 7-10)
    if (currentLine >= 7 && currentLine <= 10) {
      action = "insert_start";
      if (currentLine >= 8) {
        // new_node = Node(data) - node created
        nodes.push({ data: 10, address: "0x100", nextAddress: null });
        highlightIndex = 0;
      }
    }
    
    // insert_end execution (lines 11-19)
    if (currentLine >= 11 && currentLine <= 19) {
      action = "insert_end";
      // Keep first node from insert_start
      if (nodes.length === 0) {
        nodes.push({ data: 10, address: "0x100", nextAddress: null });
      }
      
      if (currentLine >= 12) {
        // new_node = Node(data) for insert_end - prepare second node
      }
      if (currentLine >= 16) {
        // temp = self.head - start traversal
        showTemp = true;
        tempIndex = 0;
      }
      if (currentLine >= 19) {
        // temp.next = new_node - link created
        nodes[0].nextAddress = "0x200";
        nodes.push({ data: 20, address: "0x200", nextAddress: null });
        highlightIndex = 1;
      }
    }
    
    // delete_start execution (lines 20-22)
    if (currentLine >= 20 && currentLine <= 22) {
      action = "delete_start";
      // Show two nodes initially
      if (nodes.length === 0) {
        nodes.push({ data: 10, address: "0x100", nextAddress: "0x200" });
        nodes.push({ data: 20, address: "0x200", nextAddress: null });
      }
      highlightIndex = 0;
      if (currentLine >= 22) {
        // self.head = self.head.next - first node removed
        nodes.shift();
        highlightIndex = null;
      }
    }
    
    // delete_end execution (lines 23-32)
    if (currentLine >= 23) {
      action = "delete_end";
      // Show two nodes
      if (nodes.length === 0) {
        nodes.push({ data: 10, address: "0x100", nextAddress: "0x200" });
        nodes.push({ data: 20, address: "0x200", nextAddress: null });
      }
      
      if (currentLine >= 29) {
        // temp = self.head
        showTemp = true;
        tempIndex = 0;
      }
      if (currentLine >= 31) {
        // temp = temp.next - moving temp
        tempIndex = 0; // stops at second-to-last
      }
      if (currentLine >= 32) {
        // temp.next = None - last node removed
        nodes[0].nextAddress = null;
        nodes.pop();
        highlightIndex = null;
      }
    }
    
    return { nodes, action, highlightIndex, showHead, showTemp, tempIndex };
  };

  const { nodes, action, highlightIndex, showHead, showTemp, tempIndex } = getListState();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <motion.h3
        className="text-xl font-mono text-primary neon-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Linked List Visualization
      </motion.h3>

      {/* Head Pointer */}
      <AnimatePresence>
        {showHead && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="px-3 py-1 bg-primary/20 border border-primary/50 rounded text-xs font-mono text-primary">
              HEAD
            </div>
            <span className="text-muted-foreground">→</span>
            <span className="text-xs font-mono text-muted-foreground">
              {nodes.length > 0 ? nodes[0].address : "None"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nodes Container */}
      <div className="flex items-center gap-4 min-h-[120px]">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, index) => (
            <motion.div
              key={node.address}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -30, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Node Box */}
              <div
                className={`flex border-2 rounded-lg overflow-hidden transition-all ${
                  highlightIndex === index
                    ? "border-primary neon-border"
                    : "border-border"
                }`}
                style={{
                  boxShadow: highlightIndex === index 
                    ? "0 0 20px hsl(var(--primary) / 0.5)" 
                    : "none"
                }}
              >
                {/* Data Section */}
                <div className={`w-16 h-16 flex flex-col items-center justify-center ${
                  highlightIndex === index ? "bg-primary/30" : "bg-card"
                }`}>
                  <span className="text-xs text-muted-foreground font-mono">data</span>
                  <span className={`font-mono font-bold text-lg ${
                    highlightIndex === index ? "text-primary" : "text-foreground"
                  }`}>
                    {node.data}
                  </span>
                </div>
                
                {/* Next Pointer Section */}
                <div className={`w-20 h-16 flex flex-col items-center justify-center border-l ${
                  highlightIndex === index ? "bg-accent/20 border-primary/50" : "bg-muted/50 border-border"
                }`}>
                  <span className="text-xs text-muted-foreground font-mono">next</span>
                  <span className={`font-mono text-xs ${
                    node.nextAddress ? "text-accent" : "text-destructive"
                  }`}>
                    {node.nextAddress || "NULL"}
                  </span>
                </div>
              </div>

              {/* Arrow to next node */}
              {index < nodes.length - 1 && (
                <motion.div 
                  className="text-accent text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  →
                </motion.div>
              )}

              {/* Temp Pointer */}
              {showTemp && tempIndex === index && (
                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-xs font-mono text-yellow-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  temp
                </motion.div>
              )}

              {/* Address Label */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {node.address}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {nodes.length === 0 && showHead && (
          <motion.div
            className="px-6 py-4 border-2 border-dashed border-border rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-muted-foreground font-mono text-sm">
              Empty List (head = None)
            </span>
          </motion.div>
        )}
      </div>

      {/* Action Indicator */}
      <AnimatePresence mode="wait">
        {action !== "idle" && (
          <motion.div
            key={action}
            className={`px-4 py-2 rounded-lg text-sm font-mono ${
              action === "insert_start" || action === "insert_end" 
                ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                : "bg-red-500/20 text-red-400 border border-red-500/50"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {action === "insert_start" && "↓ INSERT START: Adding to front"}
            {action === "insert_end" && "→ INSERT END: Adding to back"}
            {action === "delete_start" && "← DELETE START: Removing first"}
            {action === "delete_end" && "→ DELETE END: Removing last"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        className="flex gap-6 text-xs font-mono text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-card border border-border rounded" />
          <span>Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted/50 border border-border rounded" />
          <span>Next Ptr</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary/30 border border-primary rounded" />
          <span>Active</span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-sm text-muted-foreground text-center max-w-md font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Each node stores data and a pointer (memory address) to the next node.
      </motion.p>
    </div>
  );
};

export default LinkedListCodeVisualizer;
