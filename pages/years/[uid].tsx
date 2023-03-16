import { SliceZone } from "@prismicio/react";
import { components } from "@modules/slices/page";
import { GetStaticPropsContext } from "next";
import { CourseDocument, YearDocument } from "@slicemachine/prismicio";
import Head from "next/head";
import { createClient } from "../../prismicio";
import { CoursePicker } from "@modules/courses/CoursePicker";
import { predicate } from "@prismicio/client";
import { getFooterProps } from "@modules/footer/Footer";

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
      <Head>
        <title>{`${year.data.name || ""} Tutoring | Phoenix Education`}</title>
      </Head>
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

  const year = await client.getByUID("year", params?.uid as string);
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
