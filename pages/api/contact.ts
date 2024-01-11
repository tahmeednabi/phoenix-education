import { NextApiRequest, NextApiResponse } from "next";
import { EmailClient } from "@common/utils/emailClient";

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
  await EmailClient.send({
    template: "d-621e0d68852b46b3a16a44bba1cad3f0",
    to: body.email,
    variables: body,
  });

  const data = await EmailClient.send({
    template: "d-060f41b78e504d1db4fe4d5aa3afacf1",
    to: "info@phoenixedu.com.au",
    variables: body,
  });

  return res.send(data);
}
