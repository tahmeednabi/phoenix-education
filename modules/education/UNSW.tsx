import React from "react";
import { Card } from "../../components/Card";
import UNSWSvg from "@res/svgs/UNSWSvg.svg";

const UNSW: React.FC = () => {
  return (
    <Card className="relative animate-opacity text-black flex flex-col justify-center gap-6 bg-white p-24 xl:p-36">
      <UNSWSvg className="w-32 h-32" viewBox="0 0 143 167" />

      <h1 className="text-[3.5rem] mt-4">Bachelor of Computer Science</h1>

      <h3 className="bg-gray-200 text-gray-500 tracking-wide mr-auto rounded-lg px-5 py-3">
        2017 - 2021
      </h3>

      <p className="max-w-xl text-gray-600">
        Completed degree with a Distinction average. <br />
        Majored in Artificial Intelligence.
      </p>
    </Card>
  );
};

export { UNSW };
