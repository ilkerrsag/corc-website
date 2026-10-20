<script lang="ts">
	import { Leaf, Zap } from '@lucide/svelte';

	import bottle from '#lib/assets/pages/about-bottle.webp';
	import story from '#lib/assets/pages/about-story.webp';
	import bear from '#lib/assets/pages/berlin-bear.webp';
	import Seo from '#lib/components/Seo.svelte';
	import { messages } from '#lib/i18n/index.js';
	import Tasting from '#lib/landing/Tasting.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo
	lang={data.lang}
	title={t.about.meta.title}
	description={t.about.meta.description}
	keywords={t.about.meta.keywords}
/>

<section
	class="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 sm:py-20"
>
	<div>
		<p class="eyebrow text-primary">{t.about.eyebrow}</p>
		<h1
			class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
		>
			{t.about.title}
		</h1>
		<p class="mt-6 leading-relaxed text-muted-foreground">{t.about.lead}</p>
	</div>
	<img
		src={bottle}
		alt={t.about.imageAlt}
		width="1200"
		height="1200"
		fetchpriority="high"
		class="aspect-square h-auto w-full rounded-2xl object-cover"
	/>
</section>

<section class="border-y border-line bg-card">
	<ul
		class="mx-auto grid max-w-6xl divide-y divide-line px-5 md:grid-cols-3 md:divide-x md:divide-y-0"
	>
		{#each t.about.features as feature, i (feature.title)}
			<li class="px-4 py-10 text-center md:px-8">
				<span class="mx-auto grid size-12 place-items-center text-primary">
					{#if i === 0}
						<Leaf class="size-9" strokeWidth={1.5} />
					{:else if i === 1}
						<Zap class="size-9" strokeWidth={1.5} />
					{:else}
						<img src={bear} alt="" width="240" height="240" class="size-12 object-contain" />
					{/if}
				</span>
				<h2 class="mt-4 text-xl font-medium">{feature.title}</h2>
				<p class="mx-auto mt-2 max-w-xs leading-relaxed text-muted-foreground">{feature.text}</p>
			</li>
		{/each}
	</ul>
</section>

<!--
	The founder, in his own words. A buyer in this trade wants to know who wrote
	the recipe before they put it in front of their own guests, so this is first
	person and signed rather than a line about "a mixologist".
-->
<section class="mx-auto max-w-3xl px-5 py-20 sm:py-24">
	<p class="eyebrow text-center text-primary">{t.about.makers.eyebrow}</p>
	<h2
		class="mt-3 text-center font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
	>
		{t.about.makers.title}
	</h2>

	<div class="mt-10 space-y-5">
		{#each t.about.makers.paragraphs as paragraph (paragraph)}
			<p class="leading-relaxed text-pretty text-muted-foreground">{paragraph}</p>
		{/each}
	</div>

	<div class="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-line pt-6">
		<p class="font-medium">{t.about.makers.name}</p>
		<p class="text-sm text-muted-foreground">{t.about.makers.role}</p>
		<ul class="ml-auto flex gap-4 text-sm">
			{#each t.about.makers.links as link (link.href)}
				<li>
					<a
						class="text-primary underline underline-offset-4 transition-colors hover:text-foreground"
						href={link.href}
						target="_blank"
						rel="noreferrer"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="mx-auto max-w-6xl border-t border-line px-5 py-20 sm:py-24">
	<p class="eyebrow text-primary">{t.about.story.eyebrow}</p>
	<h2 class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl">
		{t.about.story.title}
	</h2>

	<div class="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
		<img
			src={story}
			alt={t.about.story.imageAlt}
			width="1200"
			height="1112"
			loading="lazy"
			class="h-auto w-full rounded-2xl object-cover"
		/>
		<div class="space-y-6">
			<p class="border-l-2 border-primary pl-5 text-lg leading-relaxed font-medium">
				{t.about.story.opening}
			</p>
			{#each t.about.story.paragraphs as paragraph (paragraph)}
				<p class="leading-relaxed text-muted-foreground">{paragraph}</p>
			{/each}
			<p
				class="border-l-2 border-primary pl-5 font-display text-2xl leading-snug font-semibold italic"
			>
				{t.about.story.closing}
			</p>
		</div>
	</div>
</section>

<Tasting lang={data.lang} {t} title={t.about.cta.title} lead={t.about.cta.lead} />
