import React from "react";
import Link from "next/link";

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
    <Link
      href={href}
      className={`font-light px-4 py-2 rounded-sm ${
        filled
          ? "text-white bg-red-700 hover:bg-red-800"
          : "bg-opacity-20 hover:bg-gray-200"
      }`}
    >
      {children}
    </Link>
  );
};
