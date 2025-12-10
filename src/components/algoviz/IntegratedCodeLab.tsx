import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode, useEffect, useRef, useCallback } from "react";
import { Code, Variable, ChevronLeft, ChevronRight, MessageSquare, GripVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Visual State Interfaces
export interface NodeModel {
  id: string;
  val: number | string;
  next: string | null;
  prev?: string | null; // Optional for doubly linked lists
}

export interface PointerModel {
  label: string;
  targetId: string;
}

export interface VisualState {
  items?: (number | string)[];
  activeIndices?: number[];
  action?: 'add' | 'remove' | 'read' | 'none';
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

// Variables Panel Component
const VariablesPanel = ({ 
  variables, 
  previousVariables,
  compact = false
}: { 
  variables?: Record<string, string>;
  previousVariables?: Record<string, string>;
  compact?: boolean;
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
      <div className={`h-full flex items-center justify-center ${compact ? 'p-2' : 'p-4'}`}>
        <span className="text-muted-foreground text-xs font-mono">No variables at this step</span>
      </div>
    );
  }

  return (
    <div className={`h-full overflow-auto custom-scrollbar ${compact ? 'p-2' : 'p-4'}`}>
      <div className="space-y-1.5">
        <AnimatePresence mode="popLayout">
          {Object.entries(variables).map(([key, value]) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                backgroundColor: changedKeys.has(key) 
                  ? "hsl(var(--primary) / 0.2)" 
                  : "transparent"
              }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between py-1.5 px-2 rounded border-l-2 border-transparent"
              style={{
                borderLeftColor: changedKeys.has(key) ? 'hsl(var(--primary))' : 'transparent'
              }}
            >
              <span className="text-xs text-muted-foreground font-mono">{key}</span>
              <span className={`text-xs font-mono font-medium ${changedKeys.has(key) ? 'text-primary' : 'text-foreground'}`}>
                {value}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Code Viewer Component
const CodeViewer = ({ 
  pythonCode, 
  currentLine,
  compact = false
}: { 
  pythonCode: CodeStep[];
  currentLine: number;
  compact?: boolean;
}) => {
  return (
    <div className={`h-full overflow-auto custom-scrollbar ${compact ? 'p-2' : 'p-4'}`}>
      <pre className="font-mono text-xs">
        {pythonCode.map((line, index) => (
          <motion.div
            key={index}
            className={`px-2 py-0.5 rounded-sm transition-all duration-200 ${
              index === currentLine
                ? "bg-primary/20 border-l-2 border-primary"
                : "border-l-2 border-transparent hover:bg-muted/30"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.01 }}
          >
            <span className="inline-block w-5 text-muted-foreground text-right mr-3 select-none text-[10px]">
              {index + 1}
            </span>
            <span className={index === currentLine ? "text-primary font-medium" : "text-foreground"}>
              {line.code}
            </span>
          </motion.div>
        ))}
      </pre>
    </div>
  );
};

// Explanation Box Component
const ExplanationBox = ({ 
  explanation,
  compact = false
}: { 
  explanation: string;
  compact?: boolean;
}) => {
  return (
    <div className={`h-full overflow-auto custom-scrollbar ${compact ? 'p-3' : 'p-4'}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={explanation}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-foreground leading-relaxed font-sans"
        >
          <span className="text-primary font-mono mr-2">→</span>
          {explanation}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const IntegratedCodeLab = ({ pythonCode, visualizer }: IntegratedCodeLabProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [previousVariables, setPreviousVariables] = useState<Record<string, string> | undefined>();
  const [leftPanelWidth, setLeftPanelWidth] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Constrain between 30% and 70%
      setLeftPanelWidth(Math.min(70, Math.max(30, newWidth)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      {/* ==================== DESKTOP LAYOUT (>= 1024px) ==================== */}
      <div className={`hidden lg:flex h-full w-full bg-background overflow-hidden flex-col ${isDragging ? 'select-none' : ''}`}>
        <div ref={containerRef} className="flex flex-1 min-h-0">
          {/* Left Panel - Visualizer */}
          <div 
            className="h-full border-r border-border bg-card flex items-center justify-center p-6"
            style={{ width: `${leftPanelWidth}%` }}
          >
            <div className="w-full h-full">
              {visualizer(currentVisualState)}
            </div>
          </div>

          {/* Drag Handle */}
          <div
            onMouseDown={handleMouseDown}
            className={`w-1.5 h-full cursor-col-resize flex items-center justify-center group transition-colors ${
              isDragging ? 'bg-primary' : 'bg-border hover:bg-primary/60'
            }`}
          >
            <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDragging ? 'opacity-100' : ''}`}>
              <GripVertical className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>

          {/* Right Panel - Logic Console */}
          <div 
            className="h-full flex flex-col min-h-0"
            style={{ width: `${100 - leftPanelWidth}%` }}
          >
            {/* Code Editor Section (50%) */}
            <div className="h-[50%] flex flex-col border-b border-border">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs text-foreground">Python Code</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono bg-background px-2 py-0.5 rounded">
                  Line {currentLine + 1} / {pythonCode.length}
                </span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <CodeViewer pythonCode={pythonCode} currentLine={currentLine} />
              </div>
            </div>

            {/* Variables Section (30%) */}
            <div className="h-[30%] flex flex-col border-b border-border">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center gap-2 shrink-0">
                <Variable className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs text-foreground">Variables</span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <VariablesPanel 
                  variables={pythonCode[currentLine]?.variables} 
                  previousVariables={previousVariables}
                />
              </div>
            </div>

            {/* Explanation Section (20%) */}
            <div className="h-[20%] flex flex-col bg-accent/5">
              <div className="px-4 py-2.5 border-b border-border bg-accent/10 flex items-center gap-2 shrink-0">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs text-foreground">Explanation</span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <ExplanationBox explanation={pythonCode[currentLine]?.explanation || ""} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <div className="h-14 border-t border-border bg-card flex items-center justify-center gap-4 px-6 shrink-0">
          <motion.button
            onClick={handlePrevLine}
            disabled={currentLine === 0}
            className="flex items-center gap-2 px-5 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: currentLine === 0 ? 1 : 1.02 }}
            whileTap={{ scale: currentLine === 0 ? 1 : 0.98 }}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev Line
          </motion.button>

          <div className="px-4 py-2 bg-background rounded-lg border border-border">
            <span className="text-xs font-mono text-muted-foreground">
              Line {currentLine + 1} of {pythonCode.length}
            </span>
          </div>

          <motion.button
            onClick={handleNextLine}
            disabled={currentLine === maxLine}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: currentLine === maxLine ? 1 : 1.02 }}
            whileTap={{ scale: currentLine === maxLine ? 1 : 0.98 }}
          >
            Next Line
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT (< 1024px) ==================== */}
      <div className="flex lg:hidden flex-col min-h-screen h-auto w-full bg-background overflow-y-auto">
        {/* Top - Visualizer Stage (45vh) */}
        <div className="h-[45vh] min-h-[280px] shrink-0 bg-muted/20 border-b border-border flex items-center justify-center p-4">
          <div className="w-full h-full flex items-center justify-center">
            {visualizer(currentVisualState)}
          </div>
        </div>

        {/* Middle - Tabbed Logic Console with safe area padding */}
        <div className="flex-1 min-h-[300px] pb-24">
          <Tabs defaultValue="code" className="h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-muted/30 p-0 h-12 shrink-0">
              <TabsTrigger 
                value="code" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-xs"
              >
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger 
                value="variables" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-xs"
              >
                <Variable className="w-4 h-4 mr-2" />
                Vars
              </TabsTrigger>
              <TabsTrigger 
                value="explanation" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-xs"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Why?
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="flex-1 m-0 overflow-auto">
              <CodeViewer pythonCode={pythonCode} currentLine={currentLine} compact />
            </TabsContent>

            <TabsContent value="variables" className="flex-1 m-0 overflow-auto">
              <VariablesPanel 
                variables={pythonCode[currentLine]?.variables} 
                previousVariables={previousVariables}
                compact
              />
            </TabsContent>

            <TabsContent value="explanation" className="flex-1 m-0 overflow-auto">
              <ExplanationBox explanation={pythonCode[currentLine]?.explanation || ""} compact />
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom - Fixed Navigation Controls (Sticky Footer) */}
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-md border-t border-border z-50 flex items-center justify-between px-4 pb-safe">
          <motion.button
            onClick={handlePrevLine}
            disabled={currentLine === 0}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-muted hover:bg-muted/80 active:bg-muted/60 rounded-xl text-base font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-w-[100px]"
            whileTap={{ scale: currentLine === 0 ? 1 : 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            Prev
          </motion.button>

          <div className="px-4 py-2 bg-card rounded-xl border border-border">
            <span className="text-sm font-mono text-muted-foreground font-medium">
              {currentLine + 1} / {pythonCode.length}
            </span>
          </div>

          <motion.button
            onClick={handleNextLine}
            disabled={currentLine === maxLine}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-xl text-base font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-w-[100px]"
            whileTap={{ scale: currentLine === maxLine ? 1 : 0.95 }}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default IntegratedCodeLab;
