import React, { forwardRef } from "react";
import {
  ActionIconProps,
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
  MantineTheme,
} from "@mantine/core";
import { merge } from "lodash";
import { CSSObject } from "@mantine/styles/lib/tss";

export type ButtonProps = MantineButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const rgba = (
  theme: MantineTheme,
  shade: number,
  alpha,
  props: Pick<ButtonProps | ActionIconProps, "color">
) =>
  theme.fn.rgba(theme.colors[props.color || theme.primaryColor][shade], alpha);

export const getStyle = (
  theme: MantineTheme,
  props: Pick<ButtonProps | ActionIconProps, "color" | "variant">
): Partial<Record<"root", CSSObject>> => {
  if (props.variant === "subtle")
    return {
      root: {
        backgroundColor: rgba(theme, 6, 0, props),
        border: `none`,
        "&:not([data-disabled])": theme.fn.hover({
          backgroundColor: rgba(theme, 6, 0.1, props),
        }),
      },
    };

  if (props.variant === "outline")
    return {
      root: {
        backgroundColor: rgba(theme, 6, 0.1, props),
        border: `1px solid ${rgba(theme, 6, 0.8, props)}`,
        "&:not([data-disabled])": theme.fn.hover({
          backgroundColor: rgba(theme, 6, 0.2, props),
        }),
      },
    };

  return {};
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ..._props } = props;

  const className =
    `font-normal tracking-wide transition ${
      props.variant === "outline" ? `text-white text-opacity-80` : ""
    } ` + props.className;

  const defaults: MantineButtonProps = {
    style: {
      opacity: props.disabled ? 0.5 : 1,
      ...props.style,
    },
    styles: (theme) =>
      merge(
        {
          rightIcon: { marginLeft: 6, marginRight: -6 },
          leftIcon: { marginRight: 6, marginLeft: -6 },
          ...getStyle(theme, props),
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
