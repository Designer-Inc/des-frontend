<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>des-frontend</title>
</svelte:head>

<main>
	<h1>des-frontend</h1>
	<pre>{JSON.stringify(data.health, null, 2)}</pre>
</main>
