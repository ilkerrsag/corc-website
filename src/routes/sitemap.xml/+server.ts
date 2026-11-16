import { locales, type PageName, pagePath } from '#lib/i18n/index.js';
import { products } from '#lib/products.js';
import { site } from '#lib/site.js';

export const prerender = true;

/** Every page, in every language, each one naming its translations. */
const pages: PageName[] = ['home', 'bases', 'eventBar', 'why', 'about', 'tasting', 'contact'];

function entry(page: PageName, params: Record<string, string> = {}): string {
	const alternates = locales
		.map(
			(locale) =>
				`\t\t<xhtml:link rel="alternate" hreflang="${locale}" href="${site.url}${pagePath(locale, page, params)}" />`
		)
		.join('\n');

	return locales
		.map(
			(locale) =>
				`\t<url>\n\t\t<loc>${site.url}${pagePath(locale, page, params)}</loc>\n${alternates}\n\t</url>`
		)
		.join('\n');
}

export function GET(): Response {
	const urls = [
		...pages.map((page) => entry(page)),
		...products.map((product) => entry('base', { slug: product.slug }))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=3600' }
	});
}
