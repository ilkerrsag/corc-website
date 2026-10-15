<script lang="ts">
	import LegalPage from '#lib/components/LegalPage.svelte';
	import { messages } from '#lib/i18n/index.js';
	import { imprint } from '#lib/legal.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const doc = $derived(imprint[data.lang]);
	const t = $derived(messages[data.lang]);
</script>

<LegalPage lang={data.lang} {doc} updatedLabel={t.legal.updated} />
