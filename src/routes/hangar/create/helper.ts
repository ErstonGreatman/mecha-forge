import { goto } from '$app/navigation';
import { appState } from '$lib/states/app-state.svelte';
import { resolve } from '$app/paths';
import { saveDraft } from '$lib/storage/drafts.svelte';
import { upsertRecentHangar } from '$lib/storage/recent-hangar';

export const createHangar = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
	event.preventDefault();
	const formData = new FormData(event.currentTarget, event.submitter);

	appState.hangar = {
		core: {
			id: '0',
			name: formData.get('name') as string,
			weapons: [],
			armor: [],
			systems: []
		},
		systems: []
	};

	await saveDraft(appState.hangar);
	await upsertRecentHangar({
		hangar: appState.hangar,
		hasDraft: true,
		lastSaveSource: 'draft'
	});
	await goto(resolve(`/hangar/${appState.hangar.core.id}/`));
};
