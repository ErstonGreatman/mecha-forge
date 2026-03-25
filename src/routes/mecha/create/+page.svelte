<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Button } from '@/components/shadcn/button';
	import { Input } from '@/components/shadcn/input';
	import { createMechaProject } from './helper.ts';
</script>

<div class="flex flex-col mx-auto my-6 justify-between max-w-4xl">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{$t('mecha.create_new_mecha')}</h1>

	<form onsubmit={createMechaProject}>
		<Input
			type="text"
			name="name"
			placeholder={$t('core.name')}
		/>

		<Button type="submit">{$t('terms.create')}</Button>
	</form>
</div>
