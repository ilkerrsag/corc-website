import { error } from '@sveltejs/kit';

import { products } from '#lib/products.js';

import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!products.some((product) => product.slug === params.slug)) error(404, 'Not found');
	return { slug: params.slug };
};

export const entries: EntryGenerator = () =>
	products.flatMap(({ slug }) => [{ slug }, { lang: 'en', slug }]);
