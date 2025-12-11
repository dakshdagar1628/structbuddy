import { motion, AnimatePresence } from "framer-motion";
import { FileCode, User, Zap } from "lucide-react";

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
  const marioBeam = currentLine === 4;
  const luigiBeam = currentLine === 5;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[450px] w-full p-6 border border-gray-700/50 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 gap-4 overflow-x-auto overflow-y-auto">
      <motion.h3
        className="text-xl font-mono text-white"
        style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        The Blueprint Factory
      </motion.h3>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 w-full">
        {/* LEFT SIDE: The Blueprint (Class Definition) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">The Class (Definition)</span>
          
          <motion.div
            className={`relative p-6 rounded-xl transition-all duration-500 min-w-[200px] ${
              highlightBlueprint
                ? "shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                : ""
            }`}
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
              border: highlightBlueprint 
                ? '2px solid rgba(59, 130, 246, 0.8)' 
                : '2px solid rgba(59, 130, 246, 0.3)',
              // Grid pattern overlay
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)
              `,
              backgroundSize: '20px 20px, 20px 20px, 100% 100%',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: showBlueprint ? 1 : 0.3, 
              scale: 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Blueprint Label */}
            <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-mono font-bold rounded-full shadow-lg">
              BLUEPRINT
            </div>
            
            {/* Blueprint Content */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <FileCode className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-mono font-bold text-blue-300" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>
                  class Hero:
                </h4>
                <div className="text-sm font-mono text-gray-400 mt-2 space-y-1 pl-4 border-l-2 border-blue-500/30">
                  <div>name: <span className="text-blue-200">str</span></div>
                  <div>hp: <span className="text-blue-200">100</span></div>
                </div>
              </div>
            </div>

            {/* Technical Blueprint Pattern */}
            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-500/40">
              REV.01
            </div>
          </motion.div>
        </div>

        {/* CENTER: The Factory Beam */}
        <div className="flex flex-col items-center justify-center h-full py-8 lg:py-0">
          <AnimatePresence>
            {(marioBeam || luigiBeam) && (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Lightning bolt beam */}
                <motion.div
                  className="relative"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-12 h-12 text-yellow-400" />
                  <motion.div
                    className="absolute inset-0 bg-yellow-400/50 blur-lg rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 0.5, repeat: 3 }}
                  />
                </motion.div>
                
                {/* Beam particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-yellow-400 rounded-full absolute"
                    initial={{ 
                      x: 0, 
                      y: 0,
                      opacity: 1 
                    }}
                    animate={{ 
                      x: [0, 30, 60],
                      y: [0, -10, 0],
                      opacity: [1, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 0.6,
                      delay: i * 0.1,
                      repeat: 2
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Arrow when not beaming */}
          {!marioBeam && !luigiBeam && (showMario || showLuigi) && (
            <motion.div
              className="flex items-center gap-2 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-8 h-0.5 bg-gray-600" />
              <span className="text-xs font-mono">creates</span>
              <div className="w-8 h-0.5 bg-gray-600" />
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-gray-600" />
            </motion.div>
          )}
        </div>

        {/* RIGHT SIDE: The Heap (Memory - Where Objects Live) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">The Heap (Memory)</span>
          
          <motion.div
            className="relative p-6 rounded-xl min-w-[280px] min-h-[200px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
              border: '2px solid rgba(107, 114, 128, 0.3)',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
            }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            {/* Stage Label */}
            <div className="absolute -top-3 left-4 px-3 py-1 bg-gray-700 text-gray-300 text-xs font-mono font-bold rounded-full">
              OBJECTS
            </div>

            {/* Empty State */}
            {!showMario && !showLuigi && (
              <motion.span
                className="text-gray-600 font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
              >
                Empty...
              </motion.span>
            )}

            {/* Objects Container */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Mario Card */}
              <AnimatePresence>
                {showMario && (
                  <motion.div
                    className={`relative p-4 rounded-xl min-w-[120px] transition-all duration-300 border border-gray-700/50 bg-gray-900/50 ${
                      highlightMario
                        ? "shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                        : ""
                    }`}
                    style={{
                      background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.1) 0%, rgba(30, 30, 30, 0.9) 100%)',
                      border: highlightMario
                        ? '2px solid rgba(239, 68, 68, 0.8)'
                        : '2px solid rgba(239, 68, 68, 0.3)',
                    }}
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: -100,
                      rotate: -10
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: 0,
                      rotate: 0,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      delay: 0.2
                    }}
                  >
                    {/* Object Label */}
                    <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-mono font-bold rounded shadow-lg">
                      p1
                    </div>
                    
                    {/* Character Icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-red-500/30 rounded-lg border border-red-400/30">
                        <User className="w-5 h-5 text-red-400" />
                      </div>
                      <span className="font-mono font-bold text-red-300">Mario</span>
                    </div>
                    
                    {/* HP Bar */}
                    <div className="p-2 bg-gray-900/80 rounded-lg border border-gray-700/50">
                      <div className="flex items-center justify-between text-sm font-mono mb-1">
                        <span className="text-gray-500">HP</span>
                        <span className="text-green-400 font-bold">100</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-green-400"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Luigi Card */}
              <AnimatePresence>
                {showLuigi && (
                  <motion.div
                    className={`relative p-4 rounded-xl min-w-[120px] transition-all duration-300 border border-gray-700/50 bg-gray-900/50`}
                    style={{
                      background: luigiDamaged
                        ? 'linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, rgba(30, 30, 30, 0.9) 100%)'
                        : 'linear-gradient(180deg, rgba(34, 197, 94, 0.1) 0%, rgba(30, 30, 30, 0.9) 100%)',
                      border: highlightLuigi
                        ? luigiDamaged
                          ? '2px solid rgba(239, 68, 68, 0.8)'
                          : '2px solid rgba(34, 197, 94, 0.8)'
                        : '2px solid rgba(34, 197, 94, 0.3)',
                      boxShadow: highlightLuigi
                        ? luigiDamaged
                          ? '0 0 25px rgba(239, 68, 68, 0.5)'
                          : '0 0 25px rgba(34, 197, 94, 0.5)'
                        : 'none',
                    }}
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: -100,
                      rotate: 10
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: luigiDamaged ? [0, -5, 5, -5, 5, 0] : 0,
                      rotate: 0,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      delay: 0.2,
                      x: { duration: 0.4 }
                    }}
                  >
                    {/* Object Label */}
                    <div className={`absolute -top-2 -left-2 px-2 py-0.5 text-white text-[10px] font-mono font-bold rounded shadow-lg ${
                      luigiDamaged ? "bg-red-500" : "bg-green-500"
                    }`}>
                      p2
                    </div>
                    
                    {/* Damage Badge */}
                    <AnimatePresence>
                      {luigiDamaged && (
                        <motion.div
                          className="absolute -top-3 -right-3 px-2 py-1 bg-red-600 text-white text-xs font-mono font-bold rounded-full shadow-lg"
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          -10!
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Character Icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-green-500/30 rounded-lg border border-green-400/30">
                        <User className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="font-mono font-bold text-green-300">Luigi</span>
                    </div>
                    
                    {/* HP Bar */}
                    <div className="p-2 bg-gray-900/80 rounded-lg border border-gray-700/50">
                      <div className="flex items-center justify-between text-sm font-mono mb-1">
                        <span className="text-gray-500">HP</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={luigiDamaged ? "90" : "100"}
                            className={`font-bold ${luigiDamaged ? "text-red-400" : "text-green-400"}`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            {luigiDamaged ? "90" : "100"}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${luigiDamaged ? "bg-gradient-to-r from-red-500 to-orange-400" : "bg-gradient-to-r from-green-500 to-green-400"}`}
                          initial={{ width: 0 }}
                          animate={{ width: luigiDamaged ? '90%' : '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Insight */}
      <AnimatePresence>
        {currentLine >= 6 && (
          <motion.div
            className="p-4 bg-gray-800/50 border border-blue-500/50 rounded-lg max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm font-mono text-center">
              <span className="text-blue-400">💡 Key Insight:</span>
              <span className="text-gray-300"> Mario's HP is still </span>
              <span className="text-green-400 font-bold">100</span>
              <span className="text-gray-300">!</span>
              <br />
              <span className="text-gray-500 text-xs">
                The Blueprint never changed. Each object has its own independent copy of data.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClassesVisualizer;