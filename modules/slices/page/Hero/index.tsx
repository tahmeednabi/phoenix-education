import { AnimatedPhoenix } from "@modules/slices/page/Hero/AnimatedPhoenix";
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
import { ReactPlayer } from "@components/ReactPlayer";

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
    paragraph: ({ text }) => (
      <p className="text-2xl md:text-3xl font-light">{text}</p>
    ),
  });

  if (slice.variation === "videoBackground")
    return (
      <section
        style={
          slice.primary.background_image
            ? {
                background: `url(${slice.primary.background_image.url})`,
              }
            : {}
        }
        className="relative flex flex-col justify-center pt-64 pb-32 overflow-hidden -z-20 bg-cover bg-center bg-no-repeat"
      >
        {asLink(slice.primary.background_video) && (
          <ReactPlayer
            url={asLink(slice.primary.background_video) || ""}
            loop
            playing
            muted
            height={600}
            playsinline
            wrapper={({ children }) => (
              <div className="absolute -z-20 w-full h-full">
                <div className="relative w-full h-full video -translate-x-1/2 md:translate-x-0">
                  {children}
                </div>
              </div>
            )}
          />
        )}

        {(asLink(slice.primary.background_video) ||
          slice.primary.background_image) && (
          <div
            className="absolute top-10 left-0 w-full h-full -z-10 -m-[4rem] scale-110"
            style={{
              background: `linear-gradient(to ${
                slice.primary.text_align || "left"
              }, ${
                slice.primary.text_color === "black"
                  ? "rgba(255,255,255,0), rgba(255,255,255,0.6))"
                  : "rgba(0,0,0,0), rgba(0,0,0,0.2), rgba(0,0,0, 0.6))"
              }`,
            }}
          />
        )}

        <div
          className="container flex flex-col"
          style={{
            color: slice.primary.text_color || "",
            textAlign: slice.primary.text_align || "left",
            alignItems:
              slice.primary.text_align === "right" ? "flex-end" : "flex-start",
          }}
        >
          {slice.primary.title && (
            <div className="w-fit">
              <div className="relative w-fit z-50">
                <PrismicRichText
                  components={serializer}
                  field={slice.primary.title}
                />
              </div>

              <div className="w-full h-4 bg-red-500 -translate-y-4 -z-[5]" />
            </div>
          )}

          {slice.primary.subtitle && (
            <div className="max-w-2xl mt-4">
              <PrismicRichText
                components={serializer}
                field={slice.primary.subtitle}
              />
            </div>
          )}
        </div>
      </section>
    );

  return (
    <section
      style={
        slice.primary.background_image
          ? {
              background: `url(${slice.primary.background_image.url})`,
            }
          : {}
      }
      className="relative flex flex-col justify-center pt-64 pb-32 overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      {asLink(slice.primary.background_video) && (
        <ReactPlayer
          url={asLink(slice.primary.background_video) || ""}
          loop
          playing
          muted
          height={720}
          playsinline
          wrapper={({ children }) => (
            <div className="absolute -z-20 w-full h-full">
              <div className="relative w-full h-full video -translate-x-1/2 md:translate-x-0">
                {children}
              </div>
            </div>
          )}
        />
      )}

      {(slice.primary.background_image.url ||
        asLink(slice.primary.background_video)) && (
        <div
          className="absolute top-10 left-0 w-full h-full z-[1] -m-[4rem] scale-110 animate-opacity"
          style={{
            background:
              "linear-gradient(to left, rgba(15, 19, 33, 0), rgba(15, 19, 33, 0.6))",
          }}
        />
      )}

      <div className="container flex items-center justify-between text-white z-20 px-12">
        <div className="flex flex-col">
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
                <Button
                  variant="white"
                  classNames={{ label: "font-medium" }}
                  className="rounded-none"
                  size="xl"
                >
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
                  classNames={{ label: "font-medium" }}
                  size="xl"
                  rightIcon={<ChevronRight className="w-8 h-8" />}
                >
                  {slice.primary.button_2_text}
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div
          className="w-[24rem] absolute left-1/2 -translate-x-1/2 opacity-50
        lg:w-[24rem] lg:relative lg:left-0 lg:translate-x-0 lg:top-1/2 lg:opacity-100 -z-20"
        >
          <AnimatedPhoenix />
        </div>
      </div>
    </section>
  );
};

export default Hero;
