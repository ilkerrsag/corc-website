<script lang="ts" module>
	export interface PhoneCountry {
		/** ISO 3166-1 alpha-2, e.g. `TR`. */
		iso: string;
		name: string;
		/** Without the plus: `90`. */
		dial: string;
		/** How the national number is grouped, `#` per digit: `### ### ## ##`. */
		mask?: string;
	}

	/** Turkey first, then the countries its visitors most often carry a SIM from. */
	export const PHONE_COUNTRIES: PhoneCountry[] = [
		{ iso: 'TR', name: 'Türkiye', dial: '90', mask: '### ### ## ##' },
		{ iso: 'DE', name: 'Almanya', dial: '49', mask: '#### #######' },
		{ iso: 'NL', name: 'Hollanda', dial: '31', mask: '# ########' },
		{ iso: 'GB', name: 'Birleşik Krallık', dial: '44', mask: '#### ######' },
		{ iso: 'FR', name: 'Fransa', dial: '33', mask: '# ## ## ## ##' },
		{ iso: 'AT', name: 'Avusturya', dial: '43', mask: '### #######' },
		{ iso: 'BE', name: 'Belçika', dial: '32', mask: '### ## ## ##' },
		{ iso: 'CH', name: 'İsviçre', dial: '41', mask: '## ### ## ##' },
		{ iso: 'AZ', name: 'Azerbaycan', dial: '994', mask: '## ### ## ##' },
		{ iso: 'CY', name: 'Kıbrıs', dial: '357', mask: '## ######' },
		{ iso: 'US', name: 'ABD', dial: '1', mask: '### ### ####' }
	];

	const digitsOf = (text: string) => text.replace(/\D/g, '');

	/** Lays `digits` into `mask`; what does not fit follows in one run. */
	export const formatNationalNumber = (digits: string, mask?: string): string => {
		if (!mask) return digits;
		let out = '';
		let i = 0;
		for (const ch of mask) {
			if (i >= digits.length) break;
			if (ch === '#') out += digits[i++];
			else out += ch;
		}
		return (out + digits.slice(i)).trimEnd();
	};

	/** `+905321234567` → its country and national digits; the longest dial code wins. */
	export const splitPhoneNumber = (
		value: string | undefined | null,
		countries: PhoneCountry[] = PHONE_COUNTRIES
	): { country: PhoneCountry | undefined; national: string } => {
		const raw = (value ?? '').trim();
		if (!raw.startsWith('+')) return { country: undefined, national: digitsOf(raw) };
		const digits = digitsOf(raw);
		const country = [...countries]
			.sort((a, b) => b.dial.length - a.dial.length)
			.find((c) => digits.startsWith(c.dial));
		return country
			? { country, national: digits.slice(country.dial.length) }
			: { country: undefined, national: digits };
	};
</script>

<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';

	import { tick } from 'svelte';

	import { getUiLabels } from '#ui/lib/ui-labels.js';
	import { cn } from '#ui/lib/utils.js';

	/**
	 * A mobile number: the country's dial code in front, the national number grouped as it
	 * is written there. The value is always E.164 (`+905321234567`), or empty — what an API
	 * and an SMS gateway take — whatever the person typed or pasted: a leading `0`, spaces,
	 * a full `+90 …` number (which also switches the country).
	 *
	 * The country picker is the platform's own `<select>` laid over the prefix: a wheel on a
	 * phone, a list on desktop, type-ahead and a screen reader for free.
	 */
	interface Props {
		/** E.164, or `''`. */
		value?: string;
		/** The selected country's ISO code. */
		country?: string;
		countries?: PhoneCountry[];
		id?: string;
		name?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		autofocus?: boolean;
		enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
		'aria-invalid'?: boolean | 'true' | 'false';
		'aria-describedby'?: string;
		'aria-required'?: boolean | 'true' | 'false';
		class?: string;
		/** Every edit, with the E.164 value. */
		onInput?: (value: string) => void;
		/** When the field is left after an edit: the moment to validate. */
		onChange?: (value: string) => void;
	}

	const labels = getUiLabels();

	let {
		value = $bindable(''),
		country = $bindable('TR'),
		countries = PHONE_COUNTRIES,
		id = undefined,
		name = undefined,
		placeholder = undefined,
		disabled = false,
		readonly = false,
		autofocus = false,
		enterkeyhint = undefined,
		'aria-invalid': ariaInvalid = undefined,
		'aria-describedby': ariaDescribedBy = undefined,
		'aria-required': ariaRequired = undefined,
		class: className = '',
		onInput,
		onChange
	}: Props = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-phone`);

	const selected = $derived(countries.find((c) => c.iso === country) ?? countries[0]);
	// The national digits, taken from the value: the field has no second copy to drift.
	const national = $derived.by(() => {
		const split = splitPhoneNumber(value, countries);
		return split.country?.iso === selected.iso ? split.national : '';
	});
	const display = $derived(formatNationalNumber(national, selected.mask));
	const maxDigits = $derived(
		selected.mask ? selected.mask.split('#').length - 1 : 15 - selected.dial.length
	);

	// A value set from outside (a stored number) brings its own country.
	$effect(() => {
		const split = splitPhoneNumber(value, countries);
		if (split.country && split.country.iso !== country) country = split.country.iso;
	});

	let inputEl = $state<HTMLInputElement>();

	const commit = (digits: string, next: PhoneCountry = selected) => {
		value = digits ? `+${next.dial}${digits}` : '';
		onInput?.(value);
	};

	const onType = async (e: Event & { currentTarget: HTMLInputElement }) => {
		const el = e.currentTarget;
		const typed = el.value;
		// How many digits sit before the caret: where it has to land after regrouping.
		const digitsBeforeCaret = digitsOf(
			typed.slice(0, el.selectionStart ?? typed.length)
		).length;

		let next = selected;
		let digits: string;
		if (typed.trim().startsWith('+') || typed.trim().startsWith('00')) {
			// A whole international number, typed or pasted.
			const split = splitPhoneNumber(`+${digitsOf(typed).replace(/^00/, '')}`, countries);
			next = split.country ?? selected;
			digits = split.national;
			if (split.country) country = split.country.iso;
		} else {
			// The trunk zero ("0532…") is not part of the number.
			digits = digitsOf(typed).replace(/^0+/, '');
		}
		const limit = next.mask ? next.mask.split('#').length - 1 : maxDigits;
		digits = digits.slice(0, limit);
		commit(digits, next);

		// Svelte only rewrites the input when `display` changed; a refused character leaves
		// it as typed, so the DOM is set by hand before the caret is put back.
		await tick();
		const formatted = formatNationalNumber(digits, next.mask);
		el.value = formatted;
		const lostToPrefix = digitsOf(typed).length - digits.length;
		let wanted = Math.max(0, digitsBeforeCaret - lostToPrefix);
		let caret = 0;
		while (caret < formatted.length && wanted > 0) {
			if (/\d/.test(formatted[caret])) wanted -= 1;
			caret += 1;
		}
		if (document.activeElement === el) el.setSelectionRange(caret, caret);
	};

	const onCountry = (e: Event & { currentTarget: HTMLSelectElement }) => {
		const next = countries.find((c) => c.iso === e.currentTarget.value) ?? selected;
		country = next.iso;
		const limit = next.mask ? next.mask.split('#').length - 1 : 15 - next.dial.length;
		commit(national.slice(0, limit), next);
		onChange?.(value);
		inputEl?.focus();
	};
</script>

<div
	data-slot="phone-input"
	data-invalid={ariaInvalid === true || ariaInvalid === 'true' || undefined}
	data-disabled={disabled || undefined}
	class={cn(
		'border-input bg-paper text-ink flex h-(--field-height) w-full min-w-0 items-stretch rounded-md border text-sm transition-[color,box-shadow,border-color]',
		'hover:border-ink/35 focus-within:border-ink focus-within:ring-ring/50 focus-within:ring-[3px] focus-within:hover:border-ink',
		'data-[invalid]:border-destructive data-[invalid]:focus-within:ring-destructive/20',
		'data-[disabled]:hover:border-input data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className
	)}>
	<!-- The prefix is the face; the real control is the transparent <select> over it. -->
	<div
		class="border-line has-[:focus-visible]:bg-wash relative flex shrink-0 items-center gap-1 rounded-l-md border-r pr-2 pl-3.5">
		<span class="text-muted-foreground text-xs font-medium tracking-wide">{selected.iso}</span>
		<span class="tabular-nums">+{selected.dial}</span>
		<ChevronDown class="text-muted-foreground size-3.5" />
		<select
			class="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
			aria-label={labels.countryCode}
			autocomplete="tel-country-code"
			value={selected.iso}
			disabled={disabled || readonly}
			onchange={onCountry}>
			{#each countries as c (c.iso)}
				<option value={c.iso}>{c.name} (+{c.dial})</option>
			{/each}
		</select>
	</div>
	<!-- svelte-ignore a11y_autofocus (a step that is only this field asks for it) -->
	<input
		bind:this={inputEl}
		id={inputId}
		{name}
		type="tel"
		inputmode="tel"
		autocomplete="tel-national"
		{enterkeyhint}
		{disabled}
		{readonly}
		{autofocus}
		value={display}
		placeholder={placeholder ?? formatNationalNumber('5'.padEnd(maxDigits, '0'), selected.mask)}
		aria-invalid={ariaInvalid}
		aria-describedby={ariaDescribedBy}
		aria-required={ariaRequired}
		class="placeholder:text-faint min-w-0 flex-1 rounded-r-md bg-transparent px-3 tabular-nums outline-none disabled:cursor-not-allowed"
		oninput={onType}
		onchange={() => onChange?.(value)} />
</div>
