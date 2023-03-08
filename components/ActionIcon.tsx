import { rgba } from "@components/Button";
import { Tooltip } from "@components/Tooltip";
import React from "react";
import {
  ActionIcon as MantineActionIcon,
  ActionIconProps,
  MantineTheme,
  ThemeIcon,
} from "@mantine/core";

const getTheme = (theme: MantineTheme, props: ActionIconProps) => {
  if (props.variant === "transparent")
    return {
      "&:hover": {
        background: rgba(theme, 5, 0.2, props),
      },
    };

  if (props.variant === "light")
    return {
      background: rgba(theme, 6, 0.3, props),
      "&:hover": {
        background: rgba(theme, 6, 0.4, props),
      },
    };

  return {
    color: rgba(theme, 3, 0.8, props),
    background: rgba(theme, 9, 0.6, props),
    border: `none`,
    "&:hover": {
      background: rgba(theme, 9, 0.7, props),
    },
  };
};

const ActionIcon: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    ActionIconProps & {
      active?: boolean;
      gradient?: boolean;
      tooltip?: string;
    }
> = (props) => {
  const { active, gradient, tooltip, ..._props } = props;
  const color = props.variant !== "transparent" ? "primary" : "gray";

  const defaults: ActionIconProps = {
    size: "md",
    variant: "outline",
    color,
    radius: "sm",
    p: 4,
    style: {},
    sx: (theme) => getTheme(theme, { color, ...props }),
  };

  if (gradient)
    return (
      <MantineActionIcon {...defaults} {..._props} p={0} variant="transparent">
        <ThemeIcon
          style={{ backgroundOrigin: "border-box" }}
          size={props.size || defaults.size}
          radius={props.radius || defaults.radius}
          p={props.p || defaults.p}
          variant="gradient"
          gradient={{ from: "indigo", to: "pink", deg: 60 }}
        >
          {props.children}
        </ThemeIcon>
      </MantineActionIcon>
    );

  let component = (
    <MantineActionIcon
      {...defaults}
      {..._props}
      variant={active ? "filled" : props.variant || defaults.variant}
    />
  );

  if (tooltip) component = <Tooltip label={tooltip}>{component}</Tooltip>;

  return component;
};

export { ActionIcon };
