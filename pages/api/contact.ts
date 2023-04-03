import { NextApiRequest, NextApiResponse } from "next";
import { Mailgun } from "@common/utils/mailgun";

export type ContactDto = {
  name: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const body: ContactDto = req.body;

  // Auto response email
  await Mailgun.send({
    template: "contact.autoresponse",
    subject: "Thank you for reaching out",
    to: body.email,
    variables: body,
  });

  const data = await Mailgun.send({
    template: "contact",
    subject: "New message",
    to: "info@phoenixedu.com.au",
    variables: body,
  });

  return res.send(data);
}
