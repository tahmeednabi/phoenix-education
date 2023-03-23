import React from "react";
import { CourseDocument, YearDocument } from "@slicemachine/prismicio";
import { Button } from "@components/Button";
import Link from "next/link";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils";

interface CoursePickerProps {
  year?: YearDocument;
  years: YearDocument[];
  course?: CourseDocument;
  courses?: CourseDocument[];
}

export const CoursePicker: React.FC<CoursePickerProps> = ({
  year,
  years,
  course,
  courses,
}) => {
  return (
    <section className="container max-w-5xl pb-24 pt-48">
      <h2 className="w-fit">
        Courses
        <div className="w-full h-4 mt-4 bg-red-400" />
      </h2>

      <div className="flex items-center gap-4 mt-6">
        {years
          .sort((a, b) =>
            String(a.data.name).localeCompare(String(b.data.name), "en", {
              numeric: true,
            })
          )
          .map((_year) => (
            <Link key={_year.uid} href={asLink(_year, linkResolver) || ""}>
              <Button
                size="lg"
                color="slate"
                shade={7}
                variant={_year.uid === year?.uid ? "filled" : "outline"}
                radius={0}
              >
                {_year.data.name}
              </Button>
            </Link>
          ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-6">
        {courses
          ?.sort((a, b) => String(a.uid).localeCompare(b.uid))
          .map((_course) => (
            <Link key={_course.uid} href={asLink(_course, linkResolver) || ""}>
              <Button
                size="lg"
                color="slate"
                shade={7}
                variant={_course.uid === course?.uid ? "filled" : "outline"}
                radius={0}
              >
                {_course.data.subject_name}
              </Button>
            </Link>
          ))}
      </div>
    </section>
  );
};
