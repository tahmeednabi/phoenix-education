import { SliceZone } from "@prismicio/react";

import { createClient } from "../prismicio";
import { components } from "../modules/slices/page";
import { GetStaticPropsContext } from "next";
import { HomeDocument } from "@slicemachine/prismicio";
import { getFooterProps, FooterProps } from "@modules/footer/Footer";
import { NextSeo } from "next-seo";
import { JsonLd, organizationLd } from "@components/JsonLd";

export default function Page({
  page,
}: {
  page: HomeDocument;
  footer: FooterProps;
}) {
  return (
    <div>
      <NextSeo
        title={page.data.title || "Phoenix Education"}
        description={page.data.description || ""}
        canonical="https://www.phoenixedu.com.au"
        openGraph={{
          title: page.data.title || "",
          description: page.data.description || "",
          url: "https://www.phoenixedu.com.au",
          type: "website",
          images: [
            {
              url: "/home-og.jpg",
              width: 1280,
              height: 720,
              alt: "Home",
              type: "image/jpeg",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Phoenix Education, tutoring, education, courses, learning, academic, school, university, HSC, VCE, QCE, ATAR, Australia",
          },
        ]}
      />

      <JsonLd data={organizationLd} />

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
