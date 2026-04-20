<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { themeStore } from '$lib/stores/theme.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
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

{#key $page.url.pathname}
	<div
		in:fly={{ y: 10, duration, delay, easing: cubicOut }}
	>
		{@render children()}
	</div>
{/key}

<Toast />