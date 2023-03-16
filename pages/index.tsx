import { SliceZone } from "@prismicio/react";

import { createClient } from "../prismicio";
import { components } from "../modules/slices/page";
import { GetStaticPropsContext } from "next";
import { HomeDocument } from "@slicemachine/prismicio";
import Head from "next/head";
import { getFooterProps, FooterProps } from "@modules/footer/Footer";

export default function Page({
  page,
}: {
  page: HomeDocument;
  footer: FooterProps;
}) {
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
    graphQuery: homeGraphQuery,
  });

  const footer = await getFooterProps(client);

  return {
    props: {
      page,
      footer,
    },
  };
}

export const homeGraphQuery = `
    {
      home {
        ...homeFields
        slices {
          ... on hero {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
              }
              
              ... on videoBackground {
                primary {
                  ...primaryFields
                }
              }
            }
          }
          
          ... on content {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
                items {
                  ...itemsFields
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
                }
              }
            }
          }
          
          ... on results {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
                items {
                  ...itemsFields
                }
              }
            }
          }
          
          ... on reviews {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
                items {
                  ...itemsFields
                }
              }
            }
          }
          
          ... on contact {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
              }
            }
          }
          
        }
      }
    }
  `;
