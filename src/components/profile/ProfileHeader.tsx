import { motion, type Variants } from "motion/react";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const socialLinks = [
  { label: "Email", href: "mailto:contact@lth.so" },
  { label: "Instagram", href: "https://instagram.com/1imtaehyun" },
];

export function ProfileHeader() {
  return (
    <motion.header
      className="mb-5 border-b border-border pb-5"
      variants={headerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.p
        className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        variants={lineVariants}
      >
        Limtaehyun
      </motion.p>
      <motion.p
        className="mt-2 text-base font-medium tracking-wide text-foreground/80"
        variants={lineVariants}
      >
        DevOps Engineer | Backend Developer
      </motion.p>
      <motion.p
        className="mt-1 text-sm text-muted-foreground"
        variants={lineVariants}
      >
        Based in Gwanak-gu, Seoul
      </motion.p>
      <motion.div className="mt-3 flex flex-wrap gap-2" variants={lineVariants}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </motion.header>
  );
}
