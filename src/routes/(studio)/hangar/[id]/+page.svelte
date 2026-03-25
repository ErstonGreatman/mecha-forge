<script lang="ts">
	import { t } from 'svelte-i18n';
	import { appState } from '$lib/states/app-state.svelte';
	import { resolve } from '$app/paths';
	import { Button } from '@/components/shadcn/button';
</script>

{#if !appState.hangar}
	<div>
		<p>{$t('hangar.no_hangars_found')}</p>
		<Button href={resolve('/hangar/create')} class="my-8 w-48">{$t('hangar.create_new_hangar')}</Button>
	</div>
{:else}
	<h2 class="text-3xl">Placeholder</h2>
{/if}
