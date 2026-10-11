import { defaultLocale, type Locale } from '#lib/i18n/index.js';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => ({
	lang: (params.lang ?? defaultLocale) as Locale
});
