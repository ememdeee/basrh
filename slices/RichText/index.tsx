import Bounded from "@/app/component/Bounded"
import Button from "@/app/component/Button"
import Heading from "@/app/component/Heading"
import type { Content } from "@prismicio/client"
import type { SliceComponentProps } from "@prismicio/react"
import { PrismicRichText, PrismicImage } from "@prismicio/react"
import clsx from "clsx"

/**
 * Props for `RichText`.
 */
export type RichTextProps = SliceComponentProps<Content.RichTextSlice>

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps) => {
  // Removed JSX.Element return type annotation to fix lint error
  // Map Prismic field values to component props
  const getHeadingSize = (size: string) => {
    switch (size) {
      case "Extra Large":
        return "xl"
      case "Large":
        return "lg"
      case "Medium":
        return "md"
      case "Small":
        return "sm"
      default:
        return "lg"
    }
  }

  const getHeadingTag = (tag: string) => {
    return tag.toLowerCase() as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case "Center":
        return "text-center"
      case "Right":
        return "text-right"
      case "Left":
      default:
        return "text-left"
    }
  }

  const getButtonAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case "Center":
        return "justify-center"
      case "Right":
        return "justify-end"
      case "Left":
      default:
        return "justify-start"
    }
  }

  const isImageLeft = slice.primary.text_image_position === "Image Left / Text Right"
  const hasImage = slice.primary.image?.url
  const hasHeading = slice.primary.heading_text
  const hasRichText = slice.primary.rich_text && slice.primary.rich_text.length > 0
  const hasButtons = slice.items && slice.items.length > 0 && slice.items.some((item) => item.button_label)

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="section-container">
      <div
        className={clsx(
          "max-w-7xl mx-auto",
          hasImage ? "grid gap-8 items-center" : "max-w-4xl",
          hasImage && "md:grid-cols-2",
          isImageLeft && hasImage && "md:grid-cols-[1fr_2fr]",
          !isImageLeft && hasImage && "md:grid-cols-[2fr_1fr]",
        )}
      >
        {/* Text Column */}
        <div
          className={clsx(
            "space-y-6",
            isImageLeft && hasImage && "md:order-2",
            !isImageLeft && hasImage && "md:order-1",
          )}
        >
          {/* Heading - only show if heading_text is filled */}
          {hasHeading && (
            <div className={getAlignmentClass(slice.primary.alignment || "Left")}>
              <Heading
                as={getHeadingTag(slice.primary.heading_tag || "H1")}
                size={getHeadingSize(slice.primary.heading_size || "Extra Large")}
                className="text-foreground mb-8"
              >
                {slice.primary.heading_text}
              </Heading>
            </div>
          )}

          {/* Rich Text - only show if rich_text is filled */}
          {hasRichText && (
            <div className={clsx("prose prose-invert text-lg", getAlignmentClass(slice.primary.alignment || "Left"))}>
              <PrismicRichText field={slice.primary.rich_text} />
            </div>
          )}

          {/* Buttons - only show if buttons exist and have content */}
          {hasButtons && (
            <div className={clsx("flex flex-wrap gap-4", getButtonAlignmentClass(slice.primary.alignment || "Left"))}>
              {slice.items.map((item, index) => {
                if (!item.button_label || !item.button_link) return null

                return (
                  <Button
                    key={index}
                    linkField={item.button_link}
                    label={item.button_label}
                    style="primary" // or "primary-big" if you want large buttons
                  />
                )
              })}
            </div>
          )}
        </div>

        {/* Image Column - only show if image is provided */}
        {hasImage && (
          <div className={clsx("flex justify-center", isImageLeft && "md:order-1", !isImageLeft && "md:order-2")}>
            <PrismicImage field={slice.primary.image} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    </Bounded>
  )
}

export default RichText
