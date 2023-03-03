import { SliceZone } from "@prismicio/react";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { GetStaticPropsContext } from "next";
import { HomeDocument } from "../.slicemachine/prismicio";
import Head from "next/head";

export default function Page({ page }: { page: HomeDocument }) {
  return (
    <div>
      <Head>
        <title>{page.data.title}</title>
        <meta name="description" content={page.data.description || ""} />
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home", {
    graphQuery: `
    {
      home {
        ...homeFields
        slices {
          ... on home_hero {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
              }
            }
          }
          
          ... on selling_points {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
                items {
                  selling_points {
                    ...selling_pointsFields
                  }
                }
              }
            }
          }
          
          ... on tutor_carousel {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
                items {
                  tutor {
                    ...tutorFields
                  }
                }
              }
            }
          }
          
        }
      }
    }
  `,
  });

  return {
    props: {
      page,
    },
  };
}
