<script lang="ts">
	import markImage from '#lib/assets/mark.png';

	let { class: className = '' }: { class?: string } = $props();

	let stirred = $state(false);

	/**
	 * Holds the mark still until it scrolls into view, then lets it run once. Waiting
	 * matters: the whole gesture is over in a second and a half, so starting it while
	 * the band is still below the fold would mean nobody ever sees it.
	 */
	function stirOnce(node: HTMLElement) {
		if (!('IntersectionObserver' in window)) {
			stirred = true;
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				stirred = true;
				observer.disconnect();
			},
			{ threshold: 0.6 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}
</script>

<img
	{@attach stirOnce}
	src={markImage}
	alt=""
	width="256"
	height="256"
	class={['mark', stirred && 'mark--stirred', className]}
/>

<style>
	.mark {
		/*
			The ring sits low and slightly right of the artwork's centre, because the
			spoon handle runs off towards the top left. Turning around the ring's own
			centre is what makes this read as a spoon stirring rather than the whole
			drawing being spun.
		*/
		transform-origin: 50.4% 54.7%;
		transform: rotate(-720deg) scale(0.06);
		opacity: 0;
	}

	.mark--stirred {
		/*
			Two turns of the spoon while it travels in, then it settles. Eased at both
			ends rather than front loaded, so the growth is something you watch rather
			than something that has already happened by the time you look.
		*/
		animation: stir-in 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
	}

	@keyframes stir-in {
		from {
			transform: rotate(-720deg) scale(0.06);
			opacity: 0;
		}
		40% {
			opacity: 1;
		}
		to {
			transform: rotate(0deg) scale(1);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mark,
		.mark--stirred {
			animation: none;
			transform: none;
			opacity: 1;
		}
	}
</style>
