<script lang="ts">
	import { Check, ChevronsUpDown, Search } from '@lucide/svelte';

	import { normalizeTurkish } from '#ui/lib/util.js';
	import Icon from '#ui/components/Icon.svelte';
	import { Button } from '#ui/primitives-new/button/index.js';
	import * as Popover from '#ui/primitives-new/popover/index.js';
	import Input from '#ui/wrapped/Input.svelte';

	type Selectable = { label: string; value: string | number | null };
	interface Props {
		items: Selectable[];
		selected: Selectable['value'];
		onSelect?: (v: Selectable['value']) => void;
		placeholder?: string;
		disabled?: boolean;
	}

	let {
		items,
		selected = $bindable(),
		placeholder = 'Select',
		disabled = false,
		onSelect
	}: Props = $props();

	let open = $state(false);
	let selectedValue = $derived(items.find((f) => f.value === selected)?.label ?? placeholder);

	let searchQuery = $state('');
	let activeSearchQuery = $derived(normalizeTurkish(searchQuery));
	let filteredItems = $derived(
		items.filter((i) => normalizeTurkish(i.label).includes(activeSearchQuery))
	);
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="justify-between font-normal text-placeholder w-full"
			{disabled}>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="p-0 z-[100] flex flex-col max-h-[320px] overflow-scroll">
		<div class="border-b !border-b-base-300">
			<Input
				class="!border-none !border-transparent !rounded-none !focus-visible:outline-none"
				bind:value={searchQuery}
				placeholder="Ara"
				icon={Search} />
		</div>
		<div class="flex flex-col p-1">
			{#each filteredItems as i (i.value)}
				<button
					onclick={() => {
						if (selected === i.value) selected = null;
						else selected = i.value;
						onSelect?.(selected);
					}}
					class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-base-200">
					<div class="size-5 mr-2 flex items-center justify-center">
						{#if i.value === selected}
							<Icon icon={Check} class="size-4" />
						{/if}
					</div>
					<span>
						{i.label}
					</span>
				</button>
			{:else}
				<div class="w-full h-20 flex items-center justify-center">
					<span class="text-sm">Bulunamadı</span>
				</div>
			{/each}
		</div>
	</Popover.Content>
</Popover.Root>
