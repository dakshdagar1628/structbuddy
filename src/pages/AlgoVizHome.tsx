import { motion } from "framer-motion";
import { Layers, ArrowRightLeft, Database, Binary, Link, LinkIcon, Type, GitBranch } from "lucide-react";
import ModuleCard from "@/components/algoviz/ModuleCard";
import { ThemeToggle } from "@/components/ThemeToggle";

const modules = [
  {
    title: "Arrays",
    description:
      "Learn how elements are stored in contiguous memory. Master the two-pointer technique with array reversal.",
    icon: Binary,
    path: "/algoviz/arrays",
    principle: "Contiguous - Indexed Access",
    color: "yellow" as const,
    featured: true,
  },
  {
    title: "Trees",
    description:
      "Explore hierarchical structures. Master BST insertion and search using recursive pointer traversal.",
    icon: GitBranch,
    path: "/algoviz/trees",
    principle: "Hierarchical - O(log n) Search",
    color: "green" as const,
    featured: true,
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
      "Learn the LIFO structure. Master push, pop, and peek operations with visual feedback.",
    icon: Layers,
    path: "/algoviz/stack",
    principle: "LIFO - Last In, First Out",
    color: "cyan" as const,
  },
  {
    title: "Queue",
    description:
      "Explore FIFO. Understand enqueue and dequeue with conveyor animations.",
    icon: ArrowRightLeft,
    path: "/algoviz/queue",
    principle: "FIFO - First In, First Out",
    color: "purple" as const,
  },
  {
    title: "Singly Linked List",
    description:
      "Discover how nodes connect. Learn insertion, deletion, and traversal with pointer animations.",
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
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Skip Link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Subtle Warm Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[120px] dark:bg-accent/3" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] dark:bg-primary/3" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/40 backdrop-blur-md">
        <div className="container mx-auto px-6 sm:px-12 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3.5"
          >
            <div className="w-10 h-10 bg-primary/5 flex items-center justify-center rounded-lg shadow-soft-sm">
              <Binary className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-display font-extrabold text-foreground tracking-tight">
                CodeBuddy
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Editorial & Interactive DSA Platform
              </p>
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-secondary text-foreground">
              V1.2 PRODUCTION
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="relative z-10 container mx-auto px-6 sm:px-12 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.div
          className="text-left max-w-3xl mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-mono text-foreground font-bold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Interactive Engine Active
          </span>
          <h2 className="text-5xl sm:text-7xl font-display font-extrabold text-foreground mb-8 tracking-tighter leading-[1.05] text-balance">
            Data structures,
            <br />
            redefined.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl text-pretty mb-10">
            A premium educational workspace to dissect algorithms line-by-line, visualize dynamic pointers, and master data layouts without the noise.
          </p>

          {/* Stats Bar - Elegant Minimalist Row */}
          <div className="flex flex-wrap gap-8 sm:gap-12 mt-4 pt-8 border-t border-border/80">
            {[
              { label: "Interactive Modules", value: String(modules.length) },
              { label: "Execution Engine", value: "Python 3.x" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-2xl font-display font-extrabold text-foreground tracking-tight">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Module Cards Grid */}
        <div className="mb-12">
          <motion.h3
            className="text-lg font-display font-extrabold text-foreground/75 uppercase tracking-wider mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            // Catalog
          </motion.h3>

          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.title}
                {...module}
                delay={0.4 + index * 0.08}
              />
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <motion.div
          className="mt-16 p-8 bg-card/30 border-t border-border rounded-xl text-left max-w-md shadow-soft-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h4 className="text-sm font-mono font-bold text-foreground mb-1 uppercase tracking-wider">
            Up Next
          </h4>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed">
            Graphs, Hash Tables, and Sorting visualizers currently in design phase.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default AlgoVizHome;
