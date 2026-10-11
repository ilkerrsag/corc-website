<script lang="ts">
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { messages } from '#lib/i18n/index.js';

	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<SiteHeader lang={data.lang} {t} />
<main>
	{@render children()}
</main>
<SiteFooter lang={data.lang} {t} />
