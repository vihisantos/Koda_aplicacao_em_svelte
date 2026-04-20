<script lang="ts">
	import { dashboardStore } from '$lib/stores/dashboard.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import PeriodFilter from '$lib/components/PeriodFilter.svelte';
	import { Link2, ExternalLink, AlertCircle, CheckCircle } from 'lucide-svelte';
	import { getTranslations } from '$lib/i18n';

	const t = getTranslations();
	const { pageUrls, period } = $derived(dashboardStore);
	const totalBacklinks = $derived(pageUrls.length);
	const totalRefDomains = $derived(Math.floor(pageUrls.length * 0.6));

	function handlePeriodChange(newPeriod: typeof period) {
		dashboardStore.period = newPeriod;
		dashboardStore.regenerate();
	}

	const mockBacklinks = [
		{ domain: 'blog.example.com', pages: 12, authority: 45, status: 'active' as const },
		{ domain: 'news.site.org', pages: 8, authority: 62, status: 'active' as const },
		{ domain: 'wiki.tech.io', pages: 5, authority: 38, status: 'active' as const },
		{ domain: 'old-reference.net', pages: 3, authority: 22, status: 'broken' as const },
		{ domain: 'partner.biz', pages: 15, authority: 55, status: 'active' as const },
	];
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<Sidebar />

	<main class="ml-64 p-8">
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
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{totalBacklinks * 23}</p>
			</div>
			<div class="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
				<p class="text-sm font-medium text-slate-500 dark:text-slate-400">{t.backlinks.refDomains}</p>
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{totalRefDomains}</p>
			</div>
			<div class="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
				<p class="text-sm font-medium text-slate-500 dark:text-slate-400">{t.backlinks.brokenLinks}</p>
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">3</p>
			</div>
		</div>

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
							<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.backlinks.status}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-200 dark:divide-slate-800">
						{#each mockBacklinks as bl}
							<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
								<td class="px-6 py-4">
									<div class="flex items-center gap-2">
										<Link2 class="w-4 h-4 text-slate-400" />
										<span class="font-medium text-slate-900 dark:text-white">{bl.domain}</span>
										<ExternalLink class="w-3 h-3 text-slate-400" />
									</div>
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-300">{bl.pages}</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-300">{bl.authority}</td>
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
	</main>
</div>