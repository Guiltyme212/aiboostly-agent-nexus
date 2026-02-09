import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedListProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export function AnimatedList({ children, delay = 1000, className }: AnimatedListProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= children.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [visibleCount, children.length, delay]);

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <AnimatePresence>
        {children.slice(0, visibleCount).map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
