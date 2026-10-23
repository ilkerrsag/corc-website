<script lang="ts">
	import pour from '#lib/assets/pages/bases-pour.webp';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { messages } from '#lib/i18n/index.js';
	import { products } from '#lib/products.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo
	lang={data.lang}
	title={t.bases.meta.title}
	description={t.bases.meta.description}
	keywords={t.bases.meta.keywords}
/>

<section class="mx-auto max-w-7xl px-5 pt-16 pb-20 sm:pt-20">
	<div class="mx-auto max-w-4xl text-center">
		<p class="eyebrow text-primary">{t.bases.eyebrow}</p>
		<h1
			class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
		>
			{#each t.bases.title as line (line)}
				<span class="block">{line}</span>
			{/each}
		</h1>
		<p class="mt-5 text-lg text-muted-foreground sm:text-xl">{t.bases.lead}</p>
	</div>

	<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
		{#each products as product (product.slug)}
			<ProductCard {product} lang={data.lang} {t} />
		{/each}
	</div>
</section>

<section class="relative isolate overflow-hidden">
	<img
		src={pour}
		alt={t.bases.statsAlt}
		width="1376"
		height="768"
		loading="lazy"
		class="absolute inset-0 -z-10 h-full w-full object-cover object-[78%_center]"
	/>
	<div class="absolute inset-0 -z-10 bg-background/40"></div>

	<div class="mx-auto max-w-5xl px-5 py-20 sm:py-28">
		<dl
			class="grid divide-y divide-line rounded-2xl border border-line bg-card/95 backdrop-blur-sm sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
		>
			{#each t.bases.stats as stat (stat.label)}
				<div class="flex flex-col-reverse justify-end px-6 py-8 text-center">
					<dt>
						<span class="mt-2 block text-lg font-medium">{stat.label}</span>
						<span class="mt-2 block text-sm leading-relaxed text-muted-foreground">
							{stat.text}
						</span>
					</dt>
					<dd
						class="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-balance text-primary"
					>
						{stat.value}
					</dd>
				</div>
			{/each}
		</dl>

		<div
			class="mx-auto mt-5 max-w-3xl rounded-2xl border border-line bg-card/95 p-6 backdrop-blur-sm sm:p-8"
		>
			<h2 class="text-center font-display text-2xl font-semibold tracking-tight text-balance">
				{t.bases.yield.title}
			</h2>
			<dl class="mt-6 grid gap-4 sm:grid-cols-2">
				{#each t.bases.yield.items as item (item.format)}
					<div class="rounded-xl border border-line px-5 py-4 text-center">
						<dt class="text-sm tracking-wide text-muted-foreground uppercase">{item.format}</dt>
						<dd class="mt-1 text-xl font-medium text-primary">{item.drinks}</dd>
					</div>
				{/each}
			</dl>
			<p class="mt-4 text-center text-sm text-muted-foreground">{t.bases.yield.note}</p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-20 sm:py-24">
	<div class="mx-auto max-w-3xl text-center">
		<h2
			class="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl"
		>
			{t.bases.range.title}
		</h2>
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-pretty text-muted-foreground">
			{t.bases.range.lead}
		</p>
	</div>

	<dl class="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
		{#each products as product (product.slug)}
			<div class="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
				<dt class="font-display text-xl font-semibold text-primary">{product.name}</dt>
				<dd class="leading-relaxed text-pretty text-muted-foreground">
					{product[data.lang].tagline}
				</dd>
			</div>
		{/each}
	</dl>
</section>

<CtaBand lang={data.lang} {t} />
