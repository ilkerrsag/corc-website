<script lang="ts">
	import { cn } from '#ui/lib/utils.js';
	import { Skeleton } from '#ui/primitives-new/skeleton/index.js';

	/**
	 * A line of text that is a skeleton bar until it arrives — for a title or a value whose
	 * slot is already on screen. Give it the line's `height` so nothing shifts when the
	 * text lands.
	 */
	interface Props {
		text?: string;
		loading?: boolean;
		/** The text's line height in px. */
		height?: number;
		width?: number | string;
		class?: string;
	}

	let {
		text,
		loading = false,
		height = 20,
		width = '50%',
		class: className = ''
	}: Props = $props();
</script>

{#if text && !loading}
	<span class={className}>{text}</span>
{:else}
	<Skeleton
		aria-hidden="true"
		style={`height: ${height}px; width: ${typeof width === 'number' ? `${width}px` : width};`}
		class={cn('inline-block max-w-full align-middle', className)} />
{/if}
