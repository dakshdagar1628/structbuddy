import { motion } from "framer-motion";
import { Type, Hash, Lock, ArrowLeftRight, Lightbulb } from "lucide-react";

const conceptSteps = [
  {
    icon: Type,
    title: "Create String",
    description: "Store text as a chain of characters.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
  },
  {
    icon: Hash,
    title: "Zero-Indexed",
    description: "Just like arrays, we count from 0.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: Lock,
    title: "Immutable",
    description: "WARNING: You cannot change a single letter. You must create a new string.",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    isWarning: true,
  },
  {
    icon: ArrowLeftRight,
    title: "Two Pointers",
    description: "We can read from the front and back simultaneously.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
];

const StringsConceptCanvas = () => {
  const exampleString = "HELLO";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Immutability & Pointers
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          Strings are character arrays with special rules
        </p>
      </motion.div>

      {/* Visual String Representation with Two Pointers */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex gap-1 mb-8"
      >
        {/* Left Pointer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-8 left-0 flex flex-col items-center"
        >
          <span className="text-xs text-purple-400 font-mono">left</span>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-400" />
        </motion.div>

        {/* Right Pointer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute -top-8 right-0 flex flex-col items-center"
        >
          <span className="text-xs text-purple-400 font-mono">right</span>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-400" />
        </motion.div>

        {exampleString.split("").map((char, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-emerald-500/50 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <span className="text-emerald-300 font-mono font-bold text-lg">{char}</span>
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
              <div className={`w-10 h-10 rounded-full ${step.bgColor} border ${step.isWarning ? 'border-red-500/50' : 'border-gray-700/50'} flex items-center justify-center`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
              </div>
              {idx < conceptSteps.length - 1 && (
                <div className="w-0.5 h-6 bg-gray-700/50" />
              )}
            </div>
            
            {/* Content */}
            <div className={`flex-1 p-4 border rounded-xl backdrop-blur-sm ${step.isWarning ? 'border-red-500/30 bg-red-500/10' : 'border-gray-700/50 bg-gray-900/50'}`}>
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
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl max-w-md"
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-emerald-400" />
          <span className="font-display font-bold text-emerald-300">Key Insight</span>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          The two-pointer technique lets us compare characters from both ends, 
          perfect for palindrome checks and other symmetric operations!
        </p>
      </motion.div>
    </div>
  );
};

export default StringsConceptCanvas;
