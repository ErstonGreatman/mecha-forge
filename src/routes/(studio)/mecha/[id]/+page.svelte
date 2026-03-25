<script lang="ts">
	import { t } from 'svelte-i18n';
	import { appState } from '$lib/states/app-state.svelte';
	import { resolve } from '$app/paths';
	import { Button } from '@/components/shadcn/button';
</script>

{#if !appState.mecha}
	<div>
		<p>{$t('mecha.no_mecha_found')}</p>
		<Button href={resolve('/mecha/create')} class="my-8 w-48">{$t('mecha.create_new_mecha')}</Button>
	</div>
{:else}
	<h1 class="text-4xl">{appState.mecha.core.name}</h1>
{/if}
