"use client"

import Bounded from "@/app/component/Bounded"
import Button from "@/app/component/Button"
import type { Content } from "@prismicio/client"
import type { SliceComponentProps } from "@prismicio/react"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    _wq: any[]
    Wistia: any
  }
}

export type VideoSliceProps = SliceComponentProps<Content.VideoSliceSlice>

const VideoSlice = ({ slice }: VideoSliceProps) => {
  const embed = slice.primary.video_embed
  const link = slice.primary.cta_link
  const label = slice.primary.cta_label
  const dropTime = Number(slice.primary.cta_drop_time) || 0
  // console.log("[v0] VideoSlice props:", { slice, embed, link, label, dropTime })

  const [showButton, setShowButton] = useState(false)
  const [isWistia, setIsWistia] = useState(false)
  const [embedUrl, setEmbedUrl] = useState("")
  const [wistiaMediaId, setWistiaMediaId] = useState<string | null>(null)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)

  useEffect(() => {
    if (!embed?.embed_url) return

    // console.log("[v0] Processing video URL:", embed.embed_url)

    // Check if it's a Wistia URL
    if (embed.embed_url.includes("wistia.com")) {
      // console.log("[v0] Detected Wistia video")
      setIsWistia(true)
      if (dropTime > 0) {
        setShowButton(false) // Hide button initially for Wistia
      } else {
        setShowButton(true) // Show button immediately if dropTime is 0 or positive
      }

      // Extract media ID from Wistia URL
      const mediaIdMatch = embed.embed_url.match(/medias\/([a-zA-Z0-9]+)/)
      if (mediaIdMatch) {
        const mediaId = mediaIdMatch[1]
        // console.log("[v0] Wistia media ID:", mediaId)
        setWistiaMediaId(mediaId)
        setEmbedUrl(`https://fast.wistia.net/embed/iframe/${mediaId}?videoFoam=true&controlsVisibleOnLoad=true`)
      }
    } else {
      // YouTube URL processing
      // console.log("[v0] Detected YouTube video")
      setIsWistia(false)
      setShowButton(true) // Show button immediately for YouTube
      setWistiaMediaId(null)
      const youtubeEmbedUrl = embed.embed_url.replace("watch?v=", "embed/")
      setEmbedUrl(youtubeEmbedUrl)
    }
  }, [embed?.embed_url])

  useEffect(() => {
    if (!isWistia || !wistiaMediaId) return

    // console.log("[v0] Initializing Wistia API for media ID:", wistiaMediaId)

    const loadWistiaAPI = () => {
      // Initialize _wq queue
      window._wq = window._wq || []

      // Add video configuration to queue
      window._wq.push({
        id: wistiaMediaId,
        onReady: (video: any) => {
          // console.log("[v0] Wistia video ready, binding events")

          let thirtySecFlag = false

          video.bind("secondchange", (seconds: number) => {
            // console.log("[v0] Video time:", seconds, "hasStartedPlaying:", hasStartedPlaying)

            // Only show button after dropTime seconds AND user has started playing
            if (seconds >= dropTime && thirtySecFlag === false && hasStartedPlaying) {
              // console.log(`[v0] ${dropTime} seconds reached and user started playing, showing button`)
              setShowButton(true)
              thirtySecFlag = true
            }
          })

          video.bind("play", () => {
            // console.log("[v0] Video started playing")
            setHasStartedPlaying(true)
          })
        },
      })
    }

    // Check if Wistia script is already loaded
    if (window.Wistia) {
      loadWistiaAPI()
    } else {
      // Load Wistia script
      const script = document.createElement("script")
      script.src = "https://fast.wistia.com/assets/external/E-v1.js"
      script.async = true
      script.onload = loadWistiaAPI
      document.head.appendChild(script)
    }
  }, [isWistia, wistiaMediaId, hasStartedPlaying])

  if (!embed?.embed_url) return null

  // console.log("[v0] Render state - isWistia:", isWistia, "showButton:", showButton, "embedUrl:", embedUrl)

  return (
    <Bounded className="!py-0 md:!py-0" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="w-full aspect-video mx-auto mb-6">
        {isWistia && wistiaMediaId ? (
          <div
            className={`wistia_embed wistia_async_${wistiaMediaId} w-full h-full rounded-xl shadow-lg`}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <iframe
            src={embedUrl}
            title={embed.title || "Video"}
            className="w-full h-full rounded-xl shadow-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {link && link.link_type !== "Any" && showButton && (
        <Button linkField={link} label={label || "Book a Call"} style="primary-big" className="mx-auto" />
      )}
    </Bounded>
  )
}

export default VideoSlice
