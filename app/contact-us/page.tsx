import { PageView } from "@/components/sections/PageView";
import { pages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(pages.contact.meta);

export default function ContactPage() {
  return <PageView page={pages.contact} />;
}
