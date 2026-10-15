<script lang="ts">
	import mark from '#lib/assets/mark.png';
	import { type Locale, type Messages, pagePath } from '#lib/i18n/index.js';
	import Button from '#ui/wrapped/Button.svelte';

	let { lang, t }: { lang: Locale; t: Messages } = $props();
</script>

<section class="border-t border-line bg-card">
	<div class="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
		<img src={mark} alt="" width="256" height="256" class="mx-auto mb-5 size-20" />
		<h2
			class="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
		>
			{t.cta.title}
		</h2>
		<p class="mt-3 text-muted-foreground">{t.cta.lead}</p>
		<Button href={pagePath(lang, 'tasting')} size="xl" class="mt-7 rounded-full">
			{t.cta.button}
		</Button>
	</div>
</section>
