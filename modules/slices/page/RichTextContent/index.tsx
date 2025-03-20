import React from "react";
import {
  JSXFunctionSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { RichTextContentSlice } from "@slicemachine/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { wrapMapSerializer } from "@prismicio/richtext";

export const serializer: JSXFunctionSerializer = wrapMapSerializer({
  paragraph: ({ text, node }) => (
    <p
      className="text-lg my-4"
      style={{
        fontStyle: node.spans.at(0)?.type === "em" ? "italic" : "normal",
      }}
    >
      {text}
    </p>
  ),
  heading1: ({ text }) => <h1 className="text-4xl my-8 font-bold">{text}</h1>,
  heading2: ({ text }) => (
    <h2 className="relative w-fit text-black text-3xl my-8 font-bold">
      {text}
      <div className="absolute h-1 w-2/3 bg-red-600 -bottom-2 left-0" />
    </h2>
  ),
  heading3: ({ text }) => <h3 className="text-2xl my-8 font-bold">{text}</h3>,
  heading4: ({ text }) => <h4 className="text-xl my-8 font-bold">{text}</h4>,
  heading5: ({ text }) => <h5 className="text-lg my-8 font-bold">{text}</h5>,
  heading6: ({ text }) => <h6 className="text-base my-8 font-bold">{text}</h6>,
  list: ({ children }) => (
    <ul className="text-lg list-disc ml-6">{children}</ul>
  ),
  listItem: ({ children }) => <li className="my-2">{children}</li>,
  oList: ({ children }) => (
    <ol className="text-lg list-decimal ml-6">{children}</ol>
  ),
  oListItem: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="text-lg font-semibold">{children}</strong>
  ),
  preformatted: ({ text }) => (
    <pre className="text-lg bg-gray-100 p-4 my-4">{text}</pre>
  ),
  em: ({ children }) => <em className="text-lg italic">{children}</em>,
  hyperlink: ({ node, text }) => (
    <a
      className="text-lg cursor-pointer text-blue-600 hover:underline"
      href={node.data.url}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  ),
  image: ({ node }) => (
    <PrismicNextImage
      className="w-full h-auto rounded-md shadow-2xl"
      field={node}
      width={node.dimensions?.width || 640}
      height={node.dimensions?.height || 360}
    />
  ),
});

const RichTextContent = ({
  slice,
}: SliceComponentProps<RichTextContentSlice>) => (
  <section>
    <div className="container py-4">
      {slice.items.map((item, key) => (
        <PrismicRichText key={key} field={item.text} components={serializer} />
      ))}
    </div>
  </section>
);

export default RichTextContent;
