import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { useState, useEffect } from "react";

interface ClassesVisualizerProps {
  currentLine: number;
}

const ClassesVisualizer = ({ currentLine }: ClassesVisualizerProps) => {
  const showBlueprint = currentLine >= 0;
  const showMario = currentLine >= 4;
  const showLuigi = currentLine >= 5;
  const luigiDamaged = currentLine >= 6;
  const highlightBlueprint = currentLine >= 0 && currentLine <= 3;
  const highlightMario = currentLine === 4;
  const highlightLuigi = currentLine === 5 || currentLine === 6;
  
  const [laserScan, setLaserScan] = useState(false);
  const [beamActive, setBeamActive] = useState<"mario" | "luigi" | null>(null);
  const [marioMaterializing, setMarioMaterializing] = useState(false);
  const [luigiMaterializing, setLuigiMaterializing] = useState(false);

  // Trigger laser scan and beam when creating objects
  useEffect(() => {
    if (currentLine === 4 && !marioMaterializing) {
      setLaserScan(true);
      setTimeout(() => {
        setLaserScan(false);
        setBeamActive("mario");
        setTimeout(() => {
          setBeamActive(null);
          setMarioMaterializing(true);
        }, 400);
      }, 500);
    }
    if (currentLine === 5 && !luigiMaterializing) {
      setLaserScan(true);
      setTimeout(() => {
        setLaserScan(false);
        setBeamActive("luigi");
        setTimeout(() => {
          setBeamActive(null);
          setLuigiMaterializing(true);
        }, 400);
      }, 500);
    }
  }, [currentLine]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Title */}
      <motion.h3
        className="text-lg font-mono text-primary mb-3"
        style={{ textShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
      >
        🏭 The 3D Printer Factory
      </motion.h3>

      <div className="flex flex-col lg:flex-row items-stretch gap-4 w-full max-w-4xl flex-1 min-h-0">
        {/* === LEFT: BLUEPRINT (CAD Drawing) === */}
        <motion.div
          className="relative flex-1 min-h-[200px] rounded-xl overflow-hidden"
          style={{ backgroundColor: "#001e36" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ 
            opacity: showBlueprint ? 1 : 0.3, 
            x: 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Blueprint Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(100, 180, 255, 0.3) 19px, rgba(100, 180, 255, 0.3) 20px),
                repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(100, 180, 255, 0.3) 19px, rgba(100, 180, 255, 0.3) 20px)
              `,
              backgroundSize: "20px 20px"
            }}
          />
          
          {/* Dashed Border Accent */}
          <div className="absolute inset-2 border-2 border-dashed border-cyan-500/30 rounded-lg pointer-events-none" />

          {/* Section Label */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-cyan-900/80 text-cyan-300 text-xs font-mono rounded border border-cyan-700">
            BLUEPRINT.class
          </div>

          {/* Blueprint Highlight on active */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: highlightBlueprint 
                ? "inset 0 0 40px hsl(200 100% 50% / 0.3)" 
                : "none"
            }}
          />

          {/* Code Content */}
          <div className="relative p-4 pt-10 font-mono text-sm text-cyan-300">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">class</span>
                <span className="text-yellow-400">Hero</span>
                <span className="text-cyan-500">:</span>
              </div>
              <div className="pl-4 text-cyan-400/80">
                <div>def __init__(self, name):</div>
                <div className="pl-4">self.name = name</div>
                <div className="pl-4">self.hp = <span className="text-green-400">100</span></div>
              </div>
            </div>
          </div>

          {/* === LASER SCANNER === */}
          <AnimatePresence>
            {laserScan && (
              <motion.div
                className="absolute left-0 top-0 w-full h-1 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, #ff0044, #ff0044, transparent)",
                  boxShadow: "0 0 20px #ff0044, 0 0 40px #ff0044"
                }}
                initial={{ top: "20%" }}
                animate={{ top: "80%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            )}
          </AnimatePresence>

          {/* === EMISSION BEAM === */}
          <AnimatePresence>
            {beamActive && (
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 150, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="h-2 rounded-full"
                  style={{
                    background: beamActive === "mario" 
                      ? "linear-gradient(90deg, #ff0044, #ff6b6b, transparent)"
                      : "linear-gradient(90deg, #00ff88, #6bffb8, transparent)",
                    boxShadow: beamActive === "mario"
                      ? "0 0 20px #ff0044, 0 0 40px #ff0044"
                      : "0 0 20px #00ff88, 0 0 40px #00ff88"
                  }}
                />
                {/* Beam Particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: beamActive === "mario" ? "#ff6b6b" : "#6bffb8",
                      top: "50%",
                      left: `${20 + i * 20}%`,
                    }}
                    animate={{ 
                      y: ["-4px", "4px", "-4px"],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* === RIGHT: THE WORLD (3D Stage) === */}
        <motion.div
          className="relative flex-1 min-h-[200px] rounded-xl overflow-hidden"
          style={{ backgroundColor: "#0a0a1a" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Perspective Floor Grid */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, transparent 0%, rgba(100, 100, 255, 0.1) 100%)
              `,
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-2/3"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(100, 100, 255, 0.2) 1px, transparent 1px),
                linear-gradient(0deg, rgba(100, 100, 255, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              transform: "perspective(200px) rotateX(60deg)",
              transformOrigin: "bottom center",
            }}
          />

          {/* Section Label */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-purple-900/80 text-purple-300 text-xs font-mono rounded border border-purple-700">
            HEAP.memory
          </div>

          {/* Stage Spotlight */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)"
            }}
          />

          {/* Objects Container */}
          <div className="relative h-full flex items-center justify-center gap-6 p-4">
            {/* Empty State */}
            <AnimatePresence>
              {!showMario && !showLuigi && (
                <motion.div
                  className="text-purple-400/50 font-mono text-sm animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  [ Awaiting instantiation... ]
                </motion.div>
              )}
            </AnimatePresence>

            {/* === MARIO CARD (3D Print Effect) === */}
            <AnimatePresence>
              {showMario && (
                <motion.div
                  className="relative"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: marioMaterializing ? 1 : 0,
                    opacity: marioMaterializing ? 1 : 0,
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.34, 1.56, 0.64, 1] // Overshoot for "pop" effect
                  }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {/* Holographic Scanlines (during materialize) */}
                  {highlightMario && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-0 right-0 h-px bg-red-400/50"
                          style={{ top: `${i * 10}%` }}
                          animate={{ opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 0.2, delay: i * 0.05 }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Card */}
                  <motion.div
                    className={`p-4 rounded-xl min-w-[140px] border-2 transition-all duration-300 ${
                      highlightMario
                        ? "border-red-500 bg-gradient-to-b from-red-950/80 to-gray-900/80"
                        : "border-yellow-500/50 bg-gradient-to-b from-gray-900/80 to-gray-950/80"
                    }`}
                    style={{
                      boxShadow: highlightMario
                        ? "0 0 40px hsl(0 100% 50% / 0.4), 0 10px 30px rgba(0,0,0,0.5)"
                        : "0 0 20px hsl(45 100% 50% / 0.2), 0 10px 30px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Object Label */}
                    <div className="absolute -top-3 left-3 px-2 py-0.5 bg-red-900 text-red-300 text-xs font-mono rounded-full border border-red-700">
                      p1
                    </div>
                    
                    {/* Avatar */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-500/30 rounded-lg border border-red-500/50">
                        <User className="w-6 h-6 text-red-400" />
                      </div>
                      <h5 className="text-lg font-mono font-bold text-red-400"
                        style={{ textShadow: "0 0 10px hsl(0 100% 60% / 0.5)" }}
                      >
                        Mario
                      </h5>
                    </div>
                    
                    {/* Stats */}
                    <div className="p-2 bg-gray-900/50 rounded-lg border border-gray-700/50">
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-gray-500">hp:</span>
                        <motion.span
                          className="text-success font-bold"
                          style={{ textShadow: "0 0 8px hsl(var(--success) / 0.6)" }}
                          animate={{ scale: highlightMario ? [1, 1.3, 1] : 1 }}
                        >
                          100
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Platform Glow */}
                  <div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full blur-md"
                    style={{ background: "radial-gradient(ellipse, hsl(0 100% 50% / 0.4), transparent)" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* === LUIGI CARD (3D Print Effect) === */}
            <AnimatePresence>
              {showLuigi && (
                <motion.div
                  className="relative"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: luigiMaterializing ? 1 : 0,
                    opacity: luigiMaterializing ? 1 : 0,
                    x: luigiDamaged ? [0, -5, 5, -5, 5, 0] : 0,
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.34, 1.56, 0.64, 1],
                    x: { duration: 0.4 }
                  }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {/* Holographic Scanlines */}
                  {highlightLuigi && !luigiDamaged && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-0 right-0 h-px bg-green-400/50"
                          style={{ top: `${i * 10}%` }}
                          animate={{ opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 0.2, delay: i * 0.05 }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Damage Flash */}
                  {luigiDamaged && (
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      initial={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}
                      animate={{ backgroundColor: "rgba(255, 0, 0, 0)" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Card */}
                  <motion.div
                    className={`p-4 rounded-xl min-w-[140px] border-2 transition-all duration-300 ${
                      luigiDamaged
                        ? "border-destructive bg-gradient-to-b from-red-950/80 to-gray-900/80"
                        : highlightLuigi
                        ? "border-green-500 bg-gradient-to-b from-green-950/80 to-gray-900/80"
                        : "border-yellow-500/50 bg-gradient-to-b from-gray-900/80 to-gray-950/80"
                    }`}
                    style={{
                      boxShadow: luigiDamaged
                        ? "0 0 40px hsl(var(--destructive) / 0.5), 0 10px 30px rgba(0,0,0,0.5)"
                        : highlightLuigi
                        ? "0 0 40px hsl(120 100% 40% / 0.4), 0 10px 30px rgba(0,0,0,0.5)"
                        : "0 0 20px hsl(45 100% 50% / 0.2), 0 10px 30px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Object Label */}
                    <div className={`absolute -top-3 left-3 px-2 py-0.5 text-xs font-mono rounded-full border ${
                      luigiDamaged 
                        ? "bg-red-900 text-red-300 border-red-700" 
                        : "bg-green-900 text-green-300 border-green-700"
                    }`}>
                      p2
                    </div>
                    
                    {/* Avatar */}
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className={`p-2 rounded-lg border ${
                          luigiDamaged 
                            ? "bg-red-500/30 border-red-500/50" 
                            : "bg-green-500/30 border-green-500/50"
                        }`}
                        animate={{ 
                          rotate: luigiDamaged ? [0, -10, 10, -10, 0] : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <User className={`w-6 h-6 ${luigiDamaged ? "text-red-400" : "text-green-400"}`} />
                      </motion.div>
                      <h5 className={`text-lg font-mono font-bold ${luigiDamaged ? "text-red-400" : "text-green-400"}`}
                        style={{ textShadow: luigiDamaged ? "0 0 10px hsl(0 100% 60% / 0.5)" : "0 0 10px hsl(120 100% 50% / 0.5)" }}
                      >
                        Luigi
                      </h5>
                    </div>
                    
                    {/* Stats */}
                    <div className={`p-2 rounded-lg border ${
                      luigiDamaged 
                        ? "bg-red-900/30 border-red-700/50" 
                        : "bg-gray-900/50 border-gray-700/50"
                    }`}>
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-gray-500">hp:</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={luigiDamaged ? "90" : "100"}
                            className={`font-bold ${luigiDamaged ? "text-destructive" : "text-success"}`}
                            style={{ 
                              textShadow: luigiDamaged 
                                ? "0 0 12px hsl(var(--destructive) / 0.8)" 
                                : "0 0 8px hsl(var(--success) / 0.6)" 
                            }}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            {luigiDamaged ? "90" : "100"}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Damage Badge */}
                    <AnimatePresence>
                      {luigiDamaged && (
                        <motion.div
                          className="absolute -top-3 -right-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-mono rounded-full font-bold"
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          style={{ boxShadow: "0 0 20px hsl(var(--destructive) / 0.8)" }}
                        >
                          -10 HP!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Platform Glow */}
                  <div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full blur-md"
                    style={{ 
                      background: luigiDamaged 
                        ? "radial-gradient(ellipse, hsl(var(--destructive) / 0.5), transparent)" 
                        : "radial-gradient(ellipse, hsl(120 100% 40% / 0.4), transparent)" 
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Key Insight */}
      <AnimatePresence>
        {currentLine >= 6 && (
          <motion.div
            className="mt-3 p-3 bg-gray-800/50 border border-primary/50 rounded-lg max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm font-mono text-center">
              <span className="text-primary">💡</span>
              <span className="text-gray-400"> Mario's HP = </span>
              <span className="text-success font-bold">100</span>
              <span className="text-gray-400"> (unchanged!)</span>
              <br />
              <span className="text-gray-500 text-xs">Objects are independent memory locations.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClassesVisualizer;