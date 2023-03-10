import { SliceZone } from "@prismicio/react";
import { components } from "@modules/slices/page";
import { courseComponents } from "@modules/slices/course";
import { GetStaticPropsContext } from "next";
import { CourseDocument, YearDocument } from "@slicemachine/prismicio";
import Head from "next/head";
import { createClient } from "../../prismicio";
import { CoursePicker } from "@modules/courses/CoursePicker";
import { predicate } from "@prismicio/client";

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
      <Head>
        <title>{course.data.title}</title>
        <meta name="description" content={course.data.subject_name || ""} />
      </Head>
      <CoursePicker
        years={years}
        year={year}
        courses={courses}
        course={course}
      />
      <SliceZone
        slices={course.data.slices}
        components={{ ...components, ...courseComponents }}
      />
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

  return {
    props: {
      years,
      year,
      courses,
      course,
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

export const courseGraphQuery = `
    {
      course {
        ...courseFields
        year {
          ...yearFields
        }
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
          
        }
      }
    }
  `;
