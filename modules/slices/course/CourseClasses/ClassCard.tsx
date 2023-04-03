import { Badge, Card } from "@mantine/core";
import React from "react";
import { DAYS } from "@common/constants";
import dayjs from "dayjs";
import {Class} from "@common/utils/types";

interface ClassCardProps {
  cls: Class;
}

export const ClassCard: React.FC<ClassCardProps> = ({ cls }) => {
  return (
    <Card
      className="w-64 shadow shadow-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
      withBorder
    >
      <p className="font-normal">
        {DAYS.find((day) => Number(day.value) === cls.dayOfWeek)?.label}
      </p>
      <Badge
        radius="sm"
        styles={{ root: { background: cls.subject.color, color: "white" } }}
      >
        {dayjs().startOf("day").add(cls.timeStart, "minutes").format("h:mm A")}{" "}
        - {dayjs().startOf("day").add(cls.timeEnd, "minutes").format("h:mm A")}
      </Badge>

      <div className="text-xs mt-2">
        <div className="flex">
          <p className="w-16 text-slate-500 font-normal">Tutor</p>
          <p>{cls.tutor.fullName}</p>
        </div>

        <div className="flex">
          <p className="w-16 text-slate-500 font-normal">Length</p>
          <p>{((cls.timeEnd - cls.timeStart) / 60).toPrecision(2)} hours</p>
        </div>

        <div className="flex">
          <p className="w-16 text-slate-500 font-normal">Price</p>
          <p>
            $
            {(cls.subject.price * ((cls.timeEnd - cls.timeStart) / 60)).toFixed(
              0
            )}
            /lesson
          </p>
        </div>
      </div>
    </Card>
  );
};
