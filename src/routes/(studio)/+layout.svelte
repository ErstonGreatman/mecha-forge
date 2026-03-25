<script lang="ts">
	import * as Resizable from '$lib/components/shadcn/resizable';

	let { children } = $props();
</script>

<Resizable.PaneGroup direction="horizontal" class="max-w-full h-full border">
	<Resizable.Pane defaultSize={25} class="overflow-auto">
		Sidebar
	</Resizable.Pane>

	<Resizable.Handle />

	<Resizable.PaneGroup direction="vertical" class="overflow-auto">
		<Resizable.Pane defaultSize={75} class="overflow-auto">
			<main>
				{@render children()}
			</main>
		</Resizable.Pane>

		<Resizable.Handle />

		<Resizable.Pane defaultSize={25} class="col-start-2 col-end-4 overflow-auto">
			Validation / Output
		</Resizable.Pane>
	</Resizable.PaneGroup>

	<Resizable.Handle />

	<Resizable.Pane defaultSize={25} class="overflow-auto">
		Inspector
	</Resizable.Pane>
</Resizable.PaneGroup>