import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode, useEffect } from "react";
import { Code, Variable, ChevronLeft, ChevronRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Visual State Interfaces
export interface NodeModel {
  id: string;
  val: number | string;
  next: string | null;
}

export interface PointerModel {
  label: string;
  targetId: string;
}

export interface VisualState {
  items?: (number | string)[];
  activeIndices?: number[];
  action?: 'add' | 'remove' | 'read' | 'none';
  // Linked List specific
  nodes?: NodeModel[];
  pointers?: PointerModel[];
}

export interface CodeStep {
  code: string;
  explanation: string;
  variables?: Record<string, string>;
  visualState?: VisualState;
}

interface IntegratedCodeLabProps {
  pythonCode: CodeStep[];
  visualizer: (visualState: VisualState) => ReactNode;
}

// Variables Panel Component - Compact for mobile
const VariablesPanel = ({ 
  variables, 
  previousVariables 
}: { 
  variables?: Record<string, string>;
  previousVariables?: Record<string, string>;
}) => {
  const [changedKeys, setChangedKeys] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    if (!variables || !previousVariables) return;
    
    const changed = new Set<string>();
    Object.keys(variables).forEach(key => {
      if (previousVariables[key] !== variables[key]) {
        changed.add(key);
      }
    });
    Object.keys(variables).forEach(key => {
      if (!(key in (previousVariables || {}))) {
        changed.add(key);
      }
    });
    
    setChangedKeys(changed);
    const timer = setTimeout(() => setChangedKeys(new Set()), 600);
    return () => clearTimeout(timer);
  }, [variables, previousVariables]);

  if (!variables || Object.keys(variables).length === 0) {
    return (
      <div className="p-4 md:p-5 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Variable className="w-4 h-4 text-accent" />
          <span className="font-mono text-xs md:text-sm text-muted-foreground">Variables</span>
        </div>
        <span className="text-muted-foreground text-xs md:text-sm font-mono">No variables at this step</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-5 bg-muted/30 rounded-lg border border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <Variable className="w-4 h-4 text-accent" />
        <span className="font-mono text-xs md:text-sm text-muted-foreground">Variables</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <AnimatePresence mode="popLayout">
          {Object.entries(variables).map(([key, value]) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                backgroundColor: changedKeys.has(key) 
                  ? "hsl(var(--primary) / 0.3)" 
                  : "hsl(var(--muted) / 0.5)"
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-2 md:p-3 rounded-lg border border-border/50"
            >
              <div className="text-[10px] md:text-xs text-muted-foreground font-mono truncate">{key}</div>
              <div className={`text-xs md:text-sm font-mono truncate ${changedKeys.has(key) ? 'text-primary' : 'text-foreground'}`}>
                {value}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const IntegratedCodeLab = ({ pythonCode, visualizer }: IntegratedCodeLabProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [previousVariables, setPreviousVariables] = useState<Record<string, string> | undefined>();
  const maxLine = pythonCode.length - 1;

  const currentVisualState = pythonCode[currentLine]?.visualState || {};

  const handlePrevLine = () => {
    setPreviousVariables(pythonCode[currentLine]?.variables);
    setCurrentLine(Math.max(0, currentLine - 1));
  };

  const handleNextLine = () => {
    setPreviousVariables(pythonCode[currentLine]?.variables);
    setCurrentLine(Math.min(maxLine, currentLine + 1));
  };

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 overflow-hidden">
        {/* Visual Panel - Top on mobile, Left on desktop */}
        <motion.div
          className="h-[35vh] md:h-auto md:flex-1 bg-card border border-border rounded-xl overflow-hidden shrink-0 md:shrink"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {visualizer(currentVisualState)}
        </motion.div>

        {/* Code Panel - Bottom on mobile, Right on desktop */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden pb-20 md:pb-0">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            {/* Code Viewer */}
            <motion.div
              className="bg-card border border-border rounded-xl overflow-hidden mb-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header with Explanation Tooltip */}
              <div className="p-4 md:p-5 border-b border-border bg-card/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs md:text-sm text-foreground">Python Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] md:text-xs text-muted-foreground font-mono">
                    {currentLine + 1}/{pythonCode.length}
                  </span>
                  {/* Explanation Tooltip - Desktop */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                        <Info className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-mono text-primary">Explain</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="bottom" 
                      align="end"
                      className="max-w-sm p-4 bg-card border border-primary/30 shadow-lg shadow-primary/10"
                    >
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="text-primary font-mono">→</span> {pythonCode[currentLine]?.explanation}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 md:p-5 overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-xs md:text-sm">
                  {pythonCode.map((line, index) => (
                    <motion.div
                      key={index}
                      className={`px-2 md:px-3 py-0.5 rounded transition-all duration-300 ${
                        index === currentLine
                          ? "bg-primary/20 border-l-2 border-primary"
                          : "border-l-2 border-transparent"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.015 }}
                    >
                      <span className="inline-block w-5 md:w-6 text-muted-foreground text-right mr-2 md:mr-3 select-none text-[10px] md:text-xs">
                        {index + 1}
                      </span>
                      <span
                        className={
                          index === currentLine ? "text-primary font-medium" : "text-foreground"
                        }
                      >
                        {line.code}
                      </span>
                    </motion.div>
                  ))}
                </pre>
              </div>

              {/* Mobile Explanation - Shows inline on mobile */}
              <div className="md:hidden p-4 border-t border-border bg-muted/30">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentLine}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-foreground leading-relaxed"
                  >
                    <span className="text-primary font-mono">→</span> {pythonCode[currentLine]?.explanation}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Variables Panel */}
            <VariablesPanel 
              variables={pythonCode[currentLine]?.variables} 
              previousVariables={previousVariables}
            />
          </div>
        </div>

        {/* Sticky Navigation Controls - Mobile */}
        <div className="fixed md:hidden bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-50">
          <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
            <motion.button
              onClick={handlePrevLine}
              disabled={currentLine === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-muted rounded-xl text-sm font-mono disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
              whileTap={{ scale: currentLine === 0 ? 1 : 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </motion.button>

            <div className="px-3 py-2 bg-card rounded-lg border border-border">
              <span className="text-xs font-mono text-muted-foreground">
                {currentLine + 1} / {pythonCode.length}
              </span>
            </div>

            <motion.button
              onClick={handleNextLine}
              disabled={currentLine === maxLine}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-mono disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
              whileTap={{ scale: currentLine === maxLine ? 1 : 0.95 }}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Desktop Navigation - Floating at bottom of code panel */}
        <div className="hidden md:flex fixed md:relative bottom-0 right-0 md:bottom-auto md:right-auto md:absolute md:inset-x-0 md:bottom-4 justify-center pointer-events-none">
          <div className="hidden md:flex items-center gap-3 p-2 bg-card/90 backdrop-blur-sm border border-border rounded-xl shadow-lg pointer-events-auto">
            <motion.button
              onClick={handlePrevLine}
              disabled={currentLine === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-lg text-sm font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: currentLine === 0 ? 1 : 1.02 }}
              whileTap={{ scale: currentLine === 0 ? 1 : 0.98 }}
            >
              <ChevronLeft className="w-4 h-4" />
              Prev Line
            </motion.button>

            <div className="px-3 py-1.5 bg-background rounded-lg">
              <span className="text-xs font-mono text-muted-foreground">
                Line {currentLine + 1} of {pythonCode.length}
              </span>
            </div>

            <motion.button
              onClick={handleNextLine}
              disabled={currentLine === maxLine}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: currentLine === maxLine ? 1 : 1.02 }}
              whileTap={{ scale: currentLine === maxLine ? 1 : 0.98 }}
            >
              Next Line
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IntegratedCodeLab;
