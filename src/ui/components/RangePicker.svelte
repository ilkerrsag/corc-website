<script lang="ts">
	import {
		DateFormatter,
		fromDate,
		getLocalTimeZone,
		toCalendarDate
	} from '@internationalized/date';
	import { CalendarIcon } from '@lucide/svelte';

	import { cn } from '#ui/lib/utils.js';
	import { buttonVariants } from '#ui/primitives-new/button/index.js';
	import * as Popover from '#ui/primitives-new/popover/index.js';
	import { RangeCalendar } from '#ui/primitives-new/range-calendar/index.js';

	let {
		value = $bindable(),
		onchange = () => {},
		placeholder = 'Pick a date',
		locale = 'en-US',
		numberOfMonths = 2,
		weekStartsOn = undefined,
		class: className = ''
	}: {
		value: { start?: Date; end?: Date };
		onchange?: (value: { start: Date; end: Date }) => void;
		/** Shown on the trigger while no range is picked. */
		placeholder?: string;
		/** BCP 47 tag for the trigger's dates and the calendar's month and weekday names. */
		locale?: string;
		numberOfMonths?: number;
		/** 0 = Sunday … 6 = Saturday; the locale's own first day when left out. */
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		/** Classes of the trigger. */
		class?: string;
	} = $props();

	let open = $state(false);
	const formatter = $derived(new DateFormatter(locale, { dateStyle: 'medium' }));

	// The picked days are kept as UTC midnights, so the calendar reads them back in UTC
	const range = $derived({
		start: value?.start ? toCalendarDate(fromDate(value.start, 'UTC')) : undefined,
		end: value?.end ? toCalendarDate(fromDate(value.end, 'UTC')) : undefined
	});
	const label = $derived.by(() => {
		if (!range.start) return undefined;
		const start = formatter.format(range.start.toDate(getLocalTimeZone()));
		return range.end
			? `${start} – ${formatter.format(range.end.toDate(getLocalTimeZone()))}`
			: start;
	});
</script>

<Popover.Root bind:open>
	<!-- The trigger is the button itself: a `Button` inside it would nest two buttons -->
	<Popover.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'w-full justify-start gap-2 text-left font-normal tabular-nums',
			!label && 'text-muted-foreground',
			className
		)}>
		<CalendarIcon class="size-4 shrink-0" />
		<span class="truncate">{label ?? placeholder}</span>
	</Popover.Trigger>
	<Popover.Content class="w-auto max-w-[calc(100vw-1rem)] overflow-x-auto p-0" align="start">
		<RangeCalendar
			value={range}
			{locale}
			{numberOfMonths}
			{weekStartsOn}
			placeholder={range.start}
			onValueChange={(picked) => {
				if (!picked?.start || !picked?.end) return;
				value = { start: picked.start.toDate('UTC'), end: picked.end.toDate('UTC') };
				onchange(value as { start: Date; end: Date });
				open = false;
			}} />
	</Popover.Content>
</Popover.Root>
