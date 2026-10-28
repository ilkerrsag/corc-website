<script lang="ts">
	import pour from '#lib/assets/pages/why-pour.webp';
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
	The photograph is the background rather than a panel beside the text. Its own
	left side is already close to black, so it is pinned to the right at something
	near its natural size and faded into the page instead of being stretched edge
	to edge: the glass keeps its detail, and the words sit on the background
	colour rather than on top of the picture.
-->
<section class="relative isolate overflow-hidden">
	<div class="absolute inset-0 -z-10">
		<img
			src={pour}
			alt={t.whyPage.imageAlt}
			width="1419"
			height="887"
			fetchpriority="high"
			class="absolute inset-y-0 right-0 h-full w-full object-cover object-right lg:w-[72%]"
		/>
		<!-- Reads along the text on a wide screen and down the page on a narrow one. -->
		<div
			class="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background/60 lg:bg-gradient-to-r lg:from-background lg:from-35% lg:via-background/55 lg:to-transparent"
		></div>
	</div>

	<div class="mx-auto max-w-6xl px-5 py-20 sm:py-28 lg:py-32">
		<div class="max-w-xl max-lg:mx-auto max-lg:text-center">
			<Mark class="mb-6 size-14 max-lg:mx-auto" />
			<p class="eyebrow-lg text-primary">{t.whyPage.eyebrow}</p>
			<h1
				class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl"
			>
				{t.whyPage.title}
			</h1>
			<p class="mt-6 leading-relaxed text-pretty text-foreground/85">{t.whyPage.lead}</p>
			<div class="mt-9 flex flex-wrap gap-3 max-lg:justify-center">
				<Button href={pagePath(data.lang, 'tasting')} size="xl" class="rounded-full">
					{t.whyPage.ctaPrimary}
				</Button>
				<Button
					href={pagePath(data.lang, 'bases')}
					size="xl"
					variant="ghost"
					class="rounded-full border border-foreground/30 bg-background/40 backdrop-blur-sm hover:bg-foreground/10"
				>
					{t.whyPage.ctaSecondary}
				</Button>
			</div>
		</div>
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
