import React, { useState } from "react";
import { UseAsyncFormReturnType } from "@common/utils";
import { EnrolStudentDto } from "../../../pages/api/enrol";
import { Checkbox, Divider, SegmentedControl } from "@mantine/core";
import { Input } from "@components/Input";
import { useSubjects } from "../../../requests/course";

interface PaymentProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
}

export const Payment: React.FC<PaymentProps> = ({ form }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const { data, isValidating: loading } = useSubjects({
    year: form.values.year,
    limit: 50,
  });

  return (
    <div className="max-w-3xl mx-auto">
      <p className="font-normal text-xl text-gray-300">Payment details</p>
      <Divider color="gray" className="opacity-50 my-4" />

      <SegmentedControl
        data={[
          { label: "Cash", value: "cash" },
          { label: "Credit Card", value: "credit_card" },
          { label: "Bank Transfer", value: "bank_transfer" },
        ]}
        onChange={setPaymentMethod}
        className="mb-4"
      />

      {paymentMethod === "cash" && (
        <p>
          Cash payments can be made at the centre. You will receive an invoice
          from admin upon registration with the total amount payable.
        </p>
      )}

      {paymentMethod === "credit_card" && (
        <p>
          Credit card payments can be made at the centre. You will receive an
          invoice from admin upon registration with the total amount payable.
        </p>
      )}

      {paymentMethod === "bank_transfer" && (
        <div className="flex flex-col gap-4">
          <Input
            required
            label="Account name"
            placeholder="Account name"
            {...form.getInputProps("guardian.accountName")}
          />

          <Input
            required
            label="BSB"
            placeholder="BSB"
            {...form.getInputProps("guardian.bsb")}
          />

          <Input
            required
            label="Account Number"
            placeholder="Account Number"
            {...form.getInputProps("guardian.accountNo")}
          />

          <Checkbox
            className="my-4"
            label={
              <p>
                I agree to the terms and services outlined in our{" "}
                <a
                  className="underline"
                  target="_blank"
                  href="https://res.cloudinary.com/phoenixedu/image/upload/v1642320233/Form_S3_-_Direct_Debit_Request_cyiapf.pdf"
                  rel="noreferrer"
                >
                  Direct Debit Request Service Agreement
                </a>
              </p>
            }
          />
        </div>
      )}
    </div>
  );
};
