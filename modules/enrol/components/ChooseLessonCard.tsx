import React from "react";
import { Class, EnrolStudentDto, Lesson } from "../../../pages/api/enrol";
import { Chip } from "@mantine/core";
import dayjs from "dayjs";
import { UseAsyncFormReturnType } from "@common/utils";

interface ChooseLessonCardProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
  cls?: Class;
}

export const ChooseLessonCard: React.FC<ChooseLessonCardProps> = ({
  form,
  cls,
}) => {
  if (!cls) return <></>;

  const handleClick = (lesson: Lesson, checked: boolean) => {
    form.setValues((values) => ({
      classes: values.classes?.map((_cls) => {
        if (_cls.id === cls.id)
          return {
            ..._cls,
            lessons: _cls.lessons.map((_lesson) => ({
              ..._lesson,
              selected: _lesson.id === lesson.id ? checked : false,
            })),
          };

        return _cls;
      }),
    }));
  };

  return (
    <div className="bg-slate-1000 px-5 py-4 rounded-md w-full cursor-pointer">
      <p className="font-medium">{cls.subject.name}</p>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        {cls.lessons.map((lesson) => (
          <Chip
            variant="outline"
            radius="sm"
            checked={lesson.selected}
            onChange={(checked) => handleClick(lesson, checked)}
            key={lesson.date}
          >
            {dayjs(lesson.date).format("dddd, D MMMM YYYY")}
          </Chip>
        ))}
      </div>
    </div>
  );
};
