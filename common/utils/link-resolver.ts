import { LinkResolverFunction } from "@prismicio/helpers";

export const linkResolver: LinkResolverFunction = (doc) => {
  switch (doc.type) {
    case "blog":
      return `/blog/${doc.uid}`;
    case "course":
      return `/course/${doc.uid}`;
    case "home":
      return "/";
    default:
      return `/${doc.uid}`;
  }
};
