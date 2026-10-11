import basilic from '#lib/assets/products/basilic.webp';
import passionBlush from '#lib/assets/products/passion-blush.webp';
import raspy from '#lib/assets/products/raspy.webp';
import strawberryReserve from '#lib/assets/products/strawberry-reserve.webp';
import yuzora from '#lib/assets/products/yuzora.webp';
import type { Locale } from '#lib/i18n/index.js';

export interface ProductCopy {
	/** One or two sentences on how it tastes. */
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

/** Pouch sizes and roughly how many drinks each one pours. */
export const formats = [
	{ litres: 1, glasses: 13 },
	{ litres: 3, glasses: 40 },
	{ litres: 5, glasses: 66 }
];

export const products: Product[] = [
	{
		slug: 'basilic',
		name: 'Basilic',
		image: basilic,
		de: {
			tagline:
				'Frisches Basilikum trifft auf lebendige Zitrusnoten in einer süß-sauren Balance. Kräuterig, erfrischend und knackig mit einem sauberen Abgang.',
			ingredients: 'Basilikum, Zitrone, Limette, Orange, Zucker, Wasser',
			pairsWith: 'Gin, Wodka, alkoholfrei (mit oder ohne Sprudelwasser)',
			garnish: 'Frische Basilikumblätter und eine Limetten- oder Zitronenscheibe.',
			story:
				'Basilic vereint das lebendige Aroma von frischem Basilikum mit hellen Zitrusnoten zu einer ausgewogenen süß-sauren Komposition. Sauber, grün und mühelos trinkbar, ein Profil mit botanischem Charakter.'
		},
		en: {
			tagline:
				'Fresh basil meets lively citrus in a sweet-and-sour balance. Herbal, refreshing and crisp with a clean finish.',
			ingredients: 'Basil, lemon, lime, orange, sugar, water',
			pairsWith: 'Gin, vodka, alcohol-free (with or without sparkling water)',
			garnish: 'Fresh basil leaves and a slice of lime or lemon.',
			story:
				'Basilic combines the lively aroma of fresh basil with bright citrus notes in a balanced sweet-and-sour composition. Clean, green and effortlessly drinkable, a profile with botanical character.'
		}
	},
	{
		slug: 'strawberry-reserve',
		name: 'Strawberry Reserve',
		image: strawberryReserve,
		de: {
			tagline:
				'Reife Erdbeere liefert einen saftigen, runden Fruchtcharakter mit sanfter Zitrushelligkeit und weicher Textur.',
			ingredients: 'Erdbeere, Zitrone, Limette, Orange, Zucker, Wasser',
			pairsWith: 'Wodka, Gin, alkoholfrei (mit oder ohne Sprudelwasser)',
			garnish: 'Minze und frische oder getrocknete Erdbeere.',
			story:
				'Erdbeere ist ein Geschmack, der Erinnerungen weckt: großzügig im Aroma und von Natur aus einladend. In Strawberry Reserve verstärkt Zitrusspannung die Beere, während dezente Süße die Kanten glättet. Das Ergebnis ist voll, lebendig und ausdrucksstark modern.'
		},
		en: {
			tagline:
				'Ripe strawberry delivers a juicy, rounded fruit character with gentle citrus brightness and a soft texture.',
			ingredients: 'Strawberry, lemon, lime, orange, sugar, water',
			pairsWith: 'Vodka, gin, alcohol-free (with or without sparkling water)',
			garnish: 'Mint and fresh or dried strawberry.',
			story:
				'Strawberry is a flavour that stirs memories: generous in aroma and naturally inviting. In Strawberry Reserve, citrus tension lifts the berry while subtle sweetness smooths the edges. The result is full, lively and expressively modern.'
		}
	},
	{
		slug: 'passion-blush',
		name: 'Passion Blush',
		image: passionBlush,
		de: {
			tagline:
				'Passionsfrucht, getragen von Erdbeere und dezenten Vanillenoten, aufgehellt durch Zitrus. Tropisch und fruchtbetont mit sanfter Süße und einem sauberen Abgang.',
			ingredients: 'Passionsfrucht, Erdbeere, Vanille, Zitrone, Limette, Orange, Zucker, Wasser',
			pairsWith: 'Tequila, Wodka, Rum, alkoholfrei (mit oder ohne Sprudelwasser)',
			garnish: 'Getrocknete Zitrusfrucht oder eine zarte essbare Blüte.',
			story:
				'Passion Blush entstand in Brasilien, wo die unerwartete Kombination aus Passionsfrucht und Erdbeere auf einem Straßenmarkt eine lebendige, genussvolle Harmonie offenbarte. Tropische Intensität trifft auf Zitrusfrische und sanfte Süße, exotisch und dennoch einladend. Ein Geschmack, geprägt durch Erfahrung.'
		},
		en: {
			tagline:
				'Passion fruit carried by strawberry and subtle vanilla notes, brightened with citrus. Tropical and fruit-forward with gentle sweetness and a clean finish.',
			ingredients: 'Passion fruit, strawberry, vanilla, lemon, lime, orange, sugar, water',
			pairsWith: 'Tequila, vodka, rum, alcohol-free (with or without sparkling water)',
			garnish: 'Dried citrus or a delicate edible flower.',
			story:
				'Passion Blush began in Brazil, where the unexpected pairing of passion fruit and strawberry at a street market revealed a lively, indulgent harmony. Tropical intensity meets citrus freshness and gentle sweetness, exotic yet inviting. A flavour shaped by experience.'
		}
	},
	{
		slug: 'yuzora',
		name: 'Yuzora',
		image: yuzora,
		de: {
			tagline:
				'Yuzu-betonte Zitrusnoten mit runder Ananas und leichter Ingwerwärme. Hell, erfrischend und leicht spritzig.',
			ingredients: 'Yuzu, Ananas, Ingwer, Zitrone, Orange, Zucker, Wasser',
			pairsWith: 'Sprudelnder Mate-Tee zum Auffüllen (empfohlen), Wodka, Whiskey, Gin',
			garnish: 'Getrocknete Zitrone oder frische Zitrusschale.',
			story:
				'Yuzu ist seit Jahrhunderten Teil der japanischen Küche, geschätzt für seine aromatische Intensität und seinen unverwechselbaren Zitruscharakter. Als die japanische Cocktailkultur die internationale Barszene zu prägen begann, wurde Yuzu weltweit bekannt. Yuzora verbindet diesen lebendigen Zitrusausdruck mit tropischer Weichheit und sanfter Würze. Eine Zutat mit Tradition, neu entdeckt durch die moderne Cocktailkultur.'
		},
		en: {
			tagline:
				'Yuzu-led citrus with pineapple roundness and light ginger warmth. Bright, refreshing and slightly zesty.',
			ingredients: 'Yuzu, pineapple, ginger, lemon, orange, sugar, water',
			pairsWith: 'Sparkling mate tea top-up (recommended), vodka, whiskey, gin',
			garnish: 'Dried lemon or fresh citrus peel.',
			story:
				'Yuzu has been part of Japanese culinary heritage for centuries, valued for its aromatic intensity and distinctive citrus character. As Japanese cocktail culture began influencing the global bar scene, yuzu gained international attention. Yuzora combines this vivid citrus expression with tropical softness and gentle spice. An ingredient rooted in tradition, rediscovered through contemporary cocktail culture.'
		}
	},
	{
		slug: 'raspy',
		name: 'Raspy',
		image: raspy,
		de: {
			tagline:
				'Lebendige Himbeernoten mit natürlicher Herbe und leichter Süße ergeben ein strahlendes, ausdrucksstarkes Beerenprofil.',
			ingredients: 'Himbeere, Zitrone, Orange, Zucker, Wasser',
			pairsWith: 'Gin (Pink Gin empfohlen), Wodka, alkoholfrei (mit oder ohne Sprudelwasser)',
			garnish: 'Eine Zimtstange (empfohlen) und frische Himbeere.',
			story:
				'Raspy schöpft aus den nostalgischen Himbeertönen klassischer europäischer Desserts: aromatisch, großzügig und sofort vertraut. Wir haben dies in eine moderne Cocktailform übertragen, der natürliche Beerencharakter verfeinert mit Frische und Präzision. Vertraut, neu interpretiert.'
		},
		en: {
			tagline:
				'Lively raspberry notes with natural tartness and light sweetness make for a bright, expressive berry profile.',
			ingredients: 'Raspberry, lemon, orange, sugar, water',
			pairsWith:
				'Gin (pink gin recommended), vodka, alcohol-free (with or without sparkling water)',
			garnish: 'A cinnamon stick (recommended) and fresh raspberry.',
			story:
				'Raspy draws on the nostalgic raspberry notes of classic European desserts: aromatic, generous and instantly familiar. We carried this into a modern cocktail form, the natural berry character refined with freshness and precision. Familiar, reinterpreted.'
		}
	}
];
