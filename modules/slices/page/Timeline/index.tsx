import React, { useState } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TimelineSlice } from "@slicemachine/prismicio";
import { serializer } from "@modules/slices/page/Content";
import { MantineProvider, Timeline as _Timeline } from "@mantine/core";
import { Dots } from "tabler-icons-react";
import dayjs from "dayjs";

const Timeline = ({ slice }: SliceComponentProps<TimelineSlice>) => {
  const [active] = useState(
    Math.ceil(
      (dayjs().startOf("year").diff(new Date(), "days") / 365) *
        slice.items.length
    )
  );

  return (
    <section className="bg-slate-900 py-24">
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

        <div className="flex-1 flex justify-center">
          <MantineProvider
            theme={{ colorScheme: "dark", primaryColor: "indigo" }}
          >
            <_Timeline active={active} bulletSize={24} lineWidth={2}>
              {slice.items.map((item, index) => (
                <_Timeline.Item
                  key={index}
                  bullet={<Dots className="w-3" />}
                  title={item.heading || ""}
                >
                  <div className="text-sm text-gray-400">
                    {item.body && <PrismicRichText field={item.body} />}
                  </div>
                </_Timeline.Item>
              ))}
            </_Timeline>
          </MantineProvider>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
