import { defineParams } from '@sveltejs/kit/params';

// German has no prefix, so only the other languages match the optional segment.
export const params = defineParams({
	lang: (param) => (param === 'en' ? param : undefined)
});
