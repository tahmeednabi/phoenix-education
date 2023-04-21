import React, { useCallback } from "react";
import { UseAsyncFormReturnType } from "@common/utils";
import { EnrolStudentDto } from "../../../pages/api/enrol";
import { Chip } from "@mantine/core";

interface AvailabilitySlotProps {
  form: UseAsyncFormReturnType<EnrolStudentDto>;
  day: string;
  slot: string;
}

export const AvailabilitySlot: React.FC<AvailabilitySlotProps> = ({
  form,
  day,
  slot,
}) => {
  const isAvailabilitySelected = () =>
    !!form.values.unavailability
      .find((availability) => availability.day === day)
      ?.slots?.some((s) => s === slot);

  const handleAvailabilityChange = useCallback(
    (checked: boolean, day: string, slot: string) => {
      form.setValues(({ unavailability }) => ({
        unavailability: unavailability?.map((availability) => {
          if (availability.day === day)
            return {
              ...availability,
              slots: checked
                ? [...availability.slots, slot]
                : availability.slots.filter((s) => s !== slot),
            };
          return availability;
        }),
      }));
    },
    [form]
  );

  return (
    <Chip
      variant="outline"
      radius="sm"
      checked={isAvailabilitySelected()}
      onChange={useCallback(
        (checked) => handleAvailabilityChange(checked, day, slot),
        [day, handleAvailabilityChange, slot]
      )}
      key={slot}
    >
      {slot}
    </Chip>
  );
};
