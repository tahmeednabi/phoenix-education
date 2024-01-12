import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ResultsListSlice } from "@slicemachine/prismicio";
import { Table } from "@mantine/core";
import { Button } from "@components/Button";
import Link from "next/link";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils";
import { ChevronRight } from "tabler-icons-react";

const Results = ({ slice }: SliceComponentProps<ResultsListSlice>) => {
  return (
    <section id="results" className="py-36">
      <div className="container max-w-5xl">
        <span>
          {slice.primary.title && (
            <PrismicRichText field={slice.primary.title} />
          )}
          <span className="text-2xl">
            {slice.primary.description && (
              <PrismicRichText field={slice.primary.description} />
            )}
          </span>
        </span>

        {slice.primary.button_text && (
          <Link href={asLink(slice.primary.button_link, linkResolver) || ""}>
            <Button
              className="mt-8"
              variant="light"
              size="lg"
              rightIcon={<ChevronRight />}
            >
              {slice.primary.button_text}
            </Button>
          </Link>
        )}

        <Table fontSize={18} className="mt-10">
          <thead>
            <tr>
              <th>Student Name</th>
              <th className="hidden md:block">School</th>
              <th>Year</th>
              <th>ATAR</th>
            </tr>
          </thead>
          <tbody>
            {slice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.student_name}</td>
                <td className="hidden md:block">{item.school}</td>
                <td>{item.year}</td>
                <td>{item.atar?.toFixed(2) || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default Results;
