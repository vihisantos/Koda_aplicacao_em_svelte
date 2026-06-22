<script lang="ts">
	import { dashboardStore } from '$lib/stores/dashboard.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import PeriodFilter from '$lib/components/PeriodFilter.svelte';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { Link2, ExternalLink, AlertCircle, CheckCircle } from 'lucide-svelte';
	import { getTranslations } from '$lib/i18n';
	import { sidebarStore } from '$lib/stores/sidebar.svelte';

	const t = getTranslations();
	const { backlinks, period } = $derived(dashboardStore);

	let searchQuery = $state('');

	const filteredBacklinks = $derived.by(() => {
		if (!searchQuery) return backlinks;
		const q = searchQuery.toLowerCase();
		return backlinks.filter(bl => bl.domain.toLowerCase().includes(q));
	});

	const totalBacklinks = $derived(backlinks.length);
	const totalRefDomains = $derived(new Set(backlinks.map(bl => bl.domain)).size);
	const brokenCount = $derived(backlinks.filter(bl => bl.status === 'broken').length);

	function handlePeriodChange(newPeriod: typeof period) {
		dashboardStore.period = newPeriod;
		dashboardStore.regenerate();
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<Sidebar />

	<main id="main-content" class="p-4 md:p-8 transition-all duration-300 {sidebarStore.mainPaddingClass}">
		<header class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-bold text-slate-900 dark:text-white">{t.backlinks.title}</h1>
				<p class="text-sm text-slate-500 dark:text-slate-400">{t.backlinks.subtitle}</p>
			</div>
			<PeriodFilter period={period} onChange={handlePeriodChange} />
		</header>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<div class="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
				<p class="text-sm font-medium text-slate-500 dark:text-slate-400">{t.backlinks.totalBacklinks}</p>
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{totalBacklinks}</p>
			</div>
			<div class="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
				<p class="text-sm font-medium text-slate-500 dark:text-slate-400">{t.backlinks.refDomains}</p>
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{totalRefDomains}</p>
			</div>
			<div class="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
				<p class="text-sm font-medium text-slate-500 dark:text-slate-400">{t.backlinks.brokenLinks}</p>
				<p class="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">{brokenCount}</p>
			</div>
		</div>

		<div class="mb-6">
			<div class="w-80">
				<SearchInput bind:value={searchQuery} placeholder={t.backlinks.searchPlaceholder} />
			</div>
		</div>

		{#if filteredBacklinks.length === 0}
			<EmptyState type="no-results" title={t.common.noData} description={t.backlinks.searchPlaceholder} />
		{:else}
			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
				<div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">{t.backlinks.recentBacklinks}</h2>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr class="border-b border-slate-200 dark:border-slate-800">
								<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.backlinks.domain}</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.backlinks.pages}</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.backlinks.authority}</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.backlinks.anchorText}</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.backlinks.firstSeen}</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.backlinks.status}</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-200 dark:divide-slate-800">
							{#each filteredBacklinks as bl}
								<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
									<td class="px-6 py-4">
										<div class="flex items-center gap-2">
											<Link2 class="w-4 h-4 text-slate-400" />
											<span class="font-medium text-slate-900 dark:text-white">{bl.domain}</span>
											<ExternalLink class="w-3 h-3 text-slate-400" />
										</div>
									</td>
									<td class="px-6 py-4 text-slate-600 dark:text-slate-300">{bl.pages}</td>
									<td class="px-6 py-4">
										<div class="flex items-center gap-2">
											<div class="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
												<div class="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full" style="width: {bl.authority}%"></div>
											</div>
											<span class="text-sm text-slate-600 dark:text-slate-300">{bl.authority}</span>
										</div>
									</td>
									<td class="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">{bl.anchorText}</td>
									<td class="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{bl.firstSeen}</td>
									<td class="px-6 py-4">
										{#if bl.status === 'active'}
											<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950">
												<CheckCircle class="w-3 h-3" />
												{t.backlinks.active}
											</span>
										{:else}
											<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950">
												<AlertCircle class="w-3 h-3" />
												{t.backlinks.broken}
											</span>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</main>
</div>
