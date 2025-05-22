import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface HorizontalAnimationWrapperProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
}

const HorizontalAnimationWrapper = ({ children, direction = "left", delay = 0 }: HorizontalAnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px]"
    >
      {children}
    </motion.div>
  );
};

export default HorizontalAnimationWrapper;