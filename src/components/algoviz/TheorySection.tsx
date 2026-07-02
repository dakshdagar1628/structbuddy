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
      className="mt-6 space-y-4"
    >
      {/* Theory Card */}
      <div className="p-5 bg-card border-2 border-[#0061ff]/30 rounded-2xl shadow-sm">
        <p className="text-sm text-foreground font-mono leading-relaxed">
          <span className="text-[#0061ff] font-bold font-display uppercase tracking-wider mr-2">Theory:</span>
          {theory}
        </p>
      </div>

      {/* Metaphor Card */}
      <div className="p-5 bg-card border-2 border-[#ffb200]/40 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-[#ff6100]" />
          <span className="font-display font-bold text-foreground text-base">The Metaphor</span>
        </div>
        <p className="text-sm text-muted-foreground font-mono leading-relaxed">
          <span className="text-[#ff6100] font-bold">{metaphorTitle}:</span> <span className="text-foreground">{metaphor}</span>
        </p>
      </div>

      {/* Real-World Examples Card */}
      <div className="p-5 bg-card border-2 border-[#1be349]/40 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-display font-bold text-foreground text-base">Real-World Examples</span>
        </div>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-[#1be349]/10 rounded-xl border border-[#1be349]/20">
              <div className="p-2 bg-card rounded-lg shadow-xs shrink-0">
                <example.icon className="w-4 h-4 text-[#04aa3d]" />
              </div>
              <div>
                <span className="text-sm font-mono text-[#04aa3d] font-bold">{example.title}:</span>
                <span className="text-sm text-foreground font-mono ml-1.5">{example.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TheorySection;

