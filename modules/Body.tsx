import React from "react";
import { InView } from "react-intersection-observer";
import { ExoDigital } from "./experience/ExoDigital";
import { Synqup } from "./experience/Synqup";
import { Title } from "./Title";

export default function Body() {
  return (
    <InView>
      {({ ref }) => (
        <div ref={ref} className="flex flex-col gap-12 p-12">
          <Title />

          <h1 className="container py-12 text-[4rem]">Experience</h1>

          <ExoDigital />

          <Synqup />
        </div>
      )}
    </InView>
  );
}
