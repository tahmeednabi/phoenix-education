import React from "react";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import {
  CourseDocument,
  PricingSlice,
  YearDocument,
} from "@slicemachine/prismicio";
import { Tabs, Card, useMantineTheme } from "@mantine/core";
import { formatter } from "@common/utils";
import Link from "next/link";
import { uniqBy } from "lodash";

const Pricing = ({ slice }: SliceComponentProps<PricingSlice>) => {
  const theme = useMantineTheme();

  const courses = slice.items.map(
    ({ course }) => course
  ) as unknown as CourseDocument[];

  const years = uniqBy(
    courses.map((course) => course.data.year) as unknown as YearDocument[],
    (year) => year.uid
  ).sort((a, b) =>
    new Intl.Collator([], { numeric: true }).compare(a.uid, b.uid)
  );

  return (
    <section className="px-8 md:px-12 py-24">
      <div className="container max-w-5xl">
        <Tabs defaultValue={years[0].uid} classNames={{ tabLabel: "text-lg" }}>
          <Tabs.List>
            {years.map((year, index) => (
              <Tabs.Tab key={index} value={year.uid}>
                {year.data.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {years.map((year, index) => (
            <Tabs.Panel key={index} value={year.uid} pt={24}>
              <div className="flex flex-wrap justify-center gap-4">
                {courses
                  .filter(
                    (course) =>
                      (course.data.year as unknown as YearDocument).uid ===
                      year.uid
                  )
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
