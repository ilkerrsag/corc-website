<script lang="ts">
	import { site } from '#lib/site.js';
</script>

<svelte:head>
	<title>CORC — Wartungsarbeiten / Maintenance</title>
	<meta name="robots" content="noindex" />
	<meta
		name="description"
		content="CORC is briefly offline for maintenance. CORC ist kurz wegen Wartungsarbeiten offline."
	/>
</svelte:head>

<main>
	<div class="mark">CORC<span>.</span></div>

	<section>
		<p class="eyebrow">Maintenance</p>
		<h1>We are working on the site.</h1>
		<p>
			CORC will be back shortly. In the meantime, write to us at
			<a href="mailto:{site.email}">{site.email}</a> and we will get straight back to you.
		</p>
	</section>

	<hr />

	<section lang="de">
		<p class="eyebrow">Wartungsarbeiten</p>
		<h1>Wir arbeiten gerade an der Seite.</h1>
		<p>
			CORC ist in Kürze wieder da. Schreibt uns in der Zwischenzeit an
			<a href="mailto:{site.email}">{site.email}</a> und wir melden uns direkt zurück.
		</p>
	</section>
</main>

<style>
	main {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;
		max-width: 34rem;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		background: hsl(0 0% 12%);
		color: hsl(0 0% 98%);
	}

	.mark {
		font-family: 'Archivo Variable', system-ui, sans-serif;
		font-weight: 700;
		letter-spacing: 0.16em;
		font-size: 0.95rem;
	}

	.mark span {
		color: hsl(50 98% 51%);
	}

	.eyebrow {
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: hsl(50 98% 51%);
		margin: 0 0 0.75rem;
	}

	h1 {
		font-family: 'Archivo Variable', system-ui, sans-serif;
		font-weight: 600;
		font-size: clamp(1.6rem, 5vw, 2.1rem);
		line-height: 1.15;
		letter-spacing: -0.02em;
		margin: 0 0 0.9rem;
	}

	p {
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 0.98rem;
		line-height: 1.65;
		color: hsl(0 0% 72%);
		margin: 0;
	}

	a {
		color: hsl(0 0% 98%);
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: hsl(50 98% 51%);
	}

	hr {
		border: 0;
		border-top: 1px solid hsl(0 0% 22%);
		margin: 0;
	}
</style>
