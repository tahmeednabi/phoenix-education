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
import { JsonLd, createWebPageLd, organizationLd } from "@components/JsonLd";

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
        description={`Check out the courses for ${
          year.data.name || ""
        } at Phoenix Education. Our experienced tutors help students achieve their academic goals with personalized instruction and proven teaching methods.`}
        canonical={`https://www.phoenixedu.com.au/years/${year.uid}`}
        openGraph={{
          title: `${year.data.name || ""} Tutoring | Phoenix Education`,
          description: `Expert ${
            year.data.name || ""
          } tutoring at Phoenix Education. Our experienced tutors help students achieve their academic goals with personalized instruction and proven teaching methods.`,
          url: `https://www.phoenixedu.com.au/years/${year.uid}`,
          type: "website",
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
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `${year.data.name} tutoring, ${year.data.name} courses, Phoenix Education, education, academic support, tutoring services, Australia`,
          },
        ]}
      />

      <JsonLd
        data={createWebPageLd({
          uid: year.uid,
          data: {
            title: `${year.data.name || ""} Tutoring`,
            description: `Expert ${
              year.data.name || ""
            } tutoring at Phoenix Education.`,
          },
        })}
      />
      <JsonLd data={organizationLd} />

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
