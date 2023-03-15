import React from "react";
import PhoenixEducationSvg from "@res/svgs/PhoenixEducationSvg.svg";
import { Building, Mail, Phone } from "tabler-icons-react";
import {
  AllDocumentTypes,
  HomeDocument,
  PageDocument,
  YearDocument,
} from "@slicemachine/prismicio";
import { Client } from "@prismicio/client";
import Link from "next/link";
import { asLink } from "@prismicio/helpers";
import { linkResolver } from "@common/utils";

export interface FooterProps {
  years: YearDocument[];
  home: HomeDocument;
  pages: PageDocument[];
}

export const getFooterProps = async (
  client: Client<AllDocumentTypes>
): Promise<FooterProps> => {
  const years = await client.getAllByType("year");
  const home = await client.getSingle("home");
  const pages = await client.getAllByUIDs("page", [
    "pricing",
    "courses",
    "timetable",
    "enrol",
  ]);

  return {
    years,
    home,
    pages,
  };
};

export const Footer: React.FC<FooterProps> = ({ years, home, pages }) => {
  return (
    <section id="footer" className="bg-slate-900 text-slate-400 text-sm">
      <div className="container flex justify-between gap-4 max-w-[1920px] p-12">
        <div>
          <PhoenixEducationSvg viewBox="0 0 214 64" className="w-40" />

          <table className="max-w-xs items-center p-2">
            <tr>
              <td>
                <Phone className="w-4 mr-8" />
              </td>
              <td>
                <p>0468 499 680</p>
              </td>
            </tr>

            <tr>
              <td>
                <Mail className="w-4 mr-8" />
              </td>
              <td>
                <p>info@phoenixedu.com.au</p>
              </td>
            </tr>

            <tr>
              <td>
                <Building className="w-4 mr-8" />
              </td>
              <td>
                <p>25 Oxford Rd Ingleburn NSW 2565</p>
              </td>
            </tr>
          </table>

          <p className="text-xs translate-y-10">
            © 2023 Phoenix Education. All rights reserved
          </p>
        </div>

        <div className="flex items-start">
          <div className="flex flex-col gap-2 w-36">
            <p className="text-slate-300 font-medium">Company</p>
            <Link href={asLink(home, linkResolver) || ""}>
              <p>Home</p>
            </Link>

            {pages.map((page) => (
              <Link key={page.uid} href={asLink(page, linkResolver) || ""}>
                <p>{page.data.short_name}</p>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 w-36">
            <p className="text-slate-300 font-medium">Courses</p>

            {years
              .sort((a, b) => String(a.uid).localeCompare(b.uid))
              .map((year) => (
                <Link key={year.uid} href={asLink(year, linkResolver) || ""}>
                  <p>{year.data.name} Courses</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
