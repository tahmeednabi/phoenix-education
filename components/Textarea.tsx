import { getInputDefaults } from "@components/Input";
import React from "react";
import { Textarea as MantineTextarea, TextareaProps } from "@mantine/core";

const Textarea: React.FC<TextareaProps> = (props) => {
  const defaults: TextareaProps = getInputDefaults(props);

  return <MantineTextarea {...defaults} {...props} />;
};

export { Textarea };
