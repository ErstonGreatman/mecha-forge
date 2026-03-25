import type { Hangar } from '$lib/types/storage';
import { upsertRecentHangar } from './recent-hangar.ts';
import { saveDraft, deleteDraft } from './drafts.svelte.ts';

export async function saveHangarAs(hangar: Hangar) {
	const handle = await window.showSaveFilePicker({
		suggestedName: `${hangar.core.name || 'untitled'}.hangar.json`,
		types: [
			{
				description: 'Mecha Hangar',
				accept: {
					'application/json': ['.json', '.hangar.json']
				}
			}
		]
	});

	await writeHangarToHandle(handle, hangar);

	await upsertRecentHangar({
		hangar,
		hasDraft: false,
		lastSaveSource: 'file',
		fileHandle: handle
	});

	await deleteDraft(hangar.core.id);

	return handle;
}

export async function saveHangarToExistingFile(
	hangar: Hangar,
	handle: FileSystemFileHandle
) {
	await writeHangarToHandle(handle, hangar);

	await upsertRecentHangar({
		hangar,
		hasDraft: false,
		lastSaveSource: 'file',
		fileHandle: handle
	});

	await deleteDraft(hangar.core.id);
}

export async function autosaveHangar(hangar: Hangar) {
	await saveDraft(hangar);

	await upsertRecentHangar({
		hangar,
		hasDraft: true,
		lastSaveSource: 'draft'
	});
}

async function writeHangarToHandle(handle: FileSystemFileHandle, hangar: Hangar) {
	const writable = await handle.createWritable();
	await writable.write(JSON.stringify(hangar, null, 2));
	await writable.close();
}
