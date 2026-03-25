<script lang="ts">
	import { t } from 'svelte-i18n';
	import * as Resizable from '$lib/components/shadcn/resizable';
	import * as Empty from '$lib/components/shadcn/empty';
	import HangarHeader from '$lib/components/HangarHeader.svelte';
	import { appState } from '$lib/states/app-state.svelte';
	import { resolve } from '$app/paths';
	import { Button } from '@/components/shadcn/button';

	let { children } = $props();
</script>

<div class="flex flex-col w-full h-full">
	{#if !appState.hangar}
		<Empty.Root>
			<Empty.Title></Empty.Title>
			<Empty.Content>
				<p></p>
				<Button href={resolve('/hangar/create')} class="w-48">{$t('hangar.create_new_hangar')}</Button>
			</Empty.Content>
		</Empty.Root>
	{:else}
		<HangarHeader />

		<Resizable.PaneGroup direction="horizontal" class="w-full h-full border">
			<Resizable.Pane defaultSize={10} class="overflow-auto p-4">
				Sidebar
			</Resizable.Pane>

			<Resizable.Handle />

			<Resizable.Pane defaultSize={75} class="overflow-auto">
				<Resizable.PaneGroup direction="vertical">
					<Resizable.Pane defaultSize={75} class="overflow-auto p-4">
						<main>
							{@render children()}
						</main>
					</Resizable.Pane>

					<Resizable.Handle />

					<Resizable.Pane defaultSize={25} class="overflow-auto p-4">
						Validation / Output
					</Resizable.Pane>
				</Resizable.PaneGroup>
			</Resizable.Pane>

			<Resizable.Handle />

			<Resizable.Pane defaultSize={15} class="overflow-auto p-4">
				Inspector
			</Resizable.Pane>
		</Resizable.PaneGroup>
	{/if}
</div>
