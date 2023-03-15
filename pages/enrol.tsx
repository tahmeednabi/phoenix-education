import { PageDocument } from "@slicemachine/prismicio";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { createClient } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "modules/slices/page";
import { Enrol } from "../modules/enrol/Enrol";
import { Footer, FooterProps, getFooterProps } from "@modules/footer/Footer";
import { pageGraphQuery } from "./[uid]";

export default function Page({
  page,
  footer,
}: {
  page: PageDocument;
  footer: FooterProps;
}) {
  return (
    <div className="dark">
      <Head>
        <title>{page.data.title}</title>
        <meta name="description" content={page.data.description || ""} />
      </Head>

      <SliceZone slices={page.data.slices} components={components} />

      <Enrol />

      <Footer {...footer} />
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "enrol", {
    graphQuery: pageGraphQuery,
  });

  const footer = await getFooterProps(client);

  return {
    props: {
      page,
      footer,
    },
  };
}
