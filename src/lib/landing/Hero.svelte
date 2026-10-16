<script lang="ts">
	import { asset } from '$app/paths';

	import heroMobile from '#lib/assets/landing/hero-mobile.webp';
	import hero from '#lib/assets/landing/hero.webp';
	import type { Messages } from '#lib/i18n/index.js';
	import Button from '#ui/wrapped/Button.svelte';

	let { t }: { t: Messages } = $props();

	/** True once the clip has finished, or has decided not to play at all. */
	let settled = $state(false);

	/**
	 * The clip is the photograph in motion: the same bottles, moved through once.
	 * It runs behind the headline and then fades off, leaving the still underneath,
	 * which is what the page keeps. The still is always there, so a browser that
	 * refuses to autoplay, or a visitor who asks for reduced motion, sees no gap.
	 *
	 * There are two cuts, wide and upright, and the right one is chosen here rather
	 * than with a `media` source so a phone never spends its data on the wide one.
	 */
	function intro(node: HTMLVideoElement) {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			settled = true;
			return;
		}
		const cut = window.matchMedia('(max-width: 640px)').matches ? 'intro-mobile' : 'intro';
		// Safari answers "maybe" to webm and then often fails to play it, which on a
		// phone is every second visitor. Only a browser sure of itself gets the
		// smaller file; everyone else gets the mp4, which all of them play.
		const webm = node.canPlayType('video/webm; codecs="vp9"') === 'probably';
		node.src = asset(`${cut}.${webm ? 'webm' : 'mp4'}`);

		// A rejected play is a browser that will not autoplay at all, or a file it
		// turned out not to want. Fall back to the mp4 once, then leave the still.
		node.play().catch(() => {
			if (webm) {
				node.src = asset(`${cut}.mp4`);
				node.play().catch(() => (settled = true));
			} else {
				settled = true;
			}
		});
	}
</script>

<section class="relative isolate overflow-hidden">
	<picture>
		<source media="(max-width: 640px)" srcset={heroMobile} />
		<img
			src={hero}
			alt={t.hero.imageAlt}
			width="2000"
			height="784"
			fetchpriority="high"
			class={[
				'absolute inset-0 -z-10 h-full w-full object-cover object-[68%_center] transition-transform duration-1000 ease-out',
				settled ? 'scale-100' : 'scale-105'
			]}
		/>
	</picture>

	<video
		{@attach intro}
		muted
		playsinline
		preload="none"
		aria-hidden="true"
		onended={() => (settled = true)}
		onerror={() => (settled = true)}
		class={[
			'absolute inset-0 -z-10 h-full w-full object-cover object-[68%_center] transition-opacity duration-1000',
			settled ? 'opacity-0' : 'opacity-100'
		]}
	></video>

	<!--
		Darkens the side the text sits on, and fades the photo into the page below. The
		bottles run the whole width of the photograph, so the left end of the gradient is
		near solid: the headline needs its own ground, not a label behind it.
	-->
	<div
		class="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/75 to-background/15 max-sm:via-background/80 max-sm:to-background/40"
	></div>
	<div
		class="absolute inset-x-0 bottom-0 -z-10 h-20 bg-linear-to-t from-background to-transparent"
	></div>

	<div class="mx-auto flex min-h-[min(44rem,82svh)] max-w-6xl items-center px-5 py-20">
		<div class="max-w-xl">
			<p class="max-w-md text-base leading-relaxed text-foreground/85 sm:text-lg">
				{t.hero.intro}
			</p>
			<h1
				class="mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
			>
				{t.hero.title[0]}
				<span class="block text-primary uppercase">{t.hero.title[1]}</span>
			</h1>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button href="#tasting" size="xl" class="rounded-full">{t.hero.cta}</Button>
				<Button
					href="#how"
					size="xl"
					variant="ghost"
					class="rounded-full border border-foreground/30 hover:bg-foreground/10"
				>
					{t.hero.secondary}
				</Button>
			</div>
		</div>
	</div>
</section>
