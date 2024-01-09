import { Class, Lesson, Subject } from "@common/utils/types";
import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import axios, { AxiosError } from "axios";
import { HttpExceptionClient } from "@common/utils";
import { EmailClient } from "@common/utils/emailClient";

export type Unavailability = {
  day: string;
  slots: string[];
};

export class EnrolStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  school: string;
  year: string;
  guardian: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountName?: string;
    bsb?: string;
    accountNo?: string;
  };
  unavailability: Unavailability[];
  subjects: Subject[];
  classes: Class[];
  lessons: Lesson[];
}

function removeEmptyString(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v !== null && String(v).trim() !== "")
      .map(([k, v]) => [
        k,
        typeof v === "object" && !Array.isArray(v) ? removeEmptyString(v) : v,
      ])
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const body: EnrolStudentDto = req.body;

  const variables = {
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    phoneNumber: body.phoneNumber,
    school: body.school,
    year: body.year,
    guardianName: body.guardian.firstName + " " + body.guardian.lastName,
    guardianEmail: body.guardian.email,
    guardianPhone: body.guardian.phoneNumber,
    classes:
      body.classes
        .map(
          (cls) =>
            `${cls.code} (${dayjs(
              cls.lessons.find((lesson) => lesson.selected)?.date
            ).format("D/M/YY")})`
        )
        .join(", ") || "-",
    waitingList: body.subjects.map((sub) => sub.name).join(", ") || "-",
    unavailability:
      body.unavailability
        .filter((u) => u.slots.length !== 0)
        .map((u) => `${u.day}: ${u.slots.join(", ")}\n`)
        .join("\n") || "-",
  };

  const { classes: _, lessons: __, subjects: ___, ..._body } = body;

  // Send to PhoenixLMS
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_PHOENIXLMS_ENDPOINT}/api/v1/student/public/${process.env.NEXT_PUBLIC_WORKSPACE_ID}`,
      removeEmptyString({
        ..._body,
        waitingList: body.subjects.map((sub) => ({ id: sub.id })),
        notes: variables.unavailability,
        status: "new",
      })
    );

    // Auto response email
    await EmailClient.send({
      template: "d-07c15dc9f6bc4199b9bef1e187b736ea",
      subject: "Thank you for enrolling!",
      to: body.guardian.email || body.email,
      variables,
    });

    // Email to admin
    await EmailClient.send({
      template: "d-0ec2855fabe148bf923d0ca4d71e7020",
      subject: `${body.firstName} ${body.lastName} has enrolled`,
      to: "studentregistrations@phoenixedu.com.au",
      variables,
    });

    return res.status(200).send(data);
  } catch (e: unknown) {
    const ex = e as AxiosError<any>;
    console.error(ex.response?.data);
    return res.status(500).send({
      message: String(ex.response?.data?.response?.message || ex.message),
    } as HttpExceptionClient);
  }
}
