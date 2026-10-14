<script lang="ts">
	import { Droplet } from '@lucide/svelte';

	import SectionHeading from './SectionHeading.svelte';

	import shakeImage from '#lib/assets/landing/how-shake.webp';
	import stirImage from '#lib/assets/landing/how-stir.webp';
	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages } = $props();

	const methods = $derived([
		{ ...t.how.shake, image: shakeImage, width: 1200, height: 895 },
		{ ...t.how.stir, image: stirImage, width: 1400, height: 785 }
	]);
</script>

{#snippet jigger()}
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linejoin="round"
		class="size-7"
		aria-hidden="true"
	>
		<path d="M6 3h12l-4 9 3 9H7l3-9z" />
	</svg>
{/snippet}

<section id="how" class="mx-auto max-w-6xl px-5 py-20 sm:py-24">
	<SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead} />

	<h3
		class="mt-14 text-center font-display text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl"
	>
		{t.how.heading}
	</h3>

	<div class="mt-8 grid gap-5 lg:grid-cols-2">
		{#each methods as method (method.title)}
			<article class="flex flex-col rounded-2xl bg-cream p-5 text-charcoal sm:p-7">
				<h3 class="text-center text-xl font-semibold tracking-wide uppercase">{method.title}</h3>
				<div class="mt-4 flex flex-1 items-center">
					<img
						src={method.image}
						alt={method.imageAlt}
						width={method.width}
						height={method.height}
						loading="lazy"
						class="h-auto w-full"
					/>
				</div>
				<ol
					class="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-charcoal/15 pt-5 text-sm sm:grid-cols-5"
				>
					{#each method.steps as step, i (step)}
						<li class="flex gap-2 sm:flex-col sm:items-center sm:text-center">
							<span
								class="grid size-6 shrink-0 place-items-center rounded-full bg-charcoal text-xs font-semibold text-cream"
							>
								{i + 1}
							</span>
							<span class="leading-snug">{step}</span>
						</li>
					{/each}
				</ol>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-12 max-w-3xl">
		<h3 class="eyebrow text-center text-primary">{t.how.ratio.title}</h3>
		<dl
			class="mt-4 grid divide-y divide-line rounded-2xl border border-line bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0"
		>
			{#each t.how.ratio.items as item, i (item.label)}
				<div class="flex items-center gap-4 px-6 py-5">
					<span class="text-primary">
						{#if i === 2}<Droplet class="size-7" strokeWidth={1.5} />{:else}{@render jigger()}{/if}
					</span>
					<div class="flex flex-col-reverse">
						<dt class="text-sm text-muted-foreground">{item.label}</dt>
						<dd class="text-lg font-medium">{item.amount}</dd>
					</div>
				</div>
			{/each}
		</dl>
		<p class="mt-4 text-center text-sm text-muted-foreground italic">{t.how.ratio.note}</p>
	</div>
</section>
