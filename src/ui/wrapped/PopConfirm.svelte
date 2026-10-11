<script lang="ts">
	import type { AlertDialogRootProps } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';

	import Spinner from '#ui/components/Spinner.svelte';
	import { getUiLabels } from '#ui/lib/ui-labels.js';
	import * as AlertDialog from '#ui/primitives-new/alert-dialog/index.js';
	import { Button, type ButtonSize, type ButtonVariant } from '#ui/primitives-new/button/index.js';
	import IconButton from '#ui/wrapped/IconButton.svelte';

	export interface PopConfirmProps extends AlertDialogRootProps {
		open?: boolean;
		title?: string;
		description?: string;
		confirmText?: string;
		cancelText?: string;
		class?: string;
		children?: Snippet;
		onConfirm?: () => void;
		onconfirm?: () => void;
		onCancel?: () => void;
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
		icon?: Component;
		confirming?: boolean;
		noTrigger?: boolean;
		/** The confirm deletes or cannot be undone: it is painted red. */
		destructive?: boolean;
	}

	// The fallback words follow the part of the app this sits in (`#ui/lib/ui-labels.ts`).
	const labels = getUiLabels();

	let {
		open = $bindable(false),
		title = labels.confirmTitle,
		description = labels.confirmDescription,
		confirmText = labels.confirm,
		cancelText = labels.cancel,
		children,
		onConfirm,
		onconfirm,
		onCancel,
		variant,
		size,
		loading = false,
		icon,
		confirming = false,
		noTrigger = false,
		destructive = false,
		...restProps
	}: PopConfirmProps = $props();

	let resolvedOnConfirm = $derived(onConfirm ?? onconfirm);
	let hasTriggerButton = $derived(!noTrigger && (variant !== undefined || size !== undefined || icon !== undefined));

	function handleConfirm() {
		resolvedOnConfirm?.();
		open = false;
	}
	function handleCancel() {
		onCancel?.();
		open = false;
	}

	$effect(() => {
		if (confirming) {
			open = true;
		}
	});
</script>

<AlertDialog.Root bind:open {...restProps}>
	{#if !noTrigger}
		{#if hasTriggerButton && !children}
			<AlertDialog.Trigger>
				{#snippet child({ props })}
					<IconButton 
						{...props} 
						variant={variant ?? 'default'} 
						disabled={loading} 
						{icon}
						{loading}
						xs={size==="xs"}
						sm={size==="sm"}
						lg={size==="lg"}
					/>
				{/snippet}
			</AlertDialog.Trigger>
		{:else if hasTriggerButton && children}
			<AlertDialog.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant={variant ?? 'default'} size={size ?? 'default'} disabled={loading} >
						{#if loading}
							<Spinner size={14} class="mr-1" />
						{/if}
						{@render children()}
					</Button>
				{/snippet}
			</AlertDialog.Trigger>
		{:else if children}
			<AlertDialog.Trigger class="w-full flex items-center">
				{@render children()}
			</AlertDialog.Trigger>
		{/if}
	{/if}
	<AlertDialog.Content interactOutsideBehavior="close">
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			<AlertDialog.Description>
				{description}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer class="mt-4">
			<AlertDialog.Cancel onclick={handleCancel}>
				{cancelText}
			</AlertDialog.Cancel>
			<AlertDialog.Action
				onclick={handleConfirm}
				class={destructive
					? 'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/30 text-white'
					: undefined}>
				{confirmText}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
