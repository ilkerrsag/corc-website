<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import type { Locale } from '#lib/i18n/index.js';
	import type { LegalDocument } from '#lib/legal.js';

	let { lang, doc, updatedLabel }: { lang: Locale; doc: LegalDocument; updatedLabel: string } =
		$props();

	const EMAIL = /([\w.+-]+@[\w-]+\.[\w.-]+)/;

	/** Splits a line so an address inside running text can still be clicked. */
	function parts(line: string): { text: string; email: boolean }[] {
		return line
			.split(EMAIL)
			.filter(Boolean)
			.map((text) => ({ text, email: EMAIL.test(text) && text.includes('@') }));
	}
</script>

{#snippet text(line: string)}
	{#each parts(line) as part, i (i)}
		{#if part.email}
			<a class="text-primary underline underline-offset-4" href="mailto:{part.text}">{part.text}</a>
		{:else}
			{part.text}
		{/if}
	{/each}
{/snippet}

<Seo {lang} title={doc.meta.title} description={doc.meta.description} />

<section class="mx-auto max-w-3xl px-5 pt-16 pb-24 sm:pt-20">
	<h1
		class="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl"
	>
		{doc.title}
	</h1>
	<p class="mt-3 text-sm text-muted-foreground">{updatedLabel} {doc.updated}</p>

	<div class="mt-12 space-y-10">
		{#each doc.sections as section, i (section.heading ?? i)}
			<div>
				{#if section.heading}
					<h2 class="text-lg font-medium">{section.heading}</h2>
				{/if}
				{#if section.body}
					<div class="mt-3 space-y-3 leading-relaxed text-pretty text-muted-foreground">
						{#each section.body as paragraph, j (j)}
							<p>{@render text(paragraph)}</p>
						{/each}
					</div>
				{/if}
				{#if section.lines}
					<address class="mt-3 space-y-1 leading-relaxed text-muted-foreground not-italic">
						{#each section.lines as line, j (j)}
							<p>{@render text(line)}</p>
						{/each}
					</address>
				{/if}
			</div>
		{/each}
	</div>
</section>
