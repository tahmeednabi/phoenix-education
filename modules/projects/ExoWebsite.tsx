import Image from "next/image";
import {
  DiamondsFour,
  GearSix,
  GlobeSimple,
  PuzzlePiece,
  TestTube,
} from "phosphor-react";
import React from "react";
import { Card } from "../../components/Card";
import { ProjectBox } from "../../components/ProjectBox";
import ExoDigitalSvg from "@res/svgs/ExoDigitalSvg.svg";

const ExoWebsite: React.FC = () => {
  return (
    <Card
      bgColor="#43424E"
      className="relative animate-opacity text-black flex flex-col justify-center gap-6 bg-white p-8 md:p-24 xl:p-36"
    >
      <Image
        src="/images/splash-bg.png"
        alt=""
        width={2563}
        height={1242}
        className="absolute w-auto h-full -left-[150%] md:w-full md:h-auto md:-left-[20%] -z-10"
      />

      <Image
        src="/images/exowebsite-main.png"
        alt=""
        width={1776}
        height={1296}
        className="md:absolute md:left-[10%] w-full md:w-[40%] h-auto"
      />

      <ProjectBox
        link="https://www.exodigital.com.au"
        logo={<ExoDigitalSvg className="w-48" viewBox="0 0 241 57" />}
        slides={[
          {
            icon: <DiamondsFour fontSize={32} />,
            title: "Overview",
            body: "A simple frontend blog style website linked to a Headless CMS (Sanity)",
          },
          {
            icon: <GearSix fontSize={32} />,
            title: "DevOps",
            body: "Set up CI/CD pipeline for website rebuilding and deployment on Netlify, and Sanity Studio deployment.",
          },
          {
            icon: <GlobeSimple fontSize={32} />,
            title: "Web Development",
            body: "Developed, maintained and tested code using the Next.js framework, and TailwindCSS for styling.",
          },
          {
            icon: <PuzzlePiece fontSize={32} />,
            title: "API Integration",
            body: "Set up a headless CMS with Sanity Studio, and webhooks to rebuild site on Netlify when records updated.",
          },
          {
            icon: <TestTube fontSize={32} />,
            title: "Testing",
            body: "Set up automated Cypress tests that run on every PR, to ensure good code quality.",
          },
        ]}
      />
    </Card>
  );
};

export { ExoWebsite };
