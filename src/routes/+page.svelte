<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { listRecentMecha } from '$lib/storage/recent-mecha';
	import { reopenRecentMecha } from '$lib/storage/reopen';
	import { Button } from '@/components/shadcn/button';
	import { resolve } from '$app/paths';

	let recentMechas = $state([]);

	onMount(async () => {
		recentMechas = await listRecentMecha();
	});

	const openRecent = async (mechaId: string) => {
		const result = await reopenRecentMecha(mechaId);

		if (result.source === 'file') {
			console.log('Opened from file', result.mecha);
		} else if (result.source === 'draft') {
			console.log('Opened from draft', result.mecha);
		} else {
			console.log('Mecha could not be reopened');
		}
	};
</script>

<div class="flex flex-col mx-auto my-6 justify-between max-w-4xl">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Home</h1>

	<p>{$t('welcome', { values: { title: $t('title') }})}</p>

	<Button href={resolve('/mecha/create')} class="my-8 w-48">{$t('mecha.create_new_mecha')}</Button>

	<h2 class="scroll-m-20 border-b pb-2 my-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
		{$t('mecha.recent_mechas')}
	</h2>
	{#if recentMechas.length === 0 }
		<p><em>{$t('mecha.no_recent_mechas')}</em></p>
	{:else}
		<ul>
			{#each recentMechas as mecha (mecha.mechaId)}
				<li>
					<button onclick={() => openRecent(mecha.mechaId)}>
						{mecha.name}
					</button>
					<small>
						{mecha.hasDraft ? 'Draft available' : 'Saved file'}
					</small>
				</li>
			{/each}
		</ul>
	{/if}
</div>