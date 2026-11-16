<script lang="ts">
	import EventFunnel from '#lib/event-funnel/EventFunnel.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { messages } from '#lib/i18n/index.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo
	lang={data.lang}
	title={t.eventBarPage.meta.title}
	description={t.eventBarPage.meta.description}
	keywords={t.eventBarPage.meta.keywords}
/>

<EventFunnel lang={data.lang} label={t.eventBarPage.label} />
