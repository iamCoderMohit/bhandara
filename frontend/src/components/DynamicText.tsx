import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function DynamicText() {
  const lines = [
    "Find bhandaras, share with the bros.",
    "Spot a bhandara? Put the bros on.",
    "Catch bhandaras nearby, let the gang know.",
    "Find it, vibe it, share it with the bros.",
    "Don’t gatekeep bhandaras, tell the squad.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div className="overflow-hidden h-10 flex items-center justify-center font-mono mt-5">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-2xl font-semibold text-center"
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
