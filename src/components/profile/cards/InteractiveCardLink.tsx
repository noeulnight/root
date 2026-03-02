import { useEffect, type ReactNode } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Link } from "react-router-dom";
import {
  cardEntryAnimate,
  cardEntryInitial,
  cardHoverTransition,
  getCardEntryTransition,
} from "./motion";

type InteractiveCardLinkBaseProps = {
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  order?: number;
};

type InternalCardLinkProps = InteractiveCardLinkBaseProps & {
  mode: "internal";
  to: string;
};

type ExternalCardLinkProps = InteractiveCardLinkBaseProps & {
  mode: "external";
  href: string;
};

export type InteractiveCardLinkProps =
  | InternalCardLinkProps
  | ExternalCardLinkProps;

export function InteractiveCardLink(props: InteractiveCardLinkProps) {
  const order = props.order ?? 0;
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set(cardEntryInitial);

    const rafId = requestAnimationFrame(() => {
      void controls.start({
        ...cardEntryAnimate,
        transition: getCardEntryTransition(order),
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      controls.stop();
    };
  }, [controls, order]);

  if (props.mode === "external") {
    return (
      <motion.a
        href={props.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={props.ariaLabel}
        className={props.className}
        initial={false}
        animate={controls}
        whileHover={{ y: -2, transition: cardHoverTransition }}
      >
        {props.children}
      </motion.a>
    );
  }

  return (
    <Link to={props.to} aria-label={props.ariaLabel} className={props.className}>
      <motion.div
        className="h-full"
        initial={false}
        animate={controls}
        whileHover={{ y: -2, transition: cardHoverTransition }}
      >
        {props.children}
      </motion.div>
    </Link>
  );
}
