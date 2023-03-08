import React, { useState } from "react";
import {
  Swiper as _Swiper,
  SwiperSlide,
  SwiperProps as _SwiperProps,
  useSwiper,
} from "swiper/react";
import { Pagination } from "swiper";
import { Button } from "./Button";

export interface SwiperProps extends _SwiperProps {
  children: React.ReactNode[];
  loading?: boolean;
  initialSlide?: number;
  onSlideNext?: (slide: number) => Promise<boolean>;
  onFinish?: () => void;
}

export type SwiperNavigationProps = Omit<SwiperProps, "children"> & {
  activeIndex: number;
};

const Swiper: React.FC<SwiperProps> = ({
  children,
  loading,
  initialSlide = 0,
  onSlideNext,
  onFinish,
  ..._props
}) => {
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  return (
    <_Swiper
      modules={[Pagination]}
      pagination={{
        type: "progressbar",
        progressbarFillClass: "swiper-pagination-progressbar-fill bg-blue-500",
      }}
      slidesPerView={1}
      autoHeight
      allowTouchMove={false}
      initialSlide={initialSlide}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      {..._props}
    >
      {children.map((node, index) => (
        <SwiperSlide key={index}>
          <div className="my-6">{node}</div>
        </SwiperSlide>
      ))}

      <SwiperNavigation
        activeIndex={activeIndex}
        loading={loading}
        onSlideNext={onSlideNext}
        onFinish={onFinish}
      />
    </_Swiper>
  );
};

const SwiperNavigation: React.FC<SwiperNavigationProps> = ({
  activeIndex,
  onSlideNext,
  onFinish,
  loading,
}) => {
  const swiper = useSwiper();
  /**
   * Sends slide number to parent to perform step-by-step validation.
   * Parent function should return boolean to approve moving
   * slides
   */
  const handleNext = async () => {
    if (onSlideNext) {
      const hasError = await onSlideNext(activeIndex);
      if (hasError) return;
    }
    swiper.slideNext();
  };

  const handleBack = () => {
    if (!swiper) return;

    if (activeIndex === 0) return;
    swiper.slidePrev();
  };

  return (
    <>
      <Button
        className="float-right"
        loading={loading}
        color="blue"
        onClick={
          activeIndex === swiper.slides.length - 1 ? onFinish : handleNext
        }
      >
        {activeIndex === swiper.slides.length - 1 ? "Finish" : "Next"}
      </Button>

      <Button
        color="gray"
        variant="subtle"
        className="float-right mr-2"
        disabled={activeIndex === 0}
        onClick={handleBack}
      >
        Back
      </Button>
    </>
  );
};

export { Swiper, SwiperNavigation };
