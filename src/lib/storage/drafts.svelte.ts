import { getDb } from './db';
import type { Hangar, DraftHangarRecord } from '$lib/types/storage';
import { SvelteDate } from 'svelte/reactivity';

export const saveDraft = async (project: Hangar) => {
	const db = await getDb();

	const record: DraftHangarRecord = {
		hangarId: project.core.id,
		updatedAt: new SvelteDate().toISOString(),
		data: $state.snapshot(project)
	};

	await db.put('drafts', record, record.hangarId);
};

export const loadDraft = async (hangarId: string) => {
	const db = await getDb();
	return db.get('drafts', hangarId);
};

export const deleteDraft = async (hangarId: string) => {
	const db = await getDb();
	await db.delete('drafts', hangarId);
};

export const listDrafts = async () => {
	const db = await getDb();
	return db.getAll('drafts');
};
