import { getRecentMecha } from './recent-mecha.ts';
import { loadDraft } from './drafts.svelte.ts';
import type { MechaProject } from '$lib/types/storage';

const canReadHandle = async (handle: FileSystemFileHandle) => {
	const permission = await handle.queryPermission({ mode: 'read' });
	if (permission === 'granted') return true;

	const requested = await handle.requestPermission({ mode: 'read' });
	return requested === 'granted';
};

export const reopenRecentMecha = async (
	mechaId: string
): Promise<
	| { source: 'file'; mecha: MechaProject; fileHandle: FileSystemFileHandle }
	| { source: 'draft'; mecha: MechaProject }
	| { source: 'missing' }
> => {
	const recent = await getRecentMecha(mechaId);

	if (!recent) {
		return { source: 'missing' };
	}

	if (recent.fileHandle) {
		const allowed = await canReadHandle(recent.fileHandle);

		if (allowed) {
			const file = await recent.fileHandle.getFile();
			const text = await file.text();
			const mecha = JSON.parse(text) as MechaProject;

			return {
				source: 'file',
				mecha,
				fileHandle: recent.fileHandle
			};
		}
	}

	const draft = await loadDraft(mechaId);

	if (draft) {
		return {
			source: 'draft',
			mecha: draft.data
		};
	}

	return { source: 'missing' };
};
