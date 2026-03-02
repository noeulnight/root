import type { TargetAndTransition, Transition } from "motion/react";

export const cardEntryInitial: TargetAndTransition = {
  opacity: 0,
  y: 18,
};

export const cardEntryAnimate: TargetAndTransition = {
  opacity: 1,
  y: 0,
};

export function getCardEntryTransition(order: number): Transition {
  return {
    duration: 0.42,
    ease: [0.22, 1, 0.36, 1],
    delay: 0.12 + order * 0.09,
  };
}

export const cardHoverTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 30,
};
