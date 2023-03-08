import { Divider } from "@mantine/core";
import React from "react";
import { UseAsyncFormReturnType } from "@common/utils";
import { EnrolStudentDto } from "../../../pages/api/enrol";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { YEARS } from "@common/constants";

interface StudentDetailsProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
}

export const StudentDetails: React.FC<StudentDetailsProps> = ({ form }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="font-normal text-xl text-gray-300">Student details</p>
      <Divider color="gray" className="opacity-50 my-4" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <Input
            required
            className="flex-1"
            label="First name"
            placeholder="First name"
            {...form.getInputProps("firstName")}
          />

          <Input
            required
            className="flex-1"
            label="Last name"
            placeholder="Last name"
            {...form.getInputProps("lastName")}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <Input
            className="flex-1"
            label="Email address"
            placeholder="Email address"
            {...form.getInputProps("email")}
          />

          <Input
            className="flex-1"
            label="Phone number"
            placeholder="Phone number"
            {...form.getInputProps("phoneNumber")}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <Input
            required
            className="flex-1"
            label="School"
            placeholder="School"
            {...form.getInputProps("school")}
          />

          <Select
            required
            className="w-32"
            label="Year"
            placeholder="Year"
            data={YEARS}
            {...form.getInputProps("year")}
          />
        </div>
      </div>
    </div>
  );
};
