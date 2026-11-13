import { notFound } from "next/navigation";
import { PageView } from "@/components/sections/PageView";
import { servicePagesBySlug, type ServiceSlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const isServiceSlug = (slug: string): slug is ServiceSlug => slug in servicePagesBySlug;

export function generateStaticParams() {
  return Object.keys(servicePagesBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  return isServiceSlug(slug) ? buildMetadata(servicePagesBySlug[slug].meta) : {};
}

/** One template for every digitizing service: the page is entirely content-driven. */
export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return <PageView page={servicePagesBySlug[slug]} />;
}
