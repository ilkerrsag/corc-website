// The one place the brand lives: change it here and every page, title and footer follows.
export const site = {
	name: 'CORC',
	company: 'CORC',
	tagline: 'Pop. Pour. Done.',
	email: 'info@corcdrinks.com',
	// The public origin, for canonical and hreflang links.
	url: (import.meta.env.VITE_SITE_URL ?? 'https://corcdrinks.com') as string
};
