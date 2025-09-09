// v 1.0.2 - Fixed index logic for Prismic Select field
import type { Metadata } from "next"

interface Content {
  metaTitle?: string
  metaDescription?: string
  canonical: string
  title?: string
  description?: string
  imageUrl?: string
  author?: {
    name: string
    url: string
  }
  index?: string // "Index" or "No Index" from Prismic Select field
}

export function generateMetadataHelper(content: Content): Metadata {
  if (!content) return {}

  const siteName = process.env.SITE_NAME ?? "ChassisVIN"
  const defaultDescription = `Welcome to ${siteName}`
  const defaultImageUrl = (process.env.DOMAIN_NAME ? process.env.DOMAIN_NAME : "/") + "default-og-image.png"
  const defaultAuthor = {
    name: process.env.OWNER_NAME ?? "Ethan J. Caldwell",
    url: process.env.OWNER_PAGE ?? "/author/ethan",
  }

  const showIndex = content.index !== "No Index" // Default to true unless explicitly set to "No Index"
  const showFollow = true // No nofollow logic in current schema, defaulting to true
  const showType = "website" // No article type logic in current schema, defaulting to website

  return {
    title: content.metaTitle ?? siteName,
    description: content.metaDescription ?? defaultDescription,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      other: [
        { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: content.canonical,
    },
    openGraph: {
      title: content.title ?? siteName,
      description: content.description ?? defaultDescription,
      images: [
        {
          url: content.imageUrl ?? defaultImageUrl,
          width: 1200,
          height: 630,
          alt: content.title ?? siteName,
        },
      ],
      type: showType,
      siteName: siteName,
      locale: "en_US",
      url: content.canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title ?? siteName,
      description: content.description ?? defaultDescription,
      images: [content.imageUrl ?? defaultImageUrl],
    },
    authors: content.author ? [content.author] : [defaultAuthor],
    robots: {
      index: showIndex,
      follow: showFollow,
      googleBot: {
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
