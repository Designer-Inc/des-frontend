<script lang="ts">
	import { formatPrice } from '#lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const description = $derived(
		data.product.description ??
			`${data.product.name} для кастомного друку. Оберіть варіант і створіть дизайн.`
	);

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: data.product.name,
			description,
			category: data.product.category?.name,
			offers: {
				'@type': 'Offer',
				price: (data.product.basePriceMinor / 100).toFixed(2),
				priceCurrency: data.product.currency,
				availability: data.product.variants.some((variant) => variant.stockQuantity > 0)
					? 'https://schema.org/InStock'
					: 'https://schema.org/OutOfStock'
			}
		}).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{data.product.name} — Дизайнер</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={data.canonical} />
</svelte:head>

<nav class="text-sm text-ink/55" aria-label="Хлібні крихти">
	<a href="/catalog" class="hover:underline">Каталог</a>
	{#if data.product.category}
		<span>/</span>
		<a href={`/catalog?categoryId=${data.product.category.id}`} class="hover:underline">
			{data.product.category.name}
		</a>
	{/if}
	<span>/</span>
	<span>{data.product.name}</span>
</nav>

<div class="mt-6 grid gap-10 lg:grid-cols-2">
	<div>
		<div class="flex aspect-square items-center justify-center rounded-3xl bg-white text-8xl text-ink/15">
			{data.product.name.slice(0, 1)}
		</div>
		{#if data.product.images.length}
			<div class="mt-3 grid grid-cols-4 gap-3">
				{#each data.product.images as image (image.id)}
					<img src={image.url} alt={image.alt ?? data.product.name} class="rounded-xl" />
				{/each}
			</div>
		{/if}
	</div>

	<div>
		<p class="text-sm uppercase tracking-[0.2em] text-ink/50">
			{data.product.category?.name ?? 'Товар'}
		</p>
		<h1 class="mt-2 text-4xl font-bold">{data.product.name}</h1>
		<p class="mt-4 text-3xl font-bold">
			{formatPrice(data.product.basePriceMinor, data.product.currency)}
		</p>
		<p class="mt-4 text-ink/70">{description}</p>

		<div class="mt-6 flex flex-wrap gap-3">
			<a href="/editor" class="rounded-full bg-ink px-6 py-3 text-paper hover:opacity-85">
				Створити дизайн
			</a>
			<a
				href="/catalog"
				class="rounded-full border border-ink px-6 py-3 hover:bg-ink hover:text-paper"
			>
				Інші товари
			</a>
		</div>

		{#if data.product.variants.length}
			<section class="mt-8">
				<h2 class="text-lg font-semibold">Варіанти</h2>
				<ul class="mt-3 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
					{#each data.product.variants as variant (variant.id)}
						<li class="flex items-center justify-between gap-4 px-4 py-3 text-sm">
							<span class="flex items-center gap-3">
								<span
									class="inline-block size-4 rounded-full border border-ink/20"
									style={`background:${variant.colorHex}`}
								></span>
								{variant.colorName} · {variant.size}
							</span>
							<span class:text-red-600={variant.stockQuantity === 0} class="text-ink/60">
								{variant.stockQuantity > 0 ? `${variant.stockQuantity} шт.` : 'Немає'}
							</span>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if data.product.printAreas.length}
			<section class="mt-8">
				<h2 class="text-lg font-semibold">Зони друку</h2>
				<ul class="mt-3 grid gap-3 sm:grid-cols-2">
					{#each data.product.printAreas as area (area.id)}
						<li class="rounded-2xl border border-ink/10 bg-white p-4 text-sm">
							<p class="font-medium">{area.name}</p>
							<p class="mt-1 text-ink/60">
								{area.widthMm} × {area.heightMm} мм · мін. {area.minDpi} DPI
							</p>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
</div>

{@html `<script type="application/ld+json">${jsonLd}</script>`}
