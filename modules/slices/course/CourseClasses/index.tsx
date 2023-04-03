import React, { useEffect, useState } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { CourseClassesSlice } from "@slicemachine/prismicio";
import { getClasses } from "../../../../requests/course";
import { ClassCard } from "./ClassCard";
import { ScrollArea } from "@mantine/core";
import {Class} from "@common/utils/types";

const CourseClasses = ({ slice }: SliceComponentProps<CourseClassesSlice>) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    if (!slice.primary.subject_id) return;

    setLoading(true);

    getClasses({ subjectIds: [slice.primary.subject_id] })
      .then(({ data }) => {
        if (!data) return;
        setClasses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slice.primary.subject_id]);

  if (classes.length === 0 && !loading) return <></>;

  return (
    <section>
      <div className="container py-24">
        <div className="text-left">
          <PrismicRichText field={slice.primary.title} />
          <PrismicRichText field={slice.primary.description} />
        </div>

        <ScrollArea scrollbarSize={6}>
          <div className="flex gap-4 mt-16 mb-8">
            {classes.map((cls) => (
              <ClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

export default CourseClasses;
