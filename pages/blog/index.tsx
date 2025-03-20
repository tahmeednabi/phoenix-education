import { GetStaticPropsContext } from "next";
import { createClient } from "../../prismicio";
import { getFooterProps } from "@modules/footer/Footer";
import { NextSeo } from "next-seo";
import { JsonLd, organizationLd } from "@components/JsonLd";
import Link from "next/link";
import Image from "next/image";

export default function BlogIndex({ blogs }: { blogs: any[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <NextSeo
        title="Blog | Phoenix Education"
        description="Read the latest articles, tips, and insights from Phoenix Education's expert tutors and educators."
        canonical="https://www.phoenixedu.com.au/blog"
        openGraph={{
          title: "Blog | Phoenix Education",
          description:
            "Read the latest articles, tips, and insights from Phoenix Education's expert tutors and educators.",
          url: "https://www.phoenixedu.com.au/blog",
          type: "website",
          images: [
            {
              url: "/api/og?title=Phoenix%20Education%20Blog",
              width: 1280,
              height: 720,
              alt: "Phoenix Education Blog",
              type: "image/jpeg",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Phoenix Education, blog, education, tutoring, learning resources, study tips",
          },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Phoenix Education Blog",
          description:
            "Articles, tips, and insights from Phoenix Education's expert tutors and educators.",
          url: "https://www.phoenixedu.com.au/blog",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: blogs.map((blog, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://www.phoenixedu.com.au/blog/${blog.uid}`,
              name: blog.data.title,
            })),
          },
        }}
      />
      <JsonLd data={organizationLd} />

      <header className="mt-36 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Blogs</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Articles, tips, and insights from our expert tutors and educators
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => {
          const author = blog.data.author?.[0];

          return (
            <Link
              href={`/blog/${blog.uid}`}
              key={blog.id}
              className="group flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {blog.data.featured_image?.url ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.data.featured_image.url}
                    alt={blog.data.featured_image.alt || blog.data.title || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}

              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {blog.data.title}
                </h2>

                <div className="text-gray-600 text-sm mb-4">
                  <time dateTime={blog.first_publication_date}>
                    {new Date(blog.first_publication_date).toLocaleDateString(
                      "en-AU",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                  {blog.data.reading_time && (
                    <span className="ml-4">
                      {blog.data.reading_time} min read
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-center">
                  {author?.image?.url ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden relative mr-3">
                      <Image
                        src={author.image.url}
                        alt={author.name || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                  )}
                  <span className="text-sm font-medium">
                    {author?.name || "Phoenix Education"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const blogs = await client.getAllByType("blog", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  const footer = await getFooterProps(client);

  return {
    props: {
      blogs,
      footer,
    },
  };
}
