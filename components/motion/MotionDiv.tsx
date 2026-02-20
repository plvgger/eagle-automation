"use client";

import { motion } from "framer-motion";
import { fadeInVariants } from "./FadeIn";

export function MotionDiv({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeInVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function MotionArticle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.article variants={fadeInVariants} className={className}>
      {children}
    </motion.article>
  );
}
