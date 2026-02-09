import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface AnimatedListProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export function AnimatedList({ children, delay = 1000, className }: AnimatedListProps) {
  const [index, setIndex] = useState(0);
  const childrenArray = useMemo(() => children, [children]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % childrenArray.length);
    }, delay);
    return () => clearInterval(interval);
  }, [childrenArray.length, delay]);

  const itemsToShow = useMemo(() => {
    const result = [];
    for (let i = 0; i <= index; i++) {
      result.push(childrenArray[i % childrenArray.length]);
    }
    return result.slice(-5).reverse();
  }, [index, childrenArray]);

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <AnimatePresence initial={false}>
        {itemsToShow.map((item, i) => (
          <motion.div
            key={`${index}-${i}`}
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            layout
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
