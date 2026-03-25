import { browser } from '$app/environment';
import '$localization/i18n';
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	if (browser) {
		locale.set(window.navigator.language);
	}
	void waitLocale();
};
