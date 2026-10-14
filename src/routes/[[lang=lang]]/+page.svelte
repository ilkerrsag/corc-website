<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { messages } from '#lib/i18n/index.js';
	import Audience from '#lib/landing/Audience.svelte';
	import Hero from '#lib/landing/Hero.svelte';
	import HowItWorks from '#lib/landing/HowItWorks.svelte';
	import Reasons from '#lib/landing/Reasons.svelte';
	import Tasting from '#lib/landing/Tasting.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo
	lang={data.lang}
	title={t.meta.title}
	description={t.meta.description}
	keywords={t.meta.keywords}
/>

<Hero {t} />
<Audience {t} />
<HowItWorks {t} />
<Reasons {t} />
<Tasting lang={data.lang} {t} />
