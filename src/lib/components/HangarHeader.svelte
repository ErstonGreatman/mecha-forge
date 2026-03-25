<script lang="ts">
	import { t } from 'svelte-i18n';
	import { appState } from '$lib/states/app-state.svelte';
	import { Save, SquareArrowRightExit, X } from '@lucide/svelte'
	import { Button } from '@/components/shadcn/button';

	const onCloseHangar = () => {
		appState.hangar = undefined;
	};
</script>

<div class="flex justify-between w-full px-4 py-2">
	<h1 class="text-4xl">{appState.hangar?.core.name}</h1>

	<div class="flex items-center gap-4">
		<Button title={$t('terms.save')}><Save /></Button>
		<Button variant="secondary" title={$t('terms.export')}><SquareArrowRightExit /></Button>
		<Button variant="secondary" title={$t('terms.close')} onclick={onCloseHangar}><X /></Button>
	</div>
</div>
