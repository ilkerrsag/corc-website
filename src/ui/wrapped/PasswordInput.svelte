<script lang="ts" module>
	/** One rule a new password has to meet, shown as a line that ticks itself off. */
	export interface PasswordRequirement {
		label: string;
		test: (value: string) => boolean;
	}
</script>

<script lang="ts">
	import { ArrowBigUpDash, Check, Circle, Eye, EyeOff } from '@lucide/svelte';
	import { nanoid } from 'nanoid';

	import type { HTMLInputAttributes } from 'svelte/elements';

	import { getUiLabels } from '#ui/lib/ui-labels.js';
	import { cn } from '#ui/lib/utils.js';
	import Input from '#ui/primitives-new/input/input.svelte';

	/**
	 * The password box: an eye key that shows what was typed, a warning while Caps Lock is
	 * on, and — for a *new* password — the rules it has to meet, each ticking off as it is
	 * satisfied (`requirements`). The list only says so; refusing the value is the form's
	 * validator.
	 */
	interface Props extends Omit<HTMLInputAttributes, 'files' | 'type' | 'value'> {
		id?: string;
		value: string | undefined;
		class?: string;
		/** Rules for a new password. Shown once the field has focus or a value. */
		requirements?: PasswordRequirement[];
		/** Warn while Caps Lock is on. On by default. */
		capsLockHint?: boolean;
	}

	const labels = getUiLabels();

	let {
		id = nanoid(),
		value = $bindable(undefined),
		class: className = '',
		requirements = undefined,
		capsLockHint = true,
		onkeydown,
		onkeyup,
		onfocus,
		onblur,
		...rest
	}: Props = $props();

	let isVisible = $state(false);
	let capsLock = $state(false);
	let focused = $state(false);

	type KeyEvent = KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement };
	type FocusEv = FocusEvent & { currentTarget: EventTarget & HTMLInputElement };

	// Some browsers fire key events without the method (autofill): read it defensively.
	const readCapsLock = (e: KeyboardEvent) => {
		if (typeof e.getModifierState === 'function') capsLock = e.getModifierState('CapsLock');
	};

	const showRequirements = $derived(!!requirements?.length && (focused || !!value));
</script>

<div class="flex w-full flex-col gap-1.5">
	<!-- One <input> whose `type` flips: re-creating it (a `{#key}`) would drop focus and the
	     caret every time the eye is pressed. -->
	<div class="relative flex w-full items-center">
		<Input
			type={isVisible ? 'text' : 'password'}
			{id}
			bind:value
			autocapitalize="off"
			autocorrect="off"
			spellcheck={false}
			class={cn('pr-11', className)}
			onkeydown={(e: KeyEvent) => {
				readCapsLock(e);
				onkeydown?.(e);
			}}
			onkeyup={(e: KeyEvent) => {
				readCapsLock(e);
				onkeyup?.(e);
			}}
			onfocus={(e: FocusEv) => {
				focused = true;
				onfocus?.(e);
			}}
			onblur={(e: FocusEv) => {
				focused = false;
				capsLock = false;
				onblur?.(e);
			}}
			{...rest} />
		<button
			type="button"
			class="text-muted-foreground hover:text-ink focus-visible:ring-ring/50 absolute right-0.5 grid size-10 place-items-center rounded-md outline-none transition-colors focus-visible:ring-[3px]"
			aria-label={isVisible ? labels.hidePassword : labels.showPassword}
			title={isVisible ? labels.hidePassword : labels.showPassword}
			aria-pressed={isVisible}
			aria-controls={id}
			onclick={() => (isVisible = !isVisible)}>
			{#if isVisible}
				<EyeOff class="size-4" />
			{:else}
				<Eye class="size-4" />
			{/if}
		</button>
	</div>
	{#if capsLockHint && capsLock}
		<p role="status" class="text-ink m-0 flex items-center gap-1.5 text-xs font-medium">
			<ArrowBigUpDash class="size-3.5 shrink-0" />
			{labels.capsLockOn}
		</p>
	{/if}
	{#if showRequirements}
		<ul class="m-0 flex list-none flex-col gap-1 p-0">
			{#each requirements ?? [] as requirement (requirement.label)}
				{@const met = requirement.test(value ?? '')}
				<li
					class={cn(
						'flex items-center gap-1.5 text-xs transition-colors',
						met ? 'text-success' : 'text-muted-foreground'
					)}>
					{#if met}
						<Check class="size-3.5 shrink-0" />
					{:else}
						<Circle class="size-3.5 shrink-0 scale-[0.6]" />
					{/if}
					{requirement.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
