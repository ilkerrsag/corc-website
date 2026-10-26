interface Env {
	DB: D1Database;
	TURNSTILE_SECRET_KEY: string;
	/**
	 * Brevo sends the notification that a request came in. The domain's mail is
	 * on Google Workspace, so Cloudflare's own Email Routing cannot have the MX
	 * record. Unset locally: there the row in the database is the whole record.
	 */
	BREVO_API_KEY?: string;
	NOTIFY_FROM?: string;
	NOTIFY_TO?: string;
}

interface Submission {
	name: string;
	company: string;
	email: string;
	businessType: string;
	message: string;
	topic: string;
	lang: string | null;
}

const MAX_BODY_BYTES = 20_000;
const MAX_LENGTH = { name: 200, company: 200, email: 320, message: 5000 };
const LANGUAGES = ['de', 'en'];
const BUSINESS_TYPES = ['bar', 'caterer', 'hotel', 'company', 'other'];

/**
 * The tasting page sends no topic, because asking for a tasting is the only
 * thing it does. The contact page sends one, and it decides both what the form
 * still has to ask for and what the subject line of the notification says.
 */
const TOPICS = ['tasting', 'pricing', 'product', 'press', 'other'];
const TOPIC_SUBJECTS: Record<string, string> = {
	tasting: 'Tasting-Anfrage',
	pricing: 'Preise und Bestellung',
	product: 'Produktfrage',
	press: 'Presse und Kooperation',
	other: 'Anfrage'
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email';

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
	if (!env.BREVO_API_KEY || !env.NOTIFY_FROM || !env.NOTIFY_TO) return;

	const subject = TOPIC_SUBJECTS[submission.topic] ?? TOPIC_SUBJECTS.other;
	const lines = [
		`Thema:     ${subject}`,
		`Name:      ${submission.name}`,
		`Betrieb:   ${submission.company || '(keine Angabe)'}`,
		`Art:       ${submission.businessType || '(keine Angabe)'}`,
		`E-Mail:    ${submission.email}`,
		`Sprache:   ${submission.lang ?? 'unbekannt'}`,
		'',
		submission.message || '(keine Nachricht)'
	];

	const response = await fetch(BREVO_SEND_URL, {
		method: 'POST',
		headers: {
			'api-key': env.BREVO_API_KEY,
			'content-type': 'application/json',
			accept: 'application/json'
		},
		body: JSON.stringify({
			sender: { name: 'CORC Website', email: env.NOTIFY_FROM },
			to: [{ email: env.NOTIFY_TO }],
			replyTo: { name: oneLine(submission.name), email: submission.email },
			subject: `${subject}: ${oneLine(submission.company) || oneLine(submission.name)}`,
			textContent: lines.join('\n')
		}),
		signal: AbortSignal.timeout(10_000)
	});

	if (!response.ok) {
		throw new Error(`Brevo answered ${response.status}: ${await response.text()}`);
	}
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
		// No topic at all means the tasting page, which has only ever sent the one kind.
		const rawTopic = field(data, 'topic');
		const topic = rawTopic || 'tasting';

		const fields: Record<string, string> = {};
		if (!TOPICS.includes(topic)) fields.topic = 'A topic is required';
		// Only a tasting needs to know who is pouring; a question does not.
		const needsBusiness = topic === 'tasting';
		if (!name) fields.name = 'Name is required';
		else if (name.length > MAX_LENGTH.name) fields.name = 'Name is too long';
		if (needsBusiness && !company) fields.company = 'Venue or company is required';
		else if (company.length > MAX_LENGTH.company) fields.company = 'Venue or company is too long';
		if (!EMAIL_PATTERN.test(email) || email.length > MAX_LENGTH.email) {
			fields.email = 'A valid email is required';
		}
		if (needsBusiness && !BUSINESS_TYPES.includes(businessType)) {
			fields.businessType = 'A business type is required';
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
			'INSERT INTO submissions (name, company, email, business_type, message, topic, lang) VALUES (?, ?, ?, ?, ?, ?, ?)'
		)
			.bind(name, company, email, businessType, message, topic, lang)
			.run();

		ctx.waitUntil(
			notify(env, { name, company, email, businessType, message, topic, lang }).catch(
				(error: unknown) => {
					console.error('notification failed', error);
				}
			)
		);

		return json({ ok: true });
	}
} satisfies ExportedHandler<Env>;
