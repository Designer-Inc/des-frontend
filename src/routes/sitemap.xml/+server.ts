import { apiFetch } from '#lib/server/api';
import type { ProductList } from '#lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	let products: ProductList['items'] = [];

	try {
		const response = await apiFetch(event, '/products?limit=100');
		if (response.ok) {
			products = ((await response.json()) as ProductList).items;
		}
	} catch {
		// Sitemap still works for static routes if the API is unavailable.
	}

	const paths = ['/', '/catalog', ...products.map((product) => `/product/${product.id}`)];
	const urls = paths
		.map((path) => `  <url><loc>${new URL(path, event.url.origin).href}</loc></url>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
