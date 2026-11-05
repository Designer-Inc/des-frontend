<script lang="ts">
	import { onMount } from 'svelte';
	import type { Canvas as FabricCanvas } from 'fabric';

	let canvasEl: HTMLCanvasElement;
	let errorMessage = $state('');
	let ready = $state(false);

	onMount(() => {
		let canvas: FabricCanvas | undefined;
		let disposed = false;

		import('fabric')
			.then(({ Canvas, Rect, Textbox }) => {
				if (disposed) return;

				canvas = new Canvas(canvasEl, {
					width: 640,
					height: 420,
					backgroundColor: '#ffffff'
				});

				canvas.add(
					new Rect({
						left: 40,
						top: 40,
						width: 180,
						height: 120,
						fill: '#f2b705',
						rx: 16,
						ry: 16
					})
				);
				canvas.add(
					new Textbox('Ваш текст', {
						left: 40,
						top: 220,
						width: 520,
						fontSize: 40,
						fontFamily: 'Inter',
						fill: '#111111'
					})
				);
				canvas.renderAll();
				ready = true;
			})
			.catch((error: unknown) => {
				errorMessage = error instanceof Error ? error.message : 'Не вдалося завантажити Fabric.js';
			});

		return () => {
			disposed = true;
			canvas?.dispose();
		};
	});
</script>

<svelte:head>
	<title>Редактор — Дизайнер</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
	<div>
		<p class="text-sm uppercase tracking-[0.2em] text-ink/50">Редактор</p>
		<h1 class="mt-2 text-4xl font-bold">Створіть дизайн</h1>
	</div>
	<p class="text-sm text-ink/60">Каркас на Fabric.js 6. Інструменти додамо наступним кроком.</p>
</div>

<div class="mt-8 grid gap-4 lg:grid-cols-[1fr_260px]">
	<div class="overflow-hidden rounded-3xl border border-ink/10 bg-white p-4">
		<canvas bind:this={canvasEl} class="mx-auto max-w-full"></canvas>
		{#if errorMessage}
			<p class="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>
		{:else if !ready}
			<p class="mt-4 text-sm text-ink/50">Завантаження полотна…</p>
		{/if}
	</div>

	<aside class="rounded-3xl border border-ink/10 bg-white p-5">
		<h2 class="font-semibold">Інструменти</h2>
		<div class="mt-4 grid gap-2 text-sm">
			<button class="rounded-xl border border-ink/15 px-4 py-3 text-left opacity-60" disabled>
				Текст
			</button>
			<button class="rounded-xl border border-ink/15 px-4 py-3 text-left opacity-60" disabled>
				Зображення
			</button>
			<button class="rounded-xl border border-ink/15 px-4 py-3 text-left opacity-60" disabled>
				Кольори
			</button>
			<button class="rounded-xl border border-ink/15 px-4 py-3 text-left opacity-60" disabled>
				Шрифти
			</button>
		</div>
		<p class="mt-5 text-xs leading-relaxed text-ink/50">
			Демо-полотно показує інтеграцію Fabric.js. Повний редактор буде окремим етапом.
		</p>
	</aside>
</div>
