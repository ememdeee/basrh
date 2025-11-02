import Bounded from "@/app/component/Bounded"
import Heading from "@/app/component/Heading"
import type { Content } from "@prismicio/client"
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>
      {slice.items.map((item, index) => (
        <div key={index} className="ml-3 mt-6 max-w-prose sm:ml-6 sm:mt-8 md:ml-12 md:mt-16">
          <Heading as="h3" size="sm">
            {item.title}
          </Heading>

          <div className="mt-1 flex flex-wrap w-fit items-center gap-1 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-slate-400">
            <span>{item.time_period}</span> <span className="text-xl sm:text-2xl md:text-3xl font-extralight">/</span>{" "}
            <span>{item.institution}</span>
          </div>
          <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert mt-4">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  )
}

export default Experience
