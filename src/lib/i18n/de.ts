import { site } from '../site';

const de = {
	meta: {
		title: `Fertige Mocktail und Cocktail Basen für die Gastronomie | ${site.name}`,
		description:
			'Fertige Mocktail und Cocktail Basen aus Berlin, hergestellt aus echten Früchten und Kräutern. Für Bars, Events und die moderne Gastronomie. Schnell, konsistent, kompromisslos.'
	},
	nav: {
		home: 'Startseite',
		bases: 'Unsere Basen',
		about: 'Über uns',
		cta: 'Tasting buchen',
		main: 'Hauptnavigation',
		menu: 'Menü',
		language: 'Sprache'
	},
	hero: {
		title: ['Signature Qualität.', 'Fertig in Sekunden.'],
		lead: 'Außergewöhnliche Cocktails und Mocktails. Minimaler Aufwand, maximale Konsistenz. Entwickelt für Bars, Events und die moderne Gastronomie.',
		cta: 'Tasting anfragen',
		secondary: 'So funktioniert’s',
		imageAlt: `${site.name} Pouch auf einem Bartresen, im Hintergrund ein Barkeeper`
	},
	how: {
		eyebrow: 'So funktioniert’s',
		title: `Zwei Arten, euren ${site.name} zu mixen`,
		lead: 'Base einschenken, auffüllen oder shaken, servieren. Konstante Drinks ohne zusätzliche Vorbereitung.',
		shake: {
			title: 'Shake',
			imageAlt:
				'Illustration: Shaker mit Eis, Base und Spirituose dazu, schütteln, im Glas servieren',
			steps: [
				'Shaker mit Eis füllen',
				'Base + Spirituose (optional) hinzufügen',
				'Kräftig schütteln',
				'Servieren'
			]
		},
		stir: {
			title: 'Rühren',
			imageAlt: 'Illustration: Glas mit Eis, Base, Spirituose und Wasser dazu, rühren, servieren',
			steps: [
				'Glas mit Eis füllen',
				'Base + Spirituose (optional) + Wasser hinzufügen',
				'Gut rühren',
				'Servieren'
			]
		},
		ratio: {
			title: 'Empfohlenes Mischverhältnis',
			items: [
				{ amount: '1,5 Shot', label: `${site.name} Base` },
				{ amount: '1 Shot', label: 'Spirituose (optional)' },
				{ amount: '½ Shot', label: 'Wasser (ohne Shaker)' }
			],
			note: 'Geschmack nach Bedarf anpassen. Genuss verantwortungsvoll.'
		}
	},
	why: {
		eyebrow: `Warum ${site.name}`,
		title: 'Entwickelt für Betriebe, die Qualität ernst nehmen.',
		lead: `Vier Gründe, warum Berlins beste Venues auf ${site.name} setzen.`,
		reasons: [
			{
				tag: 'Schnell',
				title: 'Servierfähig in unter 10 Sekunden',
				text: 'Einschenken, servieren, weiter. Euer Team schenkt in dem Tempo ein, das euer Betrieb verlangt. Alles ist vorbereitet, ihr macht es nur gut aussehen.',
				imageAlt: 'Fünf farbige Cocktails und Mocktails nebeneinander auf einem Bartresen'
			},
			{
				tag: 'Frisch und natürlich',
				title: 'Vom Mixologen entwickelt. Zuverlässig geliefert.',
				text: 'Hergestellt aus echten Früchten und Kräutern, frisch gemixt auf Anfrage. Signature Qualität, die euer Team in jeder Schicht reproduzieren kann.',
				imageAlt: `${site.name} Pouch mit frischen Beeren, Zitrone, Passionsfrucht und Kräutern`
			},
			{
				tag: 'Einfach',
				title: 'Kein zusätzliches Training erforderlich',
				text: 'Keine komplexe Vorbereitung, kein Fachwissen nötig. Euer Team mixt bei jedem Gast einen perfekten Cocktail, von der Eröffnungsschicht bis zur vollsten Nacht der Woche.',
				imageAlt: `Ein Barkeeper gießt einen grünen Drink über Eis, daneben die ${site.name} Pouch`
			},
			{
				tag: 'Zufriedene Gäste',
				title: 'Drinks, zu denen man zurückkommt',
				text: 'Gebt euren Gästen etwas, das sie in Erinnerung behalten. Handwerkliche Qualität, die nach einem zweiten Glas verlangt, und einem dritten.',
				imageAlt: 'Gäste mit bunten Drinks in einer Bar, lachend'
			}
		]
	},
	tasting: {
		eyebrow: 'Tasting',
		title: 'Den Geschmack für sich sprechen lassen',
		lead: `Kontaktiert uns, um einen Tasting Termin zu vereinbaren. Wir bringen ${site.name} direkt zu eurem Betrieb.`,
		form: {
			name: 'Ihr Name',
			company: 'Venue oder Unternehmensname',
			email: 'E-Mail Adresse',
			message: 'Was wir sonst noch wissen sollten',
			messagePlaceholder: 'Anstehendes Event, bevorzugte Besprechungszeit, spezifische Fragen…',
			submit: 'Absenden',
			sending: 'Wird gesendet…',
			sentTitle: 'Danke, die Anfrage ist bei uns.',
			sentText: 'Wir melden uns in Kürze, um einen Termin zu vereinbaren.',
			errors: {
				name: 'Bitte einen Namen angeben.',
				company: 'Bitte Venue oder Unternehmen angeben.',
				email: 'Bitte eine gültige E-Mail Adresse angeben.',
				message: 'Die Nachricht ist zu lang.',
				invalid: 'Bitte die markierten Felder prüfen.',
				verification: 'Die Spam-Prüfung ist fehlgeschlagen. Bitte noch einmal versuchen.',
				verificationLoad:
					'Die Spam-Prüfung konnte nicht geladen werden. Bitte Inhaltsblocker deaktivieren und die Seite neu laden.',
				network: 'Der Server ist nicht erreichbar. Bitte noch einmal versuchen.',
				generic: 'Etwas ist schiefgelaufen. Bitte noch einmal versuchen.'
			}
		}
	},
	bases: {
		meta: {
			title: `Mocktail und Cocktail Basen | ${site.name}`,
			description:
				'Fertige Mocktail und Cocktail Basen für Events, Bars und Veranstaltungen in Berlin. Echte Früchte, schnelle Zubereitung, gleichbleibender Geschmack. Die einfache Lösung für euren Betrieb.'
		},
		eyebrow: 'Unsere Basen',
		title: 'Signature Cocktail- und Mocktail-Basen, entwickelt für Spitzenleistung.',
		lead: 'Fünf Geschmacksrichtungen aus echten Früchten und Kräutern. Mit Spirituose oder alkoholfrei, in Sekunden im Glas.',
		discover: 'Entdecken',
		statsAlt: 'Freunde stoßen bei einem Abendessen mit Drinks an',
		stats: [
			{
				value: '5',
				label: 'Geschmacksrichtungen',
				text: 'Jede entwickelt von einem zertifizierten Mixologen und Lebensmittelwissenschaftler'
			},
			{ value: '3', label: 'Formate', text: '1L, 3L und 5L, passend für jeden Betrieb' },
			{ value: '<10s', label: 'Servierdauer', text: 'Vom Zapfen ins Glas, ohne Vorbereitung' },
			{ value: '65–85%', label: 'Echter Fruchtanteil', text: 'Frisch gemixt auf Anfrage' }
		]
	},
	product: {
		metaTitle: (name: string) => `${name} | Cocktail Base | ${site.name}`,
		eyebrow: 'Cocktail- und Mocktail-Base',
		ingredients: 'Zutaten',
		pairsWith: 'Passt zu',
		garnish: 'Verfeinern mit',
		formats: 'Formate',
		glasses: (count: number) => `ca. ${count} Gläser`,
		back: 'Alle Basen',
		others: 'Weitere Geschmacksrichtungen'
	},
	cta: {
		title: 'Wählt eure Geschmacksrichtungen, nennt uns euren Betrieb.',
		lead: 'Wir melden uns in Kürze, um euer Tasting zu vereinbaren.',
		button: 'Tasting buchen'
	},
	about: {
		meta: {
			title: `Über ${site.name} | Berliner Getränkemarke`,
			description: `Lernt ${site.name} kennen, eine Berliner Getränkemarke, die frische Cocktail und Mocktail Basen aus echten Früchten und Kräutern entwickelt, für Bars, Events und die Gastronomie.`
		},
		eyebrow: `Über ${site.name}`,
		title: 'Moderne Cocktail Basen. Entwickelt für die Menschen, die sie servieren.',
		lead: 'Wir entwickeln Cocktail Basen für professionelle Umgebungen, in denen Geschwindigkeit, Konsistenz und Qualität zählen. Unser System reduziert Komplexität, ohne Kreativität einzuschränken, damit Teams sich auf das Erlebnis konzentrieren können, nicht auf die Vorbereitung.',
		imageAlt: `${site.name} Pouch vor dunklem Marmor`,
		features: [
			{
				title: 'Natürlich hergestellt',
				text: 'Echte Früchte und Kräuter, bis zu 88 % Fruchtanteil'
			},
			{
				title: 'Entwickelt für Geschwindigkeit',
				text: 'Servierfähig in unter 10 Sekunden, keine Vorbereitung, kein Fachwissen nötig'
			},
			{
				title: 'Geboren in Berlin',
				text: 'Entstanden in Berlin, wo Kultur auf Kreativität trifft.'
			}
		],
		story: {
			eyebrow: 'Unsere Geschichte',
			title: 'Es war nie nur ein Drink.',
			imageAlt: `${site.name} Pouch mit zwei Drinks in einem Club mit buntem Licht`,
			opening:
				'Essen und Trinken verbinden Menschen auf eine Weise, die kaum etwas anderes kann. Sie schaffen Momente, die lange nach dem letzten Schluck, lange nach dem Ende des Abends, in Erinnerung bleiben.',
			paragraphs: [
				'Ein guter Drink im richtigen Umfeld hat die Kraft, Menschen zusammenzubringen, Gespräche zu öffnen und eine Atmosphäre zu schaffen, die sich anfühlt wie ein eigener kleiner Ort in der Zeit.',
				`${site.name} entstand aus dem Wunsch, diese Momente immer wieder möglich zu machen. Nicht einmal, nicht zufällig, sondern bewusst und zuverlässig. Nach Hunderten von Events und Tausenden von Gästen wurde eines klar: Was Menschen wirklich schätzen, ist nicht nur der Drink selbst, sondern das Erlebnis darum herum.`
			],
			closing: `${site.name} ist nicht nur ein Cocktail. Es sind die Momente, die er schafft.`
		},
		cta: {
			title: `Bereit, ${site.name} in euren Betrieb zu bringen?`,
			lead: 'Tasting anfragen. Wir kommen zu euch.'
		}
	},
	tastingPage: {
		meta: {
			title: `Cocktail Tasting in Berlin buchen | ${site.name}`,
			description: `Cocktail und Mocktail Tasting in Berlin buchen. Testet ${site.name} direkt in eurem Betrieb, unverbindlich und ohne Druck. Jetzt anfragen.`
		},
		title: 'Den Geschmack für sich sprechen lassen.',
		lead: 'Fünf vom Mixologen entwickelte Basen. Echte Früchte, echte Kräuter, frisch gemixt auf Anfrage. Für Betriebe, die ohne Kompromisse servieren.',
		steps: [
			{
				title: 'Formular ausfüllen',
				text: 'Erzählt uns von eurem Betrieb und welche Geschmacksrichtungen euch interessieren.'
			},
			{
				title: 'Wir melden uns',
				text: 'Wir kommen in Kürze auf euch zu, um einen Tasting Termin abzustimmen, der zu eurem Zeitplan passt.'
			},
			{ title: 'Probieren und entscheiden', text: 'Testet die Basen gemeinsam mit eurem Team.' }
		]
	},
	footer: {
		navigate: 'Navigation',
		location: 'Berlin, Deutschland',
		rights: 'Alle Rechte vorbehalten.'
	}
};

export default de;
