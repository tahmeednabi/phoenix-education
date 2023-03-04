import { PageDocument } from "../.slicemachine/prismicio";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { createClient } from "../prismicio";

export default function Page({ page }: { page: PageDocument }) {
  return (
    <div>
      <Head>
        <title>{page.data.title}</title>
        <meta name="description" content={page.data.description || ""} />
      </Head>
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "enrol");

  return {
    props: {
      page,
    },
  };
}
