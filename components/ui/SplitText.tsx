import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
}

/**
 * Staggered word-by-word reveal for headlines (CSS only, starts at first paint).
 * Screen readers get the sentence once; the animated words are hidden from them.
 */
export function SplitText({ text }: SplitTextProps) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ "--stagger-step": "60ms" } as CSSProperties}>
        {text.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span className="inline-block animate-word stagger-delay" style={{ "--stagger-index": index } as CSSProperties}>
              {word}
              {" "}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
