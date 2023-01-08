import SynqupSvg from "@res/svgs/SynqupSvg.svg";
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
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

const SynqupProject: React.FC = () => {
  return (
    <Card
      className="relative animate-opacity flex flex-col justify-center gap-6 bg-[#0e0c2d] p-24 xl:p-36"
      vanta={(ref) =>
        HALO({
          THREE,
          el: ref.current,
          color: "#a32abe",
          backgroundColor: "#0e0c2d",
          xOffset: -0.2,
        })
      }
    >
      <ProjectBox
        logo={<SynqupSvg className="w-36" viewBox="0 0 139 32" />}
        slides={[
          {
            icon: <DiamondsFour fontSize={32} />,
            title: "Overview",
            body: "An online music collaboration platform, for music creators to work on their music together, live.",
          },
          {
            icon: <GearSix fontSize={32} />,
            title: "DevOps",
            body: "Set up CI/CD pipeline to deploy backend on DigitalOcean droplet, and frontend on Netlify.",
          },
          {
            icon: <GlobeSimple fontSize={32} />,
            title: "Web Development",
            body: "Developed using React.js, implementing features with advanced tools such as web workers and sockets.",
          },
          {
            icon: <PuzzlePiece fontSize={32} />,
            title: "API Integration",
            body: "Integrated with Amity Social to provide users with live chats and social network features.",
          },
          {
            icon: <Database fontSize={32} />,
            title: "Data Management",
            body: "Integrated and managed data on remote MongoDB database and Amity Social.",
          },
        ]}
      />
    </Card>
  );
};

export { SynqupProject };
