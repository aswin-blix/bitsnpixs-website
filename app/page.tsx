import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.home.meta);

export default function HomePage() {
  return <PageView page={pages.home} />;
}
