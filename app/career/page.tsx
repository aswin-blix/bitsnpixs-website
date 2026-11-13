import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.career.meta);

export default function CareerPage() {
  return <PageView page={pages.career} />;
}
