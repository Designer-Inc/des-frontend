import { error } from '@sveltejs/kit';
import { apiFetch } from '#lib/server/api';
import type { CategoryList, ProductList } from '#lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const [categoriesResponse, productsResponse] = await Promise.all([
		apiFetch(event, '/categories'),
		apiFetch(event, '/products?limit=4')
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
		products: products.items,
		canonical: new URL('/', event.url).href
	};
};
