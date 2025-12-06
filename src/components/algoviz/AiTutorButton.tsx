import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { useState } from "react";

const AiTutorButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    console.log("AI Request Sent");
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-card border border-primary/30 rounded-lg neon-border transition-all duration-300 hover:border-primary/60"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Bot className="w-5 h-5 text-primary" />
      </motion.div>
      <span className="text-sm font-medium text-foreground">Ask AI Tutor</span>
      <motion.div
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Sparkles className="w-4 h-4 text-neon-cyan" />
      </motion.div>
    </motion.button>
  );
};

export default AiTutorButton;
