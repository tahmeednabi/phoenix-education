import { createClient } from "../../prismicio";
import { GetStaticPropsContext } from "next";
import { PageDocument, YearDocument } from "@slicemachine/prismicio";
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import { components } from "modules/slices/page";
import { CoursePicker } from "@modules/courses/CoursePicker";

export default function Page({
  page,
  years,
}: {
  page?: PageDocument;
  years: YearDocument[];
}) {
  return (
    <div>
      <Head>
        <title>{(page?.data.title || "") + " | Phoenix Education"}</title>
        <meta name="description" content={page?.data.description || ""} />
      </Head>
      <CoursePicker years={years} />
      <SliceZone slices={page?.data.slices} components={components} />
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "courses");

  const years = await client.getAllByType("year");

  return {
    props: {
      page,
      years,
    },
  };
}
