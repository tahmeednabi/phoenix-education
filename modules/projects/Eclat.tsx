import Image from "next/image";
import {
  DeviceMobile, DiamondsFour,
  GearSix,
  GlobeSimple,
  PuzzlePiece,
} from "phosphor-react";
import React from "react";
import { Card } from "../../components/Card";
import EclatBgSvg from "@res/svgs/EclatBgSvg.svg";
import EclatSvg from "@res/svgs/EclatSvg.svg";
import { ProjectBox } from "../../components/ProjectBox";

const Eclat: React.FC = () => {
  return (
    <Card className="relative animate-opacity text-black flex flex-col justify-center gap-6 bg-white p-24 xl:p-36">
      <EclatBgSvg
        className="absolute left-24 w-full h-full -z-10"
        viewBox="0 0 1230 757"
      />

      <Image
        src="/images/eclat-main.png"
        alt=""
        width={1476}
        height={1704}
        className="absolute w-1/3 h-auto"
      />

      <ProjectBox
        logo={<EclatSvg className="w-28" viewBox="0 0 164 57" />}
        slides={[
          {
            icon: <DiamondsFour fontSize={32} />,
            title: "Overview",
            body: "A mobile app for members of Eclat, a coworking space, to manage their bookings, catering and other needs.",
          },
          {
            icon: <GearSix fontSize={32} />,
            title: "DevOps",
            body: "Developed and maintained Firebase functions to handle signup flows, catering orders and more.",
          },
          {
            icon: <GlobeSimple fontSize={32} />,
            title: "Web Development",
            body: "Developed an administrator site to handle email templating and synchronisation.",
          },
          {
            icon: <DeviceMobile fontSize={32} />,
            title: "Mobile Development",
            body: "Developed, maintained and tested the Eclat mobile app in an Agile team using the React Native framework.",
          },
          {
            icon: <PuzzlePiece fontSize={32} />,
            title: "API Integration",
            body: "Integrated the mobile app and Firebase functions with the Nexudus platform",
          },
        ]}
      />
    </Card>
  );
};

export { Eclat };
