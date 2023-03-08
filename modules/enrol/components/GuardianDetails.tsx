import { Divider } from "@mantine/core";
import React from "react";
import { UseAsyncFormReturnType } from "@common/utils";
import { EnrolStudentDto } from "../../../pages/api/enrol";
import { Input } from "@components/Input";

interface GuardianDetailsProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
}

export const GuardianDetails: React.FC<GuardianDetailsProps> = ({ form }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="font-normal text-xl text-gray-300">Guardian details</p>
      <Divider color="gray" className="opacity-50 my-4" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <Input
            required
            className="flex-1"
            label="First name"
            placeholder="First name"
            {...form.getInputProps("guardian.firstName")}
          />

          <Input
            required
            className="flex-1"
            label="Last name"
            placeholder="Last name"
            {...form.getInputProps("guardian.lastName")}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <Input
            className="flex-1"
            label="Email address"
            placeholder="Email address"
            {...form.getInputProps("guardian.email")}
          />

          <Input
            required
            className="flex-1"
            label="Phone number"
            placeholder="Phone number"
            {...form.getInputProps("guardian.phoneNumber")}
          />
        </div>
      </div>
    </div>
  );
};
