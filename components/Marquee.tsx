import type { ReactNode } from "react";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
};

/**
 * Seamless CSS marquee. The list is rendered twice and translated -50%, so the
 * loop has no visible seam and no JavaScript is involved. Duplicated content is
 * hidden from assistive tech; the first pass carries the real text.
 */
export default function Marquee({
  items,
  reverse = false,
  separator,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const sep = separator ?? <span className="text-red">×</span>;

  const run = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          <span>{item}</span>
          <span className="mx-5 inline-block sm:mx-8">{sep}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee-mask relative overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
