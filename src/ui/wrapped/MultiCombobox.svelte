<script lang="ts">
	import { ChevronsUpDown, Search } from '@lucide/svelte';

	import { normalizeTurkish } from '#ui/lib/util.js';
	import Badge from '#ui/primitives-new/badge/badge.svelte';
	import { Button } from '#ui/primitives-new/button/index.js';
	import * as Popover from '#ui/primitives-new/popover/index.js';
	import Checkbox from '#ui/wrapped/Checkbox.svelte';
	import Input from '#ui/wrapped/Input.svelte';

	type Selectable = { label: string; value: string | number | null };

	interface Props {
		items: Selectable[];
		selected?: Selectable['value'][] | null;
		placeholder?: string;
		disabled?: boolean;
		onChange?: (value: Selectable['value'][] | null) => void;
	}

	let {
		items,
		selected = $bindable(),
		placeholder = 'Select',
		disabled = false,
		onChange
	}: Props = $props();

	let open = $state(false);

	let selectedValues = $derived(
		(selected ?? []).map((s) => items.find((i) => i.value === s)).filter((s) => !!s)
	);

	function toggle(v: Selectable['value']) {
		if ((selected ?? []).includes(v)) {
			selected = (selected ?? []).filter((s) => s !== v);
		} else {
			selected = [...(selected ?? []), v];
		}
		onChange?.([...selected]);
	}

	let searchQuery = $state('');
	let activeSearchQuery = $derived(normalizeTurkish(searchQuery));
	let filteredItems = $derived(
		items.filter((i) => normalizeTurkish(i.label).includes(activeSearchQuery))
	);
</script>

<Popover.Root bind:open>
	<Popover.Trigger {disabled}>
		<Button
			variant="outline"
			role="combobox"
			class="justify-between font-normal text-placeholder w-full"
			{disabled}>
			<span>
				{(selectedValues ?? []).length > 0 ? selectedValues[0].label : placeholder}
				{#if (selected ?? []).length > 1}
					<Badge class="ml-1 h-4 px-1">+{(selected ?? []).length - 1}</Badge>
				{/if}
			</span>
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
				<div
					class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-base-200">
					<Checkbox
						checked={(selected ?? []).includes(i.value)}
						onCheckedChange={() => {
							toggle(i.value);
						}}>
						{i.label}
					</Checkbox>
				</div>
			{:else}
				<div class="w-full h-20 flex items-center justify-center">
					<span class="text-sm">Bulunamadı</span>
				</div>
			{/each}
		</div>
	</Popover.Content>
</Popover.Root>
