import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.about.meta);

export default function AboutPage() {
  return <PageView page={pages.about} />;
}
