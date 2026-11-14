import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  /** Delay between words, in milliseconds (keep it small for long text). */
  step?: number;
  /**
   * Same word layout with no animation and no screen-reader copy. Used for
   * invisible "sizer" copies that reserve space, so they cost no animation work.
   */
  still?: boolean;
}

/**
 * Staggered word-by-word reveal for headlines (CSS only, starts at first paint).
 * Screen readers get the sentence once; the animated words are hidden from them.
 */
export function SplitText({ text, step = 60, still = false }: SplitTextProps) {
  const words = text.split(" ");
  if (still) {
    return (
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block pb-[0.12em] align-bottom">
            {word}
            {"\u00A0"}
          </span>
        ))}
      </span>
    );
  }

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ "--stagger-step": `${step}ms` } as CSSProperties}>
        {words.map((word, index) => (
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
