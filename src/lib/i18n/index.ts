import de from './de';
import en from './en';

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export type Messages = typeof de;
export const messages: Record<Locale, Messages> = { de, en };

/** Each language names itself, so the switch reads the same whichever page you are on. */
export const localeNames: Record<Locale, string> = { de: 'Deutsch', en: 'English' };

/** Every page of the site, by the route that renders it. */
export const routes = {
	home: '/[[lang=lang]]',
	bases: '/[[lang=lang]]/bases',
	base: '/[[lang=lang]]/bases/[slug]',
	about: '/[[lang=lang]]/about',
	tasting: '/[[lang=lang]]/tasting',
	imprint: '/[[lang=lang]]/imprint',
	privacy: '/[[lang=lang]]/privacy'
} as const;
export type PageName = keyof typeof routes;

const pageByRoute = Object.fromEntries(
	Object.entries(routes).map(([page, route]) => [route, page as PageName])
) as Record<string, PageName>;

/**
 * The visible address of each page, per language. These are what people and search
 * engines see; the route tree underneath keeps its own English folder names, and
 * `reroute` in `src/hooks.ts` translates one into the other on every request.
 */
const segments: Record<Exclude<PageName, 'home' | 'base'>, Record<Locale, string>> = {
	bases: { de: 'cocktail-basen', en: 'cocktail-bases' },
	about: { de: 'ueber-corc', en: 'about' },
	tasting: { de: 'tasting-buchen', en: 'book-a-tasting' },
	imprint: { de: 'impressum', en: 'imprint' },
	privacy: { de: 'datenschutz', en: 'privacy' }
};

/** German lives at the root, every other language under its code: `/ueber-corc` and `/en/about`. */
const prefix = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`);

type Params = Record<string, string | undefined>;

export function pagePath(locale: Locale, page: PageName, params: Params = {}): string {
	if (page === 'home') return prefix(locale) || '/';
	if (page === 'base') {
		return `${prefix(locale)}/${segments.bases[locale]}/${params.slug ?? ''}`;
	}
	return `${prefix(locale)}/${segments[page][locale]}`;
}

/** The same page in another language, given the route SvelteKit matched. */
export function routePath(locale: Locale, routeId: string, params: Params = {}): string {
	const page = pageByRoute[routeId];
	return page ? pagePath(locale, page, params) : prefix(locale) || '/';
}

/**
 * Turns a visible address back into the route path SvelteKit knows. Called for every
 * navigation, so it stays a plain string comparison.
 */
export function routeFromPath(pathname: string): string {
	const trimmed = pathname.replace(/\/+$/, '') || '/';
	const locale: Locale = trimmed === '/en' || trimmed.startsWith('/en/') ? 'en' : defaultLocale;
	const rest = locale === defaultLocale ? trimmed : trimmed.slice(3) || '/';
	if (rest === '/') return trimmed;

	const [, first, ...tail] = rest.split('/');
	const entry = Object.entries(segments).find(([, byLocale]) => byLocale[locale] === first);
	if (!entry) return trimmed;

	return `${prefix(locale)}/${[entry[0], ...tail].join('/')}`;
}
