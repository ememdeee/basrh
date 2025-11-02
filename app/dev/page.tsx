import Bounded from "../component/Bounded";
import Heading from "../component/Heading";

export default function Page() {
  return (
    <Bounded className="space-y-12">
        {/* H1 Variants */}
        <Heading as="h1" size="xl">Heading - XL</Heading>
        <br></br>
        <Heading as="h1" size="lg">Heading - LG</Heading>
        <br></br>
        <Heading as="h1" size="md">Heading - MD</Heading>
        <br></br>
        <Heading as="h1" size="sm">Heading - SM</Heading>
        <br></br>
        <br></br>
        <br></br>
        <div className="prose prose-invert text-lg text-left">
            <Heading as="h1" size="xl">Blog Version</Heading>
            <h1>Heading 1 — The Big Title</h1>
            <p>This is your largest heading. It should dominate the page and clearly mark a major section. This is your largest heading. It should dominate the page and clearly mark a major section. </p>
            <p>This is your largest heading. It should dominate the page and clearly mark a major section.</p>
            <h2>Heading 2 — Section Title</h2>
            <p>Used for major subsections. Should be visually distinct but secondary to H1. This is your largest heading. It should dominate the page and clearly mark a major section. </p>
            <p>This is your largest heading. It should dominate the page and clearly mark a major section.</p>
            <h3>Heading 3 — Subsection</h3>
            <p>Ideal for smaller groupings or content breakdowns. This is your largest heading. It should dominate the page and clearly mark a major section. </p>
            <p>This is your largest heading. It should dominate the page and clearly mark a major section.</p>
            <h4>Heading 4 — Minor Heading</h4>
            <p>For inline titles or smaller groupings. This is your largest heading. It should dominate the page and clearly mark a major section. </p>
            <p>This is your largest heading. It should dominate the page and clearly mark a major section.</p>
            <h5>Heading 5 — Tiny Heading</h5>
            <p>Mostly used in sidebars, cards, or inline summaries. This is your largest heading. It should dominate the page and clearly mark a major section. </p>
            <p>This is your largest heading. It should dominate the page and clearly mark a major section.</p>
            <h6>Heading 6 — The Smallest Heading</h6>
            <p>Barely larger than body text, for labeling content. This is your largest heading. It should dominate the page and clearly mark a major section. </p>
            <p>This is your largest heading. It should dominate the page and clearly mark a major section.</p>
            <h2>Paragraphs &amp; Text Styles</h2>
            <p>This is a standard paragraph of text. It demonstrates the <strong>default body font</strong>, line height, and spacing. Make sure it’s easy to read and not too tight.</p>
            <p>This is a <em>italic</em> word.This is a <strong>bold</strong> word.This is a <em><strong>bold italic</strong></em> word.This is a strikethrough.This is a &lt;sub&gt;subscript&lt;/sub&gt; and a &lt;sup&gt;superscript&lt;/sup&gt; example.This is an inline code example.</p>
            <h2>Links</h2>
            <p>Here’s a <a target="_blank" href="#">regular link</a> inside a sentence.Here’s a <strong>bold link</strong>: <a target="_blank" href="#">click here</a>.And here’s one with <em>emphasis</em>: <em><a target="_blank" href="#">see more →</a></em>.</p>
            <h2>Lists</h2>
            <h3>Unordered List</h3>
            <ul>
                <li>List item one</li>
                <li>List item two</li>
                <li>List item three</li>
            </ul>
            <h3>Ordered List</h3>
            <ol>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
            </ol>
            <form action="https://formsubmit.co/68d554ed24003a26b10a708a81de646e" method="POST">
                <input type="text" name="name" required />
                <input type="email" name="email" required />
                <button type="submit">Send</button>
            </form>
        </div>
    </Bounded>
  );
}
