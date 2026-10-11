<script lang="ts">
	import { X } from '@lucide/svelte';

	import { getUiLabels } from '#ui/lib/ui-labels.js';
	import * as Dialog from '#ui/primitives-new/dialog/index.js';

	/**
	 * The lightbox: the whole picture, uncropped, on a dark ground lit by a blur of itself.
	 * Esc, a click outside or the corner key closes it.
	 */
	interface Props {
		active?: boolean;
		image: string;
		/** What the picture shows, for screen readers. */
		alt?: string;
		noBlur?: boolean;
		blurredImage?: string;
		children?: import('svelte').Snippet;
	}

	let {
		active = $bindable(false),
		image,
		alt = '',
		noBlur,
		blurredImage,
		children
	}: Props = $props();

	const labels = getUiLabels();
</script>

<Dialog.Root bind:open={active}>
	{#if children}
		<Dialog.Trigger class="flex cursor-zoom-in">
			{@render children?.()}
		</Dialog.Trigger>
	{/if}

	<Dialog.Content
		class="!block !w-auto !max-w-[92vw] !max-h-[92vh] overflow-hidden p-0 text-sm bg-secondary border-none"
		preventScroll
		escapeKeydownBehavior="close"
		interactOutsideBehavior="close"
		showCloseButton={false}>
		<Dialog.Title class="sr-only">{alt || 'Fotoğraf'}</Dialog.Title>
		{#if !noBlur}
			<img
				src={blurredImage ?? image}
				alt=""
				aria-hidden="true"
				class="absolute left-0 top-0 w-full h-full blur-2xl scale-110" />
		{/if}
		<!-- At its own size, but never a stamp (a small file is scaled up to a readable
		     width) and never past the window. -->
		<img
			src={image}
			{alt}
			class="relative block w-auto min-w-[min(92vw,40rem)] max-w-[min(92vw,68rem)] max-h-[92vh] object-contain" />
		<Dialog.Close
			class="absolute end-3 top-3 z-[3] grid size-9 cursor-pointer place-items-center rounded-full bg-black/55 text-white outline-none transition-colors hover:bg-black/75 focus-visible:ring-[3px] focus-visible:ring-white/60">
			<X class="size-[1.125rem]" />
			<span class="sr-only">{labels.close}</span>
		</Dialog.Close>
	</Dialog.Content>
</Dialog.Root>
