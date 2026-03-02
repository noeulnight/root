import type { Transition, Variants } from "motion/react";

export const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (order: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.12 + order * 0.09,
    },
  }),
};

export const cardHoverTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 30,
};
