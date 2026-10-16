import type { Locale } from '#lib/i18n/index.js';
import basilico from '#lib/assets/products/basilico.webp';
import fragola from '#lib/assets/products/fragola.webp';
import framboise from '#lib/assets/products/framboise.webp';
import maracuja from '#lib/assets/products/maracuja.webp';
import yuzu from '#lib/assets/products/yuzu.webp';

export interface ProductCopy {
	/** One or two sentences on how it tastes. Doubles as the card and range blurb. */
	tagline: string;
	ingredients: string;
	pairsWith: string;
	garnish: string;
	story: string;
}

export interface Product extends Record<Locale, ProductCopy> {
	slug: string;
	name: string;
	image: string;
}

/** Bottle sizes and roughly how many drinks each one pours at 1.5 shots per glass. */
export const formats = [
	{ size: '400 ml', drinks: { de: '5 bis 6', en: '5 to 6' } },
	{ size: '1 L', drinks: { de: '12 bis 13', en: '12 to 13' } }
];

export const products: Product[] = [
	{
		slug: 'basilico',
		name: 'Basilico',
		image: basilico,
		de: {
			tagline:
				'Frischer Basilikum und Zitrone, krautig und klar. Spielt mit Gin, funktioniert genauso gut ohne.',
			ingredients: 'Basilikum, Zitrone, Limette, Orange',
			pairsWith: 'Gin, Wodka, alkoholfrei (mit oder ohne Tonic / Sprudelwasser)',
			garnish: 'Frische Basilikumblätter und eine Limettenscheibe.',
			story:
				'Basilico verbindet das lebendige Aroma von frischem Basilikum mit hellen Zitrusnoten zu einer ausgewogenen süß-sauren Komposition. Sauber, grün und mühelos trinkbar, ein Profil mit botanischem Charakter, das im Glas sofort erkennbar bleibt.'
		},
		en: {
			tagline:
				'Fresh basil and lemon, herbal and clean. Plays with gin, works just as well without it.',
			ingredients: 'Basil, lemon, lime, orange',
			pairsWith: 'Gin, vodka, alcohol-free (with or without tonic / sparkling water)',
			garnish: 'Fresh basil leaves and a slice of lime.',
			story:
				'Basilico combines the lively aroma of fresh basil with bright citrus notes in a balanced sweet-and-sour composition. Clean, green and effortlessly drinkable, a profile with botanical character that stays recognisable in the glass.'
		}
	},
	{
		slug: 'fragola',
		name: 'Fragola',
		image: fragola,
		de: {
			tagline:
				'Reife Erdbeere mit Minze darin und einer sauberen Säure dahinter. Der Drink, den alle am Tisch verstehen.',
			ingredients: 'Erdbeere, Minze, Zitrone, Limette, Orange',
			pairsWith: 'Wodka, Gin, Sekt, alkoholfrei (mit oder ohne Tonic / Sprudelwasser)',
			garnish: 'Minze und frische Erdbeere.',
			story:
				'Erdbeere ist ein Geschmack, der Erinnerungen weckt: großzügig im Aroma und von Natur aus einladend. In Fragola hebt Zitrusspannung die Beere an, Minze gibt dem Ganzen einen kühlen Zug, und dezente Süße glättet die Kanten. Das Ergebnis ist voll, lebendig und ausdrucksstark modern.'
		},
		en: {
			tagline:
				'Ripe strawberry with mint through the middle and a clean acidity behind it. The drink everyone at the table understands.',
			ingredients: 'Strawberry, mint, lemon, lime, orange',
			pairsWith:
				'Vodka, gin, sparkling wine, alcohol-free (with or without tonic / sparkling water)',
			garnish: 'Mint and fresh strawberry.',
			story:
				'Strawberry is a flavour that stirs memories: generous in aroma and naturally inviting. In Fragola, citrus tension lifts the berry, mint pulls a cool line through the middle, and subtle sweetness smooths the edges. The result is full, lively and expressively modern.'
		}
	},
	{
		slug: 'maracuja',
		name: 'Maracuja',
		image: maracuja,
		de: {
			tagline:
				'Passionsfrucht mit Erdbeere dahinter und einer Spur Vanille. Tropisch und vielschichtig.',
			ingredients: 'Passionsfrucht, Erdbeere, Vanille, Zitrone, Limette, Orange',
			pairsWith: 'Tequila, Wodka, Rum, alkoholfrei (mit oder ohne Sprudelwasser)',
			garnish: 'Eine Limettenscheibe und eine zarte essbare Blüte.',
			story:
				'Maracuja entstand in Brasilien, wo die unerwartete Kombination aus Passionsfrucht und Erdbeere auf einem Straßenmarkt eine lebendige, genussvolle Harmonie offenbarte. Tropische Intensität trifft auf Zitrusfrische und sanfte Süße, exotisch und dennoch einladend. Ein Geschmack, geprägt durch Erfahrung.'
		},
		en: {
			tagline:
				'Passion fruit with strawberry behind it and a trace of vanilla. Tropical and layered.',
			ingredients: 'Passion fruit, strawberry, vanilla, lemon, lime, orange',
			pairsWith: 'Tequila, vodka, rum, alcohol-free (with or without sparkling water)',
			garnish: 'A slice of lime and a delicate edible flower.',
			story:
				'Maracuja began in Brazil, where the unexpected pairing of passion fruit and strawberry at a street market revealed a lively, indulgent harmony. Tropical intensity meets citrus freshness and gentle sweetness, exotic yet inviting. A flavour shaped by experience.'
		}
	},
	{
		slug: 'framboise',
		name: 'Framboise',
		image: framboise,
		de: {
			tagline:
				'Himbeere mit Tiefe, mehr dunkle Beere als Bonbon. Ein Klassiker, der auch im Winter funktioniert.',
			ingredients: 'Himbeere, Zitrone, Orange',
			pairsWith: 'Gin (Pink Gin empfohlen), Wodka, alkoholfrei (mit oder ohne Sprudelwasser)',
			garnish: 'Eine Zimtstange und frische Himbeere.',
			story:
				'Framboise schöpft aus den nostalgischen Himbeertönen klassischer europäischer Desserts: aromatisch, großzügig und sofort vertraut. Wir haben das in eine moderne Cocktailform übertragen, der natürliche Beerencharakter verfeinert mit Frische und Präzision. Vertraut, neu interpretiert.'
		},
		en: {
			tagline:
				'Raspberry with depth, more dark berry than candy. A classic that holds up in winter too.',
			ingredients: 'Raspberry, lemon, orange',
			pairsWith:
				'Gin (pink gin recommended), vodka, alcohol-free (with or without sparkling water)',
			garnish: 'A cinnamon stick and fresh raspberry.',
			story:
				'Framboise draws on the nostalgic raspberry notes of classic European desserts: aromatic, generous and instantly familiar. We carried that into a modern cocktail form, the natural berry character refined with freshness and precision. Familiar, reinterpreted.'
		}
	},
	{
		slug: 'yuzu',
		name: 'Yuzu',
		image: yuzu,
		de: {
			tagline:
				'Japanische Zitrusfrucht mit Ananas und einer Spur Ingwer dahinter. Die eleganteste Base der Reihe.',
			ingredients: 'Yuzu, Ananas, Ingwer, Zitrone, Orange',
			pairsWith: 'Sprudelnder Mate-Tee zum Auffüllen (empfohlen), Wodka, Whiskey, Gin',
			garnish: 'Getrocknete Zitronenscheibe oder frische Zitrusschale.',
			story:
				'Yuzu ist seit Jahrhunderten Teil der japanischen Küche, geschätzt für ihre aromatische Intensität und ihren unverwechselbaren Zitruscharakter. Als die japanische Cocktailkultur die internationale Barszene zu prägen begann, wurde Yuzu weltweit bekannt. Diese Base verbindet den lebendigen Zitrusausdruck mit tropischer Weichheit und sanfter Würze.'
		},
		en: {
			tagline:
				'Japanese citrus with pineapple and a line of ginger behind it. The most elegant base in the range.',
			ingredients: 'Yuzu, pineapple, ginger, lemon, orange',
			pairsWith: 'Sparkling mate tea top-up (recommended), vodka, whiskey, gin',
			garnish: 'Dried lemon slice or fresh citrus peel.',
			story:
				'Yuzu has been part of Japanese culinary heritage for centuries, valued for its aromatic intensity and distinctive citrus character. As Japanese cocktail culture began influencing the global bar scene, yuzu gained international attention. This base combines that vivid citrus expression with tropical softness and gentle spice.'
		}
	}
];
