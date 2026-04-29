import SEOPageTemplate from "@/components/SEOPageTemplate";
import { seoPages } from "@/lib/seo-data";
import { notFound } from "next/navigation";

export default function UsedEnginesCityPage({ params }: { params: { slug: string } }) {
  const data = seoPages[params.slug];
  if (!data) notFound();
  return <SEOPageTemplate data={data} slug={params.slug} />;
}
