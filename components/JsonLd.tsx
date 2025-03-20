import React from "react";
import Head from "next/head";

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Component for adding structured data (JSON-LD) to pages
 * This helps search engines better understand the content and can improve rich snippets
 */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
};

/**
 * Creates Organization structured data
 */
export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Phoenix Education",
  url: "https://www.phoenixedu.com.au",
  logo: "https://www.phoenixedu.com.au/logo.png",
  sameAs: [
    "https://www.facebook.com/PhoenixEduAus",
    "https://www.instagram.com/phnxeducation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61468499680",
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: "English",
  },
};

/**
 * Creates Course structured data
 */
export const createCourseLd = (course: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.data?.title || "",
    description: course.data?.description || "",
    provider: {
      "@type": "Organization",
      name: "Phoenix Education",
      sameAs: "https://www.phoenixedu.com.au",
    },
    ...(course.data?.price_per_term && {
      offers: {
        "@type": "Offer",
        price: course.data.price_per_term,
        priceCurrency: "AUD",
      },
    }),
  };
};

/**
 * Creates WebPage structured data
 */
export const createWebPageLd = (page: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.data?.title || "",
    description: page.data?.description || "",
    url: `https://www.phoenixedu.com.au/${page.uid}`,
  };
};

/**
 * Creates FAQPage structured data
 */
export const createFaqLd = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};
