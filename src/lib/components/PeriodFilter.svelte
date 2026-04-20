<script lang="ts">
	import type { TimePeriod } from '$lib/data/mockData';
	import { getTranslations } from '$lib/i18n';

	let { period = $bindable<TimePeriod>('30d'), onChange } = $props();

	const t = getTranslations();

	const periods = [
		{ value: '7d' as TimePeriod, label: () => t.period.last7days },
		{ value: '30d' as TimePeriod, label: () => t.period.last30days },
		{ value: '3m' as TimePeriod, label: () => t.period.last3months },
	];
</script>

<div class="flex items-center gap-2">
	<select
		id="period-filter"
		name="period"
		bind:value={period}
		onchange={() => onChange?.(period)}
		class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
	>
		{#each periods as p}
			<option value={p.value}>{p.label()}</option>
		{/each}
	</select>
</div>