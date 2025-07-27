import React from "react";
import { DAYS } from "@common/constants";
import dayjs from "dayjs";
import { Checkbox } from "@mantine/core";
import { Class } from "@common/utils/types";

interface ClassCardProps {
  cls: Class;
  checked: boolean;
  onClick: (cls: Class, checked: boolean) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  cls,
  checked,
  onClick,
}) => {
  return (
    <div
      className="bg-slate-1000 px-5 py-4 rounded-md w-72 cursor-pointer"
      onClick={() => onClick(cls, checked)}
    >
      <p className="font-normal text-md">
        {DAYS.find((day) => Number(day.value) === cls.dayOfWeek)?.label}{" "}
        <span className="text-blue-400">
          {dayjs()
            .startOf("day")
            .add(cls.timeStart, "minutes")
            .format("h:mm A")}
          {" - "}
          {dayjs().startOf("day").add(cls.timeEnd, "minutes").format("h:mm A")}
        </span>
      </p>

      <div className="flex items-end justify-between">
        <div>
          <div className="flex">
            <p className="w-16 text-sm text-slate-500 font-normal">Tutor</p>
            <p className="text-sm col-span-2">{cls.tutor.fullName}</p>
          </div>

          <div className="flex">
            <p className="w-16 text-sm text-slate-500 font-normal">Subject</p>
            <p className="text-sm col-span-2">{cls.subject.name}</p>
          </div>

          <div className="flex">
            <p className="w-16 text-sm text-slate-500 font-normal">Length</p>
            <p className="text-sm col-span-2">
              {((cls.timeEnd - cls.timeStart) / 60).toPrecision(2)} hours
            </p>
          </div>

          <div className="flex">
            <p className="w-16 text-sm text-slate-500 font-normal">Price</p>
            <p className="text-sm col-span-2">
              $
              {(
                cls.subject.price *
                ((cls.timeEnd - cls.timeStart) / 60) *
                1.1
              ).toFixed(0)}
              /lesson
            </p>
          </div>
        </div>

        <Checkbox className="-mb-2" checked={checked} />
      </div>
    </div>
  );
};
