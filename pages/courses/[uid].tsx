import { SliceZone } from "@prismicio/react";
import { components } from "@modules/slices";
import { GetStaticPropsContext } from "next";
import { CourseDocument, YearDocument } from "@slicemachine/prismicio";
import { createClient } from "../../prismicio";
import { CoursePicker } from "@modules/courses/CoursePicker";
import { predicate } from "@prismicio/client";
import { getFooterProps } from "@modules/footer/Footer";
import { NextSeo } from "next-seo";
import { formatter } from "@common/utils";
import { JsonLd, createCourseLd, organizationLd } from "@components/JsonLd";

export default function Page({
  course,
  courses,
  year,
  years,
}: {
  course: CourseDocument;
  courses: CourseDocument[];
  year: YearDocument;
  years: YearDocument[];
}) {
  return (
    <div>
      <NextSeo
        title={`${course.data.title || ""} | Phoenix Education`}
        description={`Now enrolling at ${formatter.price(
          (course.data.price_per_term || 500) * 1.1
        )} per term. Read more about ${course.data.subject_name}`}
        canonical={`https://www.phoenixedu.com.au/courses/${course.uid}`}
        openGraph={{
          title: `${course.data.title || ""} | Phoenix Education`,
          description: `Now enrolling at ${formatter.price(
            (course.data.price_per_term || 500) * 1.1
          )} per term. Read more about ${course.data.subject_name}`,
          url: `https://www.phoenixedu.com.au/courses/${course.uid}`,
          images: [
            {
              url: `/api/og?title=${encodeURIComponent(
                course?.data.subject_name || "Phoenix Education"
              )}`,
              width: 1280,
              height: 720,
              alt: course?.data.subject_name || "og-alt",
              type: "image/jpeg",
            },
          ],
          type: "product",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `${course.data.title}, ${
              course.data.subject_name
            }, Phoenix Education, tutoring, education, course, ${
              year.data.name || ""
            }`,
          },
        ]}
      />

      <JsonLd data={createCourseLd(course)} />
      <JsonLd data={organizationLd} />

      <CoursePicker
        years={years}
        year={year}
        courses={courses}
        course={course}
      />
      <SliceZone slices={course.data.slices} components={components} />
    </div>
  );
}

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const course = await client.getByUID("course", params?.uid as string, {
    graphQuery: courseGraphQuery,
  });
  const years = await client.getAllByType("year");
  const year = course.data.year as unknown as YearDocument;
  const courses = await client.getAllByType("course", {
    predicates: [predicate.at("my.course.year", year.id)],
  });
  const footer = await getFooterProps(client);

  return {
    props: {
      years,
      year,
      courses,
      course,
      footer,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const courses = await client.getAllByType("course");

  return {
    paths: courses.map((course) => ({ params: { uid: course.uid } })),
    fallback: false,
  };
}

export const courseSlicesGraphQuery = `... on hero {
            variation {
              ... on default {
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
          
          ... on contact {
            variation {
              ... on default {
                primary {
                  ...primaryFields
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
          
          ... on resource {
            variation {
              ... on default {
                primary {
                  ...primaryFields
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
          
          ... on course_classes {
            variation {
              ... on default {
                primary {
                  ...primaryFields
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
`;

export const courseGraphQuery = `
    {
      course {
        ...courseFields
        year {
          ...yearFields
        }
        slices {
          ${courseSlicesGraphQuery}
        }
      }
    }
  `;
