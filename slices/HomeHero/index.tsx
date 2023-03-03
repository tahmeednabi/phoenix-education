import React from "react";
import { SliceComponentProps } from "@prismicio/react";
import { HomeHeroSlice } from "../../.slicemachine/prismicio";
import { Button } from "../../components/Button";
import { ChevronRight } from "tabler-icons-react";
import Link from "next/link";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "../../common/utils/link-resolver";

const HomeHero = ({ slice }: SliceComponentProps<HomeHeroSlice>) => {
  return (
    <section
      style={{
        background: `url(${slice.primary.background.url})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="relative flex flex-col justify-center h-[48rem] pt-32 overflow-hidden"
    >
      <div
        className="absolute top-10 left-0 w-full h-full z-[1] -m-[4rem] scale-110"
        style={{
          background:
            "linear-gradient(to left, rgba(15, 19, 33, 0), rgba(15, 19, 33, 0.6))",
        }}
      />

      <div className="container flex flex-col text-white gap-4 z-20 px-12">
        {slice.primary.line_1 && (
          <p className="text-4xl md:text-5xl">{slice.primary.line_1}</p>
        )}
        {slice.primary.line_2 && (
          <h2 className="relative text-5xl md:text-6xl w-fit">
            {slice.primary.line_2}
            <div className="absolute scale-110 left-1 -bottom-4 -z-10 bg-red-500 w-full h-10" />
          </h2>
        )}
        {slice.primary.line_3 && (
          <h1 className="text-7xl md:text-9xl md:ml-48 font-bold">
            {slice.primary.line_3}
          </h1>
        )}

        <div className="flex flex-col md:flex-row gap-4 md:ml-80">
          <Link href={asLink(slice.primary.book_trial, linkResolver) || ""}>
            <Button variant="white" className="rounded-none" size="lg">
              Book a Trial
            </Button>
          </Link>

          <Link href={asLink(slice.primary.enrol_now, linkResolver) || ""}>
            <Button
              className="rounded-none"
              size="lg"
              rightIcon={<ChevronRight className="w-8 h-8" />}
            >
              Enrol Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
