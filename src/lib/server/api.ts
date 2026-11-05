import type { RequestEvent } from "@sveltejs/kit";

const PROD_API = "https://api.designer.r0ma.top";
const DEV_API = "http://localhost:8787";

function apiOrigin(): string {
	return import.meta.env.DEV ? DEV_API : PROD_API;
}

export async function apiFetch(
	event: RequestEvent,
	path: string,
	init?: RequestInit
): Promise<Response> {
	const url = new URL(path.startsWith("/") ? path : `/${path}`, apiOrigin());
	const api = event.platform?.env?.API;

	if (!import.meta.env.DEV && api) {
		return api.fetch(new Request(url, init));
	}

	return fetch(new Request(url, init));
}

export async function apiProxy(event: RequestEvent, path: string): Promise<Response> {
	const url = new URL(path.startsWith("/") ? path : `/${path}`, apiOrigin());
	const api = event.platform?.env?.API;
	const method = event.request.method;
	const hasBody = method !== "GET" && method !== "HEAD";

	const headers = new Headers(event.request.headers);
	headers.delete("host");

	const init = {
		method,
		headers,
		redirect: "manual",
		...(hasBody ? { body: event.request.body, duplex: "half" } : {})
	} as RequestInit;

	const request = new Request(url, init);

	if (!import.meta.env.DEV && api) {
		return api.fetch(request);
	}

	return fetch(request);
}
