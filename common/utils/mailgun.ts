import mailgun from "mailgun-js";

const DOMAIN = "mg.phoenixlms.com";

export class Mailgun {
  public static send({
    template,
    subject,
    to,
    from = "PhoenixLMS <postmaster@mg.phoenixlms.com>",
    variables = {},
  }: {
    template: string;
    subject: string;
    to: string;
    from?: string;
    variables?: object;
  }) {
    const client = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: DOMAIN,
    });

    return client.messages().send({
      template: template,
      subject: subject,
      from: from,
      to: to,
      "h:X-Mailgun-Variables": JSON.stringify(variables),
    });
  }
}
