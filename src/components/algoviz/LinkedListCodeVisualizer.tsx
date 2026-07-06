import { motion, AnimatePresence } from "framer-motion";
import type { VisualState, PointerModel } from "./IntegratedCodeLab";

interface LinkedListCodeVisualizerProps {
  visualState: VisualState;
}

const LinkedListCodeVisualizer = ({ visualState }: LinkedListCodeVisualizerProps) => {
  const { nodes = [], pointers = [] } = visualState;

  const getAddress = (id: string) => {
    const num = parseInt(id.replace(/\D/g, '')) || 1;
    return `0x${(num * 100).toString(16).toUpperCase()}`;
  };

  const getPointersForNode = (nodeId: string): PointerModel[] => pointers.filter(p => p.targetId === nodeId);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-8 overflow-auto select-none custom-scrollbar">
      <motion.h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/45 mb-6">Linked List Stage</motion.h3>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <AnimatePresence mode="popLayout">
          {nodes.length === 0 ? (
            <motion.div key="empty" className="px-6 py-4 bg-secondary/20 rounded-xl border border-border/30">
              <span className="text-muted-foreground/50 font-mono text-xs uppercase tracking-wider">Empty List (head = None)</span>
            </motion.div>
          ) : (
            nodes.map((node, index) => {
              const nodePointers = getPointersForNode(node.id);
              const nextAddress = node.next ? getAddress(node.next) : "NULL";
              const isTargeted = nodePointers.length > 0;
              
              return (
                <motion.div key={node.id} className="flex items-center gap-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="relative">
                    {isTargeted && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {nodePointers.map(p => (
                          <span key={p.label} className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border shadow-soft-sm ${p.label === 'head' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-accent/10 text-accent border-accent/20'}`}>
                            {p.label} ↓
                          </span>
                        ))}
                      </div>
                    )}
                    <div className={`flex rounded-xl overflow-hidden shadow-soft-sm bg-card border transition-all duration-200 ${isTargeted ? 'border-primary/30 ring-1 ring-primary/20 shadow-soft-md scale-[1.02]' : 'border-border/40 dark:border-white/5'}`}>
                      <div className="px-4 py-3 bg-secondary/30 flex flex-col items-center min-w-[65px]">
                        <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">data</span>
                        <span className="font-mono font-bold text-sm text-foreground/90 mt-0.5">{node.val}</span>
                      </div>
                      <div className={`px-3.5 py-3 flex flex-col items-center min-w-[75px] ${node.next === null ? 'bg-destructive/5' : 'bg-card'}`}>
                        <span className="text-[9px] text-muted-foreground/50 font-mono font-bold uppercase tracking-wider">next</span>
                        <span className={`font-mono text-xs font-semibold mt-0.5 ${node.next === null ? 'text-destructive' : 'text-primary/70'}`}>{nextAddress}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-center text-[10px] font-mono font-bold text-muted-foreground/35 tracking-wider">{getAddress(node.id)}</div>
                  </div>
                  {index < nodes.length - 1 && <div className="text-muted-foreground/30 text-lg font-bold select-none px-1">→</div>}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <p className="text-[10px] text-muted-foreground/45 text-center max-w-sm font-mono uppercase tracking-wider mt-4">Each node stores data and a pointer to the next node.</p>
    </div>
  );
};

export default LinkedListCodeVisualizer;
