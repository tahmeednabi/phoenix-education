import React, { useEffect, useState } from "react";
import PhoenixSvg from "@res/svgs/PhoenixSvg.svg";
import { HeaderLink } from "./HeaderLink";
import { ActionIcon, Drawer, useMantineTheme } from "@mantine/core";
import { Menu2 } from "tabler-icons-react";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();
  const theme = useMantineTheme();

  let color = theme.white;
  const path = router.pathname;
  if (path.startsWith("/enrol")) color = theme.colors["slate"][9];

  useEffect(() => {
    if (path.startsWith("/enrol")) document.body.className = "bg-slate-900";
    else document.body.className = "bg-white";
  }, [router.pathname]);

  return (
    <div
      style={{ background: color }}
      className="fixed z-50 w-screen shadow-2xl shadow-[rgba(0,0,0,0.05)]"
    >
      <div className="container flex items-center -my-2">
        <PhoenixSvg viewBox="0 0 234 69" className="w-40 mr-auto" />

        <div className="hidden md:flex items-center gap-3">
          <HeaderLink href={"/"}>Home</HeaderLink>

          <HeaderLink href={"/pricing"}>Pricing</HeaderLink>

          <HeaderLink href={"/courses"}>Courses</HeaderLink>

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

          <HeaderLink href={"/courses"}>Courses</HeaderLink>

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
