import { Swiper, SwiperProps } from "@components/Swiper";
import { Swiper as _Swiper } from "swiper";
import { getNonNullKeys, UseAsyncFormReturnType } from "@common/utils";
import React, { useEffect, useState } from "react";

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

type Paths<T, D extends number = 4> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

interface SwiperFormProps<T extends object> extends SwiperProps {
  form: UseAsyncFormReturnType<T>;
  validateFields: Array<Array<Paths<T>>>;
}

function SwiperForm<T extends object>(props: SwiperFormProps<T>) {
  const [swiper, setSwiper] = useState<_Swiper | null>(null);
  const { form, validateFields, ..._props } = props;

  // Slide to relevant slide when error returned
  useEffect(() => {
    const errorFields = Object.keys(getNonNullKeys(form.errors));

    // Iterate through fields and find the first slide with an error
    validateFields.forEach((fields, slide) => {
      fields.forEach((field) => {
        if (errorFields.some((error) => error === field)) {
          return swiper?.slideTo(slide);
        }
      });
    });
  }, [form.errors]);

  // Resize slide when required
  useEffect(() => {
    swiper?.update();
  }, [form.values, form.errors]);

  // Validate fields on the current slide
  const onSlideNext = async (slide: number) => {
    let error = false;

    if (slide < validateFields.length) {
      for (const field of validateFields[slide]) {
        try {
          // @ts-ignore
          if (await form.validateFieldAsync(field)) {
            error = true;
          }
        } catch (e) {}
      }
    }

    if (error) return true;
    if (_props.onSlideNext) return _props.onSlideNext(slide);
    return false;
  };

  return (
    <Swiper
      onSwiper={(swiper) => setSwiper(swiper)}
      loading={form.loading}
      {..._props}
      onSlideNext={onSlideNext}
    >
      {_props.children}
    </Swiper>
  );
}

export { SwiperForm };
