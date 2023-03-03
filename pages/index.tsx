import { SliceZone } from "@prismicio/react";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { GetStaticPropsContext } from "next";
import { AllDocumentTypes } from "../.slicemachine/prismicio";
import Head from "next/head";

export default function Page({ page }: { page: AllDocumentTypes }) {
  return (
    <>
      <Head>
        <title>{page.data.title}</title>
        <meta name="description" content={page.data.description || ""} />
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home");

  return {
    props: {
      page,
    },
  };
}
