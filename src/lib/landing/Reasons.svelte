<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';

	import alcohol from '#lib/assets/landing/reason-alcohol.webp';
	import easy from '#lib/assets/landing/reason-easy.webp';
	import fresh from '#lib/assets/landing/reason-fresh.webp';
	import guests from '#lib/assets/landing/reason-guests.webp';
	import speed from '#lib/assets/landing/reason-speed.webp';
	import type { Messages } from '#lib/i18n/index.js';

	let { t, eyebrow = t.why.eyebrow }: { t: Messages; eyebrow?: string } = $props();

	// Same order as `why.reasons` in the translations.
	const images = [speed, fresh, easy, alcohol, guests];
</script>

<section id="why" class="mx-auto max-w-6xl px-5 pt-12 pb-20 sm:pt-14 sm:pb-24">
	<SectionHeading {eyebrow} title={t.why.title} />

	<!--
		Six tracks rather than three, so five cards fill two complete rows: three
		across the top at two tracks each, two across the bottom at three. A plain
		three column grid would leave the bottom right empty.
	-->
	<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
		{#each t.why.reasons as reason, i (reason.title)}
			<article
				class={[
					'flex flex-col overflow-hidden rounded-2xl border border-line bg-card',
					i < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
					// at two columns the fifth card would sit alone at half width
					i === 4 && 'sm:col-span-2 lg:col-span-3'
				]}
			>
				<img
					src={images[i]}
					alt={reason.imageAlt}
					width="1264"
					height="848"
					loading="lazy"
					class="aspect-[3/2] h-auto w-full object-cover"
				/>
				<div class="flex flex-1 flex-col p-5 sm:p-6">
					<span
						class="self-start rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase"
					>
						{reason.tag}
					</span>
					<h3 class="mt-4 text-xl leading-snug font-medium text-balance">{reason.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
				</div>
			</article>
		{/each}
	</div>
</section>
