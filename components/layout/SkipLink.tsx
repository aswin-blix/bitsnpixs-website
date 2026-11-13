/** First focusable element on every page: jumps keyboard users past the header. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-control bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80]"
    >
      Skip to content
    </a>
  );
}
