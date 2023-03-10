import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ContactSlice } from "@slicemachine/prismicio";
import { Divider } from "@mantine/core";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Button } from "@components/Button";
import { Send } from "tabler-icons-react";

const Contact = ({ slice }: SliceComponentProps<ContactSlice>) => {
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

      <div className="flex-1 p-10 py-24 max-w-5xl mx-auto">
        <div>
          <PrismicRichText field={slice.primary.title} />
        </div>

        <Divider className="border-gray-200 my-8" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              required
              className="flex-1"
              label="Name"
              placeholder="Name"
            />

            <Input
              required
              className="flex-1"
              label="Email address"
              placeholder="Email address"
            />
          </div>

          <Textarea required label="Message" placeholder="Message" />

          <Button
            className="ml-auto mt-4"
            size="md"
            leftIcon={<Send className="w-4" />}
          >
            Send
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
