<script lang="ts">
	import { page } from '$app/state';

	import { defaultLocale, type Locale, locales, routePath } from '#lib/i18n/index.js';
	import { site } from '#lib/site.js';

	let {
		lang,
		title,
		description,
		keywords
	}: { lang: Locale; title: string; description: string; keywords?: string } = $props();

	// The same page in another language: same route, same params, different prefix.
	const url = (locale: Locale) => site.url + routePath(locale, page.route.id!, page.params);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords}<meta name="keywords" content={keywords} />{/if}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content={lang} />
	{#if site.url}
		<link rel="canonical" href={url(lang)} />
		{#each locales as locale (locale)}
			<link rel="alternate" hreflang={locale} href={url(locale)} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={url(defaultLocale)} />
		<meta property="og:url" content={url(lang)} />
		<meta property="og:image" content="{site.url}/share-card.jpg" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>
