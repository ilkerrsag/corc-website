import { site } from '../site';

const de = {
	meta: {
		title: `Fertige Cocktail und Mocktail Basen für Gastronomie und Events | ${site.name}`,
		description:
			'Trinkfertige Cocktail und Mocktail Basen aus Berlin, aus echten Früchten und Kräutern. Für Bars, Caterer, Hotels und Firmenevents. Schnell, gleichbleibend, kompromisslos.',
		keywords:
			'Cocktail Basen Berlin, Mocktail Basen, Cocktail Catering Berlin, Drinks für Firmenevents'
	},
	nav: {
		home: 'Hauptseite',
		bases: 'Cocktail Basen',
		why: `Warum ${site.name}`,
		about: `Über ${site.name}`,
		contact: 'Kontakt',
		cta: 'Tasting buchen',
		main: 'Hauptnavigation',
		menu: 'Menü',
		language: 'Sprache'
	},
	hero: {
		intro: 'Natürliche Cocktail und Mocktail Basen. Für Bars, Caterer, Hotels und Firmenevents.',
		title: ['Barqualität.', 'In Sekunden im Glas.'],
		cta: 'Tasting vereinbaren',
		secondary: 'So funktioniert’s',
		imageAlt: `Fünf ${site.name} Flaschen nebeneinander auf einem Bartresen`
	},
	audience: {
		title: `Wo ${site.name} ausgeschenkt wird`,
		items: [
			'Bars und Restaurants',
			'Caterer und Eventagenturen',
			'Hotels und Konferenzen',
			'Firmenfeiern und Büroevents',
			'Private Veranstaltungen'
		]
	},
	how: {
		eyebrow: 'So funktioniert’s',
		title: `So einfach läuft ${site.name}`,
		lead: 'Base ins Glas, auffüllen oder kurz shaken, servieren. Gleichbleibende Drinks, ganz ohne Vorbereitung.',
		steps: [
			{ title: 'Glas mit Eis füllen', imageAlt: 'Ein Glas, bis zum Rand mit Eis gefüllt' },
			{
				title: 'Base und Spirituose dazugeben',
				imageAlt: 'Eine CORC Flasche gießt grüne Base über das Eis'
			},
			{
				title: 'Kurz rühren und servieren',
				imageAlt: 'Der fertige Drink mit Limette und Basilikum'
			}
		],
		note: 'Mit oder ohne Spirituose, geschüttelt oder gerührt, ganz wie euer Team es gewohnt ist.',
		ratio: {
			title: 'Empfohlenes Verhältnis',
			items: [
				{ amount: '3 Shot', label: `${site.name} Base` },
				{ amount: '2 Shot', label: 'Spirituose (optional)' },
				{ amount: '1 Shot', label: 'Wasser (ohne Shaker)' }
			],
			note: '1 Shot entspricht 2,5 cl. Ohne Spirituose wird daraus ein Mocktail. Stärke und Geschmack könnt ihr frei anpassen. Bitte genießt verantwortungsvoll.'
		}
	},
	why: {
		eyebrow: `Warum ${site.name}`,
		title: `Fünf Gründe, warum Bars, Caterer und Unternehmen in Berlin mit ${site.name} arbeiten.`,
		reasons: [
			{
				tag: 'Schnell',
				title: 'In unter 10 Sekunden im Glas',
				text: 'Eingießen, rausgeben, weiter. Euer Team bedient im Tempo, das der Abend verlangt. Die Arbeit ist längst getan, ihr setzt den Drink nur noch in Szene.',
				imageAlt: `${site.name} Basilico Flasche auf einem Tresen, daneben eine Reihe fertiger Drinks`
			},
			{
				tag: 'Frisch und natürlich',
				title: 'Vom Mixologen kreiert. Gleicher Geschmack, jedes Glas.',
				text: 'Echte Früchte und Kräuter als Hauptzutat, frisch angesetzt auf Bestellung. Barqualität, die euer Team jedes Mal wiederholen kann.',
				imageAlt: `${site.name} Fragola Flasche zwischen frischen Erdbeeren, Himbeeren, Zitronen und Minze`
			},
			{
				tag: 'Einfach',
				title: 'Schulung sparen. Qualität behalten.',
				text: 'Keine aufwendige Vorbereitung, kein Spezialwissen. Jeder Gast bekommt denselben guten Cocktail, von der ersten Runde bis zum vollsten Moment des Abends.',
				imageAlt: `${site.name} Yuzu Flasche neben einem Glas, das mit einem Barlöffel gerührt wird`
			},
			{
				tag: 'Mit und ohne Alkohol',
				title: 'Jede Base funktioniert alkoholfrei',
				text: 'Dieselbe Base, einmal mit Spirituose und einmal ohne. Alle am Tisch bekommen einen Drink, der ernst gemeint ist, nicht nur eine Limonade als Notlösung.',
				imageAlt: 'Zwei Framboise Drinks zwischen einer Gin Flasche und einer Flasche Sprudelwasser'
			},
			{
				tag: 'Zufriedene Gäste',
				title: 'Der Geschmack von guter Gesellschaft.',
				text: 'Drinks, die Menschen am Tisch halten. Handgemacht, ein zweites Glas wert. Und ein drittes.',
				imageAlt: 'Gäste im Gespräch an einem Stehtisch, mit bunten Drinks in der Hand'
			}
		],
		detailEyebrow: 'Im Detail',
		// On the home page the reasons are a compact strip; this link carries on to the full page.
		more: 'Alle fünf Gründe ansehen'
	},
	whyPage: {
		meta: {
			title: `Warum ${site.name} | Cocktail Basen für Gastronomie und Events`,
			description: `Warum Bars, Caterer, Hotels und Unternehmen in Berlin mit ${site.name} arbeiten. Im Vergleich zur eigenen Zubereitung und zu Sirup und Püree.`,
			keywords: 'Cocktail Basen Gastronomie, Mocktail Lösung Catering, Cocktail Vorbereitung Bar'
		},
		eyebrow: `Warum ${site.name}`,
		title: 'Dieselbe Barqualität, ohne die Vorbereitung dahinter.',
		lead: 'Drei Wege führen zum Cocktail: alles selbst ansetzen, zu Sirup greifen, oder eine Base nehmen, die beides kann. Hier steht, was das im Service bedeutet.',
		ctaPrimary: 'Tasting vereinbaren',
		ctaSecondary: 'Basen ansehen',
		compare: {
			eyebrow: 'Im Vergleich',
			title: 'Was der Unterschied im Service ausmacht.',
			rowLabel: 'Kriterium',
			columns: ['Eigene Zubereitung', 'Sirup und Püree', site.name],
			rows: [
				{ label: 'Zeit pro Drink', values: ['1,5 bis 2 Minuten', 'Schnell', 'Unter 10 Sekunden'] },
				{
					label: 'Gleichbleibender Geschmack',
					values: ['Hängt davon ab, wer mixt', 'Hoch', 'Jedes Glas gleich']
				},
				{
					label: 'Zutaten',
					values: [
						'Frisch, aber jeden Tag neu',
						'Aroma und Konzentrat',
						'Früchte und Kräuter als Hauptzutat'
					]
				},
				{ label: 'Schulung', values: ['Erfahrene Barkraft nötig', 'Gering', 'Keine'] },
				{
					label: 'Schwund',
					values: ['Hoch, Früchte verderben', 'Gering', 'Bis die Flasche leer ist']
				},
				{
					label: 'Alkoholfrei',
					values: [
						'Eigenes Rezept nötig',
						'Begrenzt',
						'Dieselbe Base mit Tonic, Soda oder Mate Tee'
					]
				}
			],
			note: 'Alkoholfrei heißt hier nicht weglassen, sondern ersetzen: Base plus Tonic, Soda, Mate Tee oder Ginger Beer ergibt einen Mocktail, der neben dem Cocktail besteht.'
		},
		numbers: {
			title: 'In Zahlen',
			items: [
				{ value: 'Unter 10 s', label: 'Vom Glas bis zum Gast' },
				{ value: '5', label: 'Basen zur Auswahl' },
				{ value: '400 ml & 1 L', label: 'Zwei Formate' },
				{ value: '12 bis 13', label: 'Drinks pro Liter' }
			]
		},
		audience: {
			eyebrow: 'Für wen',
			title: `Wo ${site.name} ausgeschenkt wird`,
			items: [
				{
					title: 'Bars und Restaurants',
					text: 'Eine Cocktailkarte, die auch am vollen Freitag funktioniert, ohne zusätzliche Vorbereitung am Nachmittag.'
				},
				{
					title: 'Caterer und Eventagenturen',
					text: 'Gleiche Qualität an jedem Standort, auch wenn an dem Abend kein Mixologe im Team steht.'
				},
				{
					title: 'Hotels und Konferenzen',
					text: 'Von der Lobby bis zum Abendempfang, ohne eigene Barmannschaft vorhalten zu müssen.'
				},
				{
					title: 'Firmenfeiern und Büroevents',
					text: 'Jemand aus dem Team gießt ein und der Drink sitzt trotzdem, Runde für Runde.'
				},
				{
					title: 'Private Veranstaltungen',
					text: 'Barqualität zu Hause, ohne jemanden dafür zu engagieren.'
				}
			]
		}
	},
	tasting: {
		eyebrow: 'Tasting',
		title: 'Die erste Runde geht auf uns.',
		note: `Schreibt uns für einen Tasting Termin. Wir kommen mit ${site.name} zu euch, in die Bar, ins Büro oder direkt aufs Event.`,
		form: {
			name: 'Euer Name',
			company: 'Unternehmen oder Venue',
			email: 'E-Mail Adresse',
			businessType: 'Art des Betriebs',
			businessTypePlaceholder: 'Bitte auswählen',
			businessTypeOptions: [
				{ value: 'bar', label: 'Bar oder Restaurant' },
				{ value: 'caterer', label: 'Caterer oder Agentur' },
				{ value: 'hotel', label: 'Hotel' },
				{ value: 'company', label: 'Unternehmen' },
				{ value: 'other', label: 'Sonstiges' }
			],
			message: 'Gibt es sonst etwas, das wir wissen sollten?',
			messagePlaceholder: 'Anstehendes Event, Wunschtermin, konkrete Fragen …',
			privacyNote:
				'Mit dem Absenden verarbeiten wir eure Angaben, um die Anfrage zu beantworten. Mehr dazu in der',
			privacyLink: 'Datenschutzerklärung',
			submit: 'Absenden',
			sending: 'Wird gesendet …',
			sentTitle: 'Danke, wir haben eure Anfrage.',
			sentText: 'Wir melden uns in Kürze, um einen Termin zu finden.',
			errors: {
				name: 'Bitte tragt euren Namen ein.',
				company: 'Bitte tragt euer Unternehmen oder Venue ein.',
				email: 'Bitte tragt eine gültige E-Mail Adresse ein.',
				businessType: 'Bitte wählt die Art des Betriebs.',
				message: 'Die Nachricht ist zu lang.',
				invalid: 'Bitte prüft die markierten Felder.',
				verification: 'Die Spam Prüfung ist fehlgeschlagen. Bitte versucht es erneut.',
				verificationLoad:
					'Die Spam Prüfung konnte nicht geladen werden. Bitte deaktiviert Content Blocker und ladet die Seite neu.',
				network: 'Der Server war nicht erreichbar. Bitte versucht es erneut.',
				generic: 'Etwas ist schiefgelaufen. Bitte versucht es erneut.'
			}
		}
	},
	bases: {
		meta: {
			title: `Cocktail und Mocktail Basen | ${site.name} Berlin`,
			description:
				'Fünf Cocktail und Mocktail Basen in 400 ml und 1 L. Echte Früchte und Kräuter, schnelle Zubereitung, gleichbleibender Geschmack. Jede Base auch alkoholfrei.',
			keywords: 'cocktail basen, mocktail basen, alkoholfreie Cocktails Event'
		},
		eyebrow: 'Cocktail Basen',
		title: ['Echte Frucht. Echte Kräuter.', 'Bereit zum Ausschenken.'],
		lead: 'Pour. Mix. Serve.',
		discover: 'Entdecken',
		statsAlt: 'Eine Base wird aus dem Barsieb in ein Glas gegossen',
		stats: [
			{
				value: '5',
				label: 'Geschmacksrichtungen',
				text: 'Jede von einem zertifizierten Mixologen mit langjähriger Erfahrung entwickelt'
			},
			{
				value: '2',
				label: 'Formate',
				text: '400 ml und 1 L, passend für Testlauf und Dauerbetrieb'
			},
			{ value: '<10s', label: 'Servierdauer', text: 'Direkt ins Glas, ohne Vorbereitung' },
			{
				value: 'Frucht zuerst',
				label: 'Echte Zutaten',
				text: 'Früchte und Kräuter sind die Hauptzutat jeder Base, frisch angesetzt auf Bestellung'
			}
		],
		yield: {
			title: 'Wie weit reicht eine Flasche?',
			items: [
				{ format: '400 ml', drinks: '5 bis 6 Drinks' },
				{ format: '1 L', drinks: '12 bis 13 Drinks' }
			],
			note: 'Gerechnet mit 3 Shot Base pro Glas.'
		},
		range: {
			title: 'Fünf Basen. Fünf Handschriften.',
			lead: 'Jede Base funktioniert mit und ohne Spirituose.'
		}
	},
	product: {
		metaTitle: (name: string) => `${name} | Cocktail Base | ${site.name}`,
		eyebrow: 'Cocktail und Mocktail Base',
		ingredients: 'Zutaten',
		pairsWith: 'Passt zu',
		garnish: 'Veredeln mit',
		storage: 'Lagerung',
		storageText: 'Gekühlt lagern und innerhalb von 5 Tagen verbrauchen.',
		formats: 'Formate',
		glasses: (count: string) => `${count} Gläser`,
		back: 'Alle Basen',
		others: 'Weitere Sorten'
	},
	cta: {
		title: 'Lasst uns gemeinsam probieren.',
		lead: 'Wir melden uns in Kürze und kommen zu euch.',
		button: 'Tasting buchen'
	},
	about: {
		meta: {
			title: `Über ${site.name} | Getränkemarke aus Berlin`,
			description: `${site.name} ist eine Berliner Getränkemarke für frische Cocktail und Mocktail Basen aus echten Früchten und Kräutern, für Gastronomie, Caterer und Firmenevents.`,
			keywords: 'Getränkemarke Berlin, Cocktailmarke Berlin, Mocktailmarke Berlin'
		},
		eyebrow: `Über ${site.name}`,
		title: 'Natürliche Basen. Erstklassige Drinks.',
		lead: 'Wir entwickeln Cocktail Basen für Situationen, in denen Tempo, Verlässlichkeit und Qualität zusammenkommen müssen. Unser System nimmt die Komplexität raus, ohne die Kreativität zu beschneiden, damit Teams sich um das Erlebnis kümmern können statt um die Vorbereitung.',
		imageAlt: `Barkeeper hinter dem Tresen mit drei ${site.name} Flaschen`,
		features: [
			{
				title: 'Natürlich',
				text: 'Echte Früchte und Kräuter als Hauptzutat, ohne Abkürzungen'
			},
			{
				title: 'Schnell',
				text: 'Eis, Base, fertig. Unter 10 Sekunden.'
			},
			{
				title: 'Made in Berlin',
				text: 'Aus einer Stadt, in der Kultur und Kreativität ständig aufeinandertreffen'
			}
		],
		makers: {
			eyebrow: 'Wer dahinter steht',
			title: 'Hallo, ich bin Ilker. Jede Base hier ist von mir.',
			name: 'Ilker Sagkaya',
			portraitAlt: 'Ilker Sagkaya hinter der Bar',
			role: `Gründer von ${site.name}`,
			paragraphs: [
				'Neun Jahre in der Getränkebranche, angefangen hinter der Bar. Angestellt bei Pernod Ricard, dem Haus hinter Absolut, Beefeater und Chivas Regal, habe ich deren Premium-Events in Istanbul und Izmir verantwortet. Dazu die Sponsoring-Partnerschaften der führenden Bars und Clubs in beiden Städten, auf Seiten der Häuser, nicht der Marken. In Berlin baue ich seitdem Bars auf privaten Events und Firmenfeiern.',
				`${site.name} ist aus dem entstanden, was im Betrieb immer wieder schiefging, ein Drink, der drei Minuten braucht, während die Schlange dreißig Sekunden erlaubt, und ein Rezept, das je nach Person anders schmeckt. Jede Base hier ist für eine echte Schicht gebaut, nicht für ein Fotoshooting.`,
				'Unter @shakeiteasyy mache ich außerdem Cocktail-Content, 19.000 Follower auf Instagram und 24.000 auf TikTok. Dieses Publikum ist der Grund, warum mich auch interessiert, wie ein Drink aussieht, nicht nur wie schnell er geht.'
			],
			links: [
				{ label: 'Instagram', href: 'https://www.instagram.com/shakeiteasyy' },
				{ label: 'TikTok', href: 'https://www.tiktok.com/@shakeiteasyy' }
			]
		},
		story: {
			eyebrow: 'Unsere Geschichte',
			title: 'Von der Bar in die Flasche.',
			imageAlt: 'Zwei Hände stoßen mit Drinks an einer Bar an',
			opening: 'Guter Geschmack bringt Menschen zusammen.',
			paragraphs: [
				'Ein guter Drink am richtigen Ort öffnet Gespräche, bringt Leute ins Gespräch miteinander und schafft eine Stimmung, die sich anfühlt wie ein eigener kleiner Ort in der Zeit.',
				`${site.name} ist aus dem Wunsch entstanden, solche Momente planbar zu machen. Nicht einmal und nicht zufällig, sondern bewusst und jedes Mal. Nach Hunderten Events und Tausenden Gästen war eine Sache klar: Was zählt, ist nicht nur der Drink, sondern alles, was um ihn herum passiert.`
			],
			closing: 'Die Vorbereitung übernehmen wir. Der Abend gehört euch.'
		},
		cta: {
			title: `Bereit, ${site.name} auf euer nächstes Event zu holen?`,
			lead: 'Fragt ein Tasting an. Wir kommen zu euch.'
		}
	},
	tastingPage: {
		meta: {
			title: `Cocktail Tasting in Berlin buchen | ${site.name}`,
			description: `Cocktail und Mocktail Tasting in Berlin buchen. Testet ${site.name} in eurer Bar, im Büro oder auf eurem Event, unverbindlich und ohne Druck.`,
			keywords: 'Cocktail Tasting Berlin, Event Drinks Berlin, Cocktail Catering'
		},
		title: 'Die erste Runde geht auf uns.',
		lead: 'Fünf von Mixologen entwickelte Basen. Echte Früchte, echte Kräuter, frisch angesetzt auf Bestellung. Großer Geschmack, weniger Aufwand.',
		steps: [
			{
				title: 'Formular ausfüllen',
				text: 'Erzählt uns kurz, wo ausgeschenkt wird und welche Sorten euch interessieren.'
			},
			{
				title: 'Wir melden uns',
				text: 'Wir kommen zeitnah auf euch zu und finden einen Termin, der in euren Ablauf passt.'
			},
			{ title: 'Probieren und entscheiden', text: 'Testet die Basen zusammen mit eurem Team.' }
		]
	},
	contactPage: {
		meta: {
			title: `Kontakt | ${site.name} Berlin`,
			description: `Fragen zu den Basen, zu Preisen oder zu einer Zusammenarbeit mit ${site.name}. Schreibt uns, wir antworten in der Regel innerhalb eines Werktags.`,
			keywords: 'CORC Kontakt, Cocktail Basen Berlin Kontakt, Mocktail Anfrage Berlin'
		},
		eyebrow: 'Kontakt',
		title: 'Schreibt uns.',
		lead: 'Fragen zu den Basen, zu Preisen oder zu einer Zusammenarbeit: hier seid ihr richtig. Jede Nachricht landet direkt bei uns.',
		direct: {
			title: 'Direkt',
			emailLabel: 'E-Mail',
			responseLabel: 'Antwortzeit',
			responseText: 'In der Regel innerhalb eines Werktags',
			locationLabel: 'Sitz',
			locationText: 'Berlin, Deutschland'
		},
		tastingBox: {
			title: 'Lieber gleich probieren?',
			text: 'Ein Tasting ist der kürzeste Weg. Wir kommen mit den Basen zu euch.',
			link: 'Tasting buchen'
		},
		form: {
			topic: 'Worum geht es?',
			topicPlaceholder: 'Bitte auswählen',
			topicOptions: [
				{ value: 'tasting', label: 'Tasting Anfrage' },
				{ value: 'pricing', label: 'Preise und Bestellung' },
				{ value: 'product', label: 'Frage zu einem Produkt' },
				{ value: 'press', label: 'Presse und Kooperation' },
				{ value: 'other', label: 'Sonstiges' }
			],
			topicError: 'Bitte wählt ein Thema.',
			// Asked only for the topic that needs them, so the form stays short for the rest.
			format: 'Welches Format?',
			formatPlaceholder: 'Bitte auswählen',
			formatOptions: [
				{ value: '400ml', label: '400 ml' },
				{ value: '1l', label: '1 L' },
				{ value: 'both', label: 'Beide' },
				{ value: 'unsure', label: 'Noch offen' }
			],
			formatError: 'Bitte wählt ein Format.',
			volume: 'Ungefährer Bedarf (optional)',
			volumePlaceholder: 'Bitte auswählen',
			volumeOptions: [
				{ value: 'upto10', label: 'Bis 10 Flaschen im Monat' },
				{ value: '10to30', label: '10 bis 30 Flaschen im Monat' },
				{ value: '30to100', label: '30 bis 100 Flaschen im Monat' },
				{ value: 'over100', label: 'Mehr als 100 Flaschen im Monat' },
				{ value: 'unsure', label: 'Noch nicht abschätzbar' }
			],
			outlet: 'Medium oder Kanal',
			outletPlaceholder: 'Name der Publikation, des Senders oder des Kanals',
			outletError: 'Bitte tragt das Medium oder den Kanal ein.',
			companyOptional: 'Unternehmen (optional)',
			message: 'Eure Nachricht',
			messagePlaceholder: 'Worum geht es genau?',
			sentTitle: 'Danke, wir haben eure Nachricht.',
			sentText: 'Wir melden uns in Kürze bei euch.'
		}
	},
	legal: {
		updated: 'Stand:',
		imprint: 'Impressum',
		privacy: 'Datenschutz'
	},
	footer: {
		navigate: 'Navigation',
		location: 'Berlin, Deutschland',
		rights: 'Alle Rechte vorbehalten.'
	}
};

export default de;
