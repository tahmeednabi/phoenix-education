/**
 * Default SEO configuration for Phoenix Education
 * This file provides default SEO settings that can be extended on individual pages
 */
module.exports = {
  titleTemplate: '%s | Phoenix Education',
  defaultTitle: 'Phoenix Education | Expert Tutoring & Educational Services',
  description: 'Phoenix Education provides expert tutoring services and educational resources for students across Australia. Boost your academic performance with our experienced tutors.',
  canonical: 'https://www.phoenixedu.com.au',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.phoenixedu.com.au',
    siteName: 'Phoenix Education',
    title: 'Phoenix Education | Expert Tutoring & Educational Services',
    description: 'Phoenix Education provides expert tutoring services and educational resources for students across Australia. Boost your academic performance with our experienced tutors.',
    images: [
      {
        url: 'https://www.phoenixedu.com.au/home-og.jpg',
        width: 1280,
        height: 720,
        alt: 'Phoenix Education',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'tutoring, education, courses, learning, academic, school, university, HSC, VCE, QCE, ATAR, Australia',
    },
    {
      name: 'author',
      content: 'Phoenix Education',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};
