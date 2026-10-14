import type { Reroute } from '@sveltejs/kit/hooks';

import { routeFromPath } from '#lib/i18n/index.js';

/**
 * The route tree uses English folder names, while the public URLs are translated:
 * `/cocktail-basen` and `/en/cocktail-bases` both land on `/[[lang=lang]]/bases`.
 */
export const reroute: Reroute = ({ url }) => routeFromPath(url.pathname);
