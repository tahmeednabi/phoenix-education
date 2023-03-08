import React from "react";
import { Tooltip as MantineTooltip, TooltipProps } from "@mantine/core";

const Tooltip: React.FC<TooltipProps> = (props) => {
  const defaults: Omit<TooltipProps, "children"> = {
    label: "",
    multiline: true,
    withinPortal: true,
    classNames: {
      tooltip: "max-w-xs",
    },
  };

  return (
    <MantineTooltip
      {...defaults}
      {...props}
      classNames={{ ...defaults.classNames, ...props.classNames }}
    >
      <div>{props.children}</div>
    </MantineTooltip>
  );
};

export { Tooltip };
