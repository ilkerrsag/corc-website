interface Env {
	DB: D1Database;
	TURNSTILE_SECRET_KEY: string;
}

const MAX_BODY_BYTES = 20_000;
const MAX_LENGTH = { name: 200, company: 200, email: 320, message: 5000 };
const LANGUAGES = ['de', 'en'];
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

export default {
	async fetch(request, env): Promise<Response> {
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
		const lang = LANGUAGES.includes(field(data, 'lang')) ? field(data, 'lang') : null;

		const fields: Record<string, string> = {};
		if (!name) fields.name = 'Name is required';
		else if (name.length > MAX_LENGTH.name) fields.name = 'Name is too long';
		if (!company) fields.company = 'Venue or company is required';
		else if (company.length > MAX_LENGTH.company) fields.company = 'Venue or company is too long';
		if (!EMAIL_PATTERN.test(email) || email.length > MAX_LENGTH.email) {
			fields.email = 'A valid email is required';
		}
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
			'INSERT INTO submissions (name, company, email, message, lang) VALUES (?, ?, ?, ?, ?)'
		)
			.bind(name, company, email, message, lang)
			.run();

		return json({ ok: true });
	}
} satisfies ExportedHandler<Env>;
