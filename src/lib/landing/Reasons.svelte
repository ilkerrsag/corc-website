<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';

	import alcohol from '#lib/assets/landing/reason-alcohol.webp';
	import easy from '#lib/assets/landing/reason-easy.webp';
	import fresh from '#lib/assets/landing/reason-fresh.webp';
	import guests from '#lib/assets/landing/reason-guests.webp';
	import speed from '#lib/assets/landing/reason-speed.webp';
	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages } = $props();

	// Same order as `why.reasons` in the translations.
	const images = [speed, fresh, easy, alcohol, guests];
</script>

<section id="why" class="mx-auto max-w-6xl px-5 py-20 sm:py-24">
	<SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead} />

	<div class="mt-12 space-y-5">
		{#each t.why.reasons as reason, i (reason.title)}
			<article
				class="grid items-center gap-6 rounded-2xl border border-line bg-card p-4 sm:p-6 md:grid-cols-2 md:gap-10"
			>
				<img
					src={images[i]}
					alt={reason.imageAlt}
					width="1264"
					height="848"
					loading="lazy"
					class={[
						'aspect-[3/2] h-auto w-full rounded-xl object-cover',
						i % 2 === 1 && 'md:order-2'
					]}
				/>
				<div class="px-1 pb-2 md:px-4 md:pb-0">
					<span
						class="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase"
					>
						{reason.tag}
					</span>
					<h3 class="mt-4 text-2xl leading-tight font-medium text-balance sm:text-3xl">
						{reason.title}
					</h3>
					<p class="mt-4 leading-relaxed text-muted-foreground">{reason.text}</p>
				</div>
			</article>
		{/each}
	</div>
</section>
