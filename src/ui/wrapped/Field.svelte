<script lang="ts">
	import type { Snippet } from 'svelte';

	import { getUiLabels } from '#ui/lib/ui-labels.js';
	import { cn } from '#ui/lib/utils.js';
	import Label from '#ui/primitives-new/label/label.svelte';

	/**
	 * A control with everything a form puts around it: the label (with its required mark
	 * or "optional"), a quiet hint, the error that takes the hint's place, and a character
	 * count. For a field outside a `createForm` form — `<Form>` draws the same frame itself.
	 *
	 * The control goes in as a snippet and spreads `attrs` onto itself, so the label points
	 * at it and a screen reader hears the hint or the error with it:
	 *
	 *   <Field label="Ad" error={nameError}>
	 *     {#snippet children({ attrs })}<Input bind:value={name} {...attrs} />{/snippet}
	 *   </Field>
	 */
	export interface FieldControlAttrs {
		id: string;
		'aria-invalid'?: true;
		'aria-describedby'?: string;
		'aria-required'?: true;
	}

	interface Props {
		label?: string;
		/** What to type, why we ask. Gives way to `error`. */
		hint?: string;
		/** Set when the value is refused: the line turns red and is announced. */
		error?: string | null;
		/** An asterisk on the label and `aria-required` on the control. */
		required?: boolean;
		/** "isteğe bağlı" beside the label. */
		optional?: boolean;
		/** How many characters are typed; shown as "12 / 80" with `max`. */
		count?: number;
		max?: number;
		/** The control's id, when the page already has one for it. */
		id?: string;
		class?: string;
		children: Snippet<[{ attrs: FieldControlAttrs; invalid: boolean }]>;
	}

	const labels = getUiLabels();

	let {
		label,
		hint,
		error = null,
		required = false,
		optional = false,
		count,
		max,
		id: givenId,
		class: className = '',
		children
	}: Props = $props();

	const uid = $props.id();
	const id = $derived(givenId ?? `${uid}-control`);
	const invalid = $derived(!!error);
	const showCount = $derived(count !== undefined && max !== undefined);
	const over = $derived(showCount && count! > max!);

	const attrs = $derived<FieldControlAttrs>({
		id,
		'aria-invalid': invalid || undefined,
		'aria-describedby': invalid ? `${id}-error` : hint ? `${id}-hint` : undefined,
		'aria-required': required || undefined
	});
</script>

<div class={cn('flex min-w-0 flex-col gap-2', className)}>
	{#if label}
		<Label for={id} class="gap-1.5">
			{label}
			{#if required}
				<span class="text-destructive" aria-hidden="true">*</span>
			{:else if optional}
				<span class="text-muted-foreground font-normal">{labels.optional}</span>
			{/if}
		</Label>
	{/if}
	<div class="flex flex-col gap-1.5">
		{@render children({ attrs, invalid })}
		{#if error || hint || showCount}
			<div class="flex items-start justify-between gap-3">
				{#if error}
					<p
						id={`${id}-error`}
						role="alert"
						class="text-destructive m-0 text-xs font-semibold">
						{error}
					</p>
				{:else if hint}
					<p id={`${id}-hint`} class="text-muted-foreground m-0 text-sm">{hint}</p>
				{:else}
					<span></span>
				{/if}
				{#if showCount}
					<span
						class={cn(
							'shrink-0 text-xs tabular-nums',
							over ? 'text-destructive' : 'text-muted-foreground'
						)}
						aria-hidden="true">
						{count} / {max}
					</span>
				{/if}
			</div>
		{/if}
	</div>
</div>
