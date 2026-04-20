<script lang="ts">
	import { TrendingUp, TrendingDown, Minus } from 'lucide-svelte';

	let {
		title,
		value,
		change,
		format = 'number',
		color = 'sky',
	}: {
		title: string;
		value: number;
		change: number;
		format?: 'number' | 'percent' | 'position';
		color?: 'sky' | 'emerald' | 'violet' | 'amber';
	} = $props();

	const isPositive = $derived(change > 0);
	const isNegative = $derived(change < 0);

	const colorMap = {
		sky: { bg: 'from-sky-500/10 to-sky-500/5', text: 'text-sky-600 dark:text-sky-400', accent: 'sky' },
		emerald: { bg: 'from-emerald-500/10 to-emerald-500/5', text: 'text-emerald-600 dark:text-emerald-400', accent: 'emerald' },
		violet: { bg: 'from-violet-500/10 to-violet-500/5', text: 'text-violet-600 dark:text-violet-400', accent: 'violet' },
		amber: { bg: 'from-amber-500/10 to-amber-500/5', text: 'text-amber-600 dark:text-amber-400', accent: 'amber' },
	};

	const colors = $derived(colorMap[color]);

	function formatValue(val: number, fmt: string): string {
		switch (fmt) {
			case 'percent':
				return `${val.toFixed(1)}%`;
			case 'position':
				return `#${val.toFixed(1)}`;
			default:
				return val.toLocaleString();
		}
	}
</script>

<div class="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-xl hover:shadow-{colors.accent}-500/10 transition-all duration-300">
	<div class="absolute inset-0 bg-gradient-to-br {colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
	<div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-{colors.accent}-500/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
	
	<div class="relative">
		<p class="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
		<p class="mt-2 text-3xl font-bold {colors.text}">
			{formatValue(value, format)}
		</p>
		<div class="mt-3 flex items-center gap-2">
			{#if isPositive}
				<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
					<TrendingUp class="w-3 h-3" />
					+{change.toFixed(1)}%
				</span>
			{:else if isNegative}
				<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400">
					<TrendingDown class="w-3 h-3" />
					{change.toFixed(1)}%
				</span>
			{:else}
				<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-500">
					<Minus class="w-3 h-3" />
					0%
				</span>
			{/if}
			<span class="text-xs text-slate-400 dark:text-slate-500">vs período anterior</span>
		</div>
	</div>
</div>