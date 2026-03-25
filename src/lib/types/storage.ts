import type { CoreSchematic } from '$lib/types/core';

export type MechaProject = {
	core: CoreSchematic;
	systems: Array<{
		id: string;
		systemId: string;
		label: string;
		data: unknown;
	}>;
};

export type DraftMechaRecord = {
	mechaId: string;
	updatedAt: string;
	data: MechaProject;
};

export type RecentMechaRecord = {
	mechaId: string;
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
