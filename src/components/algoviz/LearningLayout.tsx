import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { ArrowLeft, Eye, Code, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/algoviz">
                <motion.button
                  className="p-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  {title}
                </h1>
                <span className="text-xs font-mono text-primary">
                  {principle}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground neon-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-[calc(100vh-140px)]"
          >
            {getTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LearningLayout;
