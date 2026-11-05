import { error } from '@sveltejs/kit';
import { apiFetch } from '#lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const response = await apiFetch(event, '/health');

	if (!response.ok) {
		throw error(502, 'API unavailable');
	}

	return {
		health: (await response.json()) as {
			status: string;
			version: string;
			checks: { database: string };
		}
	};
};
