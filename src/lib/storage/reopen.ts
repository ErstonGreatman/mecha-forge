import { getRecentHangar } from './recent-hangar.ts';
import { loadDraft } from './drafts.svelte.ts';
import type { Hangar } from '$lib/types/storage';

const canReadHandle = async (handle: FileSystemFileHandle) => {
	const permission = await handle.queryPermission({ mode: 'read' });
	if (permission === 'granted') return true;

	const requested = await handle.requestPermission({ mode: 'read' });
	return requested === 'granted';
};

export const reopenRecentHangar = async (
	hangarId: string
): Promise<
	| { source: 'file'; hangar: Hangar; fileHandle: FileSystemFileHandle }
	| { source: 'draft'; hangar: Hangar }
	| { source: 'missing' }
> => {
	const recent = await getRecentHangar(hangarId);

	if (!recent) {
		return { source: 'missing' };
	}

	if (recent.fileHandle) {
		const allowed = await canReadHandle(recent.fileHandle);

		if (allowed) {
			const file = await recent.fileHandle.getFile();
			const text = await file.text();
			const hangar = JSON.parse(text) as Hangar;

			return {
				source: 'file',
				hangar,
				fileHandle: recent.fileHandle
			};
		}
	}

	const draft = await loadDraft(hangarId);

	if (draft) {
		return {
			source: 'draft',
			hangar: draft.data
		};
	}

	return { source: 'missing' };
};
