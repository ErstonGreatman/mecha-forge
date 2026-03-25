import type { MechaProject } from '$lib/types/storage';
import { upsertRecentProject } from './recent-mecha.ts';
import { saveDraft, deleteDraft } from './drafts.svelte.ts';

export async function saveProjectAs(project: MechaProject) {
	const handle = await window.showSaveFilePicker({
		suggestedName: `${project.core.title || 'untitled'}.mecha.json`,
		types: [
			{
				description: 'Mecha Project',
				accept: {
					'application/json': ['.json', '.mecha.json']
				}
			}
		]
	});

	await writeProjectToHandle(handle, project);

	await upsertRecentProject({
		project,
		hasDraft: false,
		lastSaveSource: 'file',
		fileHandle: handle
	});

	await deleteDraft(project.core.id);

	return handle;
}

export async function saveProjectToExistingFile(
	project: MechaProject,
	handle: FileSystemFileHandle
) {
	await writeProjectToHandle(handle, project);

	await upsertRecentProject({
		project,
		hasDraft: false,
		lastSaveSource: 'file',
		fileHandle: handle
	});

	await deleteDraft(project.core.id);
}

export async function autosaveProject(project: MechaProject) {
	await saveDraft(project);

	await upsertRecentProject({
		project,
		hasDraft: true,
		lastSaveSource: 'draft'
	});
}

async function writeProjectToHandle(handle: FileSystemFileHandle, project: MechaProject) {
	const writable = await handle.createWritable();
	await writable.write(JSON.stringify(project, null, 2));
	await writable.close();
}
