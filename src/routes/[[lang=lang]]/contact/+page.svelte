<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	import Mark from '#lib/components/Mark.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import ContactForm from '#lib/ContactForm.svelte';
	import { messages, pagePath } from '#lib/i18n/index.js';
	import { site } from '#lib/site.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const t = $derived(messages[data.lang]);
</script>

<Seo
	lang={data.lang}
	title={t.contactPage.meta.title}
	description={t.contactPage.meta.description}
	keywords={t.contactPage.meta.keywords}
/>

<section class="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-5 sm:py-24 lg:grid-cols-2 lg:gap-16">
	<div class="min-w-0">
		<Mark class="mb-6 size-16" />
		<p class="eyebrow text-primary">{t.contactPage.eyebrow}</p>
		<h1
			class="mt-3 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl"
		>
			{t.contactPage.title}
		</h1>
		<p class="mt-6 max-w-md leading-relaxed text-muted-foreground">{t.contactPage.lead}</p>

		<!--
			Only what someone needs to reach a person: the address of the business is
			on the imprint, where the law puts it, and nowhere else.
		-->
		<dl class="mt-10 space-y-5 border-t border-line pt-8 text-sm">
			<div>
				<dt class="eyebrow text-faint">{t.contactPage.direct.emailLabel}</dt>
				<dd class="mt-1">
					<a
						class="text-primary underline underline-offset-4 transition-colors hover:text-foreground"
						href="mailto:{site.email}"
					>
						{site.email}
					</a>
				</dd>
			</div>
			<div>
				<dt class="eyebrow text-faint">{t.contactPage.direct.responseLabel}</dt>
				<dd class="mt-1 text-muted-foreground">{t.contactPage.direct.responseText}</dd>
			</div>
			<div>
				<dt class="eyebrow text-faint">{t.contactPage.direct.locationLabel}</dt>
				<dd class="mt-1 text-muted-foreground">{t.contactPage.direct.locationText}</dd>
			</div>
		</dl>

		<!-- Tasting stays the one page built to convert; this hands that intent back to it. -->
		<div class="mt-10 rounded-2xl border border-line bg-card p-6">
			<p class="font-medium">{t.contactPage.tastingBox.title}</p>
			<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
				{t.contactPage.tastingBox.text}
			</p>
			<a
				href={pagePath(data.lang, 'tasting')}
				class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-foreground hover:underline"
			>
				{t.contactPage.tastingBox.link}
				<ArrowRight class="size-4" aria-hidden="true" />
			</a>
		</div>
	</div>

	<div class="min-w-0 self-start rounded-2xl border border-line bg-card p-3 sm:p-8">
		<ContactForm lang={data.lang} t={t.tasting.form} contact={t.contactPage.form} />
	</div>
</section>
