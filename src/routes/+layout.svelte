<script lang="ts">
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource-variable/archivo/wght.css';
	import '@fontsource-variable/archivo/wght-italic.css';
	import '../app.css';
	import '../media.css';

	import Maintenance from '../ui/Maintenance.svelte';
	import { MAINTENANCE } from '#lib/maintenance.js';

	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

{#if MAINTENANCE}
	<Maintenance />
{:else}
	{@render children()}
{/if}
