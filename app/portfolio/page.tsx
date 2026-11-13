import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.portfolio.meta);

export default function PortfolioPage() {
  return <PageView page={pages.portfolio} />;
}
