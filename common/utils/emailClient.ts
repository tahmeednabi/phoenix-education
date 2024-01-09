import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export class EmailClient {
  public static send({
    template,
    subject,
    to,
    from = "admin@phoenixlms.com",
    variables = {},
  }: {
    template: string;
    subject: string;
    to: string;
    from?: string;
    variables?: object;
  }) {
    return sgMail.send({
      templateId: template,
      subject: subject,
      from: from,
      to: to,
      dynamicTemplateData: variables,
    });
  }
}
