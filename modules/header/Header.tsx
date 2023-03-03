import React from "react";
import PhoenixSvg from "@res/svgs/PhoenixSvg.svg";
import { HeaderLink } from "./HeaderLink";

export const Header: React.FC = () => {
  return (
    <div className="flex items-center container">
      <PhoenixSvg viewBox="0 0 234 69" className="w-40 mr-auto" />

      <div className="flex items-center gap-2">
        <HeaderLink href={"/"}>Home</HeaderLink>

        <HeaderLink href={"/pricing"}>Pricing</HeaderLink>

        <HeaderLink href={"/resources"}>Resources</HeaderLink>

        <HeaderLink href={"/blog"}>Blog</HeaderLink>

        <HeaderLink href={"/enrol"} filled>
          Enrol
        </HeaderLink>
      </div>
    </div>
  );
};
