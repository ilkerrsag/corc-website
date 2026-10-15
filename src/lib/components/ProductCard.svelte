<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	import { type Locale, type Messages, pagePath } from '#lib/i18n/index.js';
	import type { Product } from '#lib/products.js';

	let { product, lang, t }: { product: Product; lang: Locale; t: Messages } = $props();
</script>

<a
	href={pagePath(lang, 'base', { slug: product.slug })}
	class="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-primary/60"
>
	<div class="overflow-hidden">
		<img
			src={product.image}
			alt={product.name}
			width="900"
			height="900"
			loading="lazy"
			class="aspect-[4/5] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
	</div>
	<div class="flex flex-1 flex-col p-5">
		<h3 class="text-lg font-medium">{product.name}</h3>
		<p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
			{product[lang].tagline}
		</p>
		<span class="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-primary">
			{t.bases.discover}
			<ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
		</span>
	</div>
</a>
