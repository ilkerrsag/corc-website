<script lang="ts">
	import { Building2, ChefHat, Hotel, Martini, PartyPopper } from '@lucide/svelte';

	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages } = $props();

	// Same order as `audience.items` in the translations.
	const icons = [Martini, ChefHat, Hotel, Building2, PartyPopper];
</script>

<section class="border-y border-line bg-card">
	<div class="mx-auto max-w-6xl px-5 py-12 sm:py-14">
		<h2 class="eyebrow text-center text-primary">{t.audience.title}</h2>
		<ul
			class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
			aria-label={t.audience.title}
		>
			{#each t.audience.items as item, i (item)}
				{@const Icon = icons[i]}
				<li class="flex flex-col items-center gap-3 text-center max-lg:last:col-span-full">
					<Icon class="size-7 text-primary" strokeWidth={1.5} aria-hidden="true" />
					<span class="max-w-36 text-sm leading-snug text-balance text-muted-foreground">
						{item}
					</span>
				</li>
			{/each}
		</ul>
	</div>
</section>
