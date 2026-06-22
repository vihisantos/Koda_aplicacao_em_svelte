<script lang="ts">
	import { alertsStore } from '$lib/stores/alerts.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { Bell, TrendingUp, TrendingDown, Check, Trash2, CheckCheck, Filter, Download } from 'lucide-svelte';
	import { getTranslations } from '$lib/i18n';
	import { exportToCSV } from '$lib/utils/export';
	import { sidebarStore } from '$lib/stores/sidebar.svelte';

	const t = getTranslations();

	let filter = $state<'all' | 'viewed' | 'unviewed'>('all');

	const filteredAlerts = $derived.by(() => {
		switch (filter) {
			case 'viewed': return alertsStore.alerts.filter(a => a.viewed);
			case 'unviewed': return alertsStore.alerts.filter(a => !a.viewed);
			default: return alertsStore.alerts;
		}
	});

	function handleExport() {
		exportToCSV(
			filteredAlerts.map(a => ({
				[t.alerts.keyword]: a.keyword,
				[t.alerts.previousPosition]: a.previousPosition,
				[t.alerts.currentPosition]: a.currentPosition,
				[t.alerts.change]: a.change,
				[t.alerts.date]: a.date.toISOString(),
				[t.alerts.viewed]: a.viewed ? 'Yes' : 'No',
			})),
			'alerts'
		);
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<Sidebar />

	<main id="main-content" class="p-4 md:p-8 transition-all duration-300 {sidebarStore.mainPaddingClass}">
		<header class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-bold text-slate-900 dark:text-white">{t.alerts.title}</h1>
				<p class="text-sm text-slate-500 dark:text-slate-400">{t.alerts.subtitle}</p>
			</div>
			<div class="flex items-center gap-3">
				<button
					onclick={handleExport}
					class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-sky-500/25 transition-all"
				>
					<Download class="w-4 h-4" />
					{t.alerts.export}
				</button>
			</div>
		</header>

		<div class="flex items-center gap-4 mb-6">
			<div class="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1">
				<button
					onclick={() => filter = 'all'}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {filter === 'all' ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}"
				>
					{t.alerts.filterAll}
				</button>
				<button
					onclick={() => filter = 'unviewed'}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {filter === 'unviewed' ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}"
				>
					{t.alerts.filterUnviewed}
					{#if alertsStore.unreadCount > 0}
						<span class="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">{alertsStore.unreadCount}</span>
					{/if}
				</button>
				<button
					onclick={() => filter = 'viewed'}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {filter === 'viewed' ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}"
				>
					{t.alerts.filterViewed}
				</button>
			</div>

			<div class="flex items-center gap-2 ml-auto">
				<button
					onclick={() => alertsStore.markAllAsViewed()}
					class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
				>
					<CheckCheck class="w-4 h-4" />
					{t.alerts.markAllRead}
				</button>
				<button
					onclick={() => alertsStore.clearAlerts()}
					class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
				>
					<Trash2 class="w-4 h-4" />
					{t.alerts.clearAll}
				</button>
			</div>
		</div>

		{#if filteredAlerts.length === 0}
			<EmptyState type="empty" title={t.alerts.noAlerts} description={t.alerts.noAlertsDesc} />
		{:else}
			<div class="space-y-3">
				{#each filteredAlerts as alert (alert.id)}
					<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg transition-all {alert.viewed ? 'opacity-70' : ''}">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div class="p-3 rounded-xl {alert.change === 'up' ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-rose-50 dark:bg-rose-950'}">
									{#if alert.change === 'up'}
										<TrendingUp class="w-5 h-5 text-emerald-500" />
									{:else}
										<TrendingDown class="w-5 h-5 text-rose-500" />
									{/if}
								</div>
								<div>
									<p class="font-semibold text-slate-900 dark:text-white">{alert.keyword}</p>
									<p class="text-sm text-slate-500 dark:text-slate-400">
										{t.alerts.previousPosition} #{alert.previousPosition} → {t.alerts.currentPosition} #{alert.currentPosition}
										<span class="ml-2 {alert.change === 'up' ? 'text-emerald-500' : 'text-rose-500'}">
											({alert.change === 'up' ? t.alerts.rankUp : t.alerts.rankDown})
										</span>
									</p>
								</div>
							</div>
							<div class="flex items-center gap-3">
								<span class="text-xs text-slate-400 dark:text-slate-500">{formatDate(alert.date)}</span>
								{#if !alert.viewed}
									<button
										onclick={() => alertsStore.markAsViewed(alert.id)}
										class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
										aria-label={t.alerts.markViewed}
									>
										<Check class="w-4 h-4 text-slate-400" />
									</button>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>
