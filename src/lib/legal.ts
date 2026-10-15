import type { Locale } from '#lib/i18n/index.js';
import { site } from '#lib/site.js';

/**
 * The registered business behind the site. The Impressum is a legal requirement
 * in Germany (§ 5 DDG) and has to carry the address the trade is registered at,
 * so these are the details from the Gewerbeanmeldung.
 */
export const business = {
	name: site.name,
	owner: 'Ilker Sagkaya',
	street: 'Hasenheide 16',
	postalCode: '10967',
	city: 'Berlin',
	email: site.email,
	/** Add the VAT id here once it is issued, and the line appears by itself. */
	vatId: null as string | null
};

export interface LegalSection {
	heading?: string;
	/** Paragraphs. An email address inside one is turned into a mailto link. */
	body?: string[];
	/** Tight lines, for an address block. */
	lines?: string[];
}

export interface LegalDocument {
	title: string;
	meta: { title: string; description: string };
	updated: string;
	sections: LegalSection[];
}

const address = (country: string) => [
	business.name,
	`${country === 'Deutschland' ? 'Inhaber' : 'Owner'}: ${business.owner}`,
	business.street,
	`${business.postalCode} ${business.city}`,
	country
];

const vatLine = (label: string) => (business.vatId ? [`${label}: ${business.vatId}`] : []);

export const imprint: Record<Locale, LegalDocument> = {
	de: {
		title: 'Impressum',
		meta: {
			title: `Impressum | ${site.name}`,
			description: `Anbieterkennzeichnung nach § 5 DDG für ${site.name}, Berlin.`
		},
		updated: '15. Oktober 2026',
		sections: [
			{ heading: 'Angaben gemäß § 5 DDG', lines: address('Deutschland') },
			{
				heading: 'Kontakt',
				lines: [`E-Mail: ${business.email}`, ...vatLine('Umsatzsteuer-Identifikationsnummer')]
			},
			{
				heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
				lines: [business.owner, 'Anschrift wie oben']
			},
			{
				heading: 'Verbraucherstreitbeilegung',
				body: [
					'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
				]
			},
			{
				heading: 'Haftung für Inhalte',
				body: [
					'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
					'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.'
				]
			},
			{
				heading: 'Haftung für Links',
				body: [
					'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte können wir keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links umgehend.'
				]
			},
			{
				heading: 'Urheberrecht',
				body: [
					'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors oder Erstellers.'
				]
			}
		]
	},
	en: {
		title: 'Legal notice',
		meta: {
			title: `Legal notice | ${site.name}`,
			description: `Provider identification under § 5 DDG for ${site.name}, Berlin.`
		},
		updated: '15 October 2026',
		sections: [
			{ heading: 'Information according to § 5 DDG', lines: address('Germany') },
			{
				heading: 'Contact',
				lines: [`Email: ${business.email}`, ...vatLine('VAT identification number')]
			},
			{
				heading: 'Responsible for the content under § 18 (2) MStV',
				lines: [business.owner, 'Address as above']
			},
			{
				heading: 'Consumer dispute resolution',
				body: [
					'We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.'
				]
			},
			{
				heading: 'Liability for content',
				body: [
					'As a service provider we are responsible for our own content on these pages under general law. We are not obliged to monitor transmitted or stored third party information, or to investigate circumstances that point to unlawful activity.',
					'Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the point at which a concrete infringement becomes known. We remove such content immediately once we learn of an infringement.'
				]
			},
			{
				heading: 'Liability for links',
				body: [
					'Our pages link to external websites over whose content we have no influence, so we cannot accept any responsibility for it. The respective provider or operator of the linked pages is always responsible for their content. We remove such links immediately once we learn of an infringement.'
				]
			},
			{
				heading: 'Copyright',
				body: [
					'The content and works created by the site operator on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright require the written consent of the respective author or creator.'
				]
			}
		]
	}
};

export const privacy: Record<Locale, LegalDocument> = {
	de: {
		title: 'Datenschutzerklärung',
		meta: {
			title: `Datenschutzerklärung | ${site.name}`,
			description: `Welche Daten ${site.name} auf dieser Website verarbeitet, wozu und wie lange.`
		},
		updated: '15. Oktober 2026',
		sections: [
			{
				heading: 'Verantwortlicher',
				body: ['Verantwortlich für die Datenverarbeitung auf dieser Website ist:'],
				lines: [...address('Deutschland'), `E-Mail: ${business.email}`]
			},
			{
				heading: 'Das Wichtigste vorab',
				body: [
					'Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken, bindet keine Tracking-Dienste ein und erstellt keine Nutzerprofile. Deshalb gibt es auch kein Cookie-Banner. Schriften werden von unserem eigenen Server ausgeliefert, es werden keine Google Fonts geladen.',
					'Personenbezogene Daten entstehen an zwei Stellen: in den technischen Protokollen unseres Hosters und in dem Formular, mit dem ihr ein Tasting anfragt.'
				]
			},
			{
				heading: 'Hosting und Server-Logfiles',
				body: [
					'Diese Website wird bei Cloudflare gehostet (Cloudflare Germany GmbH, Rosental 7, 80331 München; Mutterunternehmen Cloudflare, Inc., USA). Beim Aufruf einer Seite verarbeitet Cloudflare technisch notwendige Zugriffsdaten, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, übertragene Datenmenge, Browsertyp und Betriebssystem.',
					'Zweck ist die Auslieferung der Seite, die Stabilität des Angebots und die Abwehr von Angriffen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mit Cloudflare besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Soweit Daten in Drittländer übermittelt werden, stützen wir dies auf die Standardvertragsklauseln der EU-Kommission.'
				]
			},
			{
				heading: 'Tasting-Anfragen über das Formular',
				body: [
					'Wenn ihr das Formular ausfüllt, verarbeiten wir die Angaben, die ihr eintragt: Name, Unternehmen oder Venue, Art des Betriebs, E-Mail-Adresse, eure Nachricht sowie die Sprache der Seite. Diese Angaben werden in einer Datenbank von Cloudflare (D1) mit Speicherort in der Europäischen Union gespeichert und zusätzlich als Benachrichtigung an unsere E-Mail-Adresse geschickt, damit wir antworten können.',
					'Für den Versand dieser Benachrichtigung nutzen wir Brevo (Brevo GmbH, Köpenicker Straße 126, 10179 Berlin, Teil der französischen Brevo SAS). Brevo verarbeitet dabei die Angaben aus eurer Anfrage in unserem Auftrag; es besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Die Daten werden innerhalb der Europäischen Union verarbeitet.',
					'Zweck ist ausschließlich die Bearbeitung eurer Anfrage und die Vorbereitung eines möglichen Vertrags. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO für vorvertragliche Maßnahmen und Art. 6 Abs. 1 lit. f DSGVO für unser berechtigtes Interesse, Anfragen beantworten zu können. Die Angabe der Daten ist freiwillig, ohne sie können wir die Anfrage jedoch nicht bearbeiten.',
					'Wir speichern die Anfrage, solange es für die Bearbeitung erforderlich ist, längstens 24 Monate nach dem letzten Kontakt, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen. Auf Wunsch löschen wir sie früher.'
				]
			},
			{
				heading: 'Spam-Schutz mit Cloudflare Turnstile',
				body: [
					'Um das Formular vor automatisierten Einsendungen zu schützen, setzen wir Cloudflare Turnstile ein. Dabei werden eure IP-Adresse und technische Merkmale des Browsers an Cloudflare übermittelt und dort ausgewertet. Nach Angaben des Anbieters verwendet Turnstile keine Cookies zu Werbe- oder Trackingzwecken und erstellt keine geräteübergreifenden Profile.',
					'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, unser berechtigtes Interesse am Schutz vor Missbrauch.'
				]
			},
			{
				heading: 'Verschlüsselung',
				body: [
					'Die Seite wird ausschließlich über eine verschlüsselte Verbindung (HTTPS) ausgeliefert. Damit sind die Daten, die ihr an uns übermittelt, auf dem Transportweg geschützt.'
				]
			},
			{
				heading: 'Eure Rechte',
				body: [
					'Ihr habt jederzeit das Recht auf Auskunft über die zu eurer Person gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16), auf Löschung (Art. 17), auf Einschränkung der Verarbeitung (Art. 18), auf Datenübertragbarkeit (Art. 20) sowie auf Widerspruch gegen Verarbeitungen, die auf einem berechtigten Interesse beruhen (Art. 21).',
					`Für all das genügt eine formlose E-Mail an ${business.email}.`,
					'Außerdem könnt ihr euch bei einer Aufsichtsbehörde beschweren. Für uns zuständig ist die Berliner Beauftragte für Datenschutz und Informationsfreiheit.'
				]
			},
			{
				heading: 'Änderungen',
				body: [
					'Wir passen diese Erklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die jeweils hier veröffentlichte Fassung.'
				]
			}
		]
	},
	en: {
		title: 'Privacy policy',
		meta: {
			title: `Privacy policy | ${site.name}`,
			description: `What data ${site.name} processes on this website, why, and for how long.`
		},
		updated: '15 October 2026',
		sections: [
			{
				heading: 'Controller',
				body: ['The controller for data processing on this website is:'],
				lines: [...address('Germany'), `Email: ${business.email}`]
			},
			{
				heading: 'The short version',
				body: [
					'This website sets no analytics or advertising cookies, embeds no tracking services and builds no user profiles. That is why there is no cookie banner. Fonts are served from our own server, no Google Fonts are loaded.',
					'Personal data arises in two places: in the technical logs of our host, and in the form you use to ask for a tasting.'
				]
			},
			{
				heading: 'Hosting and server logs',
				body: [
					'This website is hosted by Cloudflare (Cloudflare Germany GmbH, Rosental 7, 80331 Munich; parent company Cloudflare, Inc., USA). When a page is requested, Cloudflare processes technically necessary access data, in particular IP address, date and time, the address requested, the amount of data transferred, browser type and operating system.',
					'The purpose is delivering the page, keeping the service stable and defending against attacks. The legal basis is Art. 6 (1) (f) GDPR. A data processing agreement under Art. 28 GDPR is in place with Cloudflare. Where data is transferred to third countries, we rely on the European Commission’s standard contractual clauses.'
				]
			},
			{
				heading: 'Tasting requests through the form',
				body: [
					'When you fill in the form we process what you enter: name, company or venue, type of business, email address, your message and the language of the page. This is stored in a Cloudflare database (D1) located in the European Union and also sent as a notification to our email address so that we can answer.',
					'We use Brevo (Brevo GmbH, Köpenicker Straße 126, 10179 Berlin, part of the French Brevo SAS) to send that notification. Brevo processes the details of your request on our behalf under a data processing agreement according to Art. 28 GDPR. The data is processed within the European Union.',
					'The purpose is solely to handle your request and prepare a possible contract. The legal basis is Art. 6 (1) (b) GDPR for pre-contractual measures and Art. 6 (1) (f) GDPR for our legitimate interest in being able to answer enquiries. Providing the data is voluntary, but without it we cannot deal with the request.',
					'We keep the request as long as it is needed to handle it, at most 24 months after the last contact, unless statutory retention periods say otherwise. We delete it sooner on request.'
				]
			},
			{
				heading: 'Spam protection with Cloudflare Turnstile',
				body: [
					'To protect the form from automated submissions we use Cloudflare Turnstile. Your IP address and technical characteristics of your browser are transmitted to Cloudflare and evaluated there. According to the provider, Turnstile uses no cookies for advertising or tracking purposes and builds no cross-device profiles.',
					'The legal basis is Art. 6 (1) (f) GDPR, our legitimate interest in protection against misuse.'
				]
			},
			{
				heading: 'Encryption',
				body: [
					'The site is served exclusively over an encrypted connection (HTTPS), so the data you send us is protected in transit.'
				]
			},
			{
				heading: 'Your rights',
				body: [
					'You have the right to information about the data stored about you (Art. 15 GDPR), to rectification (Art. 16), to erasure (Art. 17), to restriction of processing (Art. 18), to data portability (Art. 20) and to object to processing based on a legitimate interest (Art. 21).',
					`An informal email to ${business.email} is enough for any of these.`,
					'You can also complain to a supervisory authority. The authority responsible for us is the Berlin Commissioner for Data Protection and Freedom of Information.'
				]
			},
			{
				heading: 'Changes',
				body: [
					'We update this policy when the website or the legal situation changes. The version published here is the one that applies.'
				]
			}
		]
	}
};
