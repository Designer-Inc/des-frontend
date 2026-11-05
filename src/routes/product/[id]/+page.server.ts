import { error } from '@sveltejs/kit';
import { apiFetch } from '#lib/server/api';
import type { Product } from '#lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const response = await apiFetch(event, `/products/${event.params.id}`);

	if (response.status === 404) {
		throw error(404, 'Товар не знайдено');
	}

	if (!response.ok) {
		throw error(502, 'Товар тимчасово недоступний');
	}

	const product = (await response.json()) as Product;

	event.setHeaders({ 'cache-control': 'public, max-age=120, s-maxage=600' });

	return {
		product,
		canonical: new URL(`/product/${product.id}`, event.url).href
	};
};
