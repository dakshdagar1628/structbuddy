import { motion, AnimatePresence } from "framer-motion";
import { FileCode, User } from "lucide-react";

interface ClassesVisualizerProps {
  currentLine: number;
}

const ClassesVisualizer = ({ currentLine }: ClassesVisualizerProps) => {
  // Determine state based on current line
  const showBlueprint = currentLine >= 0;
  const showMario = currentLine >= 4;
  const showLuigi = currentLine >= 5;
  const luigiDamaged = currentLine >= 6;
  const highlightBlueprint = currentLine >= 0 && currentLine <= 3;
  const highlightMario = currentLine === 4;
  const highlightLuigi = currentLine === 5 || currentLine === 6;

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-6 overflow-auto">
      <motion.h3
        className="text-xl font-mono text-primary neon-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Classes & Objects: The Blueprint Factory
      </motion.h3>

      <div className="flex flex-col items-center gap-8">
        {/* Blueprint Section */}
        <motion.div
          className={`relative p-6 border-2 rounded-xl bg-card/50 transition-all ${
            highlightBlueprint
              ? "border-accent neon-border-accent"
              : "border-border"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: showBlueprint ? 1 : 0.3, 
            scale: 1,
            boxShadow: highlightBlueprint
              ? "0 0 30px hsl(var(--accent) / 0.4)"
              : "none"
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-3 left-4 px-2 bg-background text-xs font-mono text-accent">
            CLASS (Blueprint)
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/20 rounded-lg">
              <FileCode className="w-8 h-8 text-accent" />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-mono font-bold text-accent">Hero</h4>
              <div className="text-sm font-mono text-muted-foreground mt-1 space-y-1">
                <div>• name: <span className="text-foreground">string</span></div>
                <div>• hp: <span className="text-foreground">100</span> <span className="text-xs">(default)</span></div>
              </div>
            </div>
          </div>
          
          {/* Factory Arrow */}
          <AnimatePresence>
            {(showMario || showLuigi) && (
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-0.5 h-6 bg-muted-foreground" />
                <div className="text-xs font-mono text-muted-foreground">creates</div>
                <div className="w-0.5 h-4 bg-muted-foreground" />
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Objects Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {/* Mario Card */}
          <AnimatePresence>
            {showMario && (
              <motion.div
                className={`relative p-4 border-2 rounded-xl bg-card min-w-[160px] transition-all ${
                  highlightMario
                    ? "border-success neon-border-success"
                    : "border-border"
                }`}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: highlightMario
                    ? "0 0 25px hsl(var(--success) / 0.5)"
                    : "none"
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -top-3 left-4 px-2 bg-background text-xs font-mono text-success">
                  OBJECT (p1)
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <User className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-md font-mono font-bold text-red-400">Mario</h5>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-background/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="text-muted-foreground">hp:</span>
                    <motion.span
                      className="text-success font-bold"
                      initial={{ scale: 1 }}
                      animate={{ scale: highlightMario ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      100
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Luigi Card */}
          <AnimatePresence>
            {showLuigi && (
              <motion.div
                className={`relative p-4 border-2 rounded-xl bg-card min-w-[160px] transition-all ${
                  highlightLuigi
                    ? luigiDamaged
                      ? "border-destructive neon-border-destructive"
                      : "border-success neon-border-success"
                    : "border-border"
                }`}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: highlightLuigi
                    ? luigiDamaged
                      ? "0 0 25px hsl(var(--destructive) / 0.5)"
                      : "0 0 25px hsl(var(--success) / 0.5)"
                    : "none"
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <div className={`absolute -top-3 left-4 px-2 bg-background text-xs font-mono ${
                  luigiDamaged ? "text-destructive" : "text-success"
                }`}>
                  OBJECT (p2)
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <User className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-md font-mono font-bold text-green-400">Luigi</h5>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-background/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="text-muted-foreground">hp:</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={luigiDamaged ? "damaged" : "full"}
                        className={`font-bold ${luigiDamaged ? "text-destructive" : "text-success"}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ 
                          scale: highlightLuigi ? [1, 1.3, 1] : 1, 
                          opacity: 1 
                        }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {luigiDamaged ? "90" : "100"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Damage indicator */}
                <AnimatePresence>
                  {luigiDamaged && (
                    <motion.div
                      className="absolute -top-2 -right-2 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-mono rounded-full"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      -10 HP!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Key Insight */}
      <AnimatePresence>
        {currentLine >= 6 && (
          <motion.div
            className="mt-4 p-4 bg-card border border-primary rounded-lg max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm font-mono text-primary text-center">
              💡 Mario's HP is still <span className="text-success font-bold">100</span>!
              <br />
              <span className="text-muted-foreground text-xs">
                Each object is independent. Changing one doesn't affect others.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.p
        className="text-sm text-muted-foreground text-center max-w-md font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        A class is a blueprint. Objects are created from that blueprint, each with their own data.
      </motion.p>
    </div>
  );
};

export default ClassesVisualizer;
