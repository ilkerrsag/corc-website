<script lang="ts">
	let { eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string } = $props();
</script>

<div class="mx-auto max-w-3xl text-center">
	<p class="eyebrow text-primary">{eyebrow}</p>
	<h2
		class="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl"
	>
		{title}
	</h2>
	{#if lead}
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-pretty text-muted-foreground">{lead}</p>
	{/if}
</div>
