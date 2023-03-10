import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import Link from "next/link";
import { repositoryName } from "../prismicio";
import { ColorScheme, MantineProvider } from "@mantine/core";
import { getMantineTheme } from "@common/utils";
import { Header } from "../modules/header/Header";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
dayjs.extend(LocalizedFormat);
dayjs.extend(duration);

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme] = useState<ColorScheme>("light");

  return (
    <div className="-mb-8">
      <MantineProvider
        theme={getMantineTheme({ colorScheme })}
        withGlobalStyles
        withNormalizeCSS
      >
        <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
          <PrismicPreview repositoryName={repositoryName}>
            <Header />
            <Component {...pageProps} />
          </PrismicPreview>
        </PrismicProvider>
      </MantineProvider>
    </div>
  );
}
