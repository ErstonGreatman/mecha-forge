import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { DraftMechaRecord, RecentMechaRecord, AppSettingRecord } from '$lib/types/storage';

interface MechaStudioDB extends DBSchema {
	drafts: {
		key: string; // mechaId
		value: DraftMechaRecord;
	};
	recentMecha: {
		key: string; // mechaId
		value: RecentMechaRecord;
	};
	settings: {
		key: string; // setting key
		value: AppSettingRecord;
	};
}

let dbPromise: Promise<IDBPDatabase<MechaStudioDB>> | null = null;

export const getDb = () => {
	if (!dbPromise) {
		dbPromise = openDB<MechaStudioDB>('mecha-studio', 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains('drafts')) {
					db.createObjectStore('drafts');
				}

				if (!db.objectStoreNames.contains('recentMecha')) {
					db.createObjectStore('recentMecha');
				}

				if (!db.objectStoreNames.contains('settings')) {
					db.createObjectStore('settings');
				}
			}
		});
	}

	return dbPromise;
};
