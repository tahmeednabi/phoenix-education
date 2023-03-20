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
import { Button } from "@components/Button";
import Link from "next/link";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils";

export const serializer: JSXFunctionSerializer = wrapMapSerializer({
  paragraph: ({ text }) => <p className="text-2xl md:text-xl">{text}</p>,
});

const Content = ({ slice }: SliceComponentProps<ContentSlice>) => {
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
                width={640}
                height={360}
              />
            </div>
          )}

          <div className="flex-1 max-w-[36rem] p-4 mt-8 md:mt-0">
            <PrismicRichText field={data.heading} />
            <PrismicRichText components={serializer} field={data.description} />
            {data.button_text && (
              <Link href={asLink(data.button_link, linkResolver) || ""}>
                <Button size="lg" className="mt-4">
                  {data.button_text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Content;
