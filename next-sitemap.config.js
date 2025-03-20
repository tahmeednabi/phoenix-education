/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || 'https://www.phoenixedu.com.au',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
		],
		additionalSitemaps: [
			`${process.env.SITE_URL || 'https://www.phoenixedu.com.au'}/server-sitemap.xml`,
		],
	},
	exclude: ['/slice-simulator', '/api/*', '/404'],
	changefreq: 'weekly',
	priority: 0.7,
}
