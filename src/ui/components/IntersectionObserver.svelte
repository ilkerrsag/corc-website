<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		onChange: (entries: IntersectionObserverEntry[]) => void;
		style?: string;
		threshold?: number;
		rootMargin?: string;
		class?: string;
		[key: string]: unknown;
	}

	let {
		children,
		onChange,
		style = '',
		threshold = 0.3,
		rootMargin = '0px',
		class: className = '',
		...restProps
	}: Props = $props();

	let element = $state<HTMLDivElement>();

	$effect(() => {
		if (!element) return;
		const observer = new IntersectionObserver((entries) => onChange(entries), {
			threshold,
			rootMargin
		});
		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div bind:this={element} class={`observer ${className}`} {style} {...restProps}>
	{@render children?.()}
</div>
