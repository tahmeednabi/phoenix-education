import React from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { MantineColor, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";

interface HeaderLinkProps {
  href: string;
  children: any;
  filled?: boolean;
  color?: MantineColor;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  children,
  filled,
}) => {
  const router = useRouter();
  const theme = useMantineTheme();

  let color = theme.white;
  const path = router.pathname;
  if (!path.startsWith("/enrol")) color = theme.colors["slate"][9];

  return (
    <Link className="w-full" href={href}>
      <Button
        className="w-full"
        color={filled ? "red" : "gray"}
        sx={{ color: filled ? "white" : color }}
        variant={filled ? "filled" : "subtle"}
        size="sm"
      >
        {children}
      </Button>
    </Link>
  );
};
