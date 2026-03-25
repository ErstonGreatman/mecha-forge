import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
import { browser } from '$app/environment';

register('en', () => import('./en.json'));

// Register other locales here just like en above

// End locale registration

const defaultLocale = 'en';

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? getLocaleFromNavigator() : defaultLocale,
});