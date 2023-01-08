import React from "react";
import { InView } from "react-intersection-observer";
import { ExoDigital } from "./experience/ExoDigital";
import { Phoenix } from "./experience/Phoenix";
import { Synqup } from "./experience/Synqup";
import { Eclat } from "./projects/Eclat";
import { ExoWebsite } from "./projects/ExoWebsite";
import { Title } from "./Title";

export default function Body() {
  return (
    <InView>
      {({ ref }) => (
        <div ref={ref} className="flex flex-col gap-12 p-12">
          <Title />

          <h1 className="w-[56rem] xl:w-[84rem] mx-auto py-12 text-[4rem]">
            Experience
          </h1>

          <ExoDigital />
          <Synqup />
          <Phoenix />

          <h1 className="w-[56rem] xl:w-[84rem] mx-auto py-12 text-[4rem]">
            Projects
          </h1>

          <Eclat />
          <ExoWebsite />
        </div>
      )}
    </InView>
  );
}
