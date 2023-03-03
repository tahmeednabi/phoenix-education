import React from "react";
import { SliceComponentProps } from "@prismicio/react";
import { HomeHeroSlice } from "../../.slicemachine/prismicio";

const HomeHero = ({ slice }: SliceComponentProps<HomeHeroSlice>) => (
  <section
    style={{
      background: `url(${slice.primary.background.url})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
    className="relative flex flex-col justify-center h-[48rem] overflow-hidden"
  >
    <div
      className="absolute top-10 left-0 w-full h-full z-[1] -m-[4rem] scale-110"
      style={{
        background:
          "linear-gradient(to left, rgba(15, 19, 33, 0), rgba(15, 19, 33, 0.6))",
      }}
    />

    <div className="flex flex-col text-white gap-4 max-w-[100rem] w-full mx-auto px-24 z-20">
      {slice.primary.line_1 && (
        <p className="text-5xl">{slice.primary.line_1}</p>
      )}
      {slice.primary.line_2 && (
        <h2 className="relative text-6xl w-fit">
          {slice.primary.line_2}
          <div className="absolute scale-110 left-1 -bottom-4 -z-10 bg-red-500 w-full h-10" />
        </h2>
      )}
      {slice.primary.line_3 && (
        <h1 className="text-9xl ml-48 font-bold">{slice.primary.line_3}</h1>
      )}
    </div>
  </section>
);

export default HomeHero;
