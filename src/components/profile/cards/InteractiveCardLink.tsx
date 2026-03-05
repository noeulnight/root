import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { cardHoverTransition, cardItemVariants } from "./motion";

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

type NoInteractiveProps = InteractiveCardLinkBaseProps & {
  mode: "none";
};

export type InteractiveCardLinkProps =
  | InternalCardLinkProps
  | ExternalCardLinkProps
  | NoInteractiveProps;

export function InteractiveCardLink(props: InteractiveCardLinkProps) {
  const order = props.order ?? 0;

  if (props.mode === "external") {
    return (
      <motion.a
        href={props.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={props.ariaLabel}
        className={props.className}
        initial="hidden"
        animate="show"
        variants={cardItemVariants}
        custom={order}
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
        initial="hidden"
        animate="show"
        variants={cardItemVariants}
        custom={order}
        whileHover={{ y: -2, transition: cardHoverTransition }}
      >
        {props.children}
      </motion.div>
    </Link>
  );
}
