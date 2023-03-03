const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-svgr');
const withFonts = require('next-fonts');

/** @type {require('next').NextConfig} */
module.exports = withPlugins([
  withSvgr,
  withFonts
], {
  images: {
    domains: ["images.prismic.io"]
  },
  typescript: {
    ignoreBuildErrors: true
  }
})
