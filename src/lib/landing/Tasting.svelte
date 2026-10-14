<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';

	import ContactForm from '#lib/ContactForm.svelte';
	import type { Locale, Messages } from '#lib/i18n/index.js';

	interface Props {
		lang: Locale;
		t: Messages;
		/** Defaults to the landing page's wording. */
		title?: string;
		lead?: string;
	}

	let { lang, t, title = t.tasting.title, lead }: Props = $props();
</script>

<section id="tasting" class="border-t border-line bg-card">
	<div class="mx-auto max-w-6xl px-5 py-20 sm:py-24">
		<SectionHeading eyebrow={t.tasting.eyebrow} {title} {lead} />
		<div class="mx-auto mt-10 max-w-xl">
			<ContactForm {lang} t={t.tasting.form} />
			<p class="mt-6 text-center leading-relaxed text-pretty text-muted-foreground">
				{t.tasting.note}
			</p>
		</div>
	</div>
</section>
