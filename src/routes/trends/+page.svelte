<script lang="ts">
	import { onMount } from 'svelte';
	import { dashboardStore } from '$lib/stores/dashboard.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import PeriodFilter from '$lib/components/PeriodFilter.svelte';
	import { TrendingUp } from 'lucide-svelte';
	import { Chart, registerables } from 'chart.js';
	import { getTranslations, getLocale } from '$lib/i18n';

	Chart.register(...registerables);

	const t = getTranslations();
	const { dailyMetrics, period } = $derived(dashboardStore);

	let clicksChartCanvas: HTMLCanvasElement;
	let impressionsChartCanvas: HTMLCanvasElement;
	let clicksChart: Chart | null = null;
	let impressionsChart: Chart | null = null;

	function handlePeriodChange(newPeriod: typeof period) {
		dashboardStore.period = newPeriod;
		dashboardStore.regenerate();
	}

	function renderCharts() {
		if (clicksChart) clicksChart.destroy();
		if (impressionsChart) impressionsChart.destroy();

		if (!dailyMetrics.length) return;

		const locale = getLocale();
		const labels = dailyMetrics.map(m => {
			const d = new Date(m.date);
			return d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit' });
		});

		clicksChart = new Chart(clicksChartCanvas, {
			type: 'bar',
			data: {
				labels,
				datasets: [{
					label: t.trends.clicksPerDay,
					data: dailyMetrics.map(m => m.clicks),
					backgroundColor: '#0ea5e9',
					borderRadius: 4,
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					y: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
					x: { grid: { display: false } },
				},
			},
		});

		impressionsChart = new Chart(impressionsChartCanvas, {
			type: 'line',
			data: {
				labels,
				datasets: [{
					label: t.trends.impressionsPerDay,
					data: dailyMetrics.map(m => m.impressions),
					borderColor: '#8b5cf6',
					backgroundColor: 'rgba(139, 92, 246, 0.1)',
					fill: true,
					tension: 0.4,
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					y: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
					x: { grid: { display: false } },
				},
			},
		});
	}

	$effect(() => {
		if (dailyMetrics.length) renderCharts();
	});

	onMount(() => {
		return () => {
			if (clicksChart) clicksChart.destroy();
			if (impressionsChart) impressionsChart.destroy();
		};
	});
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<Sidebar />

	<main class="ml-64 p-8">
		<header class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-bold text-slate-900 dark:text-white">{t.trends.title}</h1>
				<p class="text-sm text-slate-500 dark:text-slate-400">{t.trends.subtitle}</p>
			</div>
			<PeriodFilter period={period} onChange={handlePeriodChange} />
		</header>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
				<div class="flex items-center gap-2 mb-4">
					<TrendingUp class="w-5 h-5 text-sky-500" />
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">{t.trends.clicksPerDay}</h2>
				</div>
				<div class="h-72">
					<canvas bind:this={clicksChartCanvas}></canvas>
				</div>
			</div>

			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
				<div class="flex items-center gap-2 mb-4">
					<TrendingUp class="w-5 h-5 text-violet-500" />
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">{t.trends.impressionsPerDay}</h2>
				</div>
				<div class="h-72">
					<canvas bind:this={impressionsChartCanvas}></canvas>
				</div>
			</div>
		</div>
	</main>
</div>