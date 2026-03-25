import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { DraftHangarRecord, RecentHangarRecord, AppSettingRecord } from '$lib/types/storage';

interface MechaForgeDB extends DBSchema {
	drafts: {
		key: string; // hangarId
		value: DraftHangarRecord;
	};
	recentHangar: {
		key: string; // hangarId
		value: RecentHangarRecord;
	};
	settings: {
		key: string; // setting key
		value: AppSettingRecord;
	};
}

let dbPromise: Promise<IDBPDatabase<MechaForgeDB>> | null = null;

export const getDb = () => {
	if (!dbPromise) {
		dbPromise = openDB<MechaForgeDB>('mecha-forge', 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains('drafts')) {
					db.createObjectStore('drafts');
				}

				if (!db.objectStoreNames.contains('recentHangar')) {
					db.createObjectStore('recentHangar');
				}

				if (!db.objectStoreNames.contains('settings')) {
					db.createObjectStore('settings');
				}
			}
		});
	}

	return dbPromise;
};
