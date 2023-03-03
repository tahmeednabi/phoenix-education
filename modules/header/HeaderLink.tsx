import React from "react";
import Link from "next/link";
import { Button } from "../../components/Button";

interface HeaderLinkProps {
  href: string;
  children: any;
  filled?: boolean;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  children,
  filled,
}) => {
  return (
    <Link className="w-full" href={href}>
      <Button
        className="w-full"
        color={filled ? "red" : "gray"}
        sx={{ color: filled ? "white" : "#35383b" }}
        variant={filled ? "filled" : "subtle"}
        size="sm"
      >
        {children}
      </Button>
    </Link>
  );
};
