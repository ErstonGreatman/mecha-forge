import type { AppState } from '$lib/types/appState';

export const appState: AppState = $state({
	mecha: undefined,
	loadedPlugins: [] as string[],
	activePanel: 'overview',
	openModals: [] as string[],
	errors: [] as string[]
});
