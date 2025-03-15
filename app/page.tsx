import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { generateMetadataHelper } from "./component/MetaGenerator";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return <SliceZone slices={page.data.slices} components={components} />;
}

// This function generates the metadata for your page
export async function generateMetadata(): Promise<Metadata> {

  const client = createClient();
  const page = await client.getSingle("homepage");
  
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