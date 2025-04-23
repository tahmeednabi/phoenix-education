import React, { useCallback, useState } from "react";
import useAsyncForm from "@common/utils/use-async-form";
import { Unavailability, EnrolStudentDto } from "../../pages/api/enrol";
import {
  MantineProvider,
  Stepper,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { Books, Check, Users } from "tabler-icons-react";
import { GraduationCap, Warning } from "phosphor-react";
import { Button } from "@components/Button";
import { GuardianDetails } from "./components/GuardianDetails";
import { StudentDetails } from "./components/StudentDetails";
import { getMantineTheme, usePost } from "@common/utils";
import { Courses, weekdays, weekends } from "./components/Courses";
import { array, object, string } from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Summary } from "./components/Summary";
import { Checkmark } from "@components/Checkmark";
import { Class, Lesson, Subject } from "@common/utils/types";

export const Enrol: React.FC = () => {
  const theme = useMantineTheme();
  const [active, setActive] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useAsyncForm<EnrolStudentDto>({
    initialValues: {
      guardian: {} as EnrolStudentDto["guardian"],
      subjects: [] as Subject[],
      classes: [] as Class[],
      lessons: [] as Lesson[],
      unavailability: [
        ...weekdays.map((day) => ({ day, slots: [] })),
        ...weekends.map((day) => ({ day, slots: [] })),
      ] as Unavailability[],
    } as EnrolStudentDto,
    schema: object({
      firstName: string().required("First name is required"),
      lastName: string().required("Last name is required"),
      email: string().email("Invalid email"),
      phoneNumber: string().test(
        "phone-number-test",
        "Phone number is invalid",
        (value) => (value ? isValidPhoneNumber(value, "AU") : true)
      ),
      school: string().required("Please enter your school"),
      year: string().required("Please select a year"),
      subjects: array().min(1, "Please choose at least one subject"),
      guardian: object({
        firstName: string().required("First name is required"),
        lastName: string().required("Last name is required"),
        email: string().email("Invalid email"),
        phoneNumber: string()
          .required("Phone number is required")
          .test("phone-number-test", "Phone number is invalid", (value) =>
            value ? isValidPhoneNumber(value, "AU") : true
          ),
      }),
    }) as any,
  });

  const handleBack = () => {
    setActive((active) => (active === 0 ? 0 : active - 1));
  };

  const gtag_report_conversion = useCallback((url?: string) => {
    // @ts-ignore - gtag is added via script in _document.tsx
    const gtag = window.gtag;
    if (typeof gtag !== "function") return false;

    const callback = function () {
      if (typeof url !== "undefined") {
        window.location.href = url;
      }
    };

    gtag("event", "conversion", {
      send_to: "AW-11533006224/4uP5CKTOm7waEJDrrvsq",
      event_callback: callback,
    });

    return false;
  }, []);

  const handleSubmit = async () => {
    setSubmitted(true);
    const { error } = await form.sendForm((values) =>
      usePost("/api/enrol", values)
    );

    if (error) {
      setError(error.message);
    } else {
      // Trigger conversion tracking on successful form submission
      gtag_report_conversion();
    }
  };

  const handleNext = useCallback(async () => {
    let error = false;
    switch (active) {
      case 0:
        error = await form.validateFieldsAsync([
          "guardian.firstName",
          "guardian.lastName",
          "guardian.email",
          "guardian.phoneNumber",
        ]);
        break;
      case 1:
        error = await form.validateFieldsAsync([
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "school",
          "year",
        ]);
        break;
      case 2:
        error = await form.validateFieldsAsync(["subjects"]);
        break;
      default:
    }

    if (error) return;
    if (active >= 3) return handleSubmit();
    return setActive(active + 1);
  }, [form, active]);

  let body = (
    <div className="border-solid border-gray-500 border-opacity-30 rounded p-16">
      <Stepper
        color="blue"
        active={active}
        onStepClick={(value) =>
          setActive((active) => (value < active ? value : active))
        }
        breakpoint="sm"
        completedIcon={<Check />}
        styles={{
          step: { color: theme.white },
          stepDescription: { color: theme.colors.gray[4] },
          separator: {
            backgroundColor: theme.colors.gray[5],
          },
          separatorActive: {
            backgroundColor: theme.colors.blue[5],
          },
          stepIcon: {
            color: theme.white,
            backgroundColor: theme.colors.slate[9],
            borderColor: theme.colors.gray[5],
          },
          content: {
            padding: "3rem 0",
          },
        }}
      >
        <Stepper.Step
          label="Step 1"
          description="Guardian"
          icon={<Users className="w-4 h-4" />}
        >
          <GuardianDetails form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Step 2"
          description="Student"
          icon={<GraduationCap className="w-4 h-4" />}
        >
          <StudentDetails form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Step 3"
          description="Courses"
          icon={<Books className="w-4 h-4" />}
        >
          <Courses form={form} />
        </Stepper.Step>

        <Stepper.Completed>
          <Summary form={form} />
        </Stepper.Completed>
      </Stepper>

      <div className="flex justify-end gap-4">
        <Button color="gray" variant="subtle" size="sm" onClick={handleBack}>
          Back
        </Button>

        <Button color="blue" size="sm" onClick={handleNext}>
          {active === 3 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );

  if (submitted || form.loading)
    body = (
      <div className="border-solid border-gray-500 border-opacity-30 rounded p-16">
        <div className="flex flex-col justify-center items-center gap-2 my-6">
          {error ? (
            <ThemeIcon size="xl" radius="xl" color="red">
              <Warning className="w-6 h-6" />
            </ThemeIcon>
          ) : (
            <Checkmark loading={form.loading} />
          )}

          {!form.loading && (
            <div className="max-w-md text-center animate-opacity">
              <h4>{error ? "Sorry, something went wrong!" : "Thank you!"}</h4>
              <p className="text-gray-400 text-xl">
                {error ||
                  `Our team will reach out to you with more information about your
                enrolment.`}
              </p>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <MantineProvider
      theme={{
        ...getMantineTheme({ colorScheme: "dark" }),
        primaryColor: "blue",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <section className="container py-32">{body}</section>
    </MantineProvider>
  );
};
