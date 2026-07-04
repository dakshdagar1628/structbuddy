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
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8 overflow-auto">
      <motion.h3 className="text-xl font-mono text-primary neon-glow">Linked List Visualization</motion.h3>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <AnimatePresence mode="popLayout">
          {nodes.length === 0 ? (
            <motion.div key="empty" className="px-6 py-4 border-2 border-dashed border-border rounded-lg">
              <span className="text-muted-foreground font-mono text-sm">Empty List (head = None)</span>
            </motion.div>
          ) : (
            nodes.map((node, index) => {
              const nodePointers = getPointersForNode(node.id);
              const nextAddress = node.next ? getAddress(node.next) : "NULL";
              
              return (
                <motion.div key={node.id} className="flex items-center gap-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <div className="relative">
                    {nodePointers.length > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1">
                        {nodePointers.map(p => (
                          <span key={p.label} className={`px-2 py-0.5 rounded text-xs font-mono border ${p.label === 'head' ? 'bg-primary/20 text-primary border-primary/50' : 'bg-accent/15 text-accent border-accent/30'}`}>
                            {p.label} ↓
                          </span>
                        ))}
                      </div>
                    )}
                    <div className={`flex border-2 rounded-lg overflow-hidden ${nodePointers.length > 0 ? 'border-primary' : 'border-border'}`}>
                      <div className="px-4 py-3 bg-muted/60 flex flex-col items-center min-w-[60px]">
                        <span className="text-xs text-muted-foreground font-mono">data</span>
                        <span className="font-mono font-bold text-lg text-foreground">{node.val}</span>
                      </div>
                      <div className={`px-3 py-3 flex flex-col items-center min-w-[70px] ${node.next === null ? 'bg-destructive/10' : 'bg-card/50'}`}>
                        <span className="text-xs text-muted-foreground font-mono">next</span>
                        <span className={`font-mono text-sm ${node.next === null ? 'text-destructive' : 'text-primary'}`}>{nextAddress}</span>
                      </div>
                    </div>
                    <div className="mt-1 text-center text-xs font-mono text-muted-foreground">{getAddress(node.id)}</div>
                  </div>
                  {index < nodes.length - 1 && <div className="text-primary text-2xl font-bold">→</div>}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-md font-mono">Each node stores data and a pointer to the next node.</p>
    </div>
  );
};

export default LinkedListCodeVisualizer;
