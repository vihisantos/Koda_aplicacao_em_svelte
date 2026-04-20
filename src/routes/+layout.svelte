<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { themeStore } from '$lib/stores/theme.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { children } = $props();

	onMount(() => {
		themeStore.applyTheme();
	});

	const duration = 200;
	const delay = 50;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SEO />

{#key $page.url.pathname}
	<div
		in:fly={{ y: 10, duration, delay, easing: cubicOut }}
		class="page-transition"
	>
		{@render children()}
	</div>
{/key}

<Toast />

<style>
	:global(.page-transition) {
		animation: pageEnter 0.3s ease-out;
	}

	@keyframes pageEnter {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>