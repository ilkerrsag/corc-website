import { site } from '../site';
import type { Messages } from './index';

const en: Messages = {
	meta: {
		title: `Ready to Mix Cocktails and Mocktails in Berlin | ${site.name}`,
		description:
			'Ready to mix cocktail and mocktail bases made in Berlin with real fruit and herbs. For bars, events and modern hospitality. Fast, consistent, no compromises.'
	},
	nav: {
		home: 'Home',
		bases: 'Our bases',
		about: 'About',
		cta: 'Book a tasting',
		main: 'Main navigation',
		menu: 'Menu',
		language: 'Language'
	},
	hero: {
		title: ['Signature quality.', 'Ready in seconds.'],
		lead: 'Exceptional cocktails and mocktails with minimal preparation and maximum consistency. Built for bars, events and modern hospitality.',
		cta: 'Book your tasting',
		secondary: 'How it works',
		imageAlt: `${site.name} pouch on a bar counter with a bartender in the background`
	},
	how: {
		eyebrow: 'How it works',
		title: `Two ways to mix your ${site.name}`,
		lead: 'Pour the base, top up or shake, and serve. Consistent drinks without extra preparation.',
		shake: {
			title: 'Shake',
			imageAlt: 'Illustration: shaker with ice, add base and spirit, shake, serve in a glass',
			steps: ['Fill shaker with ice', 'Add base + spirit (optional)', 'Shake well', 'Serve']
		},
		stir: {
			title: 'Stir',
			imageAlt: 'Illustration: glass with ice, add base, spirit and water, stir, serve',
			steps: ['Fill glass with ice', 'Add base + spirit (optional) + water', 'Stir well', 'Serve']
		},
		ratio: {
			title: 'Recommended ratio',
			items: [
				{ amount: '1.5 shots', label: `${site.name} base` },
				{ amount: '1 shot', label: 'Spirit (optional)' },
				{ amount: '½ shot', label: 'Water (without shaker)' }
			],
			note: 'Adjust to taste. Enjoy responsibly.'
		}
	},
	why: {
		eyebrow: `Why ${site.name}`,
		title: 'Built for venues that take quality seriously.',
		lead: `Four reasons Berlin's top venues are choosing ${site.name}.`,
		reasons: [
			{
				tag: 'Speed',
				title: 'Ready to serve in under 10 seconds',
				text: 'Pour, serve, repeat. Your team pours a perfect cocktail at the pace your event demands. Everything is ready, you just make it look good.',
				imageAlt: 'Five colourful cocktails and mocktails side by side on a bar counter'
			},
			{
				tag: 'Fresh and natural',
				title: 'Mixologist developed. Consistently delivered.',
				text: 'Made with real fruit and herbs, freshly mixed on demand. Signature quality your team can replicate confidently, every shift.',
				imageAlt: `${site.name} pouch with fresh berries, lemon, passion fruit and herbs`
			},
			{
				tag: 'Easy',
				title: 'Zero extra training required',
				text: 'No complex prep, no specialist knowledge needed. Your team pours a perfect cocktail every time, from the opening shift to the busiest night of the week.',
				imageAlt: `A bartender pouring a green drink over ice next to the ${site.name} pouch`
			},
			{
				tag: 'Happy customers',
				title: 'Drinks worth coming back for',
				text: 'Give your guests something they remember. Handcrafted quality worth a second glass, and a third.',
				imageAlt: 'Guests laughing in a bar, holding colourful drinks'
			}
		]
	},
	tasting: {
		eyebrow: 'Tasting',
		title: 'Let the taste do the talking',
		lead: `Get in touch to book a tasting appointment and we will bring ${site.name} to your venue.`,
		form: {
			name: 'Your name',
			company: 'Venue or company name',
			email: 'Email address',
			message: 'Anything else you want us to know',
			messagePlaceholder: 'Upcoming event, preferred meeting time, specific questions…',
			submit: 'Submit',
			sending: 'Sending…',
			sentTitle: 'Thanks, we have your request.',
			sentText: 'We will be in touch shortly to arrange a time.',
			errors: {
				name: 'Please enter your name.',
				company: 'Please enter your venue or company.',
				email: 'Please enter a valid email address.',
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
			title: `Cocktail and Mocktail Bases | ${site.name}`,
			description:
				'Ready to mix cocktail and mocktail bases for events, bars and venues in Berlin. Real fruit, fast preparation and consistent taste. The easy solution for your venue.'
		},
		eyebrow: 'Our bases',
		title: 'Signature cocktail and mocktail bases, crafted to perform.',
		lead: 'Five flavours made with real fruit and herbs. With a spirit or alcohol-free, in the glass in seconds.',
		discover: 'Discover',
		statsAlt: 'Friends toasting with drinks at a dinner',
		stats: [
			{
				value: '5',
				label: 'Flavours',
				text: 'Each developed by a certified mixologist and food scientist'
			},
			{ value: '3', label: 'Formats', text: '1L, 3L and 5L to fit any venue size' },
			{ value: '<10s', label: 'Serve time', text: 'From tap to glass, no prep required' },
			{ value: '65–85%', label: 'Real fruit', text: 'Freshly mixed on demand' }
		]
	},
	product: {
		metaTitle: (name: string) => `${name} | Cocktail Base | ${site.name}`,
		eyebrow: 'Cocktail and mocktail base',
		ingredients: 'Ingredients',
		pairsWith: 'Pairs with',
		garnish: 'Elevate with',
		formats: 'Formats',
		glasses: (count: number) => `approx. ${count} glasses`,
		back: 'All bases',
		others: 'More flavours'
	},
	cta: {
		title: 'Pick your flavours, tell us your venue.',
		lead: 'We will reach out shortly to arrange your tasting.',
		button: 'Book a tasting'
	},
	about: {
		meta: {
			title: `About ${site.name} | Berlin Beverage Brand`,
			description: `Meet ${site.name}, a Berlin beverage brand creating fresh cocktail and mocktail bases with real fruit and herbs for bars, events and hospitality.`
		},
		eyebrow: `About ${site.name}`,
		title: 'Modern cocktail bases. Built for the people who serve them.',
		lead: 'We develop cocktail bases for professional environments where speed, consistency and quality matter most. Our system reduces complexity without limiting creativity, so teams can focus on the experience rather than the preparation.',
		imageAlt: `${site.name} pouch against dark marble`,
		features: [
			{ title: 'Naturally crafted', text: 'Real fruit and herbs, up to 88% fruit content' },
			{
				title: 'Built for speed',
				text: 'Ready to serve in under 10 seconds, no prep, no specialist skills needed'
			},
			{
				title: 'Born in Berlin',
				text: 'Developed in a city where creativity and culture naturally intersect.'
			}
		],
		story: {
			eyebrow: 'Our story',
			title: 'It was never just about the drink.',
			imageAlt: `${site.name} pouch with two drinks in a club with coloured lights`,
			opening:
				'Food and drinks connect people in a way that little else can. They create moments that stay with us long after the last sip, long after the evening ends.',
			paragraphs: [
				'A great drink in the right setting has the power to bring people together, open conversations and create an atmosphere that feels like its own small place in time.',
				`${site.name} was born from the desire to make these moments happen again and again. Not just once, not just by chance, but deliberately and reliably. Through hundreds of events and thousands of guests, one thing became clear: what people truly value is not just the drink itself, but the experience surrounding it.`
			],
			closing: `${site.name} is not just about cocktails. It is about the moments they create.`
		},
		cta: {
			title: `Ready to bring ${site.name} to your venue?`,
			lead: 'Request a tasting. We come to you.'
		}
	},
	tastingPage: {
		meta: {
			title: `Book a Cocktail Tasting in Berlin | ${site.name}`,
			description: `Book a cocktail and mocktail tasting in Berlin. Try ${site.name} at your venue with no pressure and see how fast, consistent drinks can work.`
		},
		title: 'Let the taste do the talking.',
		lead: 'Five mixologist developed bases. Real fruit, real herbs, freshly mixed on demand. For venues that serve without compromise.',
		steps: [
			{
				title: 'Fill in the form',
				text: 'Tell us about your venue and which flavours interest you most.'
			},
			{
				title: 'We get in touch',
				text: 'We will reach out shortly to arrange a tasting at a time that suits you.'
			},
			{ title: 'Taste and decide', text: 'Try the bases with your team.' }
		]
	},
	footer: {
		navigate: 'Navigate',
		location: 'Berlin, Germany',
		rights: 'All rights reserved.'
	}
};

export default en;
