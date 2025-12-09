import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode, useEffect, useRef } from "react";
import { Code, Variable } from "lucide-react";

export interface CodeStep {
  code: string;
  explanation: string;
  variables?: Record<string, string>;
}

interface IntegratedCodeLabProps {
  pythonCode: CodeStep[];
  visualizer: (currentLine: number) => ReactNode;
}

// Variables Panel Component
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
    // Also check for new keys
    Object.keys(variables).forEach(key => {
      if (!(key in (previousVariables || {}))) {
        changed.add(key);
      }
    });
    
    setChangedKeys(changed);
    
    // Clear the flash after animation
    const timer = setTimeout(() => setChangedKeys(new Set()), 600);
    return () => clearTimeout(timer);
  }, [variables, previousVariables]);

  if (!variables || Object.keys(variables).length === 0) {
    return (
      <motion.div
        className="h-32 lg:h-40 bg-card border border-border rounded-lg flex flex-col shrink-0 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-3 border-b border-border bg-card/80 shrink-0">
          <div className="flex items-center gap-2">
            <Variable className="w-4 h-4 text-accent" />
            <span className="font-mono text-sm text-foreground">Variables</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-muted-foreground text-sm font-mono">No variables at this step</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="h-32 lg:h-40 bg-card border border-border rounded-lg flex flex-col shrink-0 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-3 border-b border-border bg-card/80 shrink-0">
        <div className="flex items-center gap-2">
          <Variable className="w-4 h-4 text-accent" />
          <span className="font-mono text-sm text-foreground">Variables</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
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
                className="p-2 rounded-lg border border-border/50"
              >
                <div className="text-xs text-muted-foreground font-mono truncate">{key}</div>
                <div className={`text-sm font-mono truncate ${changedKeys.has(key) ? 'text-primary' : 'text-foreground'}`}>
                  {value}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const IntegratedCodeLab = ({ pythonCode, visualizer }: IntegratedCodeLabProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [previousVariables, setPreviousVariables] = useState<Record<string, string> | undefined>();
  const maxLine = pythonCode.length - 1;

  const handlePrevLine = () => {
    setPreviousVariables(pythonCode[currentLine]?.variables);
    setCurrentLine(Math.max(0, currentLine - 1));
  };

  const handleNextLine = () => {
    setPreviousVariables(pythonCode[currentLine]?.variables);
    setCurrentLine(Math.min(maxLine, currentLine + 1));
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 overflow-hidden">
      {/* Visual Panel - Left Side */}
      <motion.div
        className="flex-1 bg-card border border-border rounded-lg overflow-hidden min-h-[300px] lg:min-h-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {visualizer(currentLine)}
      </motion.div>

      {/* Code Panel - Right Side */}
      <div className="flex-1 flex flex-col gap-4 min-h-[400px] lg:min-h-0">
        {/* Code Viewer - Top */}
        <motion.div
          className="flex-1 bg-card border border-border rounded-lg flex flex-col min-h-0 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="p-3 border-b border-border bg-card/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-foreground">Python Code</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              Line {currentLine + 1} of {pythonCode.length}
            </span>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto min-h-0 p-3">
            <pre className="font-mono text-sm">
              {pythonCode.map((line, index) => (
                <motion.div
                  key={index}
                  className={`px-3 py-0.5 rounded transition-all duration-300 ${
                    index === currentLine
                      ? "code-line-highlight bg-primary/20"
                      : ""
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <span className="inline-block w-6 text-muted-foreground text-right mr-3 select-none text-xs">
                    {index + 1}
                  </span>
                  <span
                    className={
                      index === currentLine ? "text-primary" : "text-foreground"
                    }
                  >
                    {line.code}
                  </span>
                </motion.div>
              ))}
            </pre>
          </div>

          {/* Explanation */}
          <div className="p-3 border-t border-border bg-muted/30 shrink-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLine}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-foreground leading-relaxed"
              >
                <span className="text-primary font-mono">→</span> {pythonCode[currentLine]?.explanation}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="p-3 border-t border-border bg-card/80 flex items-center justify-between shrink-0">
            <motion.button
              onClick={handlePrevLine}
              disabled={currentLine === 0}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors"
              whileHover={{ scale: currentLine === 0 ? 1 : 1.02 }}
              whileTap={{ scale: currentLine === 0 ? 1 : 0.98 }}
            >
              Prev Line
            </motion.button>

            <motion.button
              onClick={handleNextLine}
              disabled={currentLine === maxLine}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              whileHover={{ scale: currentLine === maxLine ? 1 : 1.02 }}
              whileTap={{ scale: currentLine === maxLine ? 1 : 0.98 }}
            >
              Next Line
            </motion.button>
          </div>
        </motion.div>

        {/* Variables Panel - Bottom */}
        <VariablesPanel 
          variables={pythonCode[currentLine]?.variables} 
          previousVariables={previousVariables}
        />
      </div>
    </div>
  );
};

export default IntegratedCodeLab;