import Bounded from "@/app/component/Bounded"
import Form from "@/app/component/Form"
import Heading from "@/app/component/Heading"
import type { Content } from "@prismicio/client"
import type { SliceComponentProps } from "@prismicio/react"
import { PrismicRichText } from "@prismicio/react"

export type FormProps = SliceComponentProps<Content.FormSlice>

const FormSlice = ({ slice }: FormProps) => {
  const formId = slice.primary.form === "Contact Form" ? 1 : 0

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      {/* Display title and description before form */}
      <div className="mb-12">
        {slice.primary.title && <Heading as="h1" className="text-3xl font-bold text-foreground mb-4">{slice.primary.title}</Heading>}
        {slice.primary.description && (
          <div className="large-text">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
      </div>

      {/* Render dynamic form based on form ID */}
      <div className="">
        <Form formId={formId} />
      </div>
    </Bounded>
  )
}

export default FormSlice
