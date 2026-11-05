<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, logout, refreshSession, setSession } from '#lib/stores/auth';
	import type { LoginResponse } from '#lib/types';

	let email = $state('customer@demo.dyzainer.ua');
	let password = $state('');
	let message = $state('');
	let busy = $state(false);

	onMount(() => {
		void refreshSession();
	});

	async function submit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		busy = true;
		message = '';

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const payload = (await response.json().catch(() => null)) as
				| (LoginResponse & { error?: { message?: string } })
				| null;

			if (!response.ok || !payload?.accessToken) {
				message = payload?.error?.message ?? 'Не вдалося увійти';
				return;
			}

			setSession(payload);
			password = '';
			message = `Вітаємо, ${payload.user.fullName}`;
		} finally {
			busy = false;
		}
	}

	async function signOut(): Promise<void> {
		await logout();
		message = 'Сесію завершено';
	}
</script>

<svelte:head>
	<title>Вхід — Дизайнер</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto max-w-md">
	<p class="text-sm uppercase tracking-[0.2em] text-ink/50">Акаунт</p>
	<h1 class="mt-2 text-4xl font-bold">Вхід</h1>

	{#if $currentUser}
		<div class="mt-6 rounded-2xl border border-ink/10 bg-white p-6">
			<p class="text-sm text-ink/50">Ви увійшли як</p>
			<p class="mt-1 text-xl font-semibold">{$currentUser.fullName}</p>
			<p class="text-ink/60">{$currentUser.email}</p>
			<p class="mt-3 text-sm text-ink/60">
				Роль: <span class="font-medium text-ink">{$currentUser.role}</span> · permissions:
				{$currentUser.permissions.length}
			</p>
			<button
				type="button"
				onclick={signOut}
				class="mt-5 rounded-full border border-ink px-5 py-2 text-sm hover:bg-ink hover:text-paper"
			>
				Вийти
			</button>
		</div>
	{:else}
		<form onsubmit={submit} class="mt-6 grid gap-4 rounded-2xl border border-ink/10 bg-white p-6">
			<label class="grid gap-1 text-sm">
				<span class="font-medium">Email</span>
				<input
					type="email"
					bind:value={email}
					required
					autocomplete="email"
					class="rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-ink"
				/>
			</label>
			<label class="grid gap-1 text-sm">
				<span class="font-medium">Пароль</span>
				<input
					type="password"
					bind:value={password}
					required
					autocomplete="current-password"
					class="rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-ink"
				/>
			</label>
			<button
				type="submit"
				disabled={busy}
				class="rounded-xl bg-ink px-5 py-3 text-paper hover:opacity-85 disabled:opacity-50"
			>
				{busy ? 'Входимо…' : 'Увійти'}
			</button>
			<p class="text-xs text-ink/50">
				Демо: customer@demo.dyzainer.ua / DemoPass123! (тільки для staging)
			</p>
			{#if message}
				<p class="rounded-xl bg-paper p-3 text-sm">{message}</p>
			{/if}
		</form>
	{/if}
</div>
