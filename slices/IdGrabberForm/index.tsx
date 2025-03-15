import Bounded from "@/app/component/Bounded";
import IdGrabberFrom from "@/app/component/IdGrabberFrom";
import Heading from "@/app/component/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import FAQBasic from "@/app/component/FAQBasic";

/**
 * Props for `IdGrabberForm`.
 */
export type IdGrabberFormProps =SliceComponentProps<Content.IdGrabberFormSlice>;

/**
 * Component for "IdGrabberForm" Slices.
 */
const IdGrabberForm = ({ slice }: IdGrabberFormProps): JSX.Element => {

  const faqItems = [
    {
      question: "What is a WordPress Page ID?",
      answer:
        "A WordPress Page ID is a unique identifier assigned to each page or post in a WordPress site. It's used by developers and plugins to target specific content.",
    },
    {
      question: "How do I normally find a WordPress Page ID?",
      answer:
        "You can find it by inspecting the HTML body tag, checking the URL when editing a page, or using the WordPress admin interface.",
    },
    {
      question: "Why would I need this tool?",
      answer:
        "If you need to collect multiple page IDs quickly, this tool saves you from having to manually check each page individually, saving significant time.",
    },
    {
      question: "Which plugins commonly require Page IDs?",
      answer:
        "Plugins like RankMath Pro, Yoast SEO, WP Rocket, Elementor Pro, and WooCommerce often require page IDs for specific configurations.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, this tool is completely free to use. It was created to solve a personal need but has been made public to help others.",
    },
  ]

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

      <section className="prose-xl prose-invert py-10">
        <div className="">
          <Heading size="lg" as="h2" className="mb-8">
            WordPress Page ID Tool
          </Heading>

          <p className="text-xl mb-8 leading-relaxed">
            I created this tool to save time when you need to get WordPress Page ID for specific posts and/or pages. If
            you are coming to this page, it means you already know what WordPress Page ID is used for.
          </p>

          <p className="text-xl mb-8 leading-relaxed">
            For those who aren't familiar, the WordPress page ID can be useful for many cases: removing bulk pages using
            page/post ID with PHP, adding specific styles for specific pages only, and much more.
          </p>

          <p className="text-xl mb-8 leading-relaxed">
            Here are also some famous plugins that require you to input WordPress IDs in their settings:
          </p>

          <ul className="text-xl mb-8 list-disc pl-8">
          <li className="mb-2">
              <a
                href="https://rankmath.com/"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-blue-300 hover:text-blue-100 underline"
              >
                RankMath Pro
              </a>{" "}
              - Exclude page from sitemap using page ID
            </li>
            <li className="mb-2">
              <a
                href="https://yoast.com/wordpress/plugins/seo/"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-blue-300 hover:text-blue-100 underline"
              >
                Yoast SEO
              </a>{" "}
              - Configure page-specific SEO settings
            </li>
            <li className="mb-2">
              <a
                href="https://wp-rocket.me/"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-blue-300 hover:text-blue-100 underline"
              >
                WP Rocket
              </a>{" "}
              - Exclude specific pages from caching
            </li>
            <li className="mb-2">
              <a
                href="https://elementor.com/pro/"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-blue-300 hover:text-blue-100 underline"
              >
                Elementor Pro
              </a>{" "}
              - Apply custom templates to specific pages
            </li>
            <li className="mb-2">
              <a
                href="https://woocommerce.com/"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-blue-300 hover:text-blue-100 underline"
              >
                WooCommerce
              </a>{" "}
              - Configure special functionality for product pages
            </li>
          </ul>

          <p className="text-xl mb-8 leading-relaxed">Pretty useful, right?</p>

          <p className="text-xl mb-8 leading-relaxed">
            To be honest, we all know that to get the Page ID, you can simply inspect the HTML and search for it in the
            body tag (for those who familiar with dev tools), or click the edit page and see the page ID inside the URL.
            Much easier.
          </p>

          <p className="text-xl mb-8 leading-relaxed">
            BUT, if you need, for example, 100 page IDs, do you want to do it all manually? That's why I created this
            tool. This tool is basically for me, but since the code is done, I just published it. I hope you can benefit
            as well.
          </p>

          <p className="text-xl leading-relaxed">
            If you find any bugs, please inform me via email or Instagram that you can find in my profile.
          </p>
        </div>
      </section>

      <FAQBasic title="Frequently Asked Questions" items={faqItems} />
    </Bounded>
    
  );
};

export default IdGrabberForm;