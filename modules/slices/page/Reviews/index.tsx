import React, { useEffect, useState } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ReviewsSlice } from "@slicemachine/prismicio";
import { Card, Divider } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Swiper as SwiperClass,
  EffectCoverflow,
  Autoplay,
  Mousewheel,
} from "swiper";
import { useViewportSize } from "@mantine/hooks";
import { PrismicNextImage } from "@prismicio/next";

const Reviews = ({ slice }: SliceComponentProps<ReviewsSlice>) => {
  const { width } = useViewportSize();
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "vertical"
  );

  useEffect(() => {
    if (width < 768 && swiper && direction !== "horizontal") {
      setDirection("horizontal");
      swiper.changeDirection("horizontal", true);
    }

    if (width >= 768 && swiper && direction !== "vertical") {
      setDirection("vertical");
      swiper.changeDirection("vertical", true);
    }
  }, [swiper, width, direction]);

  return (
    <section id="reviews" className="bg-gray-600 overflow-hidden py-24 md:py-0">
      <div className="container flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex-1 text-white max-w-lg">
          {slice.primary.title && (
            <PrismicRichText field={slice.primary.title} />
          )}
        </div>

        <div className="md:h-[40rem] translate-x-1/4 md:translate-x-0 md:-translate-y-32">
          <Swiper
            grabCursor
            centeredSlides
            mousewheel
            height={1000}
            width={950}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              scale: 0.9,
            }}
            modules={[Autoplay, EffectCoverflow, Mousewheel]}
            direction="vertical"
            slidesPerView={3}
            spaceBetween={24}
            onSwiper={setSwiper}
          >
            {slice.items.map((item, index) => (
              <SwiperSlide key={index}>
                <Card className="flex flex-col max-w-lg p-10 rounded-lg h-full">
                  <p className="mb-6 text-xl flex-1">{item.body}</p>

                  <Divider className="border-gray-200" />

                  <div className="flex items-center gap-4 mt-6">
                    <PrismicNextImage
                      className="object-cover content-center rounded-full"
                      field={item.avatar}
                      width={52}
                      height={52}
                    />

                    <div className="leading-tight">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm font-light text-gray-600">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
