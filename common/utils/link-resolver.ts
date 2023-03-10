import { LinkResolverFunction } from "@prismicio/helpers";

export const linkResolver: LinkResolverFunction = (doc) => {
  switch (doc.type) {
    case "blog":
      return `/blog/${doc.uid}`;
    case "course":
      return `/courses/${doc.uid}`;
    case "home":
      return "/";
    case "year":
      return `/years/${doc.uid}`;
    default:
      return `/${doc.uid}`;
  }
};
