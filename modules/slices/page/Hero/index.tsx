import React from "react";
import {
  SliceComponentProps,
  PrismicRichText,
  JSXFunctionSerializer,
} from "@prismicio/react";
import { HeroSlice } from "@slicemachine/prismicio";
import Link from "next/link";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils/link-resolver";
import { Button } from "@components/Button";
import { ChevronRight } from "tabler-icons-react";
import { wrapMapSerializer } from "@prismicio/richtext";

const Hero = ({ slice }: SliceComponentProps<HeroSlice>) => {
  const serializer: JSXFunctionSerializer = wrapMapSerializer({
    heading1: ({ text }) => (
      <h1 className="text-8xl md:text-9xl font-bold">{text}</h1>
    ),
    heading2: ({ text }) => <h2 className="text-7xl md:text-8xl">{text}</h2>,
    heading3: ({ text }) => <h3 className="text-6xl md:text-7xl">{text}</h3>,
    heading4: ({ text }) => (
      <h4 className="text-4xl md:text-5xl font-light">{text}</h4>
    ),
  });

  return (
    <section
      style={{
        background: `url(${slice.primary.background_image.url})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: slice.primary.background_color || undefined,
      }}
      className="relative flex flex-col justify-center pt-64 pb-32 overflow-hidden"
    >
      {slice.primary.background_image.url && (
        <div
          className="absolute top-10 left-0 w-full h-full z-[1] -m-[4rem] scale-110"
          style={{
            background:
              "linear-gradient(to left, rgba(15, 19, 33, 0), rgba(15, 19, 33, 0.6))",
          }}
        />
      )}

      <div className="container flex flex-col text-white z-20 px-12">
        {slice.primary.line_1 && (
          <div className="-mb-4">
            <PrismicRichText
              components={serializer}
              field={slice.primary.line_1}
            />
          </div>
        )}

        {slice.primary.line_2 && (
          <div className="relative w-fit">
            <PrismicRichText
              components={serializer}
              field={slice.primary.line_2}
            />
            <div className="absolute scale-110 left-1 -bottom-0 -z-10 bg-red-500 w-full h-10" />
          </div>
        )}

        {slice.primary.line_3 && (
          <div className="md:ml-48 mb-4">
            <PrismicRichText
              components={serializer}
              field={slice.primary.line_3}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 md:ml-80">
          {slice.primary.button_1_link && slice.primary.button_1_text && (
            <Link
              href={asLink(slice.primary.button_1_link, linkResolver) || ""}
            >
              <Button variant="white" className="rounded-none" size="xl">
                {slice.primary.button_1_text}
              </Button>
            </Link>
          )}

          {slice.primary.button_2_link && slice.primary.button_2_text && (
            <Link
              href={asLink(slice.primary.button_2_link, linkResolver) || ""}
            >
              <Button
                className="rounded-none"
                size="xl"
                rightIcon={<ChevronRight className="w-8 h-8" />}
              >
                {slice.primary.button_2_text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
