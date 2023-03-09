import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ResultsSlice } from "@slicemachine/prismicio";
import { Card } from "@mantine/core";

const Results = ({ slice }: SliceComponentProps<ResultsSlice>) => {
  return (
    <section id="results" className="py-36">
      <div className="container">
        <span className="text-right ml-auto">
          {slice.primary.title && (
            <PrismicRichText field={slice.primary.title} />
          )}
        </span>

        <div className="flex flex-col md:flex-row gap-8 mt-20">
          {slice.items.map((item, index) => (
            <Card className="bg-gray-100 rounded-xl p-8 flex-1" key={index}>
              <h2 className="font-light my-2">{item.value}</h2>
              <p className="text-xl">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
