import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TimelineSlice } from "@slicemachine/prismicio";
import { serializer } from "@modules/slices/page/Content";

const Timeline = ({ slice }: SliceComponentProps<TimelineSlice>) => {
  return (
    <section className="bg-slate-900">
      <div className="text-white container flex flex-col md:flex-row justify-between items-center gap-24">
        <div className="flex flex-col gap-4 max-w-xl">
          {slice.primary.title && (
            <PrismicRichText field={slice.primary.title} />
          )}

          <div className="opacity-90">
            {slice.primary.description && (
              <PrismicRichText
                field={slice.primary.description}
                components={serializer}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
