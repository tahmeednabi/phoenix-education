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
	transform: async (config, path) => {
		// Customize priority based on path
		let priority = config.priority;
		
		// Higher priority for homepage and main sections
		if (path === '/') {
			priority = 1.0;
		} else if (path === '/blog' || path === '/courses') {
			priority = 0.9;
		} else if (path.startsWith('/blog/')) {
			priority = 0.8;
			// Blog posts should be checked more frequently
			return {
				loc: path,
				changefreq: 'daily',
				priority,
				lastmod: new Date().toISOString(),
			};
		}
		
		return {
			loc: path,
			changefreq: config.changefreq,
			priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
		};
	},
}
