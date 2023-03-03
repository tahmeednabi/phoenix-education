import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import Link from "next/link";
import { repositoryName } from "../prismicio";
import { ColorScheme, MantineProvider } from "@mantine/core";
import { getMantineTheme } from "../common/utils/mantine-theme";
import { Header } from "../modules/header/Header";

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme] = useState<ColorScheme>("light");

  return (
    <>
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
    </>
  );
}
