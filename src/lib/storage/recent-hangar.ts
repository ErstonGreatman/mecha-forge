import { getDb } from './db';
import type { Hangar, RecentHangarRecord } from '$lib/types/storage';
import { SvelteDate } from 'svelte/reactivity';

type UpsertRecentHangarInput = {
	hangar: Hangar;
	hasDraft: boolean;
	lastSaveSource: 'file' | 'draft';
	fileHandle?: FileSystemFileHandle;
};

export const upsertRecentHangar = async (input: UpsertRecentHangarInput) => {
	const db = await getDb();

	const record: RecentHangarRecord = {
		hangarId: input.hangar.core.id,
		name: input.hangar.core.name,
		lastOpenedAt: new SvelteDate().toISOString(),
		systemIds: input.hangar.systems.map((i) => i.systemId),
		hasDraft: input.hasDraft,
		lastSaveSource: input.lastSaveSource,
		fileHandle: input.fileHandle
	};

	await db.put('recentHangar', record, record.hangarId);
};

export const listRecentHangar = async () => {
	const db = await getDb();
	const records = await db.getAll('recentHangar');

	return records.sort(
		(a, b) => new Date(b.lastOpenedAt).getTime() - new Date(a.lastOpenedAt).getTime()
	);
};

export const getRecentHangar = async (hangarId: string) => {
	const db = await getDb();
	return db.get('recentHangar', hangarId);
};

export const removeRecentHangar = async (hangarId: string) => {
	const db = await getDb();
	await db.delete('recentHangar', hangarId);
};

export const setRecentHangarDraftState = async (hangarId: string, hasDraft: boolean) => {
	const db = await getDb();
	const record = await db.get('recentHangar', hangarId);

	if (!record) return;

	record.hasDraft = hasDraft;
	record.lastOpenedAt = new Date().toISOString();

	await db.put('recentHangar', record, hangarId);
};
