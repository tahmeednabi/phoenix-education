import { MantineColor, ThemeIcon } from "@mantine/core";
import Image from "next/image";
import { CirclesFour, Code, Database, Stack, UsersThree } from "phosphor-react";
import React from "react";
import { Card } from "../components/Card";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";

interface SkillProps {
  icon: React.ReactNode;
  color: MantineColor;
  skill: string;
}

const Skill: React.FC<SkillProps> = ({ icon, color, skill }) => {
  return (
    <div className="bg-slate-1000 inline-flex gap-2 items-center w-fit px-5 py-2 pl-3 rounded text-lg font-light">
      <ThemeIcon variant={"subtle" as any} color={color}>
        {icon}
      </ThemeIcon>
      {skill}
    </div>
  );
};

const Skills: React.FC = () => {
  const languages = ["Typescript", "Python", "Java", "C, C#", "Terraform"];
  const databases = ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"];
  const frameworks = ["Next.js", "React.js", "Node.js", "Express.js", "NestJS"];
  const teamwork = [
    "PR Reviews",
    "JIRA Collaboration",
    "Agile Teams",
    "Mentorship",
  ];
  const miscellaneous = [
    "API Integration",
    "Pytorch",
    "Keras",
    "Video Editing",
    "UI Design",
  ];

  return (
    <Card
      className="relative animate-opacity flex flex-col gap-2 bg-[#242833] p-24 xl:p-36"
      vanta={(ref) =>
        WAVES({
          THREE,
          el: ref.current,
          color: "#242833",
          shininess: 0,
        })
      }
    >
      <div className="flex items-center gap-2">
        {languages.map((language, index) => (
          <Skill key={index} skill={language} icon={<Code />} color={"teal"} />
        ))}
      </div>

      <div className="flex items-center gap-2">
        {databases.map((database, index) => (
          <Skill
            key={index}
            skill={database}
            icon={<Database />}
            color={"yellow"}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        {frameworks.map((framework, index) => (
          <Skill
            key={index}
            skill={framework}
            icon={<Stack />}
            color={"blue"}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        {teamwork.map((work, index) => (
          <Skill
            key={index}
            skill={work}
            icon={<UsersThree />}
            color={"indigo"}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        {miscellaneous.map((misc, index) => (
          <Skill
            key={index}
            skill={misc}
            icon={<CirclesFour />}
            color={"gray"}
          />
        ))}
      </div>

      <Image
        src="/images/aws-dev-associate.png"
        alt=""
        width={736}
        height={736}
        className="absolute w-32 h-32 right-16 bottom-16"
      />
    </Card>
  );
};

export { Skills };
