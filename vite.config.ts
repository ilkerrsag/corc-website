import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/**
 * Cloudflare Pages builds every branch, and a branch build is served from a real
 * public address. `CF_PAGES_BRANCH` is the only thing that tells one apart from
 * the live site, so it is what keeps a preview out of the search index.
 */
const previewBuild = Boolean(process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main');

export default defineConfig({
	define: { __PREVIEW_BUILD__: JSON.stringify(previewBuild) },
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			// Start from the two home pages and follow the links. Crawling from here only
			// ever reaches the translated addresses, so the internal route paths
			// (`/bases`, `/about`, `/tasting`) never get written out as duplicates.
			// `/sitemap.xml` is named here because nothing on the site links to it.
			prerender: { entries: ['/', '/en', '/sitemap.xml'] }
		})
	],
	server: {
		// In production Cloudflare routes /api/contact to the worker; locally, forward to `wrangler dev`.
		proxy: { '/api': 'http://localhost:8787' }
	}
});
