import React from "react";
import { SliceComponentProps } from "@prismicio/react";
import { TutorCarouselSlice, TutorDocument } from "@slicemachine/prismicio";
import Marquee from "react-fast-marquee";
import { PrismicNextImage } from "@prismicio/next";
import { Button } from "@components/Button";
import { ChevronRight } from "tabler-icons-react";

const TutorCarousel = ({ slice }: SliceComponentProps<TutorCarouselSlice>) => (
  <section className="bg-red-500 py-32 -px-32">
    <div className="container flex flex-col md:flex-row gap-6 justify-between md:items-end">
      {slice.primary.title && (
        <h1 className="text-white text-7xl md:text-9xl max-w-xl">
          {slice.primary.title}
        </h1>
      )}

      <Button
        size="xl"
        className="mr-auto md:mr-0"
        rightIcon={<ChevronRight className="mt-0.5" />}
      >
        View more
      </Button>
    </div>

    <Marquee className="mt-24" speed={80} gradient={false} pauseOnClick>
      {slice.items.map((item, index) => {
        const tutor = item.tutor as unknown as TutorDocument;
        return (
          <div
            key={index}
            className="mx-8 rounded-[2rem] overflow-hidden bg-white"
          >
            <PrismicNextImage
              className="w-72 h-96 object-cover rounded-[2rem]"
              field={tutor.data.image}
            />

            <div className="flex flex-col items-center py-4">
              <p className="text-2xl">{tutor.data.full_name}</p>
              <p className="text-lg font-bold text-red-700">
                {tutor.data.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </Marquee>
  </section>
);

export default TutorCarousel;
