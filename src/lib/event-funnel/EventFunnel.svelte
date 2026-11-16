<script lang="ts">
	import { onMount } from 'svelte';

	import type { Locale } from '#lib/i18n/index.js';

	import './funnel.css';
	import { mountEventFunnel } from './engine.js';

	let { lang, label }: { lang: Locale; label: string } = $props();

	// The engine is plain DOM and draws every frame, so it only starts in the browser.
	onMount(() => mountEventFunnel(lang));
</script>

<div class="funnel">
	<div class="cf-app">
		<section class="cf-panel">
			<div class="cf-phead">
				<div class="cf-mark">{label}</div>
				<div class="cf-rail" id="rail"></div>
			</div>
			<div class="cf-steps" id="steps"></div>
			<div class="cf-sumbar">
				<div class="cf-crumbs" id="crumbs"></div>
				<button class="cf-btn" id="send" disabled>Send</button>
			</div>
		</section>
		<section class="cf-stage">
			<div class="cf-stagetag" id="stagetag"></div>
			<svg id="sheet" viewBox="0 0 1000 720" aria-label={label}></svg>
		</section>
	</div>
	<svg id="probe"></svg>
</div>
