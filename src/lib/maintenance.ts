/**
 * The site is held behind a maintenance notice while the event bar pages are rebuilt.
 *
 * To put the site back:
 *   1. set this to `false`
 *   2. delete `static/404.html`
 *   3. delete `src/ui/Maintenance.svelte` and its use in `src/routes/+layout.svelte`
 *
 * While it is `true` the root layout renders the notice instead of the page, so the
 * build only writes out `/`, `/en` and `/sitemap.xml`. Everything else falls through
 * to `static/404.html`, which carries the same notice.
 */
export const MAINTENANCE = true;
