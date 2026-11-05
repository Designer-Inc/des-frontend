<script lang="ts">
	import { formatPrice } from '#lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Каталог — Дизайнер</title>
	<meta
		name="description"
		content="Футболки, худі, чашки, постери та екосумки для кастомного друку. Оберіть товар і створіть дизайн."
	/>
	<link rel="canonical" href={data.canonical} />
</svelte:head>

<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
	<div>
		<p class="text-sm uppercase tracking-[0.2em] text-ink/50">Каталог</p>
		<h1 class="mt-2 text-4xl font-bold">Товари для друку</h1>
	</div>
	<p class="text-sm text-ink/60">Знайдено: {data.products.total}</p>
</div>

<form method="GET" action="/catalog" class="mt-8 grid gap-3 rounded-2xl border border-ink/10 bg-white p-4 sm:grid-cols-[1fr_220px_auto]">
	<label class="sr-only" for="q">Пошук</label>
	<input
		id="q"
		name="q"
		value={data.q}
		placeholder="Пошук товару"
		class="rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-ink"
	/>

	<label class="sr-only" for="categoryId">Категорія</label>
	<select
		id="categoryId"
		name="categoryId"
		class="rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-ink"
	>
		<option value="" selected={!data.categoryId}>Усі категорії</option>
		{#each data.categories as category (category.id)}
			<option value={category.id} selected={data.categoryId === category.id}>
				{category.name}
			</option>
		{/each}
	</select>

	<button type="submit" class="rounded-xl bg-ink px-6 py-3 text-paper hover:opacity-85">
		Знайти
	</button>
</form>

{#if data.products.items.length}
	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.products.items as product (product.id)}
			<a
				href={`/product/${product.id}`}
				class="group rounded-2xl border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink/30"
			>
				<div class="flex aspect-square items-center justify-center rounded-xl bg-paper text-4xl text-ink/20">
					{product.name.slice(0, 1)}
				</div>
				<p class="mt-4 text-xs uppercase tracking-wide text-ink/45">
					{product.category?.name ?? 'Товар'}
				</p>
				<h2 class="mt-1 font-semibold group-hover:underline">{product.name}</h2>
				<p class="mt-2 font-bold">{formatPrice(product.basePriceMinor, product.currency)}</p>
			</a>
		{/each}
	</div>
{:else}
	<div class="mt-10 rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/60">
		За цим запитом нічого не знайдено.
	</div>
{/if}
