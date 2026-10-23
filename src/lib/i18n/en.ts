import { site } from '../site';
import type { Messages } from './index';

const en: Messages = {
	meta: {
		title: `Ready to Mix Cocktail and Mocktail Bases for Venues and Events | ${site.name}`,
		description:
			'Ready to mix cocktail and mocktail bases from Berlin, made with real fruit and herbs. For bars, caterers, hotels and corporate events. Fast, consistent, no compromise.',
		keywords:
			'cocktail bases Berlin, mocktail bases, cocktail catering Berlin, drinks for corporate events'
	},
	nav: {
		home: 'Main Page',
		bases: 'Cocktail Bases',
		about: 'About',
		cta: 'Book a Tasting',
		main: 'Main navigation',
		menu: 'Menu',
		language: 'Language'
	},
	hero: {
		intro: 'Natural cocktail and mocktail bases. For bars, caterers, hotels and corporate events.',
		title: ['Bar quality.', 'In the glass in seconds.'],
		cta: 'Book Your Tasting',
		secondary: 'How it works',
		imageAlt: `Five ${site.name} bottles lined up on a bar counter`
	},
	audience: {
		title: `Where ${site.name} gets poured`,
		items: [
			'Bars and restaurants',
			'Caterers and event agencies',
			'Hotels and conferences',
			'Company parties and office events',
			'Private celebrations'
		]
	},
	how: {
		eyebrow: 'How it works',
		title: `That’s how simple ${site.name} is`,
		lead: 'Pour the base, top up or give it a quick shake, and serve. The same drink every time, with no prep behind it.',
		steps: [
			{ title: 'Fill the glass with ice', imageAlt: 'A glass filled to the rim with ice' },
			{
				title: 'Add base and spirit',
				imageAlt: 'A CORC bottle pouring green base over the ice'
			},
			{
				title: 'Stir briefly and serve',
				imageAlt: 'The finished drink with lime and basil'
			}
		],
		note: 'With or without spirit, shaken or stirred, whichever your team is used to.',
		ratio: {
			title: 'Recommended ratio',
			items: [
				{ amount: '3 Shot', label: `${site.name} Base` },
				{ amount: '2 Shot', label: 'Spirit (optional)' },
				{ amount: '1 Shot', label: 'Water (without shaker)' }
			],
			note: 'One shot equals 2.5 cl. Leave out the spirit and it becomes a mocktail. Adjust it to taste. Please enjoy responsibly.'
		}
	},
	why: {
		eyebrow: `Why ${site.name}`,
		title: `Five reasons bars, caterers and companies in Berlin work with ${site.name}.`,
		reasons: [
			{
				tag: 'Speed',
				title: 'In the glass in under 10 seconds',
				text: 'Pour, hand it over, move on. Your team serves at the pace the evening demands. The work is already done, you just make it look good.',
				imageAlt: `${site.name} Basilico bottle on a counter next to a row of finished drinks`
			},
			{
				tag: 'Fresh and natural',
				title: 'Crafted by a mixologist. Same taste, every pour.',
				text: 'Real fruit and herbs as the main ingredient, mixed fresh to order. Bar quality your team can repeat every single time.',
				imageAlt: `${site.name} Fragola bottle among fresh strawberries, raspberries, lemons and mint`
			},
			{
				tag: 'Easy',
				title: 'Skip the training. Keep the quality.',
				text: 'No complicated prep, no specialist knowledge. Every guest gets the same good cocktail, from the first round to the busiest moment of the night.',
				imageAlt: `${site.name} Yuzu bottle beside a glass being stirred with a bar spoon`
			},
			{
				tag: 'With or without alcohol',
				title: 'Every base works alcohol free',
				text: 'The same base, once with spirit and once without. Everyone at the table gets a drink that was actually thought through, not a soft drink handed over as a fallback.',
				imageAlt: 'Two Framboise drinks between a gin bottle and a bottle of sparkling water'
			},
			{
				tag: 'Happy guests',
				title: 'The taste of good company.',
				text: 'Drinks that keep people at the table. Handcrafted, worth a second glass. And a third.',
				imageAlt: 'Guests talking around a high table, colourful drinks in hand'
			}
		]
	},
	tasting: {
		eyebrow: 'Tasting',
		title: 'Your first round is on us.',
		note: `Get in touch to set up a tasting. We bring ${site.name} to you, to the bar, the office or straight to the event.`,
		form: {
			name: 'Your name',
			company: 'Company or venue name',
			email: 'Email address',
			businessType: 'Type of business',
			businessTypePlaceholder: 'Please select',
			businessTypeOptions: [
				{ value: 'bar', label: 'Bar or restaurant' },
				{ value: 'caterer', label: 'Caterer or agency' },
				{ value: 'hotel', label: 'Hotel' },
				{ value: 'company', label: 'Company' },
				{ value: 'other', label: 'Other' }
			],
			message: 'Anything else we should know?',
			messagePlaceholder: 'Upcoming event, preferred meeting time, specific questions …',
			privacyNote:
				'By sending this you agree that we process your details to answer the request. More in our',
			privacyLink: 'privacy policy',
			submit: 'Send',
			sending: 'Sending …',
			sentTitle: 'Thanks, we have your request.',
			sentText: 'We will be in touch shortly to arrange a time.',
			errors: {
				name: 'Please enter your name.',
				company: 'Please enter your company or venue.',
				email: 'Please enter a valid email address.',
				businessType: 'Please choose the type of business.',
				message: 'The message is too long.',
				invalid: 'Please check the highlighted fields.',
				verification: 'The spam check failed. Please try again.',
				verificationLoad:
					'Could not load the spam check. Please disable content blockers and reload.',
				network: 'Could not reach the server. Please try again.',
				generic: 'Something went wrong. Please try again.'
			}
		}
	},
	bases: {
		meta: {
			title: `Cocktail and Mocktail Bases | ${site.name} Berlin`,
			description:
				'Five cocktail and mocktail bases in 400 ml and 1 L. Real fruit and herbs, fast preparation, consistent taste. Every base works alcohol free.',
			keywords: 'ready to mix cocktails, mocktail bases, alcohol free cocktails events'
		},
		eyebrow: 'Cocktail Bases',
		title: 'Signature cocktail and mocktail bases, crafted to perform.',
		lead: 'Pour. Mix. Serve.',
		discover: 'Discover',
		statsAlt: 'A base being strained from the shaker into a glass',
		stats: [
			{
				value: '5',
				label: 'Flavors',
				text: 'Each developed by a certified mixologist with years of experience'
			},
			{
				value: '2',
				label: 'Formats',
				text: '400 ml and 1 L, for the trial run and for daily service'
			},
			{ value: '<10s', label: 'Serve time', text: 'Straight into the glass, no prep needed' },
			{
				value: 'Fruit first',
				label: 'Real ingredients',
				text: 'Fruit and herbs are the main ingredient in every base, mixed fresh to order'
			}
		],
		yield: {
			title: 'How far does one bottle go?',
			items: [
				{ format: '400 ml', drinks: '5 to 6 drinks' },
				{ format: '1 L', drinks: '12 to 13 drinks' }
			],
			note: 'Based on 3 shots of base per glass.'
		},
		range: {
			title: 'Five bases. Five signatures.',
			lead: 'Every base works with or without a spirit.'
		}
	},
	product: {
		metaTitle: (name: string) => `${name} | Cocktail Base | ${site.name}`,
		eyebrow: 'Cocktail and mocktail base',
		ingredients: 'Ingredients',
		pairsWith: 'Pairs with',
		garnish: 'Elevate with',
		storage: 'Storage',
		storageText: 'Keep refrigerated and consume within 5 days.',
		formats: 'Formats',
		glasses: (count: string) => `${count} glasses`,
		back: 'All bases',
		others: 'More flavours'
	},
	cta: {
		title: 'Tell us where you will be pouring.',
		lead: 'We will be in touch shortly and bring the tasting to you.',
		button: 'Book a tasting'
	},
	about: {
		meta: {
			title: `About ${site.name} | Berlin Beverage Brand`,
			description: `${site.name} is a Berlin beverage brand making fresh cocktail and mocktail bases with real fruit and herbs for hospitality, caterers and corporate events.`,
			keywords: 'Berlin beverage brand, cocktail brand Berlin, mocktail brand Berlin'
		},
		eyebrow: `About ${site.name}`,
		title: 'Natural bases. High class drinks.',
		lead: 'We build cocktail bases for situations where pace, reliability and quality all have to come together. Our system takes the complexity out without cutting the creativity, so teams can spend their attention on the experience instead of the prep.',
		imageAlt: `Bartender behind the counter with three ${site.name} bottles`,
		features: [
			{
				title: 'Natural',
				text: 'Real fruit and herbs as the main ingredient, no shortcuts'
			},
			{
				title: 'Fast',
				text: 'Ice, base, done. Under 10 seconds.'
			},
			{
				title: 'Berlin made',
				text: 'From a city where culture and creativity keep running into each other'
			}
		],
		makers: {
			eyebrow: 'Who is behind it',
			title: 'Hi, I’m Ilker. I make every base here.',
			name: 'Ilker Sagkaya',
			portraitAlt: 'Ilker Sagkaya behind the bar',
			role: `Founder of ${site.name}`,
			paragraphs: [
				'I have spent nine years in drinks, starting behind the bar. In house at Pernod Ricard, the company behind Absolut, Beefeater and Chivas Regal, I ran their premium events in Istanbul and Izmir. I also handled the sponsorship partnerships for the top bars and clubs in both cities, on the venues’ side of the table rather than the brands’. In Berlin I have been building bars at private and corporate events ever since.',
				`${site.name} came out of what kept going wrong in service, a drink that takes three minutes when the queue allows thirty seconds, and a recipe that tastes different depending on who is pouring it. Every base here is built to survive a real shift, not a photo shoot.`,
				'I also make cocktail content as @shakeiteasyy, 19k followers on Instagram and 24k on TikTok. That audience is why I care what a drink looks like, not only how fast it pours.'
			],
			links: [
				{ label: 'Instagram', href: 'https://www.instagram.com/shakeiteasyy' },
				{ label: 'TikTok', href: 'https://www.tiktok.com/@shakeiteasyy' }
			]
		},
		story: {
			eyebrow: 'Our story',
			title: 'From the bar to the bottle.',
			imageAlt: 'Two hands toasting with drinks at a bar',
			opening: 'Good taste brings people together.',
			paragraphs: [
				'A good drink in the right place opens conversations, pulls people toward each other and creates a mood that feels like its own small place in time.',
				`${site.name} started from wanting to make those moments repeatable. Not once, not by accident, but on purpose and every time. After hundreds of events and thousands of guests one thing was clear: what counts is not only the drink, but everything happening around it.`
			],
			closing: 'We handle the prep. You own the night.'
		},
		cta: {
			title: `Ready to bring ${site.name} to your next event?`,
			lead: 'Request a tasting and we will come to you.'
		}
	},
	tastingPage: {
		meta: {
			title: `Book a Cocktail Tasting in Berlin | ${site.name}`,
			description: `Book a cocktail and mocktail tasting in Berlin. Try ${site.name} at your bar, your office or your event, no pressure, no obligation.`,
			keywords: 'cocktail tasting Berlin, event drinks Berlin, cocktail catering'
		},
		title: 'Your first round is on us.',
		lead: 'Five mixologist developed bases. Real fruit, real herbs, mixed fresh to order. Great taste, less effort.',
		steps: [
			{
				title: 'Fill in the form',
				text: 'Tell us briefly where you will be pouring and which flavors interest you.'
			},
			{
				title: 'We get back to you',
				text: 'We will reach out shortly and find a slot that fits your schedule.'
			},
			{ title: 'Taste and decide', text: 'Try the bases together with your team.' }
		]
	},
	legal: {
		updated: 'Last updated:',
		imprint: 'Legal notice',
		privacy: 'Privacy'
	},
	footer: {
		navigate: 'Navigate',
		location: 'Berlin, Germany',
		rights: 'All rights reserved.'
	}
};

export default en;
