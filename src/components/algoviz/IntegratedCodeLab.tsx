import { motion } from "framer-motion";
import { useState, ReactNode } from "react";
import { Code } from "lucide-react";

interface IntegratedCodeLabProps {
  pythonCode: { code: string; explanation: string }[];
  visualizer: (currentLine: number) => ReactNode;
}

const IntegratedCodeLab = ({ pythonCode, visualizer }: IntegratedCodeLabProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const maxLine = pythonCode.length - 1;

  const handlePrevLine = () => {
    setCurrentLine(Math.max(0, currentLine - 1));
  };

  const handleNextLine = () => {
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
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-[400px] lg:min-h-0">
        {/* Code Viewer */}
        <motion.div
          className="flex-1 bg-card border border-border rounded-lg flex flex-col min-h-0 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="p-4 border-b border-border bg-card/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm text-foreground">Python Code</span>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto min-h-0 p-4">
            <pre className="font-mono text-sm">
              {pythonCode.map((line, index) => (
                <motion.div
                  key={index}
                  className={`px-4 py-1 rounded transition-all duration-300 ${
                    index === currentLine
                      ? "code-line-highlight bg-primary/20"
                      : ""
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <span className="inline-block w-8 text-muted-foreground text-right mr-4 select-none">
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

          {/* Navigation */}
          <div className="p-4 border-t border-border bg-card/80 flex items-center justify-between shrink-0">
            <motion.button
              onClick={handlePrevLine}
              disabled={currentLine === 0}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors"
              whileHover={{ scale: currentLine === 0 ? 1 : 1.02 }}
              whileTap={{ scale: currentLine === 0 ? 1 : 0.98 }}
            >
              Prev Line
            </motion.button>

            <span className="text-xs text-muted-foreground font-mono">
              Line {currentLine + 1} of {pythonCode.length}
            </span>

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

        {/* Explanation Panel */}
        <motion.div
          className="w-full lg:w-72 bg-card border border-border rounded-lg flex flex-col shrink-0 lg:shrink lg:min-h-0 max-h-[250px] lg:max-h-none overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-4 border-b border-border bg-card/80 shrink-0">
            <span className="font-mono text-sm text-foreground">
              Line Explanation
            </span>
          </div>

          <div className="p-6 overflow-auto flex-1 min-h-0">
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <span className="text-xs text-muted-foreground font-mono">
                  Current Line
                </span>
                <div className="mt-2 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <code className="text-sm text-primary font-mono break-all">
                    {pythonCode[currentLine]?.code}
                  </code>
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground font-mono">
                  Explanation
                </span>
                <p className="mt-2 text-sm text-foreground leading-relaxed">
                  {pythonCode[currentLine]?.explanation}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntegratedCodeLab;