<script lang="ts">
	import pour from '#lib/assets/pages/bases-pour.webp';
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
	The page exists because people were not scrolling far enough to reach the
	argument, so the headline and the action stay at the top and the picture sits
	beside them rather than above. On a phone it follows the buttons, close enough
	to the fold to be seen without pushing anything off the first screen.
-->
<section class="mx-auto max-w-6xl px-5 py-14 sm:py-20">
	<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
		<div>
			<Mark class="mb-6 size-14 max-lg:mx-auto" />
			<p class="eyebrow-lg text-primary max-lg:text-center">{t.whyPage.eyebrow}</p>
			<h1
				class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance max-lg:text-center sm:text-5xl"
			>
				{t.whyPage.title}
			</h1>
			<p class="mt-6 max-w-xl leading-relaxed text-pretty text-muted-foreground max-lg:text-center">
				{t.whyPage.lead}
			</p>
			<div class="mt-9 flex flex-wrap gap-3 max-lg:justify-center">
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
		</div>

		<img
			src={pour}
			alt={t.whyPage.imageAlt}
			width="1376"
			height="768"
			fetchpriority="high"
			class="aspect-[16/10] h-auto w-full rounded-2xl object-cover object-[58%_center]"
		/>
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
