<script lang="ts" generics="T extends string | number">
	import { cn } from '#ui/lib/utils.js';

	/**
	 * A single choice laid out as one row per option: the whole row is the tap target, and
	 * each label has room for a line of explanation under it. For a handful of options that
	 * deserve a sentence each (parcel sizes, who pays the shipping, an item's working state);
	 * a long or self-explanatory set wants pills or a list instead.
	 */
	interface Props {
		options: { value: T; label: string; hint?: string }[];
		value: T | null | undefined;
		/** Names the group for assistive tech. */
		label: string;
		/** `null` when a clearable choice is taken back. */
		onChange: (value: T | null) => void;
		disabled?: boolean;
		/** Tapping the picked row again clears it. Off for a choice that always has an answer. */
		clearable?: boolean;
		/**
		 * One panel with hairlines between the rows instead of a card per row with gaps. For
		 * rows that are mostly a single line, where separate cards would only add height.
		 */
		joined?: boolean;
		class?: string;
	}

	let {
		options,
		value,
		label,
		onChange,
		disabled = false,
		clearable = false,
		joined = false,
		class: className = ''
	}: Props = $props();
</script>

<div
	class={cn(
		joined
			? 'bg-paper border-line divide-line flex flex-col divide-y overflow-hidden rounded-xl border'
			: 'grid grid-cols-1 gap-2',
		className
	)}
	role="radiogroup"
	aria-label={label}>
	{#each options as option (option.value)}
		{@const selected = option.value === value}
		<button
			type="button"
			role="radio"
			aria-checked={selected}
			{disabled}
			class={[
				'focus-visible:ring-ring/50 flex min-h-11 items-center gap-3 px-4 py-3 text-left outline-none transition-colors focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				joined
					? // The panel clips its rows, so the ring is drawn inside the row.
						['focus-visible:ring-inset', selected ? 'bg-wash' : 'enabled:hover:bg-wash/60']
					: [
							'rounded-xl border',
							selected
								? 'border-ink bg-wash'
								: 'border-line bg-paper enabled:hover:bg-wash/60'
						]
			]}
			onclick={() => onChange(clearable && selected ? null : option.value)}>
			<span
				class={[
					'grid size-5 shrink-0 place-items-center rounded-full border-2',
					selected ? 'border-ink' : 'border-input'
				]}>
				{#if selected}<span class="bg-ink size-2.5 rounded-full"></span>{/if}
			</span>
			<span class="flex flex-col">
				<span class="text-ink text-sm font-semibold">{option.label}</span>
				{#if option.hint}
					<span class="text-muted-foreground text-sm">{option.hint}</span>
				{/if}
			</span>
		</button>
	{/each}
</div>
