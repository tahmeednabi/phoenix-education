import React from "react";
import { TutorDocument } from "@slicemachine/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Divider } from "@mantine/core";

interface TutorCardProps {
  tutor: TutorDocument;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mx-auto items-start justify-center">
      <div className="relative w-56 h-72 rounded-3xl overflow-hidden bg-slate-700">
        <PrismicNextImage
          className="absolute w-auto h-full -translate-x-1/2 left-1/2"
          width={224}
          height={288}
          field={tutor.data.image}
        />
      </div>

      <div className="w-64 py-4">
        <p className="text-2xl font-normal text-slate-900">
          {tutor.data.full_name}
        </p>
        <p className="font-medium text-red-600">{tutor.data.subtitle}</p>

        <Divider className="my-2 border-gray-200" />

        <PrismicRichText field={tutor.data.bio} />
      </div>
    </div>
  );
};
