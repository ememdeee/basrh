import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";

import ContentBody from "@/app/component/ContentBody";
import { generateMetadataHelper } from "@/app/component/MetaGenerator";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

    return <ContentBody page={page} />;
}

// This function generates the metadata for your page
export async function generateMetadata({params,}: {params: Params;}): Promise<Metadata> {

  const client = createClient();
  const page = await client.getByUID("project", params.uid).catch(() => notFound());
  
  const content = {
    metaTitle: page.data.meta_title || "Muhammad Basurah's Official Website",
    metaDescription: page.data.meta_description || "Welcome to Muhammad Basurah's official website. Explore insights, projects, and updates from Muhammad Basurah.",
    canonical: "https://www.basrh.com/", 
    title: page.data.meta_title || "Muhammad Basurah's Official Website",
    description: page.data.meta_description || "Welcome to Muhammad Basurah's official website. Explore insights, projects, and updates from Muhammad Basurah.",
    type: "website" as const,
    seo: [],
  }

  // Use the helper function to generate metadata
  return generateMetadataHelper(content)
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
