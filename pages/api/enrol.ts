import { Class, Lesson, Subject } from "@common/utils/types";
import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import axios from "axios";
import { HttpExceptionClient } from "@common/utils";
import { Mailgun } from "@common/utils/mailgun";

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
  subjects: Subject[];
  classes: Class[];
  lessons: Lesson[];
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
    classes: body.classes
      .map(
        (cls) =>
          `${cls.code} (${dayjs(
            cls.lessons.find((lesson) => lesson.selected)?.date
          ).format("D/M/YY")})`
      )
      .join(", "),
    waitingList: body.subjects.map((sub) => sub.name).join(", "),
  };

  // Auto response email
  await Mailgun.send({
    template: "enrolment.autoresponse",
    subject: "Thank you for signing up!",
    to: body.guardian.email || body.email,
    variables,
  });

  // Email to admin
  await Mailgun.send({
    template: "enrolment",
    subject: `${body.firstName} ${body.lastName} has enrolled`,
    to: "studentregistrations@phoenixedu.com.au",
    variables,
  });

  const {
    classes: _,
    lessons: __,
    subjects: ___,
    guardian: ____,
    ..._body
  } = body;

  // Send to PhoenixLMS
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_PHOENIXLMS_ENDPOINT}/api/v1/student/public/${process.env.NEXT_PUBLIC_WORKSPACE_ID}`,
      {
        ..._body,
        waitingList: body.subjects.map((sub) => ({ id: sub.id })),
        status: "new",
      }
    );
    return res.status(200).send(data);
  } catch (e: any) {
    return res.status(500).send({
      message: String(e.response?.data?.response?.message || e.message),
    } as HttpExceptionClient);
  }
}
