<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>{$t('title')}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen grid grid-rows-[auto_1fr_auto] bg-zinc-950 text-zinc-100">
	<Header />

	{#key page.url.pathname}
		<main
			class="flex-1"
			out:fade={{ duration: 250 }}
			in:fade={{ duration: 250, delay: 250 }}
		>
			{@render children()}
		</main>
	{/key}

	<Footer />
</div>
