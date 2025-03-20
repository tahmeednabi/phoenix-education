import { SliceZone } from "@prismicio/react";
import { components } from "@modules/slices";
import { GetStaticPropsContext } from "next";
import { createClient } from "../../prismicio";
import { getFooterProps } from "@modules/footer/Footer";
import { NextSeo } from "next-seo";
import { JsonLd, organizationLd, createBlogPostLd } from "@components/JsonLd";
import Image from "next/image";
import { BlogDocument } from "@slicemachine/prismicio";

export default function BlogPost({ blog }: { blog?: BlogDocument }) {
  const author = blog?.data.author?.[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <NextSeo
        title={blog?.data.seo_title || blog?.data.title || ""}
        description={blog?.data.seo_description || ""}
        canonical={`https://www.phoenixedu.com.au/blog/${blog?.uid}`}
        openGraph={{
          title: blog?.data.seo_title || blog?.data.title || "",
          description: blog?.data.seo_description || "",
          url: `https://www.phoenixedu.com.au/blog/${blog?.uid}`,
          type: "article",
          article: {
            publishedTime: blog?.first_publication_date,
            modifiedTime: blog?.last_publication_date,
            authors: [author?.name || "Phoenix Education"],
            tags:
              blog?.data.seo_keywords
                ?.split(",")
                .map((k: string) => k.trim()) || [],
          },
          images: [
            {
              url:
                blog?.data.featured_image?.url ||
                `/api/og?title=${encodeURIComponent(
                  blog?.data.title || "Phoenix Education"
                )}`,
              width: blog?.data.featured_image?.dimensions?.width || 1280,
              height: blog?.data.featured_image?.dimensions?.height || 720,
              alt:
                blog?.data.featured_image?.alt ||
                blog?.data.title ||
                "Blog post image",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              blog?.data.seo_keywords ||
              `${blog?.data.title}, Phoenix Education, education, blog`,
          },
        ]}
      />

      <JsonLd data={createBlogPostLd(blog)} />
      <JsonLd data={organizationLd} />

      <article>
        <header className="container mt-32">
          <h1 className="text-4xl font-bold mb-4">{blog?.data.title}</h1>

          <div className="flex items-center mt-8 mb-12">
            {author?.image?.url && (
              <div className="mr-4 rounded-full overflow-hidden w-12 h-12 relative">
                <Image
                  src={author.image.url}
                  alt={author.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-semibold">{author?.name}</p>
              {author?.role && (
                <p className="text-gray-600 text-sm">{author.role}</p>
              )}
            </div>
          </div>

          {blog?.data.featured_image?.url && (
            <div className="relative w-full h-[400px] mb-8">
              <Image
                src={blog?.data.featured_image.url}
                alt={
                  blog?.data.featured_image.alt ||
                  blog?.data.title ||
                  "Blog featured image"
                }
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <div className="text-gray-600 text-sm">
            <time dateTime={blog?.first_publication_date}>
              {blog &&
                new Date(blog.first_publication_date).toLocaleDateString(
                  "en-AU",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
            </time>
            {blog?.data.reading_time && (
              <span className="ml-4">{blog?.data.reading_time} min read</span>
            )}
          </div>
        </header>

        <div className="prose max-w-none">
          <SliceZone slices={blog?.data.slices} components={components} />
        </div>
      </article>
    </div>
  );
}

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const blog = await client.getByUID("blog", params?.uid as string);
  const footer = await getFooterProps(client);

  return {
    props: {
      blog,
      footer,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const blogs = await client.getAllByType("blog");

  return {
    paths: blogs.map((blog) => ({ params: { uid: blog?.uid } })),
    fallback: false,
  };
}
