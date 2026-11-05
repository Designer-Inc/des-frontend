// See https://svelte.dev/docs/kit/types#app.d.ts
interface Fetcher {
	fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

declare global {
	namespace App {
		interface Platform {
			env: {
				API: Fetcher;
				ASSETS: Fetcher;
			};
		}
	}
}

export {};
