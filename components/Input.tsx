import { Tooltip } from "@components/Tooltip";
import React from "react";
import {
  TextInput as MantineInput,
  PasswordInput,
  TextInputProps,
  InputBaseProps,
  DefaultProps,
  InputWrapperBaseProps,
  InputWrapperStylesNames,
} from "@mantine/core";
import { QuestionMark } from "tabler-icons-react";

export function getInputDefaults(
  props: InputWrapperBaseProps & DefaultProps & { tooltip?: string }
): InputBaseProps & DefaultProps<InputWrapperStylesNames> {
  // @ts-ignore
  return {
    size: "md",
    radius: "sm",
    className: `relative ${props.error ? "animate-shake" : ""} ${
      props.className
    }`,
    description: (
      <>
        {props.description}
        {props.tooltip && (
          <Tooltip
            className="absolute right-0 top-1.5 z-[1000]"
            label={props.tooltip}
          >
            <QuestionMark />
          </Tooltip>
        )}
      </>
    ),
    classNames: {
      error: "text-sm",
      label: "text-sm",
      description: "mb-[3px]",
      input: "border-slate-300 dark:border-slate-800",
    },
  };
}

const Input: React.FC<
  TextInputProps & {
    tooltip?: string;
    password?: boolean;
  }
> = (props) => {
  const { password, ..._props } = props;

  const defaults = getInputDefaults(_props);

  if (password)
    return (
      <PasswordInput {...defaults} {..._props} className={defaults.className} />
    );

  return (
    <MantineInput
      {...defaults}
      {..._props}
      value={_props.value || ""}
      className={defaults.className}
    />
  );
};

export { Input };
