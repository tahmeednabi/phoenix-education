import React, { forwardRef } from "react";
import {
  ActionIconProps,
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
  INPUT_SIZES,
  MantineTheme,
  Styles,
} from "@mantine/core";
import { merge } from "lodash";

export type ButtonProps = MantineButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const rgba = (
  theme: MantineTheme,
  shade: number,
  alpha,
  props: Pick<ButtonProps | ActionIconProps, "color">
) =>
  theme.fn.rgba(theme.colors[props.color || theme.primaryColor][shade], alpha);

export const getOutlineTheme: Styles<"root", ButtonProps | ActionIconProps> = (
  theme: MantineTheme,
  props: Pick<ButtonProps | ActionIconProps, "color" | "variant">
) => {
  if (props.variant !== "outline") return {};

  return {
    root: {
      background: rgba(theme, 6, 0.4, props),
      border: `none`,
      "&:hover": {
        background: rgba(theme, 6, 0.6, props),
      },
    },
  };
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ..._props } = props;

  const className =
    `font-normal tracking-wide transition border-none ${
      props.variant === "outline" ? `text-white text-opacity-80` : ""
    } ` + props.className;

  const defaults: MantineButtonProps = {
    style: {
      opacity: props.disabled ? 0.5 : 1,
      fontSize: INPUT_SIZES[props.size || "md"] / 2.2,
      ...props.style,
    },
    styles: (theme) =>
      merge(
        {
          rightIcon: { marginLeft: 6, marginRight: -6 },
          leftIcon: { marginRight: 6, marginLeft: -6 },
          ...getOutlineTheme(theme, props),
        },
        props.styles
      ),
    radius: 4,
    color: props.variant === "outline" ? "gray" : props.color,
    gradient: { from: "#4b53e3", to: "#d33bde", deg: 100 },
  };

  return (
    <MantineButton ref={ref} {...defaults} {..._props} className={className}>
      {children}
    </MantineButton>
  );
});

Button.displayName = "Button";

export { Button };
