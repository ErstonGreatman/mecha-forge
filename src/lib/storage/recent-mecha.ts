import { getDb } from './db';
import type { MechaProject, RecentMechaRecord } from '$lib/types/storage';
import { SvelteDate } from 'svelte/reactivity';

type UpsertRecentMechaInput = {
	mecha: MechaProject;
	hasDraft: boolean;
	lastSaveSource: 'file' | 'draft';
	fileHandle?: FileSystemFileHandle;
};

export const upsertRecentMecha = async (input: UpsertRecentMechaInput) => {
	const db = await getDb();

	const record: RecentMechaRecord = {
		mechaId: input.mecha.core.id,
		name: input.mecha.core.name,
		lastOpenedAt: new SvelteDate().toISOString(),
		systemIds: input.mecha.systems.map((i) => i.systemId),
		hasDraft: input.hasDraft,
		lastSaveSource: input.lastSaveSource,
		fileHandle: input.fileHandle
	};

	await db.put('recentMecha', record, record.mechaId);
};

export const listRecentMecha = async () => {
	const db = await getDb();
	const records = await db.getAll('recentMecha');

	return records.sort(
		(a, b) => new Date(b.lastOpenedAt).getTime() - new Date(a.lastOpenedAt).getTime()
	);
};

export const getRecentMecha = async (mechaId: string) => {
	const db = await getDb();
	return db.get('recentMecha', mechaId);
};

export const removeRecentMecha = async (mechaId: string) => {
	const db = await getDb();
	await db.delete('recentMecha', mechaId);
};

export const setRecentMechaDraftState = async (mechaId: string, hasDraft: boolean) => {
	const db = await getDb();
	const record = await db.get('recentMecha', mechaId);

	if (!record) return;

	record.hasDraft = hasDraft;
	record.lastOpenedAt = new Date().toISOString();

	await db.put('recentMecha', record, mechaId);
};
