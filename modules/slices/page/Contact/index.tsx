import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ContactSlice } from "@slicemachine/prismicio";
import { Divider } from "@mantine/core";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Button } from "@components/Button";
import { Send } from "tabler-icons-react";
import useAsyncForm from "@common/utils/use-async-form";
import { ContactDto } from "../../../../pages/api/contact";
import { object, string } from "yup";
import { usePost } from "@common/utils";

const Contact = ({ slice }: SliceComponentProps<ContactSlice>) => {
  const form = useAsyncForm<ContactDto>({
    initialValues: {} as ContactDto,
    schema: object({
      name: string().required("Name is required"),
      email: string().email("Invalid email").required("Email is required"),
      message: string().required("Message is required"),
    }) as any,
  });

  const handleSend = async () => {
    await form.sendForm((values) => usePost("/api/contact", values), {
      message: "Your message has been sent!",
    });
    await form.reset();
  };

  return (
    <section className="flex items-stretch">
      <div
        className="w-1/3 hidden lg:block"
        style={{
          background: `url(${slice.primary.image.url})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className="flex-1 px-10 md:px-24 py-24 max-w-5xl mx-auto">
        <div>
          <PrismicRichText field={slice.primary.title} />
        </div>

        <Divider className="border-gray-200 my-8" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              {...form.getInputProps("name")}
              required
              className="flex-1"
              label="Name"
              placeholder="Name"
            />

            <Input
              {...form.getInputProps("email")}
              required
              className="flex-1"
              label="Email address"
              placeholder="Email address"
            />
          </div>

          <Textarea
            {...form.getInputProps("message")}
            required
            label="Message"
            placeholder="Message"
          />

          <Button
            className="ml-auto mt-4"
            size="md"
            leftIcon={<Send className="w-4" />}
            disabled={!form.isDirty()}
            loading={form.loading}
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
