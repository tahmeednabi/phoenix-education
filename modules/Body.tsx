import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { InView } from "react-intersection-observer";
import { UNSW } from "./education/UNSW";
import { ExoDigital } from "./experience/ExoDigital";
import { Phoenix } from "./experience/Phoenix";
import { Synqup } from "./experience/Synqup";
import { Eclat } from "./projects/Eclat";
import { ExoWebsite } from "./projects/ExoWebsite";
import { PhoenixLMS } from "./projects/PhoenixLMS";
import { SynqupProject } from "./projects/SynqupProject";
import { Skills } from "./Skills";
import { Title } from "./Title";

export interface BodyContextType {
  bgColor: string;
  setBgColor: Dispatch<SetStateAction<string>>;
}

const initialState = {} as BodyContextType;

const BodyContext = createContext<BodyContextType>(initialState);
BodyContext.displayName = "BodyContext";

export function useBody() {
  return useContext<BodyContextType>(BodyContext);
}

export default function Body() {
  const [bgColor, setBgColor] = useState("#000");

  useEffect(() => {
    document.body.className = "transition duration-700";
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  const Cards = useMemo(
    () => (
      <>
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
        <SynqupProject />
        <PhoenixLMS />

        <h1 className="w-[56rem] xl:w-[84rem] mx-auto py-12 text-[4rem]">
          Skills
        </h1>

        <Skills />

        <h1 className="w-[56rem] xl:w-[84rem] mx-auto py-12 text-[4rem]">
          Education
        </h1>

        <UNSW />
      </>
    ),
    []
  );

  return (
    <BodyContext.Provider value={{ bgColor, setBgColor }}>
      <InView>
        {({ ref }) => (
          <div
            ref={ref}
            className="flex flex-col gap-6 md:gap-12 p-6 md:p-12 transition duration-700"
          >
            {Cards}
          </div>
        )}
      </InView>
    </BodyContext.Provider>
  );
}
