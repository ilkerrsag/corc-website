<script lang="ts" module>
	import type { IconNode } from '@lucide/svelte';
	import type { Component } from 'svelte';

	export interface MegaMenuSection {
		value: string;
		label: string;
		/** A section with an `href` is a real link (its own landing page); without one, a button. */
		href?: string;
		icon?: Component | IconNode;
	}
</script>

<script lang="ts" generics="T extends MegaMenuSection">
	import { ChevronRight } from '@lucide/svelte';

	import { onDestroy, type Snippet, untrack } from 'svelte';

	import Icon from '#ui/components/Icon.svelte';
	import { cn } from '#ui/lib/utils.js';

	/**
	 * The body of a mega menu: the sections down the left, the active section's pane on
	 * the right (a shop's departments and their sub-categories). It is only the body — the
	 * thing that opens it is the caller's (`NavigationMenu.Content`, a popover).
	 *
	 * Pointer: a section takes over after `intentDelay` of resting on it, so travelling
	 * diagonally from a section into its pane does not flip the pane to the rows crossed on
	 * the way. Keyboard: Up / Down / Home / End walk the sections (the pane follows focus),
	 * Right steps into the pane, Left steps back to its section, Up / Down walk the pane's
	 * links. Only the active section is a tab stop, so Tab goes section → pane → out.
	 */
	interface Props {
		sections: T[];
		/** The section whose pane is on show. Defaults to the first one. */
		active?: string;
		/** Names the list of sections for a screen reader ("Kategoriler"). */
		label: string;
		/** How long the pointer rests on a section before its pane shows, in ms. */
		intentDelay?: number;
		/** Called whenever a section becomes the active one (load its pane's data here). */
		onActivate?: (section: T) => void;
		/** The active section's pane. */
		pane: Snippet<[T]>;
		/** A strip under both columns (a "see everything" link). */
		footer?: Snippet;
		class?: string;
		sectionsClass?: string;
		paneClass?: string;
	}

	let {
		sections,
		active = $bindable(),
		label,
		intentDelay = 120,
		onActivate,
		pane,
		footer,
		class: className = '',
		sectionsClass = '',
		paneClass = ''
	}: Props = $props();

	const uid = $props.id();
	const paneId = `${uid}-pane`;

	let root: HTMLElement | undefined = $state();
	let paneEl: HTMLElement | undefined = $state();

	const activeSection = $derived(sections.find((s) => s.value === active) ?? sections[0]);

	// The first section is active from the start; its data is asked for like any other's.
	$effect(() => {
		const section = activeSection;
		if (!section) return;
		untrack(() => onActivate?.(section));
	});

	let intent: ReturnType<typeof setTimeout> | undefined;
	const cancelIntent = () => {
		clearTimeout(intent);
		intent = undefined;
	};
	onDestroy(cancelIntent);

	const activate = (value: string) => {
		cancelIntent();
		active = value;
	};

	const onSectionEnter = (e: PointerEvent, value: string) => {
		// A finger has no hover: the tap itself follows the link.
		if (e.pointerType !== 'mouse') return;
		cancelIntent();
		if (value === activeSection?.value) return;
		intent = setTimeout(() => activate(value), intentDelay);
	};

	const sectionEls = () =>
		Array.from(root?.querySelectorAll<HTMLElement>('[data-mega-section]') ?? []);
	const paneEls = () =>
		Array.from(
			paneEl?.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
			) ?? []
		);

	const step = (items: HTMLElement[], current: Element | null, key: string) => {
		const index = items.indexOf(current as HTMLElement);
		if (key === 'Home') return items[0];
		if (key === 'End') return items[items.length - 1];
		if (key === 'ArrowDown') return items[Math.min(index + 1, items.length - 1)];
		return items[Math.max(index - 1, 0)];
	};

	const onkeydown = (e: KeyboardEvent) => {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		const target = e.target as HTMLElement;
		const inSections = target.hasAttribute('data-mega-section');
		const inPane = !inSections && !!paneEl?.contains(target);
		if (!inSections && !inPane) return;

		let next: HTMLElement | undefined;
		if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
			next = step(inSections ? sectionEls() : paneEls(), target, e.key);
		} else if (e.key === 'ArrowRight' && inSections) {
			next = paneEls()[0];
		} else if (e.key === 'ArrowLeft' && inPane) {
			next = sectionEls().find((el) => el.dataset.megaSection === activeSection?.value);
		} else {
			return;
		}
		// Handled here: the menu around this body must not also move focus.
		e.preventDefault();
		e.stopPropagation();
		next?.focus();
		// The pane follows the keyboard at once (the focus handler says the same, but it
		// does not fire in a window that is not the focused one).
		const section = next?.dataset.megaSection;
		if (section) activate(section);
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={root} class={cn('flex flex-col', className)} {onkeydown}>
	<div class="flex min-h-0 flex-1">
		<ul
			class={cn(
				'border-line flex w-56 shrink-0 flex-col gap-0.5 border-r p-2',
				sectionsClass
			)}
			aria-label={label}>
			{#each sections as section (section.value)}
				{@const isActive = section.value === activeSection?.value}
				<li>
					<svelte:element
						this={section.href ? 'a' : 'button'}
						href={section.href}
						type={section.href ? undefined : 'button'}
						data-mega-section={section.value}
						data-active={isActive ? '' : undefined}
						aria-expanded={isActive}
						aria-controls={paneId}
						tabindex={isActive ? 0 : -1}
						class="text-ink hover:bg-tint data-[active]:bg-tint focus-visible:ring-ring flex h-10 w-full items-center gap-2.5 rounded-md px-3 text-left text-sm outline-none transition-colors focus-visible:ring-2"
						onpointerenter={(e: PointerEvent) => onSectionEnter(e, section.value)}
						onpointerleave={cancelIntent}
						onfocus={() => activate(section.value)}>
						{#if section.icon}
							<Icon
								icon={section.icon}
								size={16}
								class="text-muted-foreground shrink-0" />
						{/if}
						<span class="min-w-0 flex-1 truncate">{section.label}</span>
						<ChevronRight
							class={cn(
								'text-muted-foreground size-3.5 shrink-0 transition-opacity',
								isActive ? 'opacity-100' : 'opacity-0'
							)}
							aria-hidden="true" />
					</svelte:element>
				</li>
			{/each}
		</ul>
		<div
			bind:this={paneEl}
			id={paneId}
			role="group"
			aria-label={activeSection?.label}
			class={cn('min-w-0 flex-1 p-5', paneClass)}>
			{#if activeSection}
				{@render pane(activeSection)}
			{/if}
		</div>
	</div>
	{#if footer}
		<div class="border-line border-t px-5 py-3">
			{@render footer()}
		</div>
	{/if}
</div>
