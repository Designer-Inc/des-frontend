import { get, writable } from 'svelte/store';
import type { LoginResponse, User } from '#lib/types';

export const accessToken = writable<string | null>(null);
export const currentUser = writable<User | null>(null);

export function setSession(data: LoginResponse): void {
	accessToken.set(data.accessToken);
	currentUser.set(data.user);
}

export function clearSession(): void {
	accessToken.set(null);
	currentUser.set(null);
}

async function loadMe(token: string): Promise<User | null> {
	const response = await fetch('/api/auth/me', {
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!response.ok) return null;
	return (await response.json()) as User;
}

export async function refreshSession(): Promise<boolean> {
	const response = await fetch('/api/auth/refresh', {
		method: 'POST',
		credentials: 'include',
		headers: { 'content-type': 'application/json' },
		body: '{}'
	});

	if (!response.ok) {
		clearSession();
		return false;
	}

	const data = (await response.json()) as { accessToken: string };
	const user = await loadMe(data.accessToken);

	if (!user) {
		clearSession();
		return false;
	}

	accessToken.set(data.accessToken);
	currentUser.set(user);
	return true;
}

export async function logout(): Promise<void> {
	const token = get(accessToken);

	await fetch('/api/auth/logout', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'content-type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		},
		body: '{}'
	});

	clearSession();
}
