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
import localFont from "@next/font/local";
const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-DisplayThin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Inter-DisplayExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Inter-DisplayLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Display.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-DisplayMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Inter-DisplaySemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Inter-DisplayBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Inter-DisplayExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Inter-DisplayBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Footer } from "@modules/footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme] = useState<ColorScheme>("light");

  return (
    <main className={`${inter.variable} font-sans -mb-8`}>
      <MantineProvider
        theme={getMantineTheme({ colorScheme })}
        withGlobalStyles
        withNormalizeCSS
      >
        <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
          <PrismicPreview repositoryName={repositoryName}>
            <div className="flex flex-col h-screen">
              <Header />
              <div className="flex-1">
                <Component {...pageProps} />
              </div>
              {pageProps.footer && <Footer {...pageProps.footer} />}
            </div>
          </PrismicPreview>
        </PrismicProvider>
      </MantineProvider>
    </main>
  );
}
