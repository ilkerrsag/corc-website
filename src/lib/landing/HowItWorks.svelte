<script lang="ts">
	import { Droplet } from '@lucide/svelte';

	import SectionHeading from './SectionHeading.svelte';

	import step1 from '#lib/assets/landing/step-1.webp';
	import step2 from '#lib/assets/landing/step-2.webp';
	import step3 from '#lib/assets/landing/step-3.webp';
	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages } = $props();

	const images = [step1, step2, step3];
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

<section id="how" class="mx-auto max-w-6xl px-5 pt-20 pb-12 sm:pt-24 sm:pb-14">
	<SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead} />

	<!--
		Three steps in one row rather than two parallel diagrams. The product's whole
		claim is that this takes ten seconds, so the section that explains it should
		not be the most involved thing on the page.
	-->
	<ol class="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-5">
		{#each t.how.steps as step, i (step.title)}
			<li class="flex flex-col items-center text-center">
				<img
					src={images[i]}
					alt={step.imageAlt}
					width="620"
					height="700"
					loading="lazy"
					class="h-auto w-full max-w-64 object-contain"
				/>
				<span
					class="mt-2 grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
				>
					{i + 1}
				</span>
				<h3 class="mt-3 max-w-56 text-lg leading-snug font-medium text-balance">{step.title}</h3>
			</li>
		{/each}
	</ol>

	<p class="mt-8 text-center text-sm text-muted-foreground italic">{t.how.note}</p>

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
