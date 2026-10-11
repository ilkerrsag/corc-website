<script lang="ts">
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource-variable/cormorant-garamond/wght.css';
	import '@fontsource-variable/cormorant-garamond/wght-italic.css';
	import '../app.css';
	import '../media.css';

	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

{@render children()}
