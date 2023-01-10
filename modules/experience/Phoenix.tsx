import React from "react";
import ReactPlayer from "react-player";
import { Card } from "../../components/Card";
import PhoenixSvg from "@res/svgs/PhoenixSvg.svg";

const Phoenix: React.FC = () => {
  return (
    <ReactPlayer
      url={"/videos/phoenix.mp4"}
      loop
      playing
      muted
      height={600}
      wrapper={({ children }) => (
        <Card
          bgColor={"#b04444"}
          className="relative animate-opacity flex flex-col justify-center gap-6 bg-[#0d112c] p-24 xl:p-36"
        >
          <div
            className="absolute top-10 left-0 w-full h-full z-[1] -m-[4rem] scale-110"
            style={{
              background:
                "linear-gradient(to left, rgba(15, 19, 33, 0), rgba(15, 19, 33, 1))",
            }}
          />

          <a
            className="absolute z-20 top-20 left-20 xl:p-12"
            href="https://phoenixedu.com.au"
          >
            <PhoenixSvg className="w-36" viewBox="0 0 234 69" />
          </a>

          <div className="video">{children}</div>

          <h1 className="text-[3.5rem] mt-16 z-20">Founder</h1>

          <h3 className="bg-red-500 tracking-wide mr-auto rounded-lg px-5 py-3 z-20">
            AUGUST 2018 - CURRENT
          </h3>

          <p className="max-w-xl text-gray-200 z-20">
            In 2017, my friend and I launched a HSC tutoring centre. In 2023, we
            have a cohort of 130 students and a staff of 20 tutors, and we’re
            still growing.
          </p>
        </Card>
      )}
    />
  );
};

export { Phoenix };
