import { motion, AnimatePresence } from "framer-motion";
import type { VisualState, PointerModel } from "./IntegratedCodeLab";

interface DoublyLinkedListCodeVisualizerProps {
  visualState: VisualState;
}

// Extended node model for doubly linked list
interface DoublyNodeModel {
  id: string;
  val: number | string;
  next: string | null;
  prev: string | null;
}

const DoublyLinkedListCodeVisualizer = ({ visualState }: DoublyLinkedListCodeVisualizerProps) => {
  const { nodes = [], pointers = [], action = 'none' } = visualState;

  // Cast nodes to doubly linked list nodes (they include prev)
  const doublyNodes = nodes as unknown as DoublyNodeModel[];

  const getAddress = (id: string | null) => {
    if (!id) return "NULL";
    const num = parseInt(id.replace(/\D/g, '')) || 1;
    return `0x${(num * 26).toString(16).toUpperCase().padStart(2, '0')}`;
  };

  const getPointersForNode = (nodeId: string): PointerModel[] => pointers.filter(p => p.targetId === nodeId);

  const getActionColor = () => {
    switch (action) {
      case 'add': return 'border-emerald-500 shadow-emerald-500/30';
      case 'remove': return 'border-destructive shadow-destructive/30';
      case 'read': return 'border-accent shadow-accent/30';
      default: return 'border-primary shadow-primary/30';
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-4 overflow-visible relative">
      {/* Legend - Top Right */}
      <div className="absolute top-4 right-4 bg-muted/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-3 text-[10px] font-mono z-20">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Add
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-destructive" /> Remove
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent" /> Read
        </span>
      </div>

      <motion.h3 className="text-lg font-mono text-primary neon-glow">
        Doubly Linked List
      </motion.h3>

      <div className="flex items-center gap-2 flex-wrap justify-center max-w-full overflow-visible py-8 px-4">
        <AnimatePresence mode="popLayout">
          {doublyNodes.length === 0 ? (
            <motion.div 
              key="empty" 
              className="px-6 py-4 border-2 border-dashed border-border rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-muted-foreground font-mono text-sm">Empty List (head = tail = None)</span>
            </motion.div>
          ) : (
            doublyNodes.map((node, index) => {
              const nodePointers = getPointersForNode(node.id);
              const isActive = nodePointers.length > 0;
              const prevAddress = node.prev ? getAddress(node.prev) : "NULL";
              const nextAddress = node.next ? getAddress(node.next) : "NULL";
              
              return (
                <motion.div 
                  key={node.id} 
                  className="flex items-center" 
                  initial={{ opacity: 0, scale: 0.8, y: 20 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Backward Arrow (from previous node) */}
                  {index > 0 && (
                    <div className="flex flex-col items-center mx-1">
                      <svg width="28" height="20" className="text-accent">
                        <path d="M24 10 L4 10 M10 5 L2 10 L10 15" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}

                  <div className="relative overflow-visible">
                    {/* Pointer Labels */}
                    {nodePointers.length > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 overflow-visible">
                         {nodePointers.map(p => (
                          <motion.span 
                            key={p.label} 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`px-2 py-1 rounded text-[11px] font-mono border whitespace-nowrap ${
                              p.label === 'head' ? 'bg-primary/20 text-primary border-primary/50' : 
                              p.label === 'tail' ? 'bg-accent/20 text-accent border-accent/50' :
                              'bg-accent/15 text-accent border-accent/30'
                            }`}
                          >
                            {p.label}↓
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* Node - Three Parts: Prev | Data | Next */}
                    <motion.div 
                      className={`flex rounded-lg overflow-hidden border-2 shadow-lg ${
                        isActive ? getActionColor() : 'border-border'
                      }`}
                      animate={isActive && action !== 'none' ? { 
                        boxShadow: ['0 0 0px hsl(var(--primary))', '0 0 15px hsl(var(--primary))', '0 0 0px hsl(var(--primary))']
                      } : {}}
                      transition={{ duration: 0.5, repeat: isActive && action !== 'none' ? 2 : 0 }}
                    >
                       {/* Prev Pointer */}
                       <div className={`px-3 py-2.5 flex flex-col items-center min-w-[55px] ${
                         node.prev === null ? 'bg-destructive/10' : 'bg-card/50'
                       }`}>
                         <span className="text-[9px] text-muted-foreground font-mono whitespace-nowrap">prev</span>
                         <span className={`font-mono text-[10px] font-medium whitespace-nowrap ${
                           node.prev === null ? 'text-destructive' : 'text-accent'
                         }`}>
                           {prevAddress}
                         </span>
                       </div>
 
                       {/* Data */}
                       <div className="px-4 py-2.5 bg-muted/60 flex flex-col items-center min-w-[60px] border-x border-border/50">
                         <span className="text-[9px] text-muted-foreground font-mono whitespace-nowrap">data</span>
                         <span className="font-mono font-bold text-lg text-foreground whitespace-nowrap">{node.val}</span>
                       </div>
 
                       {/* Next Pointer */}
                       <div className={`px-3 py-2.5 flex flex-col items-center min-w-[55px] ${
                         node.next === null ? 'bg-destructive/10' : 'bg-card/50'
                       }`}>
                         <span className="text-[9px] text-muted-foreground font-mono whitespace-nowrap">next</span>
                         <span className={`font-mono text-[10px] font-medium whitespace-nowrap ${
                           node.next === null ? 'text-destructive' : 'text-primary'
                         }`}>
                           {nextAddress}
                         </span>
                       </div>
                    </motion.div>

                    {/* Address below node */}
                    <div className="mt-1 text-center text-[9px] font-mono text-muted-foreground">
                      {getAddress(node.id)}
                    </div>
                  </div>

                  {/* Forward Arrow (to next node) */}
                  {index < doublyNodes.length - 1 && (
                    <div className="flex flex-col items-center mx-1">
                      <svg width="28" height="20" className="text-primary">
                        <path d="M4 10 L24 10 M18 5 L26 10 L18 15" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground text-center max-w-md font-mono">
        A two-way street where every node knows its neighbors.
      </p>
    </div>
  );
};

export default DoublyLinkedListCodeVisualizer;
