<script lang="ts">
	import background from '#lib/assets/pages/tasting-bg.webp';
	import Seo from '#lib/components/Seo.svelte';
	import ContactForm from '#lib/ContactForm.svelte';
	import { messages } from '#lib/i18n/index.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo
	lang={data.lang}
	title={t.tastingPage.meta.title}
	description={t.tastingPage.meta.description}
	keywords={t.tastingPage.meta.keywords}
/>

<section class="relative isolate overflow-hidden">
	<img
		src={background}
		alt=""
		width="2000"
		height="1412"
		fetchpriority="high"
		class="absolute inset-0 -z-10 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 -z-10 bg-background/80"></div>

	<div class="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-5 sm:py-24 lg:grid-cols-2 lg:gap-16">
		<div class="min-w-0">
			<h1
				class="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl"
			>
				{t.tastingPage.title}
			</h1>
			<p class="mt-6 max-w-md leading-relaxed text-foreground/85">{t.tastingPage.lead}</p>

			<ol class="mt-10 space-y-7">
				{#each t.tastingPage.steps as step, i (step.title)}
					<li class="flex gap-4">
						<span
							class="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
						>
							{i + 1}
						</span>
						<div>
							<h2 class="text-lg font-medium">{step.title}</h2>
							<p class="mt-1 max-w-sm leading-relaxed text-muted-foreground">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>

		<div
			class="min-w-0 self-start rounded-2xl border border-line bg-card/95 p-3 backdrop-blur-sm sm:p-8"
		>
			<ContactForm lang={data.lang} t={t.tasting.form} />
		</div>
	</div>
</section>
