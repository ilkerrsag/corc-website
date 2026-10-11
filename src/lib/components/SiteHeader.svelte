<script lang="ts">
	import { Menu, X } from '@lucide/svelte';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	import logo from '#lib/assets/logo.png';
	import {
		type Locale,
		locales,
		type Messages,
		type PageName,
		pagePath,
		routePath,
		routes
	} from '#lib/i18n/index.js';
	import { site } from '#lib/site.js';
	import Button from '#ui/wrapped/Button.svelte';

	let { lang, t }: { lang: Locale; t: Messages } = $props();

	let menuOpen = $state(false);
	afterNavigate(() => (menuOpen = false));

	const links = $derived<{ page: PageName; label: string }[]>([
		{ page: 'bases', label: t.nav.bases },
		{ page: 'about', label: t.nav.about }
	]);

	const isCurrent = (name: PageName) => page.route.id?.startsWith(routes[name]) ?? false;
</script>

<header class="sticky top-0 z-40 border-b border-line bg-background">
	<div class="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:gap-6">
		<a href={pagePath(lang, 'home')} class="shrink-0" aria-label={site.name}>
			<img src={logo} alt={site.name} width="720" height="255" class="h-9 w-auto" />
		</a>

		<nav class="ml-auto hidden items-center gap-7 text-sm md:flex" aria-label={t.nav.main}>
			{#each links as link (link.page)}
				<a
					href={pagePath(lang, link.page)}
					aria-current={isCurrent(link.page) ? 'page' : undefined}
					class="text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-3 sm:gap-4 md:ml-0">
			<div class="flex items-center gap-1 text-sm" role="group" aria-label={t.nav.language}>
				{#each locales as locale, i (locale)}
					{#if i > 0}<span class="text-faint" aria-hidden="true">/</span>{/if}
					<a
						href={routePath(locale, page.route.id ?? routes.home, page.params)}
						hreflang={locale}
						lang={locale}
						aria-current={locale === lang ? 'true' : undefined}
						class="px-1 py-2 text-muted-foreground uppercase transition-colors hover:text-foreground aria-[current=true]:font-semibold aria-[current=true]:text-foreground"
					>
						{locale}
					</a>
				{/each}
			</div>
			<Button href={pagePath(lang, 'tasting')} size="sm" class="rounded-full max-sm:hidden">
				{t.nav.cta}
			</Button>
			<button
				type="button"
				class="-mr-2 grid size-10 place-items-center rounded-full text-foreground md:hidden"
				aria-label={t.nav.menu}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}<X class="size-5" />{:else}<Menu class="size-5" />{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav
			id="mobile-menu"
			class="border-t border-line bg-background px-5 pt-2 pb-5 md:hidden"
			aria-label={t.nav.main}
		>
			<ul class="divide-y divide-line">
				{#each links as link (link.page)}
					<li>
						<a
							href={pagePath(lang, link.page)}
							aria-current={isCurrent(link.page) ? 'page' : undefined}
							class="block py-3.5 text-base aria-[current=page]:text-primary"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
			<Button href={pagePath(lang, 'tasting')} size="lg" class="mt-4 w-full rounded-full">
				{t.nav.cta}
			</Button>
		</nav>
	{/if}
</header>
