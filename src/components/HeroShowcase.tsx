import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code, Cpu, Variable } from "lucide-react";

interface NodeItem {
  id: string;
  val: number;
  address: string;
  nextAddress: string;
  disconnected?: boolean;
}

interface Step {
  code: string[];
  activeLine: number;
  nodes: NodeItem[];
  variables: Record<string, string>;
  explanation: string;
}

const steps: Step[] = [
  {
    code: [
      "head = None  # Init empty list",
      "head = Node(10)",
      "head.next = Node(25)",
      "head.next = None  # Delete node"
    ],
    activeLine: 0,
    nodes: [],
    variables: { head: "NULL" },
    explanation: "Initialize empty pointer reference 'head'."
  },
  {
    code: [
      "head = None  # Init empty list",
      "head = Node(10)  # Allocate head",
      "head.next = Node(25)",
      "head.next = None  # Delete node"
    ],
    activeLine: 1,
    nodes: [
      { id: "1", val: 10, address: "0x1A", nextAddress: "NULL" }
    ],
    variables: { head: "0x1A" },
    explanation: "Create head node in memory at 0x1A with value 10."
  },
  {
    code: [
      "head = None  # Init empty list",
      "head = Node(10)",
      "head.next = Node(25)  # Link new node",
      "head.next = None  # Delete node"
    ],
    activeLine: 2,
    nodes: [
      { id: "1", val: 10, address: "0x1A", nextAddress: "0x4B" },
      { id: "2", val: 25, address: "0x4B", nextAddress: "NULL" }
    ],
    variables: { head: "0x1A", "head.next": "0x4B" },
    explanation: "Allocate node 25 at 0x4B and link head's pointer to it."
  },
  {
    code: [
      "head = None  # Init empty list",
      "head = Node(10)",
      "head.next = Node(25)",
      "head.next = None  # Bypass node 25"
    ],
    activeLine: 3,
    nodes: [
      { id: "1", val: 10, address: "0x1A", nextAddress: "NULL" },
      { id: "2", val: 25, address: "0x4B", nextAddress: "NULL", disconnected: true }
    ],
    variables: { head: "0x1A", "temp": "0x4B" },
    explanation: "Re-route head's next pointer directly to NULL, bypassing node 25."
  },
  {
    code: [
      "head = None  # Init empty list",
      "head = Node(10)",
      "head.next = Node(25)",
      "del temp  # Garbage collection"
    ],
    activeLine: 3,
    nodes: [
      { id: "1", val: 10, address: "0x1A", nextAddress: "NULL" }
    ],
    variables: { head: "0x1A" },
    explanation: "Garbage collector deallocates unreferenced memory at 0x4B."
  }
];

export const HeroShowcase = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const step = steps[currentStepIdx];

  // Helper to colorize Python code inside the Hero preview
  const renderCodeLine = (line: string, isHighlighted: boolean) => {
    // Basic Python syntax highlighting
    const parts = line.split(/(#.*)/);
    return (
      <span className="font-mono text-xs block truncate">
        {parts.map((part, i) => {
          if (part.startsWith("#")) {
            return (
              <span key={i} className="text-muted-foreground/45 italic">
                {part}
              </span>
            );
          }
          // Highlight standard keyword sequences
          const tokens = part.split(/(\b(?:None|Node|del)\b)/);
          return (
            <span key={i} className="text-foreground/90">
              {tokens.map((token, j) => {
                if (token === "None" || token === "Node" || token === "del") {
                  return (
                    <span key={j} className="text-violet-600 dark:text-violet-400 font-semibold">
                      {token}
                    </span>
                  );
                }
                return token;
              })}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col bg-card border border-border/40 dark:border-white/5 rounded-xl shadow-soft-lg overflow-hidden h-[380px] sm:h-[420px]">
      {/* Header bar */}
      <div className="px-4 py-3 border-b border-border/40 bg-card/65 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            Live Preview Simulator
          </span>
        </div>
        <div className="flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
          <Play className="w-2.5 h-2.5 text-primary animate-none" />
          <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-wide">
            Auto-Play
          </span>
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-b border-border/40 min-h-0">
        {/* Code Console */}
        <div className="p-4 bg-secondary/15 border-r border-border/40 flex flex-col min-h-0 justify-center">
          <div className="flex items-center gap-1.5 mb-3 select-none">
            <Code className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
              IDE Code Feed
            </span>
          </div>
          <div className="space-y-1.5">
            {step.code.map((line, idx) => {
              const isAct = idx === step.activeLine;
              return (
                <div
                  key={idx}
                  className={`px-2 py-1 rounded transition-all duration-200 flex items-start gap-2.5 ${
                    isAct
                      ? "bg-primary/5 border-l-2 border-primary font-semibold"
                      : "border-l-2 border-transparent text-muted-foreground/60"
                  }`}
                >
                  <span className="text-[9px] font-mono text-muted-foreground/30 select-none w-3 text-right">
                    {idx + 1}
                  </span>
                  {renderCodeLine(line, isAct)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Node Graph Stage */}
        <div className="p-4 flex flex-col items-center justify-center relative overflow-hidden bg-card min-h-0 select-none">
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
              Pointer Visualizer
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-4 min-w-max">
            {/* HEAD indicator */}
            {step.nodes.length > 0 && (
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[8px] font-mono font-bold text-primary mb-0.5">HEAD</span>
                <svg width="12" height="12" className="text-primary/60">
                  <path d="M6 0 L6 8 M3 5 L6 8 L9 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {step.nodes.length === 0 ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-2 rounded bg-secondary/30 border border-border/30"
                >
                  <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                    head = None
                  </span>
                </motion.div>
              ) : (
                step.nodes.map((node) => (
                  <motion.div
                    key={node.id}
                    layout
                    initial={{ opacity: 0, scale: 0.7, x: 20 }}
                    animate={{ 
                      opacity: node.disconnected ? 0.35 : 1,
                      y: node.disconnected ? 20 : 0,
                      scale: 1,
                      x: 0 
                    }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex items-center shrink-0"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-mono text-muted-foreground/35 mb-0.5">{node.address}</span>
                      <div className="flex border border-border/40 dark:border-white/5 rounded-lg overflow-hidden bg-card shadow-soft-sm">
                        <div className="px-2 py-1.5 bg-secondary/30 text-[10px] font-mono font-bold text-foreground/80 border-r border-border/40">
                          {node.val}
                        </div>
                        <div className="px-2 py-1.5 text-[8px] font-mono font-bold text-primary/70 bg-card">
                          {node.nextAddress}
                        </div>
                      </div>
                    </div>

                    {/* Arrow (only if not tail or disconnected) */}
                    {node.nextAddress !== "NULL" && !node.disconnected && (
                      <div className="w-5 h-[1px] bg-primary/45 relative mx-0.5">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[2.5px] border-t-transparent border-b-[2.5px] border-b-transparent border-l-[4px] border-l-primary/45" />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Variables scope & comment details */}
      <div className="px-5 py-4 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 min-h-[72px]">
        {/* Variables panel */}
        <div className="flex flex-col justify-center min-w-[110px] select-none">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Variable className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
              Active Vars
            </span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-mono">
            {Object.entries(step.variables).map(([k, v]) => (
              <span key={k} className="text-foreground/85">
                <span className="text-muted-foreground/45">var </span>
                <span className="font-bold text-foreground/90">{k}</span>
                <span className="text-muted-foreground/60"> = </span>
                <span className="text-accent/80 font-bold">{v}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Explanation */}
        <div className="flex-1 border-t sm:border-t-0 sm:border-l border-border/40 pt-3 sm:pt-0 sm:pl-4 flex items-center">
          <div className="flex items-start gap-1.5">
            <span className="text-accent font-mono text-xs font-bold select-none">//</span>
            <p className="m-0 text-xs text-foreground/75 leading-relaxed font-sans font-medium select-text">
              {step.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
