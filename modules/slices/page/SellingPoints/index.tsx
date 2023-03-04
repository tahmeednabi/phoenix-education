import React from "react";
import { SliceComponentProps } from "@prismicio/react";
import {
  SellingPointDocument,
  SellingPointsSlice,
} from "@slicemachine/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import BgSvg1 from "@res/svgs/BgSvg1.svg";

const SellingPoints = ({ slice }: SliceComponentProps<SellingPointsSlice>) => (
  <section id="selling-points" className="relative py-24">
    <BgSvg1
      viewBox="0 0 1125 1774"
      className="absolute hidden lg:block w-full h-full left-[calc(50%-16rem)] top-20 -translate-y-64 -translate-x-1/2 -z-50"
    />

    {slice.items.map((point, index) => {
      const item = (point.selling_points as unknown as SellingPointDocument)
        .data;

      return (
        <div
          className={`container flex flex-col ${
            index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
          } items-center md:gap-24 py-16`}
          key={index}
        >
          {item.image.url && (
            <div className="flex-1">
              <PrismicNextImage
                className="w-full max-w-[36rem] h-auto rounded-3xl shadow-2xl"
                field={item.image}
              />
            </div>
          )}

          <div className="flex-1 max-w-[36rem] p-4">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </div>
      );
    })}
  </section>
);

export default SellingPoints;
