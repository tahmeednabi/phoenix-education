import { SliceZone } from "@prismicio/react";
import { components } from "@modules/slices";
import { GetStaticPropsContext } from "next";
import { CourseDocument, YearDocument } from "@slicemachine/prismicio";
import { createClient } from "../../prismicio";
import { CoursePicker } from "@modules/courses/CoursePicker";
import { predicate } from "@prismicio/client";
import { getFooterProps } from "@modules/footer/Footer";
import { courseSlicesGraphQuery } from "../courses/[uid]";
import { NextSeo } from "next-seo";

export default function Page({
  year,
  years,
  courses,
}: {
  year: YearDocument;
  years: YearDocument[];
  courses: CourseDocument[];
}) {
  return (
    <div>
      <NextSeo
        title={`${year.data.name || ""} Tutoring | Phoenix Education`}
        description={`Check out our ${year.data.name} courses.`}
        openGraph={{
          images: [
            {
              url: `/api/og?title=${encodeURIComponent(
                `${year.data.name || "HSC"} Tutoring`
              )}`,
              width: 1280,
              height: 720,
              alt: year?.data.name || "og-alt",
              type: "image/jpeg",
            },
          ],
          siteName: "Phoenix Education",
        }}
      />
      <CoursePicker year={year} years={years} courses={courses} />
      <SliceZone slices={year.data.slices} components={components} />
    </div>
  );
}

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const year = await client.getByUID("year", params?.uid as string, {
    graphQuery: yearGraphQuery,
  });
  const years = await client.getAllByType("year");
  const courses = await client.getAllByType("course", {
    predicates: [predicate.at("my.course.year", year.id)],
  });
  const footer = await getFooterProps(client);

  return {
    props: {
      year,
      years,
      courses,
      footer,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const years = await client.getAllByType("year");

  return {
    paths: years.map((year) => ({ params: { uid: year.uid } })),
    fallback: false,
  };
}

export const yearGraphQuery = `
    {
      year {
        ...yearFields
        slices {
          ${courseSlicesGraphQuery}
        }
      }
    }
  `;
