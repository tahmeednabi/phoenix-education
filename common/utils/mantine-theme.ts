import { MantineThemeColors, MantineThemeOverride } from "@mantine/core";
import { DeepPartial } from "@mantine/styles/lib/theme/types/DeepPartial";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss/types";
import config from "../../tailwind.config";

// @ts-ignore
const tailwindConfig = resolveConfig(config) as Config;

const tailwindColorMapping = (
  config: typeof tailwindConfig
): DeepPartial<MantineThemeColors> => {
  const keys = Object.keys(config.theme?.accentColor || {});
  const colors: Record<string, any> = {};
  keys.forEach((key) => {
    // @ts-ignore
    if ([...Object.values(config.theme.accentColor[key])][0].length === 7) {
      // @ts-ignore
      colors[key] = [...Object.values(config.theme.accentColor[key])];
    }
  });
  return colors;
};

export function getMantineTheme(
  theme: MantineThemeOverride
): MantineThemeOverride {
  const colors = tailwindColorMapping(tailwindConfig);
  return {
    colorScheme: "light",
    fontFamily: "Inter",
    primaryColor: tailwindConfig.theme?.primaryColor || "red",
    primaryShade: 5,
    colors,
    focusRing: "never",
    components: {
      Popover: {
        defaultProps: {
          transition: "fade",
        },
      },
      Badge: {
        defaultProps: {
          radius: 8,
        },
      },
      Menu: {
        defaultProps: {
          radius: 8,
        },
      },
      Input: {
        styles: {
          input: {
            borderColor: colors?.slate ? colors.slate[8] : undefined,
          },
        },
      },
    },
    ...theme,
  };
}
