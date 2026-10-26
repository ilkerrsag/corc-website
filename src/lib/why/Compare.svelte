<script lang="ts">
	import type { Messages } from '#lib/i18n/index.js';

	let { t }: { t: Messages['whyPage']['compare'] } = $props();

	// The last column is ours, and it is the one the table is built to land on.
	const ours = $derived(t.columns.length - 1);

	// Ours needs the room: its answers are the longest, and the two it is measured
	// against are mostly a word or two.
	const widths = ['w-[22%]', 'w-[24%]', 'w-[18%]', 'w-[36%]'];
</script>

<!--
	One table, read two ways. From `sm` up it is an ordinary comparison grid. Below
	that the header row is taken out of the flow and every row becomes its own card,
	with each cell carrying the column name next to the value, so nothing has to
	scroll sideways on a phone.
-->
<div class="mx-auto mt-10 max-w-4xl">
	<table class="w-full border-collapse text-left text-sm max-sm:block">
		<thead class="max-sm:sr-only">
			<tr>
				<th scope="col" class="{widths[0]} px-4 pb-3 font-medium text-faint">{t.rowLabel}</th>
				{#each t.columns as column, i (column)}
					<th
						scope="col"
						class={[
							'px-4 pb-3 font-medium',
							widths[i + 1],
							i === ours
								? 'rounded-t-xl border-x border-t border-primary/40 bg-foreground/[0.06] pt-3 text-primary'
								: 'text-muted-foreground'
						]}
					>
						{column}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="max-sm:block">
			{#each t.rows as row, r (row.label)}
				{@const last = r === t.rows.length - 1}
				<tr
					class="border-t border-line max-sm:mb-3 max-sm:block max-sm:rounded-xl max-sm:border max-sm:bg-card max-sm:p-4"
				>
					<th
						scope="row"
						class="px-4 py-4 align-top font-medium text-balance max-sm:block max-sm:px-0 max-sm:pt-0 max-sm:pb-3"
					>
						{row.label}
					</th>
					{#each row.values as value, i (value)}
						<td
							class={[
								'px-4 py-4 align-top leading-snug max-sm:flex max-sm:items-baseline max-sm:justify-between max-sm:gap-4 max-sm:px-0 max-sm:py-1.5 max-sm:text-right',
								i === ours
									? 'border-x border-primary/40 bg-foreground/[0.06] font-medium text-foreground max-sm:rounded-lg max-sm:border-x-0 max-sm:px-3'
									: 'text-muted-foreground',
								i === ours && last && 'rounded-b-xl border-b max-sm:border-b-0 sm:pb-5'
							]}
						>
							<span class="text-left text-xs text-faint sm:hidden">{t.columns[i]}</span>
							<span>{value}</span>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<p class="mt-6 border-l-2 border-primary pl-5 text-sm leading-relaxed text-muted-foreground">
		{t.note}
	</p>
</div>
