<script lang="ts">
	import { Search, X } from 'lucide-svelte';

	let {
		value = $bindable(''),
		placeholder = 'Buscar...',
		onSearch,
	}: {
		value?: string;
		placeholder?: string;
		onSearch?: (value: string) => void;
	} = $props();

	function clear() {
		value = '';
		onSearch?.('');
	}
</script>

<div class="relative">
	<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
	<input
		type="text"
		id="search-input"
		name="search"
		bind:value
		{placeholder}
		oninput={() => onSearch?.(value)}
		class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
	/>
	{#if value}
		<button
			type="button"
			onclick={clear}
			aria-label="Clear search"
			class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
		>
			<X class="w-4 h-4 text-slate-400" />
		</button>
	{/if}
</div>