import type { Hangar } from '$lib/types/storage';

export type AppState = {
	loadedPlugins: string[];
	activePanel: string;
	openModals: string[];
	errors: string[];
	hangar?: Hangar;
};
