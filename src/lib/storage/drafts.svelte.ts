import { getDb } from './db';
import type { MechaProject, DraftMechaRecord } from '$lib/types/storage';
import { SvelteDate } from 'svelte/reactivity';

export const saveDraft = async (project: MechaProject) => {
	const db = await getDb();

	const record: DraftMechaRecord = {
		mechaId: project.core.id,
		updatedAt: new SvelteDate().toISOString(),
		data: $state.snapshot(project),
	};

	await db.put('drafts', record, record.mechaId);
};

export const loadDraft = async (mechaId: string) => {
	const db = await getDb();
	return db.get('drafts', mechaId);
};

export const deleteDraft = async (mechaId: string) => {
	const db = await getDb();
	await db.delete('drafts', mechaId);
};

export const listDrafts = async () => {
	const db = await getDb();
	return db.getAll('drafts');
};
