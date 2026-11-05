import { apiProxy } from "#lib/server/api";
import type { RequestHandler } from "./$types";

const handler: RequestHandler = (event) => {
	const path = `/${event.params.path ?? ""}${event.url.search}`;
	return apiProxy(event, path);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;
