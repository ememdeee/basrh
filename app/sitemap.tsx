// app/sitemap.tsx
import { MetadataRoute } from 'next'
import { createClient } from "@/prismicio";

// Define SitemapEntry type
interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "daily" | "never" | undefined;
  priority?: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const pages = await client.getAllByType('page');
  console.log(pages)
  const projects = await client.getAllByType('project');
  const blogs = await client.getAllByType('blog_post');

  const sitemapEntries: SitemapEntry[] = [];

  // Add main domain or home page
  sitemapEntries.push({
    url: `https://www.basrh.com`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    // priority: 1,
  });

  // Add pages to sitemap
  pages.forEach((page) => {
    if (page.data.index !== "No Index") {
      sitemapEntries.push({
        url: `https://www.basrh.com/${page.uid}`,
        lastModified: new Date(page.last_publication_date),
        changeFrequency: 'daily',
        // priority: 1,
      });
    }
  });

  // Add products to sitemap
  projects.forEach((project) => {
    if (project.data.index !== "No Index") {
      sitemapEntries.push({
        url: `https://www.basrh.com/projects/${project.uid}`,
        lastModified: new Date(project.last_publication_date),
        changeFrequency: 'daily',
        // priority: 1,
      });
    }
  });

  // Add blogs to sitemap
  blogs.forEach((blog) => {
    if (blog.data.index !== "No Index") {
      sitemapEntries.push({
        url: `https://www.basrh.com/blog/${blog.uid}`,
        lastModified: new Date(blog.last_publication_date),
        changeFrequency: 'daily',
        // priority: 1,
      });
    }
  });

  return sitemapEntries;
}
