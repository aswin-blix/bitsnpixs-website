"use client";

import { motion } from "framer-motion";
import { riseWord, staggerContainer } from "@/lib/motion";

interface SplitTextProps {
  text: string;
  delay?: number;
}

/**
 * Staggered word-by-word reveal for headlines. Screen readers get the sentence
 * once (visually hidden); the animated words are hidden from them.
 */
export function SplitText({ text, delay = 0 }: SplitTextProps) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden="true" variants={staggerContainer(0.06, delay)} initial="hidden" animate="visible">
        {text.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span className="inline-block" variants={riseWord}>
              {word}
              {" "}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </>
  );
}
