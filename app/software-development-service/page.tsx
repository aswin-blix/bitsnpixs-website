import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.software.meta);

export default function SoftwarePage() {
  return <PageView page={pages.software} />;
}
