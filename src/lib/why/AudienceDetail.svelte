<script lang="ts">
	import { Building2, ChefHat, Hotel, Martini, PartyPopper } from '@lucide/svelte';

	import SectionHeading from '#lib/landing/SectionHeading.svelte';
	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages['whyPage']['audience'] } = $props();

	// Same order as `whyPage.audience.items` in the translations.
	const icons = [Martini, ChefHat, Hotel, Building2, PartyPopper];
</script>

<section class="mx-auto max-w-6xl px-5 py-20 sm:py-24">
	<SectionHeading eyebrow={t.eyebrow} title={t.title} />

	<!--
		Five entries over six tracks: three across the top at two tracks each, two
		across the bottom at three, so no cell is left standing empty.
	-->
	<ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
		{#each t.items as item, i (item.title)}
			{@const Icon = icons[i]}
			<li
				class={[
					'rounded-2xl border border-line bg-card p-6',
					i < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
					i === 4 && 'sm:col-span-2 lg:col-span-3'
				]}
			>
				<Icon class="size-7 text-primary" strokeWidth={1.5} aria-hidden="true" />
				<h3 class="mt-4 text-lg leading-snug font-medium text-balance">{item.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
			</li>
		{/each}
	</ul>
</section>
