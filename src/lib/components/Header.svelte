<script lang="ts">
	import { t } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import { appState } from '$lib/states/app-state.svelte';
	import { Save, SquareArrowRightExit } from '@lucide/svelte'
	import { Button } from '@/components/shadcn/button';
	import Logo from '$lib/assets/logo.svg';
</script>

<header class="border-b border-zinc-800">
	<div class="flex h-12 items-center justify-between px-4">
		<a href={resolve('/')} class="font-semibold">
			<img src={Logo} alt={$t('title')} class="w-fullgit h-full" />
		</a>

		{#if appState.mecha}
			<div class="flex items-center gap-2">
				<Button variant="primary" title={$t('terms.save')}><Save /></Button>
				<Button variant="secondary" title={$t('terms.export')}><SquareArrowRightExit /></Button>
			</div>
		{/if}
	</div>
</header>
