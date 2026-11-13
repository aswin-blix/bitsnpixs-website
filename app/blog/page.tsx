import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.blog.meta);

export default function BlogPage() {
  return <PageView page={pages.blog} />;
}
