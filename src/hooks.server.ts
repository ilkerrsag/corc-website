import type { Handle } from '@sveltejs/kit/hooks';

import { defaultLocale } from '#lib/i18n/index.js';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.params.lang ?? defaultLocale)
	});
