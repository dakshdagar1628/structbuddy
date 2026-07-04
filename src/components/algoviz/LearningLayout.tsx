import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { ArrowLeft, Eye, Code, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LearningLayoutProps {
  title: string;
  principle: string;
  visualTab: ReactNode;
  codeTab: ReactNode;
  gameTab: ReactNode;
}

const tabs = [
  { id: "visual", label: "Visual Concept", icon: Eye },
  { id: "code", label: "Code Lab", icon: Code },
  { id: "game", label: "Game Arena", icon: Gamepad2 },
];

const LearningLayout = ({
  title,
  principle,
  visualTab,
  codeTab,
  gameTab,
}: LearningLayoutProps) => {
  const [activeTab, setActiveTab] = useState("visual");

  const getTabContent = () => {
    switch (activeTab) {
      case "visual":
        return visualTab;
      case "code":
        return codeTab;
      case "game":
        return gameTab;
      default:
        return visualTab;
    }
  };

  return (
    <div className="min-h-screen bg-background relative transition-colors duration-300">
      {/* Premium borderless header with soft shadow */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-soft-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left elements */}
            <div className="flex items-center gap-4">
              <Link to="/algoviz" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg">
                <motion.button
                  className="p-2.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors shadow-soft-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-xl font-display font-extrabold text-foreground tracking-tight">
                  {title}
                </h1>
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest block mt-0.5">
                  {principle}
                </span>
              </div>
            </div>

            {/* Pill tab navigation (depth segmentation like Apple iOS) */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1 bg-secondary p-1 rounded-lg w-full sm:w-auto overflow-x-auto shadow-inner">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2 rounded-md font-mono text-xs font-bold transition-[background-color,color,box-shadow] duration-200 ${
                        isActive
                          ? "bg-card text-foreground shadow-soft-sm font-extrabold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ scale: isActive ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <tab.icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[calc(100vh-140px)] pb-12"
          >
            {getTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LearningLayout;
