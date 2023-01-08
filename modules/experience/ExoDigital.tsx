import Image from "next/image";
import React from "react";
import { Card } from "../../components/Card";
import ExoDigitalSvg from "@res/svgs/ExoDigitalSvg.svg";
import ExoLogo from "@res/svgs/ExoLogo.svg";
import ExoTeamAugSvg from "@res/svgs/ExoTeamAugSvg.svg";
import EclatLogoSvg from "@res/svgs/EclatLogoSvg.svg";

const ExoDigital: React.FC = () => {
  return (
    <Card className="relative animate-opacity text-black flex flex-col justify-center gap-6 bg-white p-24 xl:p-36">
      <Image
        src="/images/splash-bg.png"
        alt=""
        width={2563}
        height={1242}
        className="absolute w-full h-full -right-[15%] -z-10"
      />

      <a
        className="absolute top-24 left-24 xl:p-12"
        href="https://exodigital.com.au"
      >
        <ExoDigitalSvg className="w-36" viewBox="0 0 241 57" />
      </a>

      <h1 className="text-[3.5rem] mt-16">Full-stack Developer</h1>

      <h3 className="bg-gray-200 text-gray-500 tracking-wide mr-auto rounded-lg px-5 py-3">
        MAY 2022 - CURRENT
      </h3>

      <p className="max-w-xl text-gray-600">
        Worked in Agile teams of designers and developers to develop, deliver
        and deploy websites and applications for clients.
      </p>

      <div className="absolute right-16 bottom-16 flex flex-col items-end gap-4">
        <p className="text-[1rem] tracking-widest">PROJECTS</p>
        <div className="flex items-center gap-4">
          <ExoTeamAugSvg viewBox="0 0 63 63" className="w-12 h-12" />
          <ExoLogo viewBox="0 0 59 49" className="w-12 h-12" />
          <EclatLogoSvg viewBox="0 0 70 41" className="w-12 h-12" />
        </div>
      </div>
    </Card>
  );
};

export { ExoDigital };
