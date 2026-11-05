<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-paper text-ink antialiased">
	<header class="border-b border-ink/10 bg-paper/90 backdrop-blur">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
			<a href="/" class="text-lg font-bold tracking-tight">Дизайнер</a>
			<nav class="flex items-center gap-5 text-sm" aria-label="Головна навігація">
				<a href="/catalog" class="hover:underline">Каталог</a>
				<a href="/editor" class="hover:underline">Редактор</a>
				<a href="/login" class="rounded-full bg-ink px-4 py-2 text-paper hover:opacity-85">Увійти</a>
			</nav>
		</div>
	</header>

	<main class="mx-auto max-w-6xl px-4 py-10">
		{@render children()}
	</main>

	<footer class="mt-16 border-t border-ink/10 px-4 py-8 text-sm text-ink/60">
		<div class="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:justify-between">
			<span>Дизайнер — кастомний друк на одязі, посуді та декорі.</span>
			<span>© {new Date().getFullYear()}</span>
		</div>
	</footer>
</div>
