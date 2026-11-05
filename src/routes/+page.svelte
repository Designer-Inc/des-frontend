<script lang="ts">
	import { formatPrice } from '#lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Дизайнер — кастомний друк на одязі, посуді та декорі</title>
	<meta
		name="description"
		content="Створіть власний дизайн, оберіть товар і ми надрукуємо його. Футболки, худі, чашки, постери та екосумки."
	/>
	<link rel="canonical" href={data.canonical} />
</svelte:head>

<section class="grid gap-8 border-b border-ink/10 pb-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
	<div>
		<p class="text-sm uppercase tracking-[0.2em] text-ink/50">Друкуємо ваші ідеї</p>
		<h1 class="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
			Ваш дизайн. Ваш товар. Ваш друк.
		</h1>
		<p class="mt-5 max-w-2xl text-lg text-ink/70">
			Оберіть футболку, худі, чашку чи постер, додайте текст або зображення та оформіть
			замовлення за кілька хвилин.
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/catalog" class="rounded-full bg-ink px-6 py-3 text-paper hover:opacity-85">
				До каталогу
			</a>
			<a href="/editor" class="rounded-full border border-ink px-6 py-3 hover:bg-ink hover:text-paper">
				Відкрити редактор
			</a>
		</div>
	</div>
	<div class="rounded-3xl bg-ink p-6 text-paper">
		<p class="text-sm text-paper/60">Демо-каталог</p>
		<p class="mt-2 text-4xl font-bold">{data.products.length} товарів</p>
		<p class="mt-2 text-sm text-paper/70">
			{data.categories.map((category) => category.name).join(' · ')}
		</p>
	</div>
</section>

{#if data.categories.length}
	<section class="py-10">
		<h2 class="text-2xl font-bold">Категорії</h2>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each data.categories as category (category.id)}
				<a
					href={`/catalog?categoryId=${category.id}`}
					class="rounded-full border border-ink/20 px-4 py-2 text-sm hover:border-ink"
				>
					{category.name}
				</a>
			{/each}
		</div>
	</section>
{/if}

<section class="py-6">
	<div class="flex items-end justify-between gap-4">
		<h2 class="text-2xl font-bold">Популярне</h2>
		<a href="/catalog" class="text-sm underline">Усі товари</a>
	</div>
	<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each data.products as product (product.id)}
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
				<h3 class="mt-1 font-semibold group-hover:underline">{product.name}</h3>
				<p class="mt-2 font-bold">{formatPrice(product.basePriceMinor, product.currency)}</p>
			</a>
		{/each}
	</div>
</section>
