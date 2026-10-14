import { error } from '@sveltejs/kit';

import { products } from '#lib/products.js';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!products.some((product) => product.slug === params.slug)) error(404, 'Not found');
	return { slug: params.slug };
};

// No `entries` here on purpose: an entry generator yields the internal route path, while
// the crawler reaches every product through its translated address on the bases page.
