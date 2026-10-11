import { resolve } from '$app/paths';

import de from './de';
import en from './en';

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export type Messages = typeof de;
export const messages: Record<Locale, Messages> = { de, en };

/** Every page of the site, by the route that renders it. */
export const routes = {
	home: '/[[lang=lang]]',
	bases: '/[[lang=lang]]/bases',
	base: '/[[lang=lang]]/bases/[slug]',
	about: '/[[lang=lang]]/about',
	tasting: '/[[lang=lang]]/tasting'
} as const;
export type PageName = keyof typeof routes;

type Params = Record<string, string | undefined>;
const resolveRoute = resolve as (routeId: string, params: Params) => string;

/** German lives at the root, every other language under its code: `/about` and `/en/about`. */
export function routePath(locale: Locale, routeId: string, params: Params = {}): string {
	return resolveRoute(routeId, { ...params, lang: locale === defaultLocale ? undefined : locale });
}

export function pagePath(locale: Locale, page: PageName, params: Params = {}): string {
	return routePath(locale, routes[page], params);
}
