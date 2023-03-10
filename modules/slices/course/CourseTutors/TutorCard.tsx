import React from "react";
import { TutorDocument } from "@slicemachine/prismicio";
import { PrismicNextImage } from "@prismicio/next";

interface TutorCardProps {
  tutor: TutorDocument;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="relative w-56 h-72 rounded-3xl overflow-hidden">
        <PrismicNextImage
          className="absolute w-auto h-full -translate-x-1/2 left-1/2"
          field={tutor.data.image}
        />
      </div>

      <div className="text-center">
        <p className="text-2xl font-normal text-slate-900">
          {tutor.data.full_name}
        </p>
        <p className="font-medium text-red-600">{tutor.data.subtitle}</p>
      </div>
    </div>
  );
};
