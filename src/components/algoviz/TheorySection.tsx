import { motion } from "framer-motion";
import { LucideIcon, Lightbulb } from "lucide-react";

interface RealWorldExample {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TheorySectionProps {
  theory: string;
  metaphorTitle: string;
  metaphor: string;
  examples: RealWorldExample[];
}

const TheorySection = ({ theory, metaphorTitle, metaphor, examples }: TheorySectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 space-y-4"
    >
      {/* Theory Card */}
      <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl backdrop-blur-sm">
        <p className="text-sm text-muted-foreground font-mono leading-relaxed">
          <span className="text-primary font-bold">Theory:</span> {theory}
        </p>
      </div>

      {/* Metaphor Card */}
      <div className="p-4 bg-gray-900/50 border border-amber-500/30 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="font-display font-bold text-amber-300">The Metaphor</span>
        </div>
        <p className="text-sm text-muted-foreground font-mono leading-relaxed">
          <span className="text-amber-400 font-semibold">{metaphorTitle}:</span> {metaphor}
        </p>
      </div>

      {/* Real-World Examples Card */}
      <div className="p-4 bg-gray-900/50 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-display font-bold text-emerald-300">Real-World Examples</span>
        </div>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <example.icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-sm font-mono text-emerald-300 font-semibold">{example.title}:</span>
                <span className="text-sm text-muted-foreground font-mono ml-1">{example.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TheorySection;
