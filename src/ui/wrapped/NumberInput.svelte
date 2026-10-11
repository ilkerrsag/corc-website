<script lang="ts">
	import { Minus, Plus } from '@lucide/svelte';
	import { nanoid } from 'nanoid';

	import { cn } from '#ui/lib/utils.js';

	/**
	 * A stepper for a small whole number (a quantity, a day count): − value +. The value is
	 * typed or stepped, and always lands inside `min`…`max`. For money use
	 * `formatted-input/currency-input`; for any other number a plain `Input type="number"`.
	 */
	interface Props {
		value: number;
		id?: string;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		placeholder?: string;
		/** Names the field for assistive tech when no <label for> points at it. */
		label?: string;
		'aria-invalid'?: boolean | 'true' | 'false';
		class?: string;
		onChange?: (value: number) => void;
	}

	let {
		value = $bindable(),
		id = nanoid(),
		min = Number.NEGATIVE_INFINITY,
		max = Number.POSITIVE_INFINITY,
		step = 1,
		disabled = false,
		placeholder = '',
		label = undefined,
		'aria-invalid': ariaInvalid = undefined,
		class: className = '',
		onChange
	}: Props = $props();

	const clamp = (n: number) => Math.min(max, Math.max(min, n));
	// An empty or cleared field steps from the floor (or from zero when there is none).
	const current = () => (Number.isFinite(Number(value)) ? Number(value) : NaN);
	const floor = () => (Number.isFinite(min) ? min : 0);

	let canDecrease = $derived(!disabled && (Number.isNaN(current()) || current() - step >= min));
	let canIncrease = $derived(!disabled && (Number.isNaN(current()) || current() + step <= max));

	const commit = (next: number) => {
		value = clamp(next);
		onChange?.(value);
	};

	const stepBy = (direction: 1 | -1) => {
		const from = current();
		commit(Number.isNaN(from) ? floor() : from + direction * step);
	};

	const onInput = (e: Event & { currentTarget: HTMLInputElement }) => {
		const raw = e.currentTarget.value;
		if (raw === '') return;
		const parsed = Number(raw);
		if (Number.isFinite(parsed)) value = parsed;
	};

	// Typing is free; the clamp happens when the field is left, so "1" → "12" is not
	// fought on the way to a two-digit number.
	const onBlur = (e: Event & { currentTarget: HTMLInputElement }) => {
		const from = current();
		commit(Number.isNaN(from) ? floor() : from);
		e.currentTarget.value = String(value);
	};

	const KEY =
		'text-ink hover:bg-ink/5 grid h-full w-11 shrink-0 place-items-center transition-colors outline-none focus-visible:bg-ink/5 disabled:pointer-events-none disabled:opacity-35 md:w-10';
</script>

<div
	role="group"
	aria-label={label}
	data-slot="number-input"
	data-disabled={disabled || undefined}
	class={cn(
		'border-input bg-paper flex h-(--field-height) w-full items-stretch overflow-hidden rounded-md border transition-[box-shadow,border-color]',
		'focus-within:border-ink focus-within:ring-ring/50 focus-within:ring-[3px]',
		'has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-destructive/20',
		'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className
	)}>
	<button
		type="button"
		class={KEY}
		aria-label="Azalt"
		disabled={!canDecrease}
		onclick={() => stepBy(-1)}>
		<Minus class="size-4" />
	</button>
	<input
		{id}
		type="text"
		inputmode="numeric"
		autocomplete="off"
		{placeholder}
		{disabled}
		aria-invalid={ariaInvalid}
		value={value ?? ''}
		oninput={onInput}
		onblur={onBlur}
		onkeydown={(e) => {
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				if (canIncrease) stepBy(1);
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				if (canDecrease) stepBy(-1);
			}
		}}
		class="border-line placeholder:text-faint min-w-0 flex-1 border-x bg-transparent px-2 text-center text-sm font-semibold tabular-nums outline-none disabled:cursor-not-allowed" />
	<button
		type="button"
		class={KEY}
		aria-label="Artır"
		disabled={!canIncrease}
		onclick={() => stepBy(1)}>
		<Plus class="size-4" />
	</button>
</div>
