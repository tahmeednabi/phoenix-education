import React, { useEffect, useState } from "react";
import { notification, UseAsyncFormReturnType } from "@common/utils";
import { EnrolStudentDto } from "../../../pages/api/enrol";
import { Alert, Card, Checkbox, Divider, Loader } from "@mantine/core";
import { getClasses, useSubjects } from "../../../requests/course";
import { ClassCard } from "./ClassCard";
import { ChooseLessonCard } from "./ChooseLessonCard";
import { useDidUpdate } from "@mantine/hooks";
import { AlertTriangle } from "tabler-icons-react";
import { Class, Subject } from "@common/utils/types";
import { AvailabilitySlot } from "@modules/enrol/components/AvailabilitySlot";

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const weekends = ["Sat", "Sun"];
export const weekdaySlots = ["4:30 PM - 6:30 PM", "6:30 PM - 8:30 PM"];
export const weekendSlots = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
];

interface CourseProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
}

export const Courses: React.FC<CourseProps> = ({ form }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const {
    data,
    isValidating: loading,
    error,
  } = useSubjects({
    year: form.values.year,
    limit: 50,
  });

  const waitingListSubjects = form.values.subjects.filter(
    (subject) =>
      !form.values.classes.some((cls) => cls.subject.id === subject.id)
  );

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
      .then(
        ({ data }) =>
          data &&
          setClasses(
            data.filter((cls) => !cls.subject.name.includes("Accelerated"))
          )
      )
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

  if (error)
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="max-w-xs text-center text-lg mt-4 animate-opacity">{`Sorry we're having some technical issues! Please try again later`}</p>
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
            className="border-solid border-slate-800 rounded w-fit px-3 py-2"
            label={subject.name}
            checked={form.values.subjects?.some(({ id }) => subject.id === id)}
            onChange={({ target }) => handleChange(subject, target.checked)}
          />
        ))}
      </div>

      {form.values.subjects.filter((sub) => sub.name.includes("Accelerated"))
        .length > 0 && (
        <Alert
          className="animate-opacity mt-6 max-w-md mx-auto"
          variant="light"
          icon={<AlertTriangle />}
          color="yellow"
          title="Warning"
        >
          You must go through an entrance exam before you enrol in Accelerated
          classes. Reach out to us for more information.
        </Alert>
      )}

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

      {waitingListSubjects.length > 0 && (
        <div className="mt-8">
          <p className="font-normal text-xl text-gray-300">
            Select times that you are unavailable
          </p>
          <Divider color="gray" className="opacity-50 my-4" />
          <Card withBorder className="overflow-x-auto">
            <div className="flex items-start gap-2">
              {weekdays?.map((day) => (
                <div
                  className="flex flex-col items-stretch text-center gap-2"
                  key={day}
                >
                  <b>{day}</b>
                  {weekdaySlots.map((slot) => (
                    <AvailabilitySlot
                      key={slot}
                      form={form}
                      day={day}
                      slot={slot}
                    />
                  ))}
                </div>
              ))}

              {weekends?.map((day) => (
                <div
                  className="flex flex-col items-stretch text-center gap-2"
                  key={day}
                >
                  <b>{day}</b>
                  {weekendSlots.map((slot) => (
                    <AvailabilitySlot
                      key={slot}
                      form={form}
                      day={day}
                      slot={slot}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
