import type { SVGProps } from "react";

const paths = {
  arrow: "M5 19 19 5M8 5h11v11",
  check: "m4 12.5 5 5L20 6.5",
  cross: "M6 6l12 12M18 6 6 18",
  plus: "M12 5v14M5 12h14",
  menu: "M4 8h16M4 16h16",
  chevron: "m6 9 6 6 6-6",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

/** Stroke icons drawn in the current text colour. Decorative by default. */
export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
