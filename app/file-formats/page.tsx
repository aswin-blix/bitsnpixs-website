import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.formats.meta);

export default function FormatsPage() {
  return <PageView page={pages.formats} />;
}
