import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { CourseTutorsSlice, TutorDocument } from "@slicemachine/prismicio";
import { TutorCard } from "./TutorCard";

const CourseTutors = ({ slice }: SliceComponentProps<CourseTutorsSlice>) => (
  <section>
    <div className="mx-auto p-6 py-24 md:p-24">
      {slice.primary.title && (
        <div className="text-center">
          <PrismicRichText field={slice.primary.title} />
        </div>
      )}

      <div className="flex flex-wrap justify-between mt-16 gap-16">
        {slice.items.map((item, index) => (
          <TutorCard
            key={index}
            tutor={item.tutor as unknown as TutorDocument}
          />
        ))}
      </div>
    </div>
  </section>
);

export default CourseTutors;
