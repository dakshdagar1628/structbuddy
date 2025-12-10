import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Box, List, Repeat, Blocks } from "lucide-react";
import { Link } from "react-router-dom";
import CodeLab from "@/components/algoviz/CodeLab";
import VariablesVisualizer from "@/components/algoviz/VariablesVisualizer";
import ListsVisualizer from "@/components/algoviz/ListsVisualizer";
import LoopsVisualizer from "@/components/algoviz/LoopsVisualizer";
import ClassesVisualizer from "@/components/algoviz/ClassesVisualizer";

const tabs = [
  { id: "variables", label: "1. The Magic Box (Variables)", icon: Box, shortLabel: "Variables" },
  { id: "lists", label: "2. The Shelf (Lists)", icon: List, shortLabel: "Lists" },
  { id: "loops", label: "3. The Robot Arm (Loops)", icon: Repeat, shortLabel: "Loops" },
  { id: "classes", label: "4. The Blueprint (Classes)", icon: Blocks, shortLabel: "Classes" },
];

const variablesCode = [
  { code: "score = 10", explanation: "We create a box named 'score' and put the number 10 inside." },
  { code: "score = score + 5", explanation: "We take the current value (10), add 5, and update the box to 15." },
  { code: 'name = "Player 1"', explanation: "We create a new box named 'name' and store text inside it." },
  { code: "print(name, score)", explanation: "We look inside both boxes and show their contents." },
];

const listsCode = [
  { code: "inventory = []", explanation: "We create an empty list called 'inventory'. It's like an empty shelf." },
  { code: 'inventory.append("Sword")', explanation: "We add 'Sword' to the first slot. Python starts counting at Index 0." },
  { code: 'inventory.append("Shield")', explanation: "We add 'Shield' to the next slot (Index 1)." },
  { code: "first_item = inventory[0]", explanation: "We peek at Index 0 to see what's there. It's the Sword." },
  { code: 'inventory[1] = "Broken Shield"', explanation: "We can replace the item at Index 1 with something else." },
];

const loopsCode = [
  { code: "prices = [10, 5, 8]", explanation: "We have a list of prices on the shelf. Three items: 10, 5, and 8." },
  { code: "total = 0", explanation: "We start with a total of zero. This box will hold our running sum." },
  { code: "for price in prices:", explanation: "The Robot Arm picks up each item, one by one. It starts with the first price (10)." },
  { code: "    total = total + price", explanation: "We add the current price to our total. The Robot Arm 'drops' it into the total box." },
  { code: "print(total)", explanation: "The loop is finished! We've gone through all items. Now we show the final sum: 23." },
];

const classesCode = [
  { code: "class Hero:", explanation: "We define a 'Blueprint' called Hero. This is like a template for creating game characters." },
  { code: "    def __init__(self, name):", explanation: "The setup function runs automatically when we create a new hero. It takes the hero's name as input." },
  { code: "        self.name = name", explanation: "We save the name on this specific hero's card. 'self' means 'this particular hero'." },
  { code: "        self.hp = 100", explanation: "Every hero starts with 100 Health Points. This is the default value from the blueprint." },
  { code: 'p1 = Hero("Mario")', explanation: "We use the blueprint to create the first object: Mario! He gets his own card with name='Mario' and hp=100." },
  { code: 'p2 = Hero("Luigi")', explanation: "We create a second, separate object: Luigi! He also gets his own independent card." },
  { code: "p2.hp = 90", explanation: "We change ONLY Luigi's HP to 90. Notice that Mario's HP stays at 100 - they are separate objects!" },
];

const PythonPrimer = () => {
  const [activeTab, setActiveTab] = useState("variables");
  const [variablesLine, setVariablesLine] = useState(0);
  const [listsLine, setListsLine] = useState(0);
  const [loopsLine, setLoopsLine] = useState(0);
  const [classesLine, setClassesLine] = useState(0);

  const getCodeForTab = () => {
    switch (activeTab) {
      case "variables": return variablesCode;
      case "lists": return listsCode;
      case "loops": return loopsCode;
      case "classes": return classesCode;
      default: return variablesCode;
    }
  };

  const getLineForTab = () => {
    switch (activeTab) {
      case "variables": return variablesLine;
      case "lists": return listsLine;
      case "loops": return loopsLine;
      case "classes": return classesLine;
      default: return 0;
    }
  };

  const getSetLineForTab = () => {
    switch (activeTab) {
      case "variables": return setVariablesLine;
      case "lists": return setListsLine;
      case "loops": return setLoopsLine;
      case "classes": return setClassesLine;
      default: return setVariablesLine;
    }
  };

  const currentCode = getCodeForTab();
  const currentLine = getLineForTab();
  const setCurrentLine = getSetLineForTab();

  return (
    <div className="min-h-screen bg-background grid-pattern flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/algoviz"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-mono">Back</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  Python Primer
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Foundation: Variables, Lists, Loops & Classes
                </p>
              </div>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-thin">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono transition-all whitespace-nowrap shrink-0 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden">{tab.shortLabel}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Visual Panel */}
            <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden min-h-[300px] lg:min-h-0">
              {activeTab === "variables" && <VariablesVisualizer currentLine={variablesLine} />}
              {activeTab === "lists" && <ListsVisualizer currentLine={listsLine} />}
              {activeTab === "loops" && <LoopsVisualizer currentLine={loopsLine} />}
              {activeTab === "classes" && <ClassesVisualizer currentLine={classesLine} />}
            </div>

            {/* Code Panel */}
            <div className="flex-1 min-h-[400px] lg:min-h-0">
              <CodeLabWithSync
                pythonCode={currentCode}
                currentLine={currentLine}
                setCurrentLine={setCurrentLine}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Wrapper component to sync line state with visualizer
interface CodeLabWithSyncProps {
  pythonCode: { code: string; explanation: string }[];
  currentLine: number;
  setCurrentLine: (line: number) => void;
}

const CodeLabWithSync = ({ pythonCode, currentLine, setCurrentLine }: CodeLabWithSyncProps) => {
  const maxLine = pythonCode.length - 1;

  const handlePrevLine = () => {
    setCurrentLine(Math.max(0, currentLine - 1));
  };

  const handleNextLine = () => {
    setCurrentLine(Math.min(maxLine, currentLine + 1));
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 overflow-hidden">
      {/* Code Panel */}
      <motion.div
        className="flex-1 bg-card border border-border rounded-lg flex flex-col min-h-0 overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-foreground">Python Code</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto min-h-0 p-4">
          <pre className="font-mono text-sm">
            {pythonCode.map((line, index) => (
              <motion.div
                key={index}
                className={`px-4 py-1 rounded transition-all duration-300 ${
                  index === currentLine
                    ? "code-line-highlight bg-primary/20"
                    : ""
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="inline-block w-8 text-muted-foreground text-right mr-4 select-none">
                  {index + 1}
                </span>
                <span
                  className={
                    index === currentLine ? "text-primary" : "text-foreground"
                  }
                >
                  {line.code}
                </span>
              </motion.div>
            ))}
          </pre>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-border bg-card/80 flex items-center justify-between shrink-0">
          <motion.button
            onClick={handlePrevLine}
            disabled={currentLine === 0}
            className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors"
            whileHover={{ scale: currentLine === 0 ? 1 : 1.02 }}
            whileTap={{ scale: currentLine === 0 ? 1 : 0.98 }}
          >
            Prev Line
          </motion.button>

          <span className="text-xs text-muted-foreground font-mono">
            Line {currentLine + 1} of {pythonCode.length}
          </span>

          <motion.button
            onClick={handleNextLine}
            disabled={currentLine === maxLine}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            whileHover={{ scale: currentLine === maxLine ? 1 : 1.02 }}
            whileTap={{ scale: currentLine === maxLine ? 1 : 0.98 }}
          >
            Next Line
          </motion.button>
        </div>
      </motion.div>

      {/* Explanation Panel */}
      <motion.div
        className="w-full lg:w-80 bg-card border border-border rounded-lg flex flex-col shrink-0 lg:shrink lg:min-h-0 max-h-[250px] lg:max-h-none overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 border-b border-border bg-card/80 shrink-0">
          <span className="font-mono text-sm text-foreground">
            Line Explanation
          </span>
        </div>

        <div className="p-6 overflow-auto flex-1 min-h-0">
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <span className="text-xs text-muted-foreground font-mono">
                Current Line
              </span>
              <div className="mt-2 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <code className="text-sm text-primary font-mono">
                  {pythonCode[currentLine]?.code}
                </code>
              </div>
            </div>

            <div>
              <span className="text-xs text-muted-foreground font-mono">
                Explanation
              </span>
              <p className="mt-2 text-sm text-foreground leading-relaxed">
                {pythonCode[currentLine]?.explanation}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PythonPrimer;
