<script lang="ts" module>
	import type { InputProps as Props } from './Input.svelte';

	export type InputProps = Props;
</script>

<script lang="ts">
	import Input from './Input.svelte';

	// Kept so existing imports resolve: `Input.svelte` is the one text field now (icon,
	// `loading`, `ref`). Import that in new code.
	let { value = $bindable(undefined), ref = $bindable(null), ...rest }: Props = $props();
</script>

<Input bind:value bind:ref {...rest} />
