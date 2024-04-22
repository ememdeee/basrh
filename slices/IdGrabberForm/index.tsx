import Bounded from "@/app/component/Bounded";
import IdGrabberFrom from "@/app/component/IdGrabberFrom";
import Heading from "@/app/component/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `IdGrabberForm`.
 */
export type IdGrabberFormProps =SliceComponentProps<Content.IdGrabberFormSlice>;

/**
 * Component for "IdGrabberForm" Slices.
 */
const IdGrabberForm = ({ slice }: IdGrabberFormProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
      </div>
      <IdGrabberFrom/>
    </Bounded>
    
  );
};

export default IdGrabberForm;