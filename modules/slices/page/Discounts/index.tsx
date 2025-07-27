import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { DiscountsSlice } from "@slicemachine/prismicio";
import { serializer } from "@modules/slices/page/Content";
import { Table, Badge } from "@mantine/core";
import { formatter } from "@common/utils";

const Discounts = ({ slice }: SliceComponentProps<DiscountsSlice>) => (
  <section className="py-24">
    <div className="container max-w-4xl">
      <div>
        <PrismicRichText field={slice.primary.title} />

        <PrismicRichText
          components={serializer}
          field={slice.primary.description}
        />
      </div>

      <Table className="mt-8" fontSize={16}>
        <thead>
          <tr>
            <th>Subjects</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>

        <tbody>
          {slice.items.map((item, index) => (
            <tr key={index}>
              <td className="py-6">{item.subjects}</td>
              <td className="py-6">
                <div className="relative flex flex-col items-end">
                  <Badge
                    className="w-32"
                    variant="filled"
                    color="indigo"
                    radius="sm"
                    size="xl"
                  >
                    {formatter.price((item.pricing || 0) * 1.1, {
                      notation: "standard",
                    })}
                  </Badge>

                  <p className="absolute font-medium top-8 text-xs ml-4 mt-1 text-gray-500">
                    Saving{" "}
                    {formatter.price((item.savings || 0) * 1.1, {
                      currencyDisplay: "narrowSymbol",
                    })}
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </section>
);

export default Discounts;
