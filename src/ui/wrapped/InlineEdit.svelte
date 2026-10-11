<script lang="ts">
	import { Check, Pencil } from '@lucide/svelte';

	import { tick } from 'svelte';

	import { getUiLabels } from '#ui/lib/ui-labels.js';
	import { cn } from '#ui/lib/utils.js';
	import { Spinner } from '#ui/primitives-new/spinner/index.js';

	/**
	 * Text that is edited where it stands: it reads as text, a click (or Enter on it) turns
	 * it into a field of the same size, and leaving the field saves. Enter saves (⌘/Ctrl +
	 * Enter in `multiline`), Escape puts the old text back.
	 *
	 * `onSave` may return a promise: the field shows a spinner until it settles, a tick
	 * when it went through, and falls back to the old text when it rejects. An unchanged
	 * or — unless `allowEmpty` — emptied text is not saved at all.
	 */
	interface Props {
		value: string | number | undefined | null;
		onSave: (value: string) => unknown;
		placeholder?: string;
		/** A textarea that grows with its text. */
		multiline?: boolean;
		disabled?: boolean;
		allowEmpty?: boolean;
		maxlength?: number;
		/** Names the field for a screen reader ("Kampanya adı"). */
		label?: string;
		/** Typography and width: the text and the field share it, so nothing jumps. */
		class?: string;
	}

	const labels = getUiLabels();

	let {
		value,
		onSave,
		placeholder = '',
		multiline = false,
		disabled = false,
		allowEmpty = false,
		maxlength = undefined,
		label = undefined,
		class: className = ''
	}: Props = $props();

	const text = $derived(value === undefined || value === null ? '' : `${value}`);

	let editing = $state(false);
	let draft = $state('');
	let saving = $state(false);
	let saved = $state(false);
	let field = $state<HTMLInputElement | HTMLTextAreaElement>();
	let trigger = $state<HTMLButtonElement>();

	const grow = () => {
		if (!multiline || !field) return;
		field.style.height = 'auto';
		field.style.height = `${field.scrollHeight}px`;
	};

	const start = async () => {
		if (disabled || saving) return;
		draft = text;
		editing = true;
		await tick();
		field?.focus();
		field?.select();
		grow();
	};

	const cancel = async () => {
		editing = false;
		await tick();
		trigger?.focus();
	};

	const commit = async () => {
		if (!editing) return;
		const next = draft.trim();
		editing = false;
		if (next === text || (!next && !allowEmpty)) return;
		saving = true;
		try {
			await onSave(next);
			saved = true;
			setTimeout(() => (saved = false), 1600);
		} catch {
			// The caller reports the failure; the old text is what is still true.
		} finally {
			saving = false;
		}
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			e.stopPropagation();
			cancel();
		} else if (e.key === 'Enter' && (!multiline || e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			field?.blur();
		}
	};

	const box = 'w-full rounded-md px-2 py-1 text-left';
</script>

{#if editing}
	{#if multiline}
		<textarea
			bind:this={field}
			bind:value={draft}
			rows={1}
			{placeholder}
			{maxlength}
			aria-label={label}
			class={cn(
				box,
				'border-ink bg-paper focus-visible:ring-ring/50 -m-px resize-none overflow-hidden border outline-none focus-visible:ring-[3px]',
				className
			)}
			oninput={grow}
			onblur={commit}
			onkeydown={onKeydown}></textarea>
	{:else}
		<input
			bind:this={field}
			bind:value={draft}
			{placeholder}
			{maxlength}
			aria-label={label}
			class={cn(
				box,
				'border-ink bg-paper focus-visible:ring-ring/50 -m-px border outline-none focus-visible:ring-[3px]',
				className
			)}
			onblur={commit}
			onkeydown={onKeydown} />
	{/if}
{:else}
	<button
		bind:this={trigger}
		type="button"
		{disabled}
		aria-label={label ? `${label}: ${text || placeholder}. ${labels.edit}` : undefined}
		title={disabled ? undefined : labels.edit}
		class={cn(
			box,
			'group focus-visible:ring-ring/50 flex min-w-0 items-start gap-2 outline-none transition-colors focus-visible:ring-[3px]',
			disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-wash cursor-text',
			!text && 'text-muted-foreground',
			className
		)}
		onclick={start}>
		<span class={cn('min-w-0 flex-1 break-words', multiline && 'whitespace-pre-wrap')}>
			{text || placeholder}
		</span>
		<span class="text-muted-foreground mt-[0.2em] flex size-[1em] shrink-0 items-center">
			{#if saving}
				<Spinner class="size-full" />
			{:else if saved}
				<Check class="text-success size-full" />
				<span class="sr-only" role="status">{labels.saved}</span>
			{:else if !disabled}
				<Pencil
					class="size-full scale-75 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-60" />
			{/if}
		</span>
	</button>
{/if}
