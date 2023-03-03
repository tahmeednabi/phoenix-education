import React, { useState } from "react";
import PhoenixSvg from "@res/svgs/PhoenixSvg.svg";
import { HeaderLink } from "./HeaderLink";
import { ActionIcon, Drawer } from "@mantine/core";
import { Menu2 } from "tabler-icons-react";

export const Header: React.FC = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <div className="fixed z-50 bg-white w-screen shadow-2xl shadow-[rgba(0,0,0,0.05)]">
      <div className="container flex items-center -my-2">
        <PhoenixSvg viewBox="0 0 234 69" className="w-40 mr-auto" />

        <div className="hidden md:flex items-center gap-4">
          <HeaderLink href={"/"}>Home</HeaderLink>

          <HeaderLink href={"/pricing"}>Pricing</HeaderLink>

          <HeaderLink href={"/resources"}>Resources</HeaderLink>

          <HeaderLink href={"/blog"}>Blog</HeaderLink>

          <HeaderLink href={"/enrol"} filled>
            Enrol
          </HeaderLink>
        </div>

        <ActionIcon className="block md:hidden" onClick={() => setDrawer(true)}>
          <Menu2 />
        </ActionIcon>
      </div>

      <Drawer
        title={<PhoenixSvg viewBox="0 0 234 69" className="w-40 pt-2 pl-2" />}
        className="p-4"
        opened={drawer}
        onClose={() => setDrawer(false)}
        position="right"
      >
        <div className="flex flex-col items-center gap-2">
          <HeaderLink href={"/"}>Home</HeaderLink>

          <HeaderLink href={"/pricing"}>Pricing</HeaderLink>

          <HeaderLink href={"/resources"}>Resources</HeaderLink>

          <HeaderLink href={"/blog"}>Blog</HeaderLink>

          <HeaderLink href={"/enrol"} filled>
            Enrol
          </HeaderLink>
        </div>
      </Drawer>
    </div>
  );
};
