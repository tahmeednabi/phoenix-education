import { NextApiRequest, NextApiResponse } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { createClient } from "../../prismicio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createClient();
  const baseUrl = process.env.SITE_URL || "https://www.phoenixedu.com.au";

  // Fetch all pages, courses, years, and blogs from Prismic
  const [pages, courses, years, blogs] = await Promise.all([
    client.getAllByType("page"),
    client.getAllByType("course"),
    client.getAllByType("year"),
    client.getAllByType("blog"),
  ]);

  // Create sitemap entries for pages
  const pagesFields: ISitemapField[] = pages.map((page) => ({
    loc: `${baseUrl}/${page.uid}`,
    lastmod: new Date(page.last_publication_date || new Date()).toISOString(),
    changefreq: "weekly",
    priority: 0.7,
  }));

  // Create sitemap entries for courses
  const coursesFields: ISitemapField[] = courses.map((course) => ({
    loc: `${baseUrl}/courses/${course.uid}`,
    lastmod: new Date(course.last_publication_date || new Date()).toISOString(),
    changefreq: "weekly",
    priority: 0.8,
  }));

  // Create sitemap entries for years
  const yearsFields: ISitemapField[] = years.map((year) => ({
    loc: `${baseUrl}/years/${year.uid}`,
    lastmod: new Date(year.last_publication_date || new Date()).toISOString(),
    changefreq: "weekly",
    priority: 0.8,
  }));

  // Create sitemap entries for blog posts
  const blogsFields: ISitemapField[] = blogs.map((blog) => ({
    loc: `${baseUrl}/blog/${blog.uid}`,
    lastmod: new Date(blog.last_publication_date || new Date()).toISOString(),
    changefreq: "daily", // Blog posts should be checked more frequently
    priority: 0.8,
  }));

  // Add homepage
  const homeField: ISitemapField = {
    loc: baseUrl,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1.0,
  };

  // Add courses index page
  const coursesIndexField: ISitemapField = {
    loc: `${baseUrl}/courses`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.9,
  };

  // Add blog index page
  const blogIndexField: ISitemapField = {
    loc: `${baseUrl}/blog`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.9,
  };

  // Add enrol page
  const enrolField: ISitemapField = {
    loc: `${baseUrl}/enrol`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
  };

  // Combine all fields
  const fields: ISitemapField[] = [
    homeField,
    coursesIndexField,
    blogIndexField,
    enrolField,
    ...pagesFields,
    ...coursesFields,
    ...yearsFields,
    ...blogsFields,
  ];

  return getServerSideSitemap(fields);
}
