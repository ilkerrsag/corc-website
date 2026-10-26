<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Mark from '#lib/components/Mark.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { messages, pagePath } from '#lib/i18n/index.js';
	import Reasons from '#lib/landing/Reasons.svelte';
	import SectionHeading from '#lib/landing/SectionHeading.svelte';
	import AudienceDetail from '#lib/why/AudienceDetail.svelte';
	import Compare from '#lib/why/Compare.svelte';
	import Numbers from '#lib/why/Numbers.svelte';
	import Button from '#ui/wrapped/Button.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo
	lang={data.lang}
	title={t.whyPage.meta.title}
	description={t.whyPage.meta.description}
	keywords={t.whyPage.meta.keywords}
/>

<!--
	No photograph above the fold. The page exists because people were not
	scrolling far enough to reach the argument, so the argument itself has to be
	the first thing on it.
-->
<section class="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
	<Mark class="mx-auto mb-6 size-16" />
	<p class="eyebrow text-primary">{t.whyPage.eyebrow}</p>
	<h1
		class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
	>
		{t.whyPage.title}
	</h1>
	<p class="mx-auto mt-6 max-w-xl leading-relaxed text-pretty text-muted-foreground">
		{t.whyPage.lead}
	</p>
	<div class="mt-9 flex flex-wrap justify-center gap-3">
		<Button href={pagePath(data.lang, 'tasting')} size="xl" class="rounded-full">
			{t.whyPage.ctaPrimary}
		</Button>
		<Button
			href={pagePath(data.lang, 'bases')}
			size="xl"
			variant="ghost"
			class="rounded-full border border-foreground/30 hover:bg-foreground/10"
		>
			{t.whyPage.ctaSecondary}
		</Button>
	</div>
</section>

<section class="border-t border-line bg-card">
	<div class="mx-auto max-w-6xl px-5 py-20 sm:py-24">
		<SectionHeading eyebrow={t.whyPage.compare.eyebrow} title={t.whyPage.compare.title} />
		<Compare t={t.whyPage.compare} />
	</div>
</section>

<Reasons {t} eyebrow={t.why.detailEyebrow} />

<Numbers t={t.whyPage.numbers} />

<AudienceDetail t={t.whyPage.audience} />

<CtaBand lang={data.lang} {t} />
