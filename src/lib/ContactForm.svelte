<script lang="ts">
	import type { Locale, Messages } from '#lib/i18n/index.js';
	import Input from '#ui/primitives-new/input/input.svelte';
	import Textarea from '#ui/primitives-new/textarea/textarea.svelte';
	import Button from '#ui/wrapped/Button.svelte';
	import Field from '#ui/wrapped/Field.svelte';

	const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

	type Status = 'idle' | 'sending' | 'sent' | 'error';
	type FieldName = 'name' | 'company' | 'email' | 'businessType' | 'message';

	let { lang, t }: { lang: Locale; t: Messages['tasting']['form'] } = $props();

	let status = $state<Status>('idle');
	let error = $state('');
	let invalidFields = $state<FieldName[]>([]);
	let widgetId: string | undefined;

	const fieldError = (field: FieldName) => (invalidFields.includes(field) ? t.errors[field] : null);

	function loadTurnstile(): Promise<NonNullable<Window['turnstile']>> {
		if (window.turnstile) return Promise.resolve(window.turnstile);
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = TURNSTILE_SRC;
			script.async = true;
			script.onload = () => resolve(window.turnstile!);
			script.onerror = () => reject(new Error('Turnstile failed to load'));
			document.head.append(script);
		});
	}

	function turnstile(container: HTMLElement) {
		let removed = false;
		loadTurnstile()
			.then((api) => {
				if (removed) return;
				widgetId = api.render(container, {
					sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
					theme: 'dark',
					size: 'flexible',
					language: lang
				});
			})
			.catch(() => {
				status = 'error';
				error = t.errors.verificationLoad;
			});

		return () => {
			removed = true;
			if (widgetId) window.turnstile?.remove(widgetId);
			widgetId = undefined;
		};
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		// Includes the hidden `cf-turnstile-response` input the widget adds to the form.
		const data = Object.fromEntries(new FormData(form));

		status = 'sending';
		error = '';
		invalidFields = [];

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...data, lang })
			});

			if (!response.ok) {
				const result = await response.json().catch(() => ({}));
				status = 'error';
				invalidFields = Object.keys(result.fields ?? {}) as FieldName[];
				error =
					response.status === 422
						? t.errors.invalid
						: response.status === 403
							? t.errors.verification
							: t.errors.generic;
				return;
			}

			status = 'sent';
			form.reset();
		} catch {
			status = 'error';
			error = t.errors.network;
		} finally {
			// Turnstile tokens are single-use.
			if (widgetId) window.turnstile?.reset(widgetId);
		}
	}
</script>

{#if status === 'sent'}
	<div class="rounded-2xl border border-line bg-background p-8 text-center" role="status">
		<p class="font-display text-3xl font-semibold">{t.sentTitle}</p>
		<p class="mt-2 text-muted-foreground">{t.sentText}</p>
	</div>
{:else}
	<form onsubmit={submit} class="grid gap-5">
		<div class="grid items-end gap-5 sm:grid-cols-2">
			<Field label={t.name} required error={fieldError('name')}>
				{#snippet children({ attrs })}
					<Input name="name" required maxlength={200} autocomplete="name" {...attrs} />
				{/snippet}
			</Field>
			<Field label={t.company} required error={fieldError('company')}>
				{#snippet children({ attrs })}
					<Input name="company" required maxlength={200} autocomplete="organization" {...attrs} />
				{/snippet}
			</Field>
		</div>

		<Field label={t.email} required error={fieldError('email')}>
			{#snippet children({ attrs })}
				<Input name="email" type="email" required maxlength={320} autocomplete="email" {...attrs} />
			{/snippet}
		</Field>

		<Field label={t.businessType} required error={fieldError('businessType')}>
			{#snippet children({ attrs })}
				<select
					name="businessType"
					required
					class="border-input bg-paper placeholder:text-faint focus-visible:border-ink focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex h-(--field-height) w-full min-w-0 rounded-md border px-3.5 py-1 text-sm outline-none transition-[color,box-shadow,border-color] enabled:hover:border-ink/35 focus-visible:ring-[3px]"
					{...attrs}
				>
					<option value="">{t.businessTypePlaceholder}</option>
					{#each t.businessTypeOptions as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			{/snippet}
		</Field>

		<Field label={t.message} error={fieldError('message')}>
			{#snippet children({ attrs })}
				<Textarea
					name="message"
					maxlength={5000}
					rows={4}
					placeholder={t.messagePlaceholder}
					class="min-h-28"
					{...attrs}
				/>
			{/snippet}
		</Field>

		<!-- Honeypot: hidden from people, tempting for bots. -->
		<div class="absolute -left-[9999px]" aria-hidden="true">
			<label>
				Website
				<input name="website" tabindex="-1" autocomplete="off" />
			</label>
		</div>

		<div {@attach turnstile}></div>

		{#if error}<p class="text-sm font-medium text-destructive" role="alert">{error}</p>{/if}

		<Button
			type="submit"
			size="xl"
			class="rounded-full sm:justify-self-start sm:px-10"
			loading={status === 'sending'}
		>
			{status === 'sending' ? t.sending : t.submit}
		</Button>
	</form>
{/if}
