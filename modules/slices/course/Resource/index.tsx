import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ResourceSlice } from "@slicemachine/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { Button } from "@components/Button";
import Link from "next/link";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils";
import { ChevronRight } from "tabler-icons-react";
import { serializer } from "@modules/slices/page/Content";

const Resource = ({ slice }: SliceComponentProps<ResourceSlice>) => {
  return (
    <section
      id="resource"
      style={{ backgroundColor: slice.primary.background_color || undefined }}
      className="py-24"
    >
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

          {asLink(slice.primary.link, linkResolver) && (
            <Link href={asLink(slice.primary.link, linkResolver) || ""}>
              <Button
                size="lg"
                className="mt-6 bg-black bg-opacity-40 hover:bg-opacity-50"
                rightIcon={<ChevronRight />}
              >
                View sample
              </Button>
            </Link>
          )}
        </div>

        <PrismicNextImage
          className="w-full md:w-1/3 h-auto shadow-2xl"
          field={slice.primary.image}
        />
      </div>
    </section>
  );
};

export default Resource;
