import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.stitchLab.meta);

export default function StitchLabPage() {
  return <PageView page={pages.stitchLab} />;
}
