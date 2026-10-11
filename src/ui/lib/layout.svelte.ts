import { browser } from '$app/env';

export const BREAKPOINTS = {
	mobile: [0, 768],
	tablet: [769, 1023],
	desktop: [1024, 1280],
	widescreen: [1281, 9999999],
	touch: [0, 1023],
	computer: [1024, 9999999]
} as const;

type Device = 'mobile' | 'tablet' | 'desktop' | 'widescreen';
type DeviceType = 'touch' | 'computer';

const inRange = (width: number, range: readonly [number, number]) =>
	width >= range[0] && width <= range[1];

class LayoutStore {
	// On the server there is no window: render the desktop layout, as the pages always
	// have, and let the first client measurement correct it.
	width = $state(browser ? window.innerWidth : 1280);

	mobile = $derived(inRange(this.width, BREAKPOINTS.mobile));
	tablet = $derived(inRange(this.width, BREAKPOINTS.tablet));
	desktop = $derived(inRange(this.width, BREAKPOINTS.desktop));
	widescreen = $derived(inRange(this.width, BREAKPOINTS.widescreen));
	touch = $derived(inRange(this.width, BREAKPOINTS.touch));
	computer = $derived(inRange(this.width, BREAKPOINTS.computer));

	device = $derived<Device>(
		this.mobile ? 'mobile' : this.tablet ? 'tablet' : this.desktop ? 'desktop' : 'widescreen'
	);
	deviceType = $derived<DeviceType>(this.touch ? 'touch' : 'computer');

	handleResize = () => {
		if (!browser) return;
		this.width = window.innerWidth;
	};
}

export const layoutStore = new LayoutStore();
