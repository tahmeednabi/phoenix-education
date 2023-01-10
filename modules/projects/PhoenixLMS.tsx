import PhoenixBgSvg from "@res/svgs/PhoenixBgSvg.svg";
import PhoenixLMSSvg from "@res/svgs/PhoenixLMSSvg.svg";
import Image from "next/image";
import {
  Database,
  DiamondsFour,
  GearSix,
  GlobeSimple,
  PuzzlePiece,
} from "phosphor-react";
import React from "react";
import { Card } from "../../components/Card";
import { ProjectBox } from "../../components/ProjectBox";

const PhoenixLMS: React.FC = () => {
  return (
    <Card
      bgColor="#000"
      className="relative animate-opacity flex flex-col justify-center gap-6 bg-[#0e0c2d] p-8 md:p-24 xl:p-36"
    >
      <PhoenixBgSvg
        className="absolute left-0 top-0 w-auto h-full scale-110 -z-10"
        viewBox="0 0 1285 757"
      />

      <Image
        src="/images/phoenixlms-main.png"
        alt=""
        width={1622}
        height={1493}
        className="md:absolute w-full md:w-1/3 h-auto"
      />

      <ProjectBox
        link="https://www.phoenixlms.com"
        logo={<PhoenixLMSSvg className="w-56 -ml-3" viewBox="0 0 317 69" />}
        slides={[
          {
            icon: <DiamondsFour fontSize={32} />,
            title: "Overview",
            body: "An SaaS platform for tutoring businesses to track their lessons, students, payroll and collect payments.",
          },
          {
            icon: <GearSix fontSize={32} />,
            title: "DevOps",
            body: "Set up CI/CD pipeline to deploy application on AWS ECS, using Terraform for build architecture.",
          },
          {
            icon: <GlobeSimple fontSize={32} />,
            title: "Web Development",
            body: "Developed frontend using Next.js. Developed backend Node.js server using NestJS framework ",
          },
          {
            icon: <PuzzlePiece fontSize={32} />,
            title: "API Integration",
            body: "Integrated with multiple third-party providers, such as Stripe, GoCardless, Basiq, Mailgun and more.",
          },
          {
            icon: <Database fontSize={32} />,
            title: "Data Management",
            body: "Deployed and managed encrypted data on AWS RDS hosted PostgreSQL database. ",
          },
        ]}
      />
    </Card>
  );
};

export { PhoenixLMS };
