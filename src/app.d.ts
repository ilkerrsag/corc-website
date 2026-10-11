// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface ImportMetaEnv {
		readonly VITE_TURNSTILE_SITE_KEY: string;
		readonly VITE_SITE_URL?: string;
	}

	interface Window {
		turnstile?: {
			render(
				container: HTMLElement,
				options: {
					sitekey: string;
					theme?: 'light' | 'dark' | 'auto';
					size?: 'normal' | 'flexible' | 'compact';
					language?: string;
				}
			): string;
			reset(widgetId: string): void;
			remove(widgetId: string): void;
		};
	}
}

export {};
