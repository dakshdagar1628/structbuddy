import { motion } from "framer-motion";
import { Layers, ArrowRightLeft, Database, Binary, Link, LinkIcon, Type } from "lucide-react";
import ModuleCard from "@/components/algoviz/ModuleCard";

const modules = [
  {
    title: "Arrays",
    description:
      "Learn how elements are stored in contiguous memory. Master the two-pointer technique with array reversal.",
    icon: Binary,
    path: "/algoviz/arrays",
    principle: "Contiguous - Indexed Access",
    color: "yellow" as const,
  },
  {
    title: "Strings",
    description:
      "Explore character sequences as immutable chains. Check palindromes using the two-pointer approach.",
    icon: Type,
    path: "/algoviz/strings",
    principle: "Immutable - Character Sequences",
    color: "green" as const,
  },
  {
    title: "Stack",
    description:
      "Learn the Last-In-First-Out (LIFO) data structure. Master push, pop, and peek operations with visual feedback.",
    icon: Layers,
    path: "/algoviz/stack",
    principle: "LIFO - Last In, First Out",
    color: "cyan" as const,
  },
  {
    title: "Queue",
    description:
      "Explore the First-In-First-Out (FIFO) data structure. Understand enqueue and dequeue with conveyor animations.",
    icon: ArrowRightLeft,
    path: "/algoviz/queue",
    principle: "FIFO - First In, First Out",
    color: "purple" as const,
  },
  {
    title: "Singly Linked List",
    description:
      "Discover how nodes connect in a chain. Learn insertion, deletion, and traversal with pointer animations.",
    icon: Link,
    path: "/algoviz/linked-list",
    principle: "Dynamic - Nodes linked by pointers",
    color: "pink" as const,
  },
  {
    title: "Doubly Linked List",
    description:
      "A two-way street! Each node knows its neighbors. Navigate forward and backward through the list.",
    icon: LinkIcon,
    path: "/algoviz/doubly-linked-list",
    principle: "Bidirectional - Next & Prev pointers",
    color: "orange" as const,
  },
];

const AlgoVizHome = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/80 bg-card/90 backdrop-blur-md">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shadow-sm">
              <Binary className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-foreground tracking-tight">
                CodeBuddy
              </h1>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Editorial & Interactive DSA Platform
              </p>
            </div>
          </motion.div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              Units Theme Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Architecture // Algorithms // Mastery
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-foreground mb-6 tracking-tight leading-none">
            Data Structures,
            <br />
            <span className="text-primary">Redefined & Visualized.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono leading-relaxed">
            Explore, interact, and understand computer science fundamentals with sleek architectural modules and real-time visual feedback.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-6 mb-16 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "Interactive Modules", value: String(modules.length), icon: Database },
            { label: "Execution Engine", value: "Python 3.x", icon: Layers },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-card/80 border border-border rounded-2xl text-center min-w-[180px] shadow-sm hover:border-primary/40 transition-all duration-300"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="text-3xl font-display font-extrabold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            More modules coming soon: Trees, Graphs, Hash Tables...
          </span>
        </motion.div>
      </main>
    </div>
  );
};

export default AlgoVizHome;
