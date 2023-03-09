import React from "react";
import BgSvg1 from "@res/svgs/BgSvg1.svg";
import { ContentSlice } from "@slicemachine/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import {
  SliceComponentProps,
  PrismicRichText,
  JSXFunctionSerializer,
} from "@prismicio/react";
import { wrapMapSerializer } from "@prismicio/richtext";

const Content = ({ slice }: SliceComponentProps<ContentSlice>) => {
  const serializer: JSXFunctionSerializer = wrapMapSerializer({
    paragraph: ({ text }) => <p className="text-2xl md:text-xl">{text}</p>,
  });

  return (
    <section id={slice.primary.uid || ""} className="relative py-24">
      {slice.primary.background_graphic && (
        <BgSvg1
          viewBox="0 0 1125 1774"
          className="absolute hidden lg:block w-full h-full left-[calc(50%-16rem)] top-20 -translate-y-64 -translate-x-1/2 -z-50"
        />
      )}

      {slice.items.map((data, index) => (
        <div
          className={`container flex flex-col ${
            data.reversed ? "md:flex-row-reverse" : "md:flex-row"
          } items-center md:gap-24 py-16`}
          key={index}
        >
          {data.image.url && (
            <div className="flex-1">
              <PrismicNextImage
                className="w-full max-w-[36rem] h-auto rounded-3xl shadow-2xl"
                field={data.image}
              />
            </div>
          )}

          <div className="flex-1 max-w-[36rem] p-4 mt-8 md:mt-0">
            <PrismicRichText field={data.heading} />
            <PrismicRichText components={serializer} field={data.description} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Content;
