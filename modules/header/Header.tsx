import React, { useEffect, useState } from "react";
import PhoenixSvg from "@res/svgs/PhoenixSvg.svg";
import { HeaderLink } from "./HeaderLink";
import { Drawer, useMantineTheme } from "@mantine/core";
import { Menu2 } from "tabler-icons-react";
import { useRouter } from "next/router";
import { ActionIcon } from "@components/ActionIcon";
import Link from "next/link";

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
  }, [path]);

  return (
    <div style={{ background: color }} className="fixed z-50 w-screen">
      <div className="container flex items-center -my-4">
        <Link href="/" className="mr-auto">
          <PhoenixSvg viewBox="0 0 234 69" className="w-40" />
        </Link>

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

        <ActionIcon
          size="lg"
          variant="transparent"
          className="block md:hidden"
          onClick={() => setDrawer(true)}
        >
          <Menu2 />
        </ActionIcon>
      </div>

      <Drawer
        className="p-4"
        size="xs"
        opened={drawer}
        onClose={() => setDrawer(false)}
        position="right"
        withCloseButton={false}
        styles={{
          header: { backgroundColor: color },
          content: { backgroundColor: color },
        }}
      >
        <div className="flex flex-col items-center gap-2 pr-4">
          <PhoenixSvg viewBox="0 0 69 69" className="w-10" />

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
