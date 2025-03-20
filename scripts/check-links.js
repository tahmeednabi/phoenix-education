#!/usr/bin/env node

/**
 * This script checks for broken links on the website
 * It can be run with: node scripts/check-links.js
 */

const axios = require('axios');
const { createClient } = require('../prismicio');

const baseUrl = process.env.SITE_URL || 'https://www.phoenixedu.com.au';

async function checkUrl(url) {
  try {
    const response = await axios.get(url, { 
      timeout: 10000,
      validateStatus: function (status) {
        return status < 400; // Accept all status codes less than 400
      }
    });
    console.log(`✅ ${url} - ${response.status}`);
    return { url, status: response.status, ok: true };
  } catch (error) {
    console.error(`❌ ${url} - ${error.message}`);
    return { url, status: error.response?.status || 'Error', ok: false, error: error.message };
  }
}

async function main() {
  console.log('Checking links on the website...');
  
  const client = createClient();
  
  // Fetch all pages, courses, and years from Prismic
  const [pages, courses, years] = await Promise.all([
    client.getAllByType('page'),
    client.getAllByType('course'),
    client.getAllByType('year'),
  ]);
  
  // Create URLs for pages
  const pageUrls = pages.map(page => `${baseUrl}/${page.uid}`);
  
  // Create URLs for courses
  const courseUrls = courses.map(course => `${baseUrl}/courses/${course.uid}`);
  
  // Create URLs for years
  const yearUrls = years.map(year => `${baseUrl}/years/${year.uid}`);
  
  // Add static pages
  const staticUrls = [
    baseUrl,
    `${baseUrl}/courses`,
    `${baseUrl}/enrol`,
  ];
  
  // Combine all URLs
  const allUrls = [...staticUrls, ...pageUrls, ...courseUrls, ...yearUrls];
  
  console.log(`Found ${allUrls.length} URLs to check`);
  
  // Check all URLs
  const results = await Promise.all(allUrls.map(checkUrl));
  
  // Count successful and failed checks
  const successful = results.filter(result => result.ok).length;
  const failed = results.filter(result => !result.ok).length;
  
  console.log('\nSummary:');
  console.log(`Total URLs: ${allUrls.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed URLs:');
    results
      .filter(result => !result.ok)
      .forEach(result => {
        console.log(`${result.url} - ${result.status} - ${result.error}`);
      });
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
