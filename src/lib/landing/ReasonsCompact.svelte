<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	import SectionHeading from './SectionHeading.svelte';

	import { type Locale, type Messages, pagePath } from '#lib/i18n/index.js';

	let { lang, t }: { lang: Locale; t: Messages } = $props();
</script>

<!--
	The short form of the five reasons. Each one is a claim without its picture,
	so the home page can make the argument in one screen instead of five; the
	full version, with images and the comparison behind it, lives on its own page.
-->
<section id="why" class="mx-auto max-w-6xl px-5 pt-12 pb-20 sm:pt-14 sm:pb-24">
	<SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead} />

	<ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
		{#each t.why.reasons as reason (reason.title)}
			<!--
				Title first, tag pinned underneath it. Two of the German tags run to two
				lines, and with the tag on top that pushed every other claim off the line
				its neighbours sat on.
			-->
			<li
				class="flex flex-col rounded-2xl border border-line bg-card p-5 sm:max-lg:last:col-span-2"
			>
				<h3 class="leading-snug font-medium text-balance">{reason.title}</h3>
				<span class="eyebrow mt-auto block pt-4 text-primary">{reason.tag}</span>
			</li>
		{/each}
	</ul>

	<p class="mt-8 text-center">
		<a
			href={pagePath(lang, 'why')}
			class="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 transition-colors hover:text-foreground hover:underline"
		>
			{t.why.more}
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</p>
</section>
