<script lang="ts">
	import friends from '#lib/assets/pages/bases-friends.webp';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { messages } from '#lib/i18n/index.js';
	import { products } from '#lib/products.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo lang={data.lang} title={t.bases.meta.title} description={t.bases.meta.description} />

<section class="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:pt-20">
	<div class="mx-auto max-w-4xl text-center">
		<p class="eyebrow text-primary">{t.bases.eyebrow}</p>
		<h1
			class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance italic sm:text-5xl lg:text-6xl"
		>
			{t.bases.title}
		</h1>
		<p class="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">{t.bases.lead}</p>
	</div>

	<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
		{#each products as product (product.slug)}
			<ProductCard {product} lang={data.lang} {t} />
		{/each}
	</div>
</section>

<section class="relative isolate overflow-hidden">
	<img
		src={friends}
		alt={t.bases.statsAlt}
		width="1600"
		height="1073"
		loading="lazy"
		class="absolute inset-0 -z-10 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 -z-10 bg-background/55"></div>

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
					<dd class="text-5xl font-semibold tracking-tight text-primary">{stat.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<CtaBand lang={data.lang} {t} />
