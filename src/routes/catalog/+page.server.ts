import { error } from '@sveltejs/kit';
import { apiFetch } from '#lib/server/api';
import type { CategoryList, ProductList } from '#lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const q = event.url.searchParams.get('q')?.trim() ?? '';
	const categoryId = event.url.searchParams.get('categoryId')?.trim() ?? '';

	const productParams = new URLSearchParams({ limit: '24' });
	if (q) productParams.set('q', q);
	if (categoryId) productParams.set('categoryId', categoryId);

	const [categoriesResponse, productsResponse] = await Promise.all([
		apiFetch(event, '/categories'),
		apiFetch(event, `/products?${productParams.toString()}`)
	]);

	if (!categoriesResponse.ok || !productsResponse.ok) {
		throw error(502, 'Каталог тимчасово недоступний');
	}

	const [categories, products] = await Promise.all([
		categoriesResponse.json() as Promise<CategoryList>,
		productsResponse.json() as Promise<ProductList>
	]);

	event.setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300' });

	return {
		categories: categories.items,
		products,
		q,
		categoryId,
		canonical: new URL('/catalog', event.url).href
	};
};
