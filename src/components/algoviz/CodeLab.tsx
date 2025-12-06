import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Code2 } from "lucide-react";

interface CodeLine {
  code: string;
  explanation: string;
}

interface CodeLabProps {
  pythonCode: CodeLine[];
  cCode: CodeLine[];
}

const CodeLab = ({ pythonCode, cCode }: CodeLabProps) => {
  const [language, setLanguage] = useState<"python" | "c">("python");
  const [currentLine, setCurrentLine] = useState(0);

  const code = language === "python" ? pythonCode : cCode;
  const maxLine = code.length - 1;

  const handlePrevLine = () => {
    setCurrentLine((prev) => Math.max(0, prev - 1));
  };

  const handleNextLine = () => {
    setCurrentLine((prev) => Math.min(maxLine, prev + 1));
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Code Panel */}
      <motion.div
        className="flex-1 bg-card border border-border rounded-lg overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-foreground">Code View</span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => {
                setLanguage("python");
                setCurrentLine(0);
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all duration-300 ${
                language === "python"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => {
                setLanguage("c");
                setCurrentLine(0);
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all duration-300 ${
                language === "c"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              C
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-auto max-h-[calc(100%-80px)]">
          <pre className="font-mono text-sm">
            {code.map((line, index) => (
              <motion.div
                key={index}
                className={`px-4 py-1 rounded transition-all duration-300 ${
                  index === currentLine
                    ? "code-line-highlight bg-primary/20"
                    : ""
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
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
        <div className="p-4 border-t border-border bg-card/80 flex items-center justify-between">
          <motion.button
            onClick={handlePrevLine}
            disabled={currentLine === 0}
            className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors"
            whileHover={{ scale: currentLine === 0 ? 1 : 1.02 }}
            whileTap={{ scale: currentLine === 0 ? 1 : 0.98 }}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev Line
          </motion.button>

          <span className="text-xs text-muted-foreground font-mono">
            Line {currentLine + 1} of {code.length}
          </span>

          <motion.button
            onClick={handleNextLine}
            disabled={currentLine === maxLine}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            whileHover={{ scale: currentLine === maxLine ? 1 : 1.02 }}
            whileTap={{ scale: currentLine === maxLine ? 1 : 0.98 }}
          >
            Next Line
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Explanation Panel */}
      <motion.div
        className="w-full lg:w-96 bg-card border border-border rounded-lg overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 border-b border-border bg-card/80">
          <span className="font-mono text-sm text-foreground">
            Line Explanation
          </span>
        </div>

        <div className="p-6">
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
                <code className="text-sm text-primary font-mono">
                  {code[currentLine]?.code}
                </code>
              </div>
            </div>

            <div>
              <span className="text-xs text-muted-foreground font-mono">
                Explanation
              </span>
              <p className="mt-2 text-sm text-foreground leading-relaxed">
                {code[currentLine]?.explanation}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeLab;
