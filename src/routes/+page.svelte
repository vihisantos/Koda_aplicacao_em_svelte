<script lang="ts">
	import { onMount } from "svelte";
	import { dashboardStore } from "$lib/stores/dashboard.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import PeriodFilter from "$lib/components/PeriodFilter.svelte";
	import StatCard from "$lib/components/StatCard.svelte";
	import Skeleton from "$lib/components/Skeleton.svelte";
	import { Zap, Download } from "lucide-svelte";
	import { exportMetrics } from "$lib/utils/export";
	import { toastStore } from "$lib/stores/toast.svelte";
	import { getTranslations, getLocale } from "$lib/i18n";
	import { Chart, registerables } from "chart.js";

	Chart.register(...registerables);

	const t = getTranslations();
	const { overviewStats, dailyMetrics, period, isRealTime } =
		$derived(dashboardStore);
	const isLoading = $derived(!overviewStats);

	// svelte-ignore non_reactive_update
	let chartCanvas: HTMLCanvasElement;
	let chartInstance: Chart | null = null;

	function renderChart() {
		if (chartInstance) chartInstance.destroy();
		if (!chartCanvas || !dailyMetrics.length) return;

		const labels = dailyMetrics.map((m) => {
			const d = new Date(m.date);
			return d.toLocaleDateString(getLocale(), {
				day: "2-digit",
				month: "2-digit",
			});
		});

		chartInstance = new Chart(chartCanvas, {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: t.overview.trend,
						data: dailyMetrics.map((m) => m.clicks),
						borderColor: "#0ea5e9",
						backgroundColor: (context: any) => {
							const ctx = context.chart.ctx;
							const gradient = ctx.createLinearGradient(
								0,
								0,
								0,
								300,
							);
							gradient.addColorStop(
								0,
								"rgba(14, 165, 233, 0.25)",
							);
							gradient.addColorStop(1, "rgba(14, 165, 233, 0)");
							return gradient;
						},
						fill: true,
						tension: 0.4,
						pointRadius: 0,
						pointHoverRadius: 6,
						pointHoverBackgroundColor: "#0ea5e9",
						pointHoverBorderColor: "#fff",
						pointHoverBorderWidth: 2,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: { intersect: false, mode: "index" },
				plugins: {
					legend: { display: false },
					tooltip: {
						backgroundColor: "#1e293b",
						titleColor: "#f8fafc",
						bodyColor: "#f8fafc",
						padding: 12,
						cornerRadius: 8,
						displayColors: false,
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: { color: "rgba(148, 163, 184, 0.1)" },
						ticks: { color: "#94a3b8" },
					},
					x: {
						grid: { display: false },
						ticks: { color: "#94a3b8" },
					},
				},
			},
		});
	}

	$effect(() => {
		if (dailyMetrics.length) renderChart();
	});

	$effect(() => {
		if (isRealTime && dailyMetrics.length) {
			setTimeout(() => renderChart(), 0);
		}
	});

	function handlePeriodChange(newPeriod: typeof period) {
		dashboardStore.period = newPeriod;
		dashboardStore.regenerate();
	}

	function toggleRealTime() {
		dashboardStore.toggleRealTime();
		toastStore.info(
			dashboardStore.isRealTime
				? t.toast.realtimeEnabled
				: t.toast.realtimeDisabled,
		);
	}

	function handleExport() {
		exportMetrics(dailyMetrics);
	}

	onMount(() => () => {
		if (chartInstance) chartInstance.destroy();
	});
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<Sidebar />

	<main class="ml-64 p-8">
		<header class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-bold text-slate-900 dark:text-white">
					{t.overview.title}
				</h1>
				<p class="text-sm text-slate-500 dark:text-slate-400">
					{t.overview.subtitle}
				</p>
			</div>
			<div class="flex items-center gap-3">
				<button
					onclick={toggleRealTime}
					class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all {isRealTime
						? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
						: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}"
				>
					<Zap class="w-4 h-4 {isRealTime ? 'animate-pulse' : ''}" />
					{isRealTime ? t.overview.live : t.overview.realtime}
				</button>
				<button
					onclick={handleExport}
					class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
				>
					<Download class="w-4 h-4" />
					{t.overview.export}
				</button>
				<PeriodFilter {period} onChange={handlePeriodChange} />
			</div>
		</header>

		{#if isLoading}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
			>
				{#each Array(4) as _}
					<div
						class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
					>
						<Skeleton width="w-24" height="h-4" />
						<div class="mt-4">
							<Skeleton width="w-32" height="h-8" />
						</div>
						<div class="mt-3">
							<Skeleton width="w-16" height="h-4" />
						</div>
					</div>
				{/each}
			</div>
			<div
				class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
			>
				<Skeleton width="w-64" height="h-6" />
				<div class="mt-6 h-80">
					<Skeleton width="w-full" height="h-full" />
				</div>
			</div>
		{:else if overviewStats}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
			>
				<StatCard
					title={t.overview.totalClicks}
					value={overviewStats.totalClicks}
					change={overviewStats.clicksChange}
					color="sky"
				/>
				<StatCard
					title={t.overview.impressions}
					value={overviewStats.totalImpressions}
					change={overviewStats.impressionsChange}
					color="violet"
				/>
				<StatCard
					title={t.overview.avgCtr}
					value={overviewStats.avgCtr}
					change={overviewStats.ctrChange}
					format="percent"
					color="emerald"
				/>
				<StatCard
					title={t.overview.avgPosition}
					value={overviewStats.avgPosition}
					change={overviewStats.positionChange}
					format="position"
					color="amber"
				/>
			</div>

			<div
				class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg shadow-slate-900/5"
			>
				<div class="flex items-center justify-between mb-6">
					<div class="flex items-center gap-3">
						<h2
							class="text-lg font-semibold text-slate-900 dark:text-white"
						>
							{t.overview.performance}
						</h2>
						{#if isRealTime}
							<span
								class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
							>
								<span
									class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
								></span>
								{t.overview.live}
							</span>
						{/if}
					</div>
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-sky-500"></span>
						<span class="text-sm text-slate-500 dark:text-slate-400"
							>{t.overview.trend}</span
						>
					</div>
				</div>
				<div class="h-80">
					<canvas bind:this={chartCanvas}></canvas>
				</div>
			</div>
		{/if}
	</main>
</div>
