import { motion, AnimatePresence } from "framer-motion";

interface LinkedListCodeVisualizerProps {
  currentLine: number;
  variables: Record<string, string>;
}

interface NodeData {
  data: string;
  address: string;
  nextAddress: string | null;
}

const LinkedListCodeVisualizer = ({ currentLine, variables }: LinkedListCodeVisualizerProps) => {
  // Parse nodes from variables - derive the list state from variable data
  const parseNodes = (): NodeData[] => {
    const nodes: NodeData[] = [];
    
    // Extract node references from variables
    const headStr = variables["self.head"];
    const newNodeStr = variables["new_node"];
    const tempStr = variables["temp"];
    const tempNextStr = variables["temp.next"];
    const newNodeNextStr = variables["new_node.next"];
    
    // Helper to extract address from "<Node 0x100>" format
    const extractAddress = (str: string | undefined): string | null => {
      if (!str || str === "None") return null;
      const match = str.match(/0x[A-Fa-f0-9]+/);
      return match ? match[0] : null;
    };
    
    // Helper to extract data from node string or data variable
    const extractData = (varName: string): string | null => {
      const dataVar = variables[varName];
      if (dataVar) return dataVar;
      return null;
    };
    
    const headAddr = extractAddress(headStr);
    const newNodeAddr = extractAddress(newNodeStr);
    const tempAddr = extractAddress(tempStr);
    const tempNextAddr = extractAddress(tempNextStr);
    const newNodeNextAddr = extractAddress(newNodeNextStr);
    
    // Build node list based on current execution state
    // This is derived from the relationships in variables
    
    // Check if we're in insert_start (lines 7-10)
    if (currentLine >= 7 && currentLine <= 10) {
      const dataVal = variables["data"] || "?";
      if (currentLine >= 8 && newNodeAddr) {
        // new_node created
        const existingHeadAddr = extractAddress(variables["self.head"]);
        if (currentLine >= 10) {
          // After self.head = new_node
          nodes.push({ data: dataVal, address: newNodeAddr, nextAddress: existingHeadAddr !== newNodeAddr ? existingHeadAddr : null });
          if (existingHeadAddr && existingHeadAddr !== newNodeAddr) {
            nodes.push({ data: "10", address: existingHeadAddr, nextAddress: null });
          }
        } else if (currentLine >= 9) {
          // After new_node.next = self.head
          if (existingHeadAddr) {
            nodes.push({ data: "10", address: existingHeadAddr, nextAddress: null });
          }
          nodes.unshift({ data: dataVal, address: newNodeAddr, nextAddress: existingHeadAddr });
        } else {
          // Just created new_node
          if (existingHeadAddr) {
            nodes.push({ data: "10", address: existingHeadAddr, nextAddress: null });
          }
        }
      }
    }
    // Check if we're in insert_end (lines 11-19)
    else if (currentLine >= 11 && currentLine <= 19) {
      const dataVal = variables["data"] || "42";
      
      // Base nodes from traversal
      if (currentLine >= 16 && tempAddr) {
        // Start with head node
        nodes.push({ data: "10", address: "0x100", nextAddress: currentLine >= 19 ? tempNextAddr || "0x200" : "0x200" });
        
        if (tempNextAddr || currentLine < 19) {
          nodes.push({ data: "20", address: "0x200", nextAddress: currentLine >= 19 ? newNodeAddr : null });
        }
        
        if (currentLine >= 19 && newNodeAddr) {
          nodes.push({ data: dataVal, address: newNodeAddr, nextAddress: null });
        }
      } else if (currentLine >= 12) {
        // Before traversal
        nodes.push({ data: "10", address: "0x100", nextAddress: "0x200" });
        nodes.push({ data: "20", address: "0x200", nextAddress: null });
      }
    }
    // Check if we're in delete_start (lines 20-22)
    else if (currentLine >= 20 && currentLine <= 22) {
      if (currentLine < 22) {
        nodes.push({ data: "10", address: "0x100", nextAddress: "0x200" });
        nodes.push({ data: "20", address: "0x200", nextAddress: null });
      } else {
        // After deletion
        nodes.push({ data: "20", address: "0x200", nextAddress: null });
      }
    }
    // Check if we're in delete_end (lines 23-32)
    else if (currentLine >= 23) {
      if (currentLine >= 32) {
        // After temp.next = None
        nodes.push({ data: "10", address: "0x100", nextAddress: null });
      } else {
        nodes.push({ data: "10", address: "0x100", nextAddress: "0x200" });
        nodes.push({ data: "20", address: "0x200", nextAddress: currentLine >= 29 ? "0x300" : null });
        if (currentLine >= 29 && currentLine < 32) {
          nodes.push({ data: "30", address: "0x300", nextAddress: null });
        }
      }
    }
    // Initial state or class definition
    else if (currentLine >= 6 && headStr === "None") {
      // Empty list after initialization
    }
    // Node class definition with data
    else if (currentLine >= 1 && currentLine <= 3) {
      const dataVal = variables["data"] || variables["self.data"];
      if (dataVal && currentLine >= 2) {
        nodes.push({ data: dataVal, address: "0x100", nextAddress: null });
      }
    }
    
    return nodes;
  };

  // Determine action from current code context
  const getAction = (): "idle" | "insert_start" | "insert_end" | "delete_start" | "delete_end" => {
    if (currentLine >= 7 && currentLine <= 10) return "insert_start";
    if (currentLine >= 11 && currentLine <= 19) return "insert_end";
    if (currentLine >= 20 && currentLine <= 22) return "delete_start";
    if (currentLine >= 23) return "delete_end";
    return "idle";
  };

  // Determine which node to highlight
  const getHighlightIndex = (): number | null => {
    const action = getAction();
    if (action === "insert_start" && currentLine >= 8) return 0;
    if (action === "insert_end" && currentLine >= 19) return parseNodes().length - 1;
    if (action === "delete_start" && currentLine < 22) return 0;
    if (action === "delete_end" && currentLine >= 29 && currentLine < 32) return parseNodes().length - 1;
    return null;
  };

  // Check if temp pointer should be shown
  const showTemp = variables["temp"] !== undefined;
  const tempAddress = variables["temp"]?.match(/0x[A-Fa-f0-9]+/)?.[0];

  const nodes = parseNodes();
  const action = getAction();
  const highlightIndex = getHighlightIndex();
  const showHead = currentLine >= 6;

  // Find temp index based on address
  const tempIndex = nodes.findIndex(n => n.address === tempAddress);

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
      <div className="flex items-center gap-4 min-h-[120px] relative">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, index) => (
            <motion.div
              key={node.address}
              className="flex items-center gap-2 relative"
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

              {/* Address Label - Above node */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {node.address}
              </motion.div>

              {/* Temp Pointer - Below node */}
              {showTemp && tempIndex === index && (
                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-xs font-mono text-yellow-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  temp
                </motion.div>
              )}

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
            {action === "insert_start" && `↓ INSERT START: Adding ${variables["data"] || "?"} to front`}
            {action === "insert_end" && `→ INSERT END: Adding ${variables["data"] || "?"} to back`}
            {action === "delete_start" && "← DELETE START: Removing first node"}
            {action === "delete_end" && "→ DELETE END: Removing last node"}
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
