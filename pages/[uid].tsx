import { createClient } from "../prismicio";
import { GetStaticPropsContext } from "next";
import { PageDocument } from "@slicemachine/prismicio";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils";
import { SliceZone } from "@prismicio/react";
import { components } from "modules/slices";
import { getFooterProps } from "@modules/footer/Footer";
import { NextSeo } from "next-seo";

export default function Page({ page }: { page?: PageDocument }) {
  return (
    <div>
      <NextSeo
        title={(page?.data.title || "") + " | Phoenix Education"}
        description={page?.data.description || ""}
        openGraph={{
          title: (page?.data.title || "") + " | Phoenix Education",
          description: page?.data.description || "",
          images: [
            {
              url: `/api/og?title=${encodeURIComponent(
                page?.data.title || "Phoenix Education"
              )}`,
              width: 1280,
              height: 720,
              alt: page?.data.title || "og-alt",
              type: "image/jpeg",
            },
          ],
          siteName: "Phoenix Education",
        }}
      />

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

  const footer = await getFooterProps(client);

  return {
    props: {
      page,
      footer,
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
              
              ... on videoBackground {
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
                    year {
                      ...yearFields
                    }
                  }
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
          
          ... on discounts {
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
          
          ... on timeline {
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
          
          ... on course_tutors {
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
          
          ... on resource {
            variation {
              ... on default {
                primary {
                  ...primaryFields
                }
              }
            }
          }
          
          ... on results_list {
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
        }
      }
    }
  `;
