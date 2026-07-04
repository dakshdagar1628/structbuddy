import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, GripVertical, Code, Variable, MessageSquare } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface NodeModel {
  id: string;
  val: number | string;
  next: string | null;
  prev?: string | null;
}

export interface PointerModel {
  label: string;
  targetId: string;
}

export interface VisualState {
  items?: (number | string)[];
  activeIndices?: number[];
  action?: "add" | "remove" | "read" | "none";
  nodes?: NodeModel[];
  pointers?: PointerModel[];
  searchVal?: number | string | null;
}

export interface CodeStep {
  code: string;
  lineIndex?: number;
  explanation: string;
  variables: Record<string, string>;
  visualState: VisualState;
}

interface IntegratedCodeLabProps {
  pythonCode: CodeStep[];
  visualizer: (visualState: VisualState) => ReactNode;
  displayCode?: string[];
}

interface CodeViewerProps {
  pythonCode: CodeStep[];
  currentLine: number;
  displayCode?: string[];
  compact?: boolean;
}

const CodeViewer = ({ pythonCode, currentLine, displayCode, compact = false }: CodeViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesToDisplay = displayCode || pythonCode.map((c) => c.code);
  const activeLineIndex = pythonCode[currentLine]?.lineIndex ?? currentLine;

  useEffect(() => {
    const activeEl = containerRef.current?.querySelector(`[data-line="${activeLineIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLineIndex]);

  return (
    <div 
      ref={containerRef} 
      className="h-full w-full bg-card overflow-auto p-5 font-mono text-xs sm:text-sm leading-relaxed select-text"
    >
      <div className="flex flex-col gap-1 min-w-max">
        {linesToDisplay.map((codeLine, index) => (
          <motion.div
            key={index}
            data-line={index}
            className={`px-3 py-1 rounded transition-all duration-200 flex items-start gap-4 ${
              index === activeLineIndex
                ? "bg-primary/5 border-l-2 border-primary font-semibold"
                : "border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10"
            }`}
          >
            <span className="w-6 text-right select-none text-[10px] text-muted-foreground/50 pt-0.5">
              {index + 1}
            </span>
            <pre className="font-mono m-0 overflow-visible whitespace-pre">
              {codeLine}
            </pre>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface VariablesPanelProps {
  variables: Record<string, string>;
  previousVariables?: Record<string, string>;
  compact?: boolean;
}

const VariablesPanel = ({ variables = {}, previousVariables, compact = false }: VariablesPanelProps) => {
  const keys = Object.keys(variables);
  const changedKeys = new Set<string>();

  if (previousVariables) {
    keys.forEach((key) => {
      if (variables[key] !== previousVariables[key]) {
        changedKeys.add(key);
      }
    });
  }

  if (keys.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-muted-foreground/60 font-mono text-xs">
        No active variables
      </div>
    );
  }

  return (
    <div className="p-5 overflow-auto h-full bg-card">
      <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-none text-xs sm:text-sm font-mono">
        <div className="text-muted-foreground/50 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-border/40">Variable</div>
        <div className="text-muted-foreground/50 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-border/40">Value</div>

        {keys.map((key) => (
          <motion.div
            key={key}
            layoutId={`var-${key}`}
            className="contents"
          >
            <div className="py-1 font-semibold text-foreground/80 truncate">
              {key}
            </div>
            <motion.div
              animate={changedKeys.has(key) ? {
                backgroundColor: ["transparent", "hsl(var(--accent) / 0.15)", "transparent"],
                x: [0, 4, -4, 0]
              } : {}}
              transition={{ duration: 0.5 }}
              className={`py-1 px-2 rounded font-semibold truncate ${
                changedKeys.has(key) ? "text-accent font-bold" : "text-foreground"
              }`}
            >
              {variables[key]}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface ExplanationBoxProps {
  explanation: string;
  compact?: boolean;
}

const ExplanationBox = ({ explanation, compact = false }: ExplanationBoxProps) => {
  return (
    <div className="p-5 h-full overflow-auto bg-card flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={explanation}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans font-medium m-0 text-pretty"
        >
          <span className="text-accent font-bold mr-1.5 font-mono">//</span>
          {explanation}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const IntegratedCodeLab = ({ pythonCode, visualizer, displayCode }: IntegratedCodeLabProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [previousVariables, setPreviousVariables] = useState<Record<string, string> | undefined>();
  const [leftPanelWidth, setLeftPanelWidth] = useState(55);
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
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftPanelWidth(Math.min(Math.max(newWidth, 35), 70));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col min-h-screen lg:h-[calc(100vh-100px)] w-full bg-background overflow-hidden relative">
      {/* ==================== DESKTOP LAYOUT (>= 1024px) ==================== */}
      <div className="hidden lg:flex flex-col h-full w-full">
        <div ref={containerRef} className="flex-1 flex min-h-0 relative select-none">
          {/* Left Panel - Visualizer Stage (Canvas Level) */}
          <div 
            className="h-full flex items-center justify-center p-6 overflow-hidden min-w-0"
            style={{ width: `${leftPanelWidth}%` }}
          >
            <div className="w-full h-full flex items-center justify-center bg-card rounded-xl shadow-soft-sm p-4 relative overflow-hidden">
              {visualizer(currentVisualState)}
            </div>
          </div>

          {/* Draggable Divider */}
          <div
            onMouseDown={handleMouseDown}
            className={`w-1 h-full cursor-col-resize hover:bg-primary/40 transition-[background-color] duration-200 shrink-0 flex items-center justify-center group relative z-10 ${
              isDragging ? "bg-primary/30" : "bg-transparent"
            }`}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-[opacity] duration-200">
              <GripVertical className="w-3 h-3 text-muted-foreground/60" aria-hidden="true" />
            </div>
          </div>

          {/* Right Panel - Logic Console (Notion / Stripe Workspace) */}
          <div 
            className="h-full flex flex-col min-h-0 p-6 gap-6"
            style={{ width: `${100 - leftPanelWidth}%` }}
          >
            {/* Code Editor Card */}
            <div className="flex-1 min-h-0 flex flex-col bg-card rounded-xl shadow-soft-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border/40 bg-card flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Code Viewer</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded font-semibold">
                  {currentLine + 1} / {pythonCode.length}
                </span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <CodeViewer pythonCode={pythonCode} currentLine={currentLine} displayCode={displayCode} />
              </div>
            </div>

            {/* Bottom Section: Variables & Explanation Side-by-Side (Apple-style Rhythm) */}
            <div className="h-[38%] min-h-[180px] shrink-0 flex gap-6">
              {/* Variables Panel */}
              <div className="flex-1 flex flex-col bg-card rounded-xl shadow-soft-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-border/40 bg-card flex items-center gap-2 shrink-0">
                  <Variable className="w-4 h-4 text-accent" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Variables</span>
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <VariablesPanel 
                    variables={pythonCode[currentLine]?.variables} 
                    previousVariables={previousVariables}
                  />
                </div>
              </div>

              {/* Explanation Panel */}
              <div className="flex-1 flex flex-col bg-card rounded-xl shadow-soft-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-border/40 bg-card flex items-center gap-2 shrink-0">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Explanation</span>
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <ExplanationBox explanation={pythonCode[currentLine]?.explanation || ""} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <div className="h-16 bg-background flex items-center justify-center gap-4 px-6 shrink-0 z-20">
          <motion.button
            onClick={handlePrevLine}
            disabled={currentLine === 0}
            className="flex items-center gap-2 px-5 py-2 bg-secondary text-foreground hover:bg-secondary/80 rounded-lg text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-[background-color,transform] duration-200 shadow-soft-sm"
            whileHover={{ scale: currentLine === 0 ? 1 : 1.03 }}
            whileTap={{ scale: currentLine === 0 ? 1 : 0.97 }}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Prev Step
          </motion.button>

          <div className="px-4 py-2 bg-card rounded-lg shadow-soft-sm text-xs font-mono text-muted-foreground font-bold">
            Step {currentLine + 1} of {pythonCode.length}
          </div>

          <motion.button
            onClick={handleNextLine}
            disabled={currentLine === maxLine}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/95 rounded-lg text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-[background-color,transform] duration-200 shadow-soft-sm"
            whileHover={{ scale: currentLine === maxLine ? 1 : 1.03 }}
            whileTap={{ scale: currentLine === maxLine ? 1 : 0.97 }}
          >
            Next Step
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT (< 1024px) ==================== */}
      <div className="flex lg:hidden flex-col min-h-screen h-auto w-full bg-background overflow-y-auto">
        {/* Top - Visualizer Stage */}
        <div className="h-[45vh] min-h-[280px] shrink-0 flex items-center justify-center p-4">
          <div className="w-full h-full flex items-center justify-center bg-card rounded-xl shadow-soft-sm p-4">
            {visualizer(currentVisualState)}
          </div>
        </div>

        {/* Middle - Tabbed Console */}
        <div className="flex-1 min-h-[300px] pb-24 px-4">
          <Tabs defaultValue="code" className="h-full flex flex-col bg-card rounded-xl shadow-soft-sm overflow-hidden">
            <TabsList className="w-full justify-start rounded-none border-b border-border/40 bg-card p-0 h-12 shrink-0">
              <TabsTrigger 
                value="code" 
                className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-xs font-bold text-muted-foreground"
              >
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger 
                value="variables" 
                className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-xs font-bold text-muted-foreground"
              >
                <Variable className="w-4 h-4 mr-2" />
                Vars
              </TabsTrigger>
              <TabsTrigger 
                value="explanation" 
                className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-xs font-bold text-muted-foreground"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Why?
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="flex-1 m-0 overflow-auto">
              <CodeViewer pythonCode={pythonCode} currentLine={currentLine} displayCode={displayCode} compact />
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

        {/* Bottom - Fixed Navigation Controls */}
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-4 pb-safe">
          <motion.button
            onClick={handlePrevLine}
            disabled={currentLine === 0}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-foreground hover:bg-secondary/80 rounded-xl text-sm font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-[background-color,transform] duration-200 shadow-soft-sm"
            whileTap={{ scale: currentLine === 0 ? 1 : 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            Prev
          </motion.button>

          <div className="px-4 py-2 bg-card rounded-xl shadow-soft-sm text-xs font-mono text-muted-foreground font-bold">
            {currentLine + 1} / {pythonCode.length}
          </div>

          <motion.button
            onClick={handleNextLine}
            disabled={currentLine === maxLine}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-sm font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-[background-color,transform] duration-200 shadow-soft-sm"
            whileTap={{ scale: currentLine === maxLine ? 1 : 0.95 }}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IntegratedCodeLab;
