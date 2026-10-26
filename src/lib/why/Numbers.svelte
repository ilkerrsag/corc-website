<script lang="ts">
	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages['whyPage']['numbers'] } = $props();
</script>

<section class="border-y border-line bg-card">
	<div class="mx-auto max-w-6xl px-5 py-12 sm:py-14">
		<h2 class="eyebrow text-center text-primary">{t.title}</h2>
		<dl class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
			{#each t.items as item (item.label)}
				<div class="text-center">
					<dt class="sr-only">{item.label}</dt>
					<dd>
						<span
							class="block font-display text-3xl leading-none font-semibold tracking-tight text-balance sm:text-4xl"
						>
							{item.value}
						</span>
						<span class="mt-2 block text-sm leading-snug text-balance text-muted-foreground">
							{item.label}
						</span>
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
