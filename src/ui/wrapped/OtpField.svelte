<script lang="ts">
	import { onMount } from 'svelte';

	import { getUiLabels } from '#ui/lib/ui-labels.js';
	import { cn } from '#ui/lib/utils.js';
	import { Spinner } from '#ui/primitives-new/spinner/index.js';
	import PinInput from '#ui/wrapped/PinInput.svelte';

	/**
	 * A one-time code as a whole field: the cells (paste, auto-advance, the code offered
	 * from the SMS), the line under them — an error, a notice, a hint — and the resend key
	 * with its countdown. `onComplete` fires on the last digit, so the step submits itself.
	 *
	 * The field only keeps the clock: asking for a new code is `onResend`, and a promise it
	 * returns holds the key busy and restarts the countdown when it resolves. A rejection
	 * leaves the key ready, for the caller to say why under the cells (`error`).
	 */
	interface Props {
		value?: string;
		length?: number;
		/** The code was refused: red cells and this line under them. */
		error?: string | null;
		/** A neutral line in the same place ("Yeni bir kod gönderdik."). */
		notice?: string | null;
		/** Shown when there is neither. */
		hint?: string;
		disabled?: boolean;
		autofocus?: boolean;
		/** Names the cells for a screen reader. */
		label?: string;
		onComplete?: (code: string) => void;
		/** Leave out for a code that cannot be sent again: no resend key at all. */
		onResend?: () => unknown;
		/** Seconds before the resend key wakes up. */
		resendAfter?: number;
		class?: string;
	}

	const labels = getUiLabels();

	let {
		value = $bindable(''),
		length = 6,
		error = null,
		notice = null,
		hint = undefined,
		disabled = false,
		autofocus = false,
		label = undefined,
		onComplete,
		onResend,
		resendAfter = 60,
		class: className = ''
	}: Props = $props();

	const uid = $props.id();

	// svelte-ignore state_referenced_locally (the starting value of a clock)
	let secondsLeft = $state(resendAfter);
	let resending = $state(false);

	const countdown = $derived(
		`${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`
	);

	onMount(() => {
		const timer = setInterval(() => {
			if (secondsLeft > 0) secondsLeft -= 1;
		}, 1000);
		return () => clearInterval(timer);
	});

	const resend = async () => {
		if (resending || secondsLeft > 0 || !onResend) return;
		resending = true;
		try {
			await onResend();
			value = '';
			secondsLeft = resendAfter;
		} catch {
			// The caller says what went wrong; the key stays ready for another try.
		} finally {
			resending = false;
		}
	};

	const line = $derived(error ?? notice ?? hint);
</script>

<div class={cn('flex w-full flex-col gap-2', className)}>
	<PinInput
		bind:value
		maxlength={length}
		{disabled}
		{autofocus}
		invalid={!!error}
		aria-label={label}
		aria-describedby={line ? `${uid}-line` : undefined}
		{onComplete} />
	{#if error}
		<p id={`${uid}-line`} role="alert" class="text-destructive m-0 text-xs font-semibold">
			{error}
		</p>
	{:else if notice}
		<p id={`${uid}-line`} role="status" class="text-muted-foreground m-0 text-sm">{notice}</p>
	{:else if hint}
		<p id={`${uid}-line`} class="text-muted-foreground m-0 text-sm">{hint}</p>
	{/if}
	{#if onResend}
		<div class="flex min-h-9 items-center text-sm">
			{#if secondsLeft > 0}
				<span class="text-muted-foreground tabular-nums" aria-live="off">
					{labels.resendCodeIn.replace('{time}', countdown)}
				</span>
			{:else}
				<button
					type="button"
					class="text-ink decoration-line hover:decoration-ink focus-visible:ring-ring/50 inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-sm font-medium underline underline-offset-4 outline-none focus-visible:ring-[3px] disabled:cursor-default disabled:opacity-60"
					disabled={resending || disabled}
					onclick={resend}>
					{#if resending}<Spinner class="size-3.5" />{/if}
					{labels.resendCode}
				</button>
			{/if}
		</div>
	{/if}
</div>
