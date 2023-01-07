import React from "react";
import { Card } from "../../components/Card";
import SynqupSvg from "@res/svgs/SynqupSvg.svg";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

const Synqup: React.FC = () => {
  return (
    <Card
      className="relative animate-opacity flex flex-col justify-center gap-6 bg-[#0e0c2d] p-24 xl:p-36"
      vanta={(ref) =>
        HALO({
          THREE,
          el: ref.current,
          color: "#a32abe",
          backgroundColor: "#0e0c2d",
          xOffset: 0.3,
        })
      }
    >
      <a href="https://exodigital.com.au">
        <SynqupSvg className="absolute w-24" viewBox="0 0 139 32" />
      </a>

      <h1 className="text-[3.5rem] mt-16">Full-stack Developer</h1>

      <h3 className="bg-gradient-to-l from-pink-300 to-blue-300 text-black tracking-wide mr-auto rounded-lg px-5 py-3">
        APRIL 2020 - CURRENT
      </h3>

      <p className="max-w-xl text-gray-200">
        Developed a SaaS platform for online music collaboration and contract
        management.
      </p>
    </Card>
  );
};

export { Synqup };
