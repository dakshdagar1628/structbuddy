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
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-8 space-y-6 max-w-4xl"
    >
      {/* Theory Card */}
      <div className="p-6 bg-card rounded-xl shadow-soft-sm border-l-4 border-l-primary">
        <p className="text-sm text-foreground/80 font-sans leading-relaxed m-0 font-medium">
          <span className="text-foreground font-mono font-bold uppercase tracking-wider mr-2 text-[11px]">// Theory:</span>
          {theory}
        </p>
      </div>

      {/* Metaphor Card */}
      <div className="p-6 bg-card rounded-xl shadow-soft-sm">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-accent" />
          <span className="font-display font-extrabold text-foreground text-sm uppercase tracking-wider">The Metaphor</span>
        </div>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed m-0 font-medium">
          <span className="text-foreground font-mono font-bold block sm:inline text-xs mr-2">{metaphorTitle}:</span> 
          <span className="text-foreground/80">{metaphor}</span>
        </p>
      </div>

      {/* Real-World Examples Card */}
      <div className="p-6 bg-card rounded-xl shadow-soft-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-display font-extrabold text-foreground text-sm uppercase tracking-wider">Real-World Examples</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {examples.map((example, index) => (
            <div key={index} className="flex items-start gap-4 p-4.5 bg-secondary/35 border border-border/30 rounded-xl">
              <div className="w-10 h-10 bg-card border border-border/40 dark:border-white/5 flex items-center justify-center rounded-lg shadow-soft-sm shrink-0">
                <example.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-xs font-mono text-foreground font-bold block mb-1">{example.title}</span>
                <span className="text-xs text-muted-foreground font-sans leading-relaxed font-medium">{example.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TheorySection;
