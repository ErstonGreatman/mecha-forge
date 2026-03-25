<script lang="ts">
	import { t } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import Logo from '$lib/assets/logo.svg';
</script>

<header class="border-b border-zinc-800">
	<div class="flex h-12 items-center justify-between px-4">
		<a href={resolve('/')} class="font-semibold">
			<img src={Logo} alt={$t('title')} class="min-w-64 h-full" />
		</a>
	</div>
</header>
