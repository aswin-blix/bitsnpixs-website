import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import type { PostsBlock } from "@/lib/content";
import { formatDate } from "@/lib/utils";

/** Index of blog posts. Each row links to the existing article. */
export function PostsSection({ block }: { block: PostsBlock }) {
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <RevealGroup as="ul" stagger={0.04} className="border-t border-line">
        {block.posts.map((post) => (
          <RevealItem as="li" key={post.href} className="group/post relative border-b border-line">
            <article className="grid gap-3 py-7 transition-transform duration-500 ease-brand group-hover/post:translate-x-2 md:grid-cols-[9rem_1fr_auto] md:items-center md:gap-8">
              <time dateTime={post.date} className="font-mono text-xs tracking-widest text-muted uppercase">
                {formatDate(post.date)}
              </time>
              <h2 className="text-xl font-semibold sm:text-2xl">
                <SmartLink href={post.href} className="after:absolute after:inset-0">
                  {post.title}
                </SmartLink>
              </h2>
              <span aria-hidden="true" className="hidden items-center gap-3 font-mono text-xs tracking-widest text-accent-text uppercase md:flex">
                {post.category}
                <Icon name="arrow" size={18} className="transition-transform duration-300 ease-brand group-hover/post:translate-x-1 group-hover/post:-translate-y-1" />
              </span>
            </article>
            <span aria-hidden="true" className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-brand group-hover/post:scale-x-100" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
