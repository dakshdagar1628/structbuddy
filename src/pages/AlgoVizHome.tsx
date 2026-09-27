import { motion } from "framer-motion";
import { Layers, ArrowRightLeft, Database, Binary, Link, LinkIcon, Type, GitBranch } from "lucide-react";
import ModuleCard from "@/components/algoviz/ModuleCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { InteractiveBackdrop } from "@/components/InteractiveBackdrop";

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
      "Discover how nodes connect. Learn insertion, traversal, and pointer updates.",
    icon: Link,
    path: "/algoviz/linked-list",
    principle: "Dynamic - Linked nodes",
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
  {
    title: "Trees",
    description:
      "Explore hierarchical structures. Master BST insertion and search using recursive pointer traversal.",
    icon: GitBranch,
    path: "/algoviz/trees",
    principle: "Hierarchical - O(log n) Search",
    color: "green" as const,
  },
];

const AlgoVizHome = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Light spotlight / Dark particle stardust canvas backdrop */}
      <InteractiveBackdrop />

      {/* Skip Link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-card/20 backdrop-blur-md">
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
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="relative z-10 container mx-auto px-6 sm:px-12 py-12 sm:py-16">
        {/* Centered Hero Section */}
        <div className="max-w-4xl mx-auto text-center py-16 sm:py-24 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-5xl sm:text-7xl font-display font-extrabold text-foreground mb-8 tracking-tighter leading-[1.05] text-balance max-w-3xl">
              Data structures,
              <br />
              redefined.
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl text-pretty mb-10">
              A premium educational workspace to dissect algorithms line-by-line, visualize dynamic pointers, and master data layouts without the noise.
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center mb-10">
              <a
                href="#catalog-section"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider shadow-soft-md hover:bg-primary/95 transition-all hover:-translate-y-0.5"
              >
                Start Learning
              </a>
              <a
                href="#catalog-section"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-foreground font-mono text-xs font-bold uppercase tracking-wider shadow-soft-sm hover:bg-secondary/80 border border-border/30 transition-all hover:-translate-y-0.5"
              >
                Explore Modules
              </a>
            </div>

            {/* Stats Section - Grounded container */}
            <div className="w-full max-w-lg mx-auto bg-card/60 backdrop-blur-sm border border-border/60 rounded-xl p-4 sm:p-5 shadow-soft-sm grid grid-cols-2 divide-x divide-border/60">
              {[
                { label: "Interactive Modules", value: String(modules.length) },
                { label: "Step Resolution", value: "Line-by-Line" },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-4">
                  <div className="text-xs text-foreground/70 font-mono uppercase tracking-wider mb-1.5 font-bold">
                    {stat.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Module Catalog Section with Asymmetric Layout Rhythm */}
        <div id="catalog-section" className="mb-12 scroll-mt-24">
          <motion.h3
            className="text-sm font-mono font-semibold text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            // Data Structure Catalog
          </motion.h3>

          {/* Consistent 3-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {modules.map((module, idx) => (
              <ModuleCard
                key={module.path}
                {...module}
                delay={0.35 + idx * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Coming Soon / Up Next Banner */}
        <motion.div
          className="mt-20 py-6 px-8 bg-card/40 border border-border/50 rounded-2xl text-center max-w-xl mx-auto shadow-soft-sm backdrop-blur-sm flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
        >
          <h4 className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold mb-3 tracking-normal">
            Up Next
          </h4>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed text-pretty">
            Graphs, Hash Tables, and Sorting visualizers currently in design phase.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default AlgoVizHome;
