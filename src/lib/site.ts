// The one place the brand lives: change it here and every page, title and footer follows.
export const site = {
	name: 'Corc',
	company: 'Corc',
	tagline: 'Pour Mix Perfect.',
	email: 'info@corcdrinks.com',
	// The public origin, for canonical and hreflang links. Unset until the domain is decided.
	url: (import.meta.env.VITE_SITE_URL ?? '') as string
};
