<script lang="ts">
	import { dashboardStore } from '$lib/stores/dashboard.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import PeriodFilter from '$lib/components/PeriodFilter.svelte';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import { TrendingUp, TrendingDown, Minus, ArrowUpDown, Download, Filter } from 'lucide-svelte';
	import { exportKeywords } from '$lib/utils/export';
	import { toastStore } from '$lib/stores/toast.svelte';
	import { getTranslations } from '$lib/i18n';

	const t = getTranslations();

	const { keywords, period } = $derived(dashboardStore);

	let searchQuery = $state('');
	let sortKey = $state<keyof typeof keywords[0]>('volume');
	let sortDir = $state<'asc' | 'desc'>('desc');
	let difficultyFilter = $state<'all' | 'easy' | 'medium' | 'hard'>('all');

	const filteredKeywords = $derived.by(() => {
		let result = [...keywords];

		if (searchQuery) {
			const q = searchQuery.toLowerCase();
			result = result.filter(k => k.keyword.toLowerCase().includes(q));
		}

		switch (difficultyFilter) {
			case 'easy':
				result = result.filter(k => k.difficulty < 30);
				break;
			case 'medium':
				result = result.filter(k => k.difficulty >= 30 && k.difficulty < 60);
				break;
			case 'hard':
				result = result.filter(k => k.difficulty >= 60);
				break;
		}

		result.sort((a, b) => {
			const aVal = a[sortKey];
			const bVal = b[sortKey];
			if (typeof aVal === 'number' && typeof bVal === 'number') {
				return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
			}
			return 0;
		});

		return result;
	});

	function handlePeriodChange(newPeriod: typeof period) {
		dashboardStore.period = newPeriod;
		dashboardStore.regenerate();
	}

	function toggleSort(key: keyof typeof keywords[0]) {
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = 'desc';
		}
	}

	function getTrendIcon(trend: string) {
		switch (trend) {
			case 'up':
				return { icon: TrendingUp, class: 'text-emerald-500' };
			case 'down':
				return { icon: TrendingDown, class: 'text-rose-500' };
			default:
				return { icon: Minus, class: 'text-slate-400' };
		}
	}

	function getDifficultyClass(kd: number) {
		if (kd < 30) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950';
		if (kd < 60) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
		return 'text-rose-600 bg-rose-50 dark:bg-rose-950';
	}

	function handleExport() {
		exportKeywords(keywords);
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<Sidebar />

	<main class="ml-64 p-8">
		<header class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-bold text-slate-900 dark:text-white">Keywords</h1>
				<p class="text-sm text-slate-500 dark:text-slate-400">
					{filteredKeywords.length} {t.keywords.of} {keywords.length} {t.keywords.keyword?.toLowerCase()}
				</p>
			</div>
			<div class="flex items-center gap-3">
				<button
					onclick={handleExport}
					class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-sky-500/25 transition-all"
				>
					<Download class="w-4 h-4" />
					{t.keywords.export}
				</button>
				<PeriodFilter period={period} onChange={handlePeriodChange} />
			</div>
		</header>

		<div class="flex items-center gap-4 mb-6">
			<div class="w-80">
				<SearchInput bind:value={searchQuery} placeholder={t.keywords.search} />
			</div>
			<div class="flex items-center gap-2">
				<Filter class="w-4 h-4 text-slate-400" />
				<select
					id="difficulty-filter"
					name="difficulty"
					bind:value={difficultyFilter}
					class="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
				>
						<option value="all">{t.keywords.allDifficulties}</option>
						<option value="easy">{t.keywords.easy} (&lt; 30)</option>
						<option value="medium">{t.keywords.medium} (30-60)</option>
						<option value="hard">{t.keywords.hard} (&gt; 60)</option>
				</select>
			</div>
		</div>

		<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="border-b border-slate-200 dark:border-slate-800">
							<th class="px-6 py-4 text-left">
								<button
									onclick={() => toggleSort('keyword')}
									class="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-200"
								>
									<ArrowUpDown class="w-3 h-3" />
									Keyword
								</button>
							</th>
							<th class="px-6 py-4 text-left">
								<button
									onclick={() => toggleSort('volume')}
									class="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-200"
								>
									{t.keywords.volume}
								</button>
							</th>
							<th class="px-6 py-4 text-left">
								<button
									onclick={() => toggleSort('difficulty')}
									class="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-200"
								>
									{t.keywords.difficulty}
								</button>
							</th>
							<th class="px-6 py-4 text-left">
								<button
									onclick={() => toggleSort('clicks')}
									class="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-200"
								>
									{t.keywords.clicks}
								</button>
							</th>
							<th class="px-6 py-4 text-left">
								<button
									onclick={() => toggleSort('ctr')}
									class="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-200"
								>
									CTR
								</button>
							</th>
							<th class="px-6 py-4 text-left">
								<button
									onclick={() => toggleSort('position')}
									class="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-200"
								>
									{t.keywords.position}
								</button>
							</th>
							<th class="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.keywords.trend}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-200 dark:divide-slate-800">
						{#each filteredKeywords as kw, i}
							{@const trend = getTrendIcon(kw.trend)}
							<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors" style="animation: fadeIn 0.3s ease-out {i * 0.02}s both;">
								<td class="px-6 py-4">
									<span class="font-medium text-slate-900 dark:text-white">{kw.keyword}</span>
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-300">{kw.volume.toLocaleString()}</td>
								<td class="px-6 py-4">
									<span class="px-2 py-1 rounded-full text-xs font-medium {getDifficultyClass(kw.difficulty)}">
										{kw.difficulty}
									</span>
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-300">{kw.clicks.toLocaleString()}</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-300">{kw.ctr.toFixed(1)}%</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-300">#{kw.position.toFixed(0)}</td>
								<td class="px-6 py-4">
									<trend.icon class="w-5 h-5 {trend.class}" />
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</main>
</div>

<style>
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>