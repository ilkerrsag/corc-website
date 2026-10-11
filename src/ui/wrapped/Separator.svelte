<script lang="ts">
	import type { Snippet } from 'svelte';

	import { cn } from '#ui/lib/utils.js';
	import { Separator } from '#ui/primitives-new/separator/index.js';

	/**
	 * A horizontal rule; with children, a rule with a word set into it ("veya", a date
	 * between messages).
	 */
	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class={cn('flex w-full items-center gap-3', className)}>
	<Separator class="flex-1" />
	{#if children}
		{@render children()}
		<Separator class="flex-1" />
	{/if}
</div>
