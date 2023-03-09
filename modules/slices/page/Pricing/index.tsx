import React from "react";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { CourseDocument, PricingSlice } from "@slicemachine/prismicio";
import { uniq } from "lodash";
import { Tabs, Card, useMantineTheme } from "@mantine/core";
import { formatter } from "@common/utils";
import Link from "next/link";

const Pricing = ({ slice }: SliceComponentProps<PricingSlice>) => {
  const theme = useMantineTheme();

  const courses = slice.items.map(
    ({ course }) => course
  ) as unknown as CourseDocument[];

  const years = uniq(courses.map((course) => course.tags).flat(1));

  return (
    <section className="p-8 md:p-12">
      <div className="container max-w-5xl">
        <Tabs defaultValue={years[0]} classNames={{ tabLabel: "text-lg" }}>
          <Tabs.List>
            {years.map((year, index) => (
              <Tabs.Tab key={index} value={year}>
                {year}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {years.map((year, index) => (
            <Tabs.Panel key={index} value={year} pt={24}>
              <div className="flex flex-wrap justify-center gap-4">
                {courses
                  .filter((course) => course.tags.some((tag) => tag === year))
                  .map((course) => (
                    <Link key={course.uid} href={`/courses/${course.uid}`}>
                      <Card
                        radius="sm"
                        padding="lg"
                        className="flex flex-col w-72 h-72 shadow-xl shadow-gray-100"
                        withBorder
                      >
                        <h6>{course.data.subject_name}</h6>

                        <PrismicRichText field={course.data.features} />

                        <h5
                          className="mt-auto ml-auto w-fit px-3 p-2 mt-4 rounded text-white"
                          style={{
                            backgroundColor:
                              course.data.color || theme.colors["slate"][6],
                          }}
                        >
                          {formatter.price(course.data.price_per_term || 0, {
                            maximumFractionDigits: 0,
                          })}
                          <span className="text-sm"> per term</span>
                        </h5>
                      </Card>
                    </Link>
                  ))}
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Pricing;
