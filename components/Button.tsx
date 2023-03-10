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
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    shade?: number;
  };

export const rgba = (
  theme: MantineTheme,
  shade: number,
  alpha,
  props: Pick<ButtonProps | ActionIconProps, "color">
) =>
  theme.fn.rgba(theme.colors[props.color || theme.primaryColor][shade], alpha);

export const getStyle = (
  theme: MantineTheme,
  props: Pick<ButtonProps, "color" | "variant" | "shade">
): Partial<Record<"root", CSSObject>> => {
  const shade = props.shade || 6;

  if (props.variant === "subtle")
    return {
      root: {
        backgroundColor: rgba(theme, shade, 0, props),
        border: `none`,
        "&:not([data-disabled])": theme.fn.hover({
          backgroundColor: rgba(theme, shade, 0.1, props),
        }),
      },
    };

  if (props.variant === "outline")
    return {
      root: {
        color: rgba(theme, shade, 1, props),
        backgroundColor: rgba(theme, shade, 0, props),
        border: `2px solid ${rgba(theme, shade, 0.8, props)}`,
        "&:not([data-disabled])": theme.fn.hover({
          backgroundColor: rgba(theme, shade, 0.1, props),
        }),
      },
    };

  if (props.variant === "filled")
    return {
      root: {
        backgroundColor: rgba(theme, shade, 1, props),
        border: `none`,
        "&:not([data-disabled])": theme.fn.hover({
          backgroundColor: rgba(theme, shade + 1, 1, props),
        }),
      },
    };

  return {};
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ..._props } = props;

  const className = `font-normal tracking-wide transition ` + props.className;

  const defaults: MantineButtonProps = {
    style: {
      opacity: props.disabled ? 0.5 : 1,
      ...props.style,
    },
    styles: (theme) => merge(getStyle(theme, props), props.styles),
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
