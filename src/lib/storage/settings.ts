import { getDb } from './db';

export const setSetting = async <T>(key: string, value: T) => {
	const db = await getDb();
	await db.put('settings', { key, value }, key);
};

export const getSetting = async <T>(key: string): Promise<T | undefined> => {
	const db = await getDb();
	const record = await db.get('settings', key);
	return record?.value as T | undefined;
};
