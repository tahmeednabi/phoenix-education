import { Divider } from "@mantine/core";
import React from "react";
import { UseAsyncFormReturnType } from "@common/utils";
import { EnrolStudentDto } from "../../../pages/api/enrol";
import dayjs from "dayjs";

interface SummaryProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
}

export const Summary: React.FC<SummaryProps> = ({ form }) => {
  const waitingListSubjects = form.values.subjects.filter(
    (subject) =>
      !form.values.classes.some((cls) => cls.subject.id === subject.id)
  );

  return (
    <div className="max-w-3xl mx-auto">
      <p className="font-normal text-xl text-gray-300">Summary</p>
      <Divider color="gray" className="opacity-50 my-4" />

      <div className="grid grid-cols-3 gap-6">
        <p className="font-medium text-gray-400">Guardian Details</p>

        <div className="col-span-2">
          <p>
            {form.values.guardian.firstName} {form.values.guardian.lastName}
          </p>
          <p>{form.values.guardian.email}</p>
          <p>{form.values.guardian.phoneNumber}</p>
        </div>

        <p className="font-medium text-gray-400">Student Details</p>

        <div className="col-span-2">
          <p>
            {form.values.firstName} {form.values.lastName}
          </p>
          <p>{form.values.email}</p>
          <p>{form.values.phoneNumber}</p>
          <p>
            {form.values.school} - {form.values.year}
          </p>
        </div>

        <p className="font-medium text-gray-400">Course</p>

        <div className="col-span-2">
          {waitingListSubjects.length !== 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-500">Waiting List</p>
              <p>
                {waitingListSubjects.map((subject) => subject.name).join(", ")}
              </p>
            </div>
          )}

          {form.values.classes.length !== 0 && (
            <div>
              <p className="text-sm text-gray-500">Classes</p>
              {form.values.classes.map((cls) => (
                <p key={cls.id}>
                  {cls.subject.name} (Trial on{" "}
                  <span className="font-medium text-blue-300">
                    {dayjs(
                      cls.lessons.find((lesson) => lesson.selected)?.date
                    ).format("dddd D/M/YY")}
                  </span>
                  )
                </p>
              ))}
            </div>
          )}
        </div>

        {form.values.guardian.accountNo && (
          <>
            <p className="font-medium text-gray-400">Payment</p>

            <div className="col-span-2">
              <p>{form.values.guardian.accountName}</p>
              <p className="text-sm">
                {form.values.guardian.bsb} - {form.values.guardian.accountNo}
              </p>
            </div>
          </>
        )}

        {waitingListSubjects.length > 0 && (
          <>
            <p className="font-medium text-gray-400">Unavailable</p>

            <div className="col-span-2">
              {form.values.unavailability
                .filter((u) => u.slots.length !== 0)
                .map((u) => (
                  <div key={u.day} className="mb-1">
                    <p className="text-sm text-gray-500">{u.day}</p>
                    <p className="text-sm">{u.slots.join(", ")}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
