module.exports = {
	url: process.env.URL || 'http://localhost:8080',
	theme_color_light: '#eceff4',
	theme_color_dark: '#2e3440',
	author: {
		name: 'Scott Evans',
		email: 'git@scott.ee',
		url: 'https://scott.ee',
		location: 'Stockholm, Sweden',
		fediverse_profile: 'https://toot.scott.ee/@scott'
	},
	meta: {
		separator: '•',
		opengraph_default_image: '/assets/img/opengraph-default.jpg' // fallback / default meta image
	},
	seo: {
		defaultChangeFrequency: 'monthly',
		defaultPriority: '0.7'
	},
	manifest: {
		// you may want to create shortcuts and screenshots in your manifest too
		// details here: https://web.dev/add-manifest/#create
		short_name: 'Elva',
		name: 'Elva • 11ty Starter Theme',
		description: 'A multilingual clean green 11ty starter theme',
		background_color: '#eceff4', // a placeholder background color for the application page to display before its stylesheet is loaded
		display: 'minimal-ui', // fullscreen, standalone, minimal-ui, browser
		scope: '/', // defines the set of URLs that the browser considers to be within your app
		orientation: 'portrait-primary', // preferred orientation for your installed app
		categories: ['business', 'photo'] // full list here: https://github.com/w3c/manifest/wiki/Categories
	}	
};
