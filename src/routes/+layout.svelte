<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<a class="skip-link" href="#main">Перейти до вмісту</a>

{@render children()}

<style>
	.skip-link {
		position: absolute;
		left: -9999px;
	}

	.skip-link:focus {
		left: 1rem;
		top: 1rem;
		padding: 0.5rem 0.75rem;
		background: #ffffff;
		border: 2px solid #111111;
	}
</style>
