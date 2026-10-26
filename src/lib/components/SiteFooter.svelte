<script lang="ts">
	import { type Locale, type Messages, type PageName, pagePath } from '#lib/i18n/index.js';
	import { site } from '#lib/site.js';

	let { lang, t }: { lang: Locale; t: Messages } = $props();

	const year = new Date().getFullYear();

	const links = $derived<{ page: PageName; label: string }[]>([
		{ page: 'home', label: t.nav.home },
		{ page: 'bases', label: t.nav.bases },
		{ page: 'why', label: t.nav.why },
		{ page: 'about', label: t.nav.about },
		{ page: 'contact', label: t.nav.contact },
		{ page: 'tasting', label: t.nav.cta }
	]);
</script>

<footer class="border-t border-line">
	<div class="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1fr_auto]">
		<div>
			<p class="text-lg font-semibold tracking-wide uppercase">{site.company}</p>
			<p class="mt-1 font-display text-sm text-primary italic">{site.tagline}</p>
			<address class="mt-4 space-y-1 text-sm text-muted-foreground not-italic">
				<p>
					<a class="transition-colors hover:text-foreground" href="mailto:{site.email}">
						{site.email}
					</a>
				</p>
				<p>{t.footer.location}</p>
			</address>
		</div>

		<nav aria-label={t.footer.navigate}>
			<p class="eyebrow text-faint">{t.footer.navigate}</p>
			<ul class="mt-3 space-y-2 text-sm text-muted-foreground">
				{#each links as link (link.page)}
					<li>
						<a class="transition-colors hover:text-foreground" href={pagePath(lang, link.page)}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="border-t border-line">
		<div
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-xs text-faint"
		>
			<p>{site.company} · {year}. {t.footer.rights}</p>
			<!-- Both are required by German law to be reachable from every page. -->
			<nav class="flex gap-4">
				<a class="transition-colors hover:text-foreground" href={pagePath(lang, 'imprint')}>
					{t.legal.imprint}
				</a>
				<a class="transition-colors hover:text-foreground" href={pagePath(lang, 'privacy')}>
					{t.legal.privacy}
				</a>
			</nav>
		</div>
	</div>
</footer>
