<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Дизайнер</title>
</svelte:head>

<section class="mx-auto max-w-xl py-16 text-center">
	<p class="text-sm uppercase tracking-[0.2em] text-ink/50">Помилка {page.status}</p>
	<h1 class="mt-4 text-4xl font-bold">Щось пішло не так</h1>
	<p class="mt-4 text-ink/70">{page.error?.message ?? 'Спробуйте повернутися на головну.'}</p>
	<a href="/" class="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-paper">На головну</a>
</section>
