<script lang="ts">
	import { Droplet } from '@lucide/svelte';

	import SectionHeading from './SectionHeading.svelte';

	import step1 from '#lib/assets/landing/step-1.webp';
	import step1Tight from '#lib/assets/landing/step-1-tight.webp';
	import step2 from '#lib/assets/landing/step-2.webp';
	import step2Tight from '#lib/assets/landing/step-2-tight.webp';
	import step3 from '#lib/assets/landing/step-3.webp';
	import step3Tight from '#lib/assets/landing/step-3-tight.webp';
	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages } = $props();

	/**
	 * Two cuts of the same three drawings. The wide one shares a canvas, so the
	 * glasses line up across the row on a desktop. The tight one is trimmed to the
	 * ink, for the phone, where the row becomes a stack and that shared canvas is
	 * mostly air. `width` is each tight cut measured against the widest of them, so
	 * giving them one column and that share of it keeps every glass the same size.
	 *
	 * `pull` fixes the rhythm of the stack. The eye measures the distance between
	 * the glasses, not between the boxes, and the second drawing carries a bottle
	 * leaning up and to the left, which puts its glass far below the one above.
	 * Lifting that one row by a share of the column width evens the two gaps out,
	 * and because it is a percentage it keeps doing so at any phone size.
	 */
	const steps = [
		{ wide: step1, tight: step1Tight, width: '52.6%', pull: '' },
		{ wide: step2, tight: step2Tight, width: '100%', pull: '-mt-[16%] sm:mt-0' },
		{ wide: step3, tight: step3Tight, width: '52.9%', pull: 'mt-[14%] sm:mt-0' }
	];
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
	<!--
		Stacked on a phone the wide frame leaves a lot of air around each glass, so
		there the picture sits beside its label and is cropped to the drawing: the
		same crop box for all three, which keeps the glasses the same size and on
		the same line. From the small breakpoint up the full frame comes back and
		the three sit in a row.
	-->
	<ol class="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3">
		{#each t.how.steps as step, i (step.title)}
			<li
				class={[
					'flex items-end gap-4 sm:flex-col sm:items-center sm:gap-0 sm:text-center',
					steps[i].pull
				]}
			>
				<picture class="flex w-[55%] shrink-0 justify-end sm:block sm:w-full">
					<source media="(min-width: 640px)" srcset={steps[i].wide} />
					<img
						src={steps[i].tight}
						alt={step.imageAlt}
						loading="lazy"
						style="--step-width: {steps[i].width}"
						class="h-auto w-[var(--step-width)] object-contain sm:w-full"
					/>
				</picture>
				<div class="flex min-w-0 flex-col items-start sm:items-center">
					<span
						class="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground sm:mt-2"
					>
						{i + 1}
					</span>
					<h3 class="mt-3 max-w-56 text-lg leading-snug font-medium text-balance">{step.title}</h3>
				</div>
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
