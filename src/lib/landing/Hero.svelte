<script lang="ts">
	import heroMobile from '#lib/assets/landing/hero-mobile.webp';
	import hero from '#lib/assets/landing/hero.webp';
	import type { Messages } from '#lib/i18n/index.js';
	import Button from '#ui/wrapped/Button.svelte';

	let { t }: { t: Messages } = $props();
</script>

<section class="relative isolate overflow-hidden">
	<picture>
		<source media="(max-width: 640px)" srcset={heroMobile} />
		<img
			src={hero}
			alt={t.hero.imageAlt}
			width="2000"
			height="848"
			fetchpriority="high"
			class="absolute inset-0 -z-10 h-full w-full object-cover object-[68%_center]"
		/>
	</picture>
	<!-- Darkens the side the text sits on, and fades the photo into the page below. -->
	<div
		class="absolute inset-0 -z-10 bg-linear-to-r from-background/90 via-background/55 to-transparent max-sm:via-background/75 max-sm:to-background/45"
	></div>
	<div
		class="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-background to-transparent"
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
