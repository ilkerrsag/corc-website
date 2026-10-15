interface Env {
	DB: D1Database;
	TURNSTILE_SECRET_KEY: string;
	/**
	 * Email Routing binding, used to tell us a request came in. It only exists in
	 * production: locally there is nothing to send with, and the row in the
	 * database is the record either way.
	 */
	NOTIFY?: SendEmail;
	NOTIFY_FROM?: string;
	NOTIFY_TO?: string;
}

interface Submission {
	name: string;
	company: string;
	email: string;
	businessType: string;
	message: string;
	lang: string | null;
}

const MAX_BODY_BYTES = 20_000;
const MAX_LENGTH = { name: 200, company: 200, email: 320, message: 5000 };
const LANGUAGES = ['de', 'en'];
const BUSINESS_TYPES = ['bar', 'caterer', 'hotel', 'company', 'other'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function json(body: unknown, status = 200, headers: HeadersInit = {}): Response {
	return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function field(data: Record<string, unknown>, key: string): string {
	const value = data[key];
	return typeof value === 'string' ? value.trim() : '';
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
	const body = new FormData();
	body.append('secret', secret);
	body.append('response', token);
	if (ip) body.append('remoteip', ip);

	// A verification that cannot be reached counts as failed rather than hanging the form.
	const response = await fetch(TURNSTILE_VERIFY_URL, {
		method: 'POST',
		body,
		signal: AbortSignal.timeout(5000)
	}).catch(() => null);
	if (!response?.ok) return false;
	const result = await response.json<{ success: boolean }>();
	return result.success;
}

/** Anything that reaches a mail header has its line breaks taken out first. */
function oneLine(value: string): string {
	return value.replace(/\s+/g, ' ').trim();
}

/**
 * Sends the request on to whoever answers it. Reply-to is the person who filled
 * the form in, so answering is one tap. Called after the row is written and
 * never awaited by the response: a mail that fails is a mail we can still read
 * in the database.
 */
async function notify(env: Env, submission: Submission): Promise<void> {
	if (!env.NOTIFY || !env.NOTIFY_FROM || !env.NOTIFY_TO) return;

	const lines = [
		`Name:      ${submission.name}`,
		`Betrieb:   ${submission.company}`,
		`Art:       ${submission.businessType}`,
		`E-Mail:    ${submission.email}`,
		`Sprache:   ${submission.lang ?? 'unbekannt'}`,
		'',
		submission.message || '(keine Nachricht)'
	];

	await env.NOTIFY.send({
		from: { name: 'CORC Website', email: env.NOTIFY_FROM },
		to: env.NOTIFY_TO,
		replyTo: { name: oneLine(submission.name), email: submission.email },
		subject: `Tasting-Anfrage: ${oneLine(submission.company)}`,
		text: lines.join('\n')
	});
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (new URL(request.url).pathname !== '/api/contact') {
			return json({ error: 'Not found' }, 404);
		}
		if (request.method !== 'POST') {
			return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
		}

		const raw = await request.text();
		if (raw.length > MAX_BODY_BYTES) {
			return json({ error: 'Message is too large' }, 413);
		}

		let data: Record<string, unknown>;
		try {
			const parsed: unknown = JSON.parse(raw);
			if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error();
			data = parsed as Record<string, unknown>;
		} catch {
			return json({ error: 'Invalid request' }, 400);
		}

		// Honeypot: real visitors never see this field, so pretend it worked and store nothing.
		if (field(data, 'website')) {
			return json({ ok: true });
		}

		const name = field(data, 'name');
		const company = field(data, 'company');
		const email = field(data, 'email');
		const message = field(data, 'message');
		const businessType = field(data, 'businessType');
		const lang = LANGUAGES.includes(field(data, 'lang')) ? field(data, 'lang') : null;

		const fields: Record<string, string> = {};
		if (!name) fields.name = 'Name is required';
		else if (name.length > MAX_LENGTH.name) fields.name = 'Name is too long';
		if (!company) fields.company = 'Venue or company is required';
		else if (company.length > MAX_LENGTH.company) fields.company = 'Venue or company is too long';
		if (!EMAIL_PATTERN.test(email) || email.length > MAX_LENGTH.email) {
			fields.email = 'A valid email is required';
		}
		if (!BUSINESS_TYPES.includes(businessType)) fields.businessType = 'A business type is required';
		if (message.length > MAX_LENGTH.message) fields.message = 'Message is too long';
		if (Object.keys(fields).length > 0) {
			return json({ error: 'Please check the form and try again', fields }, 422);
		}

		const token = field(data, 'cf-turnstile-response');
		const ip = request.headers.get('CF-Connecting-IP');
		if (!token || !(await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip))) {
			return json({ error: 'Verification failed, please try again' }, 403);
		}

		await env.DB.prepare(
			'INSERT INTO submissions (name, company, email, business_type, message, lang) VALUES (?, ?, ?, ?, ?, ?)'
		)
			.bind(name, company, email, businessType, message, lang)
			.run();

		ctx.waitUntil(
			notify(env, { name, company, email, businessType, message, lang }).catch((error: unknown) => {
				console.error('notification failed', error);
			})
		);

		return json({ ok: true });
	}
} satisfies ExportedHandler<Env>;
