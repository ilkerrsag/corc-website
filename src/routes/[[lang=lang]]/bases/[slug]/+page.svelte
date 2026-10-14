<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';

	import CtaBand from '#lib/components/CtaBand.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { messages, pagePath } from '#lib/i18n/index.js';
	import { formats, products } from '#lib/products.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
	const product = $derived(products.find((p) => p.slug === data.slug)!);
	const copy = $derived(product[data.lang]);
	const others = $derived(products.filter((p) => p.slug !== data.slug));

	const facts = $derived([
		{ label: t.product.ingredients, value: copy.ingredients },
		{ label: t.product.pairsWith, value: copy.pairsWith },
		{ label: t.product.garnish, value: copy.garnish }
	]);
</script>

<Seo lang={data.lang} title={t.product.metaTitle(product.name)} description={copy.tagline} />

<section class="mx-auto max-w-6xl px-5 pt-8 pb-20 sm:pt-10">
	<a
		href={pagePath(data.lang, 'bases')}
		class="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
	>
		<ArrowLeft class="size-4" />
		{t.product.back}
	</a>

	<div class="mt-6 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
		<img
			src={product.image}
			alt={product.name}
			width="900"
			height="900"
			fetchpriority="high"
			class="aspect-square h-auto w-full rounded-2xl object-cover md:sticky md:top-24"
		/>

		<div>
			<p class="eyebrow text-primary">{t.product.eyebrow}</p>
			<h1 class="mt-3 font-display text-5xl leading-none font-semibold tracking-tight sm:text-6xl">
				{product.name}
			</h1>
			<p class="mt-5 text-lg leading-relaxed text-foreground/90">{copy.tagline}</p>

			<dl class="mt-8 divide-y divide-line border-y border-line">
				{#each facts as fact (fact.label)}
					<div class="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
						<dt class="eyebrow pt-0.5 text-muted-foreground">{fact.label}</dt>
						<dd class="leading-relaxed">{fact.value}</dd>
					</div>
				{/each}
			</dl>

			<p class="mt-8 leading-relaxed text-muted-foreground">{copy.story}</p>

			<h2 class="eyebrow mt-10 text-muted-foreground">{t.product.formats}</h2>
			<ul class="mt-3 grid grid-cols-2 gap-3">
				{#each formats as format (format.size)}
					<li class="rounded-xl border border-line bg-card px-3 py-4 text-center">
						<span class="block text-2xl font-semibold text-primary">{format.size}</span>
						<span class="mt-1 block text-xs text-muted-foreground">
							{t.product.glasses(format.drinks[data.lang])}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 pb-20">
	<h2 class="font-display text-3xl font-semibold tracking-tight">{t.product.others}</h2>
	<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each others as other (other.slug)}
			<ProductCard product={other} lang={data.lang} {t} />
		{/each}
	</div>
</section>

<CtaBand lang={data.lang} {t} />
