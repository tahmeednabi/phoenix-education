import { NextApiRequest, NextApiResponse } from "next";
import mailgun from "mailgun-js";

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

  const DOMAIN = "mg.phoenixlms.com";
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: DOMAIN,
  });

  const data1 = {
    from: "PhoenixLMS <postmaster@mg.phoenixlms.com>",
    to: body.email,
    subject: "Thank you for reaching out",
    template: "contact.autoresponse",
    "h:X-Mailgun-Variables": JSON.stringify(body),
  };

  const data2 = {
    from: "PhoenixLMS <postmaster@mg.phoenixlms.com>",
    to: "info@phoenixedu.com.au",
    subject: "New message",
    template: "contact",
    "h:X-Mailgun-Variables": JSON.stringify(body),
  };

  // Send auto-response
  await mg.messages().send(data1);

  // Send contact info
  const res2 = await mg.messages().send(data2);

  return res.send(res2);
}
