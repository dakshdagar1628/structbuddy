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
  const doublyNodes = nodes as unknown as DoublyNodeModel[];

  const getAddress = (id: string | null) => {
    if (!id) return "NULL";
    const num = parseInt(id.replace(/\D/g, '')) || 1;
    return `0x${(num * 26).toString(16).toUpperCase().padStart(2, '0')}`;
  };

  const getPointersForNode = (nodeId: string): PointerModel[] => pointers.filter(p => p.targetId === nodeId);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-4 overflow-visible relative select-none">
      {/* Legend - Top Right */}
      <div className="absolute top-4 right-4 bg-card/40 backdrop-blur-sm rounded-full px-4.5 py-1.5 flex items-center gap-3.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-border/30 shadow-soft-sm z-20">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" /> Add
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/20" /> Remove
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20" /> Read
        </span>
      </div>

      <motion.h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/45 mb-6">
        Doubly Linked List Stage
      </motion.h3>

      <div className="flex items-center gap-2 flex-wrap justify-center max-w-full overflow-visible py-8 px-4">
        <AnimatePresence mode="popLayout">
          {doublyNodes.length === 0 ? (
            <motion.div 
              key="empty" 
              className="px-6 py-4 bg-secondary/20 rounded-xl border border-border/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-muted-foreground/50 font-mono text-xs uppercase tracking-wider">Empty List (head = tail = None)</span>
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
                  initial={{ opacity: 0, scale: 0.8, y: 15 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.8, y: -15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                >
                  {/* Backward Arrow (from previous node) */}
                  {index > 0 && (
                    <div className="flex flex-col items-center mx-1">
                      <svg width="24" height="20" className="text-accent/60">
                        <path d="M22 10 L4 10 M8 6 L4 10 L8 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  )}

                  <div className="relative overflow-visible">
                    {/* Pointer Labels */}
                    {isActive && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 z-10 overflow-visible">
                        {nodePointers.map(p => (
                          <motion.span 
                            key={p.label} 
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border shadow-soft-sm whitespace-nowrap ${
                              p.label === 'head' ? 'bg-primary/5 text-primary border-primary/20' : 
                              p.label === 'tail' ? 'bg-accent/10 text-accent border-accent/20' :
                              'bg-accent/10 text-accent border-accent/20'
                            }`}
                          >
                            {p.label}↓
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* Node - Three Parts: Prev | Data | Next */}
                    <div 
                      className={`flex rounded-xl overflow-hidden shadow-soft-sm bg-card border transition-all duration-200 ${
                        isActive ? 'border-primary/30 ring-1 ring-primary/20 shadow-soft-md scale-[1.02]' : 'border-border/40 dark:border-white/5'
                      }`}
                    >
                       {/* Prev Pointer */}
                       <div className={`px-3.5 py-2.5 flex flex-col items-center min-w-[55px] ${
                         node.prev === null ? 'bg-destructive/5' : 'bg-card'
                       }`}>
                         <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">prev</span>
                         <span className={`font-mono text-[10px] font-semibold mt-0.5 whitespace-nowrap ${
                           node.prev === null ? 'text-destructive' : 'text-accent/70'
                         }`}>
                           {prevAddress}
                         </span>
                       </div>
  
                       {/* Data */}
                       <div className="px-4 py-2.5 bg-secondary/30 flex flex-col items-center min-w-[60px] border-x border-border/40">
                         <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">data</span>
                         <span className="font-mono font-bold text-sm text-foreground/90 mt-0.5">{node.val}</span>
                       </div>
  
                       {/* Next Pointer */}
                       <div className={`px-3.5 py-2.5 flex flex-col items-center min-w-[55px] ${
                         node.next === null ? 'bg-destructive/5' : 'bg-card'
                       }`}>
                         <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">next</span>
                         <span className={`font-mono text-[10px] font-semibold mt-0.5 whitespace-nowrap ${
                           node.next === null ? 'text-destructive' : 'text-primary/70'
                         }`}>
                           {nextAddress}
                         </span>
                       </div>
                    </div>

                    {/* Address below node */}
                    <div className="mt-2 text-center text-[10px] font-mono font-bold text-muted-foreground/35 tracking-wider">
                      {getAddress(node.id)}
                    </div>
                  </div>

                  {/* Forward Arrow (to next node) */}
                  {index < doublyNodes.length - 1 && (
                    <div className="flex flex-col items-center mx-1">
                      <svg width="24" height="20" className="text-primary/60">
                        <path d="M2 10 L20 10 M16 6 L20 10 L16 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <p className="text-[10px] text-muted-foreground/45 text-center max-w-sm font-mono uppercase tracking-wider mt-4">
        A two-way street where every node knows its neighbors.
      </p>
    </div>
  );
};

export default DoublyLinkedListCodeVisualizer;
