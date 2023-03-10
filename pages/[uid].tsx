import { createClient } from "../prismicio";
import { GetStaticPropsContext } from "next";
import { PageDocument } from "@slicemachine/prismicio";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils";
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import { components } from "modules/slices/page";

export default function Page({ page }: { page?: PageDocument }) {
  return (
    <div>
      <Head>
        <title>{(page?.data.title || "") + " | Phoenix Education"}</title>
        <meta name="description" content={page?.data.description || ""} />
      </Head>
      <SliceZone slices={page?.data.slices} components={components} />
    </div>
  );
}

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params?.uid as string, {
    graphQuery: pageGraphQuery,
  });

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages
      .map((page) => asLink(page, linkResolver))
      .filter(
        (link) => !["/enrol", "/courses"].some((_link) => _link === link)
      ),
    fallback: false,
  };
}

export const pageGraphQuery = `
    {
      page {
        ...pageFields
        slices {
          ... on hero {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
              }
            }
          }
          
          ... on pricing {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
                items {
                  course {
                    ...courseFields
                  }
                  year {
                    ...yearFields
                  }
                }
              }
            }
          }
          
        }
      }
    }
  `;
