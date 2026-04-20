import { generateData, type TimePeriod, type OverviewStats, type DailyMetric, type Keyword, type PageUrl } from '$lib/data/mockData';

const STORAGE_KEY = 'koda_dashboard_period';

class DashboardStore {
	period = $state<TimePeriod>('30d');
	overviewStats = $state<OverviewStats | null>(null);
	dailyMetrics = $state<DailyMetric[]>([]);
	keywords = $state<Keyword[]>([]);
	pageUrls = $state<PageUrl[]>([]);
	isRealTime = $state(false);
	private interval: ReturnType<typeof setInterval> | null = null;

	constructor() {
		this.loadFromStorage();
		this.regenerate();
	}

	loadFromStorage() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === '7d' || stored === '30d' || stored === '3m') {
				this.period = stored;
			}
		}
	}

	saveToStorage() {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, this.period);
		}
	}

	regenerate() {
		const data = generateData(this.period);
		this.overviewStats = data.overviewStats;
		this.dailyMetrics = data.dailyMetrics;
		this.keywords = data.keywords;
		this.pageUrls = data.pageUrls;
		this.saveToStorage();
	}

	setPeriod(newPeriod: TimePeriod) {
		this.period = newPeriod;
		this.regenerate();
	}

	toggleRealTime() {
		this.isRealTime = !this.isRealTime;
		if (this.isRealTime) {
			this.interval = setInterval(() => {
				this.updateRandomMetric();
			}, 3000);
		} else if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	private updateRandomMetric() {
		if (this.dailyMetrics.length > 0) {
			const idx = Math.floor(Math.random() * this.dailyMetrics.length);
			this.dailyMetrics[idx] = {
				...this.dailyMetrics[idx],
				clicks: Math.max(0, this.dailyMetrics[idx].clicks + Math.floor(Math.random() * 100 - 50)),
				impressions: Math.max(0, this.dailyMetrics[idx].impressions + Math.floor(Math.random() * 1000 - 500)),
			};

			if (this.overviewStats) {
				const totalClicks = this.dailyMetrics.reduce((sum, m) => sum + m.clicks, 0);
				const totalImpressions = this.dailyMetrics.reduce((sum, m) => sum + m.impressions, 0);
				this.overviewStats = {
					...this.overviewStats,
					totalClicks,
					totalImpressions,
				};
			}
		}
	}

	dispose() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
}

export const dashboardStore = new DashboardStore();