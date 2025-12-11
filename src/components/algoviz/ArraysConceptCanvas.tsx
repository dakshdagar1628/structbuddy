import { motion } from "framer-motion";
import { Box, Pointer, Zap, Edit3, Database } from "lucide-react";

const conceptSteps = [
  {
    icon: Database,
    title: "Declare Array",
    description: "Reserve a block of memory seats.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    icon: Box,
    title: "Index 0",
    description: "The first seat.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: Box,
    title: "Index N",
    description: "The last seat.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    icon: Zap,
    title: "Access",
    description: "Jump directly to any seat (O(1) Speed).",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    icon: Edit3,
    title: "Update",
    description: "Overwrite the value in a seat.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
  },
];

const ArraysConceptCanvas = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Random Access Memory
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          Arrays store elements in contiguous memory locations
        </p>
      </motion.div>

      {/* Visual Array Representation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-1 mb-8"
      >
        {[42, 17, 83, 5, 91].map((val, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-14 h-14 border-2 border-orange-500/50 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <span className="text-orange-300 font-mono font-bold">{val}</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono mt-1">[{idx}]</span>
          </div>
        ))}
      </motion.div>

      {/* Concept Flow Steps */}
      <div className="flex flex-col gap-4 max-w-md">
        {conceptSteps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="flex items-center gap-4"
          >
            {/* Step Number & Line */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full ${step.bgColor} border border-gray-700/50 flex items-center justify-center`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
              </div>
              {idx < conceptSteps.length - 1 && (
                <div className="w-0.5 h-6 bg-gray-700/50" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 p-4 border border-gray-700/50 bg-gray-900/50 rounded-xl backdrop-blur-sm">
              <h3 className={`font-display font-bold ${step.color} mb-1`}>
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-mono">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 p-4 border border-orange-500/30 bg-orange-500/10 rounded-xl max-w-md"
      >
        <div className="flex items-center gap-2 mb-2">
          <Pointer className="w-4 h-4 text-orange-400" />
          <span className="font-display font-bold text-orange-300">Key Insight</span>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          Because elements are stored side-by-side, accessing arr[i] is instant — 
          just calculate the memory address!
        </p>
      </motion.div>
    </div>
  );
};

export default ArraysConceptCanvas;
