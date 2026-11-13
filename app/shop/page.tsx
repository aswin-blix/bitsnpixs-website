import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.shop.meta);

export default function ShopPage() {
  return <PageView page={pages.shop} />;
}
