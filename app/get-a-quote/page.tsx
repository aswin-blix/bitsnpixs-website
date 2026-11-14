import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.quote.meta);

export default function QuotePage() {
  return <PageView page={pages.quote} />;
}
