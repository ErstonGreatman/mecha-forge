import type { CoreSchematic } from '$lib/types/core';

export type Hangar = {
	core: CoreSchematic;
	systems: Array<{
		id: string;
		systemId: string;
		label: string;
		data: unknown;
	}>;
};

export type DraftHangarRecord = {
	hangarId: string;
	updatedAt: string;
	data: Hangar;
};

export type RecentHangarRecord = {
	hangarId: string;
	name: string;
	lastOpenedAt: string;
	systemIds: string[];
	hasDraft: boolean;
	lastSaveSource: 'file' | 'draft';
	// Optional, only if browser supports File System Access API
	fileHandle?: FileSystemFileHandle;
};

export type AppSettingRecord = {
	key: string;
	value: unknown;
};
