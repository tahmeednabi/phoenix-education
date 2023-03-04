import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";
import { components } from "modules/slices/page";

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={({ slices }) => (
      <SliceZone slices={slices} components={components} />
    )}
    state={{}}
  />
);

export default SliceSimulatorPage;
