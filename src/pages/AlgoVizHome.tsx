import { motion } from "framer-motion";
import { Layers, ArrowRightLeft, Database, Binary } from "lucide-react";
import ModuleCard from "@/components/algoviz/ModuleCard";
import AiTutorButton from "@/components/algoviz/AiTutorButton";

const modules = [
  {
    title: "Stack",
    description:
      "Learn the Last-In-First-Out (LIFO) data structure. Master push, pop, and peek operations with visual feedback.",
    icon: Layers,
    path: "/algoviz/stack",
    principle: "LIFO - Last In, First Out",
    color: "green" as const,
  },
  {
    title: "Queue",
    description:
      "Explore the First-In-First-Out (FIFO) data structure. Understand enqueue and dequeue with conveyor animations.",
    icon: ArrowRightLeft,
    path: "/algoviz/queue",
    principle: "FIFO - First In, First Out",
    color: "cyan" as const,
  },
];

const AlgoVizHome = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center neon-border">
              <Binary className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground neon-glow">
                AlgoViz Academy
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                Interactive Data Structures Learning
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Master Data Structures
            <br />
            <span className="text-primary neon-glow">Through Visualization</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            Explore, interact, and understand the fundamental building blocks of
            computer science with our immersive learning modules.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "Modules", value: "2", icon: Database },
            { label: "Exercises", value: "10+", icon: Binary },
            { label: "Languages", value: "2", icon: Layers },
            { label: "Concepts", value: "6+", icon: ArrowRightLeft },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="p-4 bg-card border border-border rounded-lg text-center"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Module Cards */}
        <div className="mb-8">
          <motion.h3
            className="text-xl font-display font-semibold text-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-primary">//</span> Choose Your Module
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.title}
                {...module}
                delay={0.6 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <motion.div
          className="p-6 bg-card/50 border border-dashed border-border rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-sm font-mono text-muted-foreground">
            More modules coming soon: Linked Lists, Trees, Graphs, Hash Tables...
          </span>
        </motion.div>
      </main>

      {/* AI Tutor Button */}
      <AiTutorButton />
    </div>
  );
};

export default AlgoVizHome;
