import React from "react";
import PhoenixEducationSvg from "@res/svgs/PhoenixEducationSvg.svg";
import { Building, Mail, Phone } from "tabler-icons-react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
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
            © 2023 Phoenix Education. All rights reserved | Terms of Service |
            Privacy Policy
          </p>
        </div>

        <div className="flex flex-col gap-2 w-36">
          <p className="text-slate-300 font-medium">Company</p>
          <p>Home</p>
          <p>Pricing</p>
          <p>Courses</p>
          <p>Enrol</p>
        </div>
      </div>
    </section>
  );
};
