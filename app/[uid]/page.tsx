import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { generateMetadataHelper } from "../component/MetaGenerator";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

// This function generates the metadata for your page
export async function generateMetadata({params,}: {params: Params;}): Promise<Metadata> {

  const client = createClient();
  const page = await client.getByUID("page", params.uid).catch(() => notFound());
  
  const content = {
    metaTitle: page.data.meta_title || "Muhammad Basurah's Official Website",
    metaDescription: page.data.meta_description || "Welcome to Muhammad Basurah's official website. Explore insights, projects, and updates from Muhammad Basurah.",
    canonical: "https://www.basrh.com/", 
    title: page.data.meta_title || "Muhammad Basurah's Official Website",
    description: page.data.meta_description || "Welcome to Muhammad Basurah's official website. Explore insights, projects, and updates from Muhammad Basurah.",
    type: "website" as const,
    seo: [],
    index: page.data.index,
  }

  // Use the helper function to generate metadata
  return generateMetadataHelper(content)
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
