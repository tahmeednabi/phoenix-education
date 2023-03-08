import React, { useEffect, useState } from "react";
import { notification, UseAsyncFormReturnType } from "@common/utils";
import { Class, EnrolStudentDto, Subject } from "../../../pages/api/enrol";
import { Checkbox, Divider, Loader } from "@mantine/core";
import { getClasses, useSubjects } from "../../../requests/course";
import { ClassCard } from "./ClassCard";
import { ChooseLessonCard } from "./ChooseLessonCard";
import { useDidUpdate } from "@mantine/hooks";

interface CourseProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
}

export const Courses: React.FC<CourseProps> = ({ form }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const { data, isValidating: loading } = useSubjects({
    year: form.values.year,
    limit: 50,
  });

  const handleChange = (subject: Subject, checked: boolean) => {
    form.setValues(({ subjects }) => ({
      subjects: checked
        ? [...new Set(subjects?.concat(subject))]
        : subjects?.filter(({ id }) => id !== subject.id),
    }));
  };

  const handleClassClick = (cls: Class, checked: boolean) => {
    form.setValues(({ classes }) => ({
      classes: !checked
        ? [...new Set(classes?.concat(cls))]
        : classes?.filter(({ id }) => id !== cls.id),
    }));
  };

  // Fetch classes when subjects chosen
  useEffect(() => {
    if (form.values.subjects?.length === 0) return;

    getClasses({
      subjectIds: form.values.subjects.map((subject) => subject.id),
    })
      .then(({ data }) => data && setClasses(data))
      .catch((err) => notification.error(err));
  }, [form.values.subjects]);

  // Reset form when year changed
  useDidUpdate(() => {
    form.setValues({
      subjects: [],
      classes: [],
      lessons: [],
    });
    setClasses([]);
  }, [form.values.year]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader strokeWidth={2} />
        <p className="mt-4 animate-opacity">Fetching subjects...</p>
      </div>
    );

  return (
    <div className="animate-opacity mb-4">
      <p className="font-normal text-xl text-gray-300">Select subjects</p>
      <Divider color="gray" className="opacity-50 my-4" />
      <div className="flex flex-row gap-4 flex-wrap">
        {data?.subjects.map((subject, index) => (
          <Checkbox
            key={index}
            size="lg"
            className="border-solid border-slate-800 rounded w-fit px-3 pt-3 pb-1"
            label={subject.name}
            checked={form.values.subjects?.some(({ id }) => subject.id === id)}
            onChange={({ target }) => handleChange(subject, target.checked)}
          />
        ))}
      </div>

      {form.values.subjects?.length > 0 && (
        <div className="mt-8">
          <p className="font-normal text-xl text-gray-300">Select classes</p>
          <Divider color="gray" className="opacity-50 my-4" />

          <div className="flex flex-wrap gap-4">
            {classes.map((cls) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                checked={form.values.classes.some(({ id }) => id === cls.id)}
                onClick={handleClassClick}
              />
            ))}
          </div>
        </div>
      )}

      {form.values.classes?.length > 0 && (
        <div className="mt-8">
          <p className="font-normal text-xl text-gray-300">
            Choose a date for your trial lesson
          </p>
          <Divider color="gray" className="opacity-50 my-4" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {form.values.classes.map((cls) => (
              <ChooseLessonCard key={cls.id} form={form} cls={cls} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
