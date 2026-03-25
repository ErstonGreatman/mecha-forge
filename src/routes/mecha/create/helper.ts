import { goto } from '$app/navigation';
import { appState } from '$lib/states/app-state.svelte';
import { resolve } from '$app/paths';
import { saveDraft } from '$lib/storage/drafts.svelte';
import { upsertRecentMecha } from '$lib/storage/recent-mecha';

export const createMechaProject = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
	event.preventDefault();
	const formData = new FormData(event.currentTarget, event.submitter);

	appState.mecha = {
		core: {
			id: '0',
			name: formData.get('name') as string,
			weapons: [],
			armor: [],
			systems: []
		},
		systems: []
	};

	await saveDraft(appState.mecha);
	await upsertRecentMecha({
		mecha: appState.mecha,
		hasDraft: true,
		lastSaveSource: 'draft',
	})
	await goto(resolve(`/mecha/${appState.mecha.core.id}/`));
};