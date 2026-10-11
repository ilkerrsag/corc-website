<script lang="ts">
	import { Skeleton } from '#ui/primitives-new/skeleton/index.js';

	interface Props {
		width?: string;
		height?: string;
		class?: string;
		[key: string]: any;
	}

	let {
		width,
		height,
		class: className,
		style: styleProp,
		...rest
	}: Props = $props();

	let computedStyle = $derived.by(() => {
		const parts: string[] = [];
		if (width) parts.push(`width: ${width}`);
		if (height) parts.push(`height: ${height}`);
		if (styleProp) parts.push(styleProp);
		return parts.join('; ') || undefined;
	});
</script>

<Skeleton class={className} style={computedStyle} {...rest} />
