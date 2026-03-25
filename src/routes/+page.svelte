<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { listRecentHangar } from '$lib/storage/recent-hangar';
	import { reopenRecentHangar } from '$lib/storage/reopen';
	import { Button } from '@/components/shadcn/button';
	import { resolve } from '$app/paths';
	import Banner from '$lib/assets/banner.svg';
	import type { RecentHangarRecord } from '@/types/storage';

	let recenthangars: RecentHangarRecord[] = $state([]);

	onMount(async () => {
		recenthangars = await listRecentHangar();
	});

	const openRecent = async (hangarId: string) => {
		const result = await reopenRecentHangar(hangarId);

		if (result.source === 'file') {
			console.log('Opened from file', result.hangar);
		} else if (result.source === 'draft') {
			console.log('Opened from draft', result.hangar);
		} else {
			console.log('hangar could not be reopened');
		}
	};

	const onOpenHangar = () => {};
</script>

<div class="flex flex-col mx-auto my-6 justify-between max-w-4xl">
	<img src={Banner} alt={$t('title')} class="w-full" />

	<h2 class="scroll-m-20 border-b pb-2 my-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
		{$t('terms.actions')}
	</h2>

	<div class="flex flex-wrap gap-8 mt-4 mb-8">
		<Button href={resolve('/hangar/create')} class="w-48">{$t('hangar.create_new_hangar')}</Button>
		<Button class="w-48" onclick={onOpenHangar}>{$t('hangar.open_hangar')}</Button>
	</div>

	<h2 class="scroll-m-20 border-b pb-2 my-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
		{$t('hangar.recent_hangars')}
	</h2>
	{#if recenthangars.length === 0 }
		<p><em>{$t('hangar.no_recent_hangars')}</em></p>
	{:else}
		<ul>
			{#each recenthangars as hangar (hangar.hangarId)}
				<li>
					<Button onclick={() => openRecent(hangar.hangarId)}>
						{hangar.name}
					</Button>
					<small>
						{hangar.hasDraft ? 'Draft available' : 'Saved file'}
					</small>
				</li>
			{/each}
		</ul>
	{/if}
</div>
