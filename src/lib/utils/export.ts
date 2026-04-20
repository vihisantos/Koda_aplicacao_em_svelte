import type { Keyword, DailyMetric, PageUrl } from '$lib/data/mockData';
import { toastStore } from '$lib/stores/toast.svelte';
import { getTranslations } from '$lib/i18n';

export function exportToCSV(data: any[], filename: string, headers?: string[]) {
	const t = getTranslations();
	if (!data.length) {
		toastStore.warning(t.common.noData);
		return;
	}

	const keys = headers || Object.keys(data[0]);
	const csvContent = [
		keys.join(','),
		...data.map(row => keys.map(k => {
			const val = row[k];
			if (typeof val === 'string' && val.includes(',')) {
				return `"${val}"`;
			}
			return val;
		}).join(','))
	].join('\n');

	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
	link.click();
	URL.revokeObjectURL(link.href);

	toastStore.success(`${data.length} ${t.toast.exportSuccess}`);
}

export function exportKeywords(keywords: Keyword[]) {
	exportToCSV(
		keywords.map(k => ({
			Keyword: k.keyword,
			Volume: k.volume,
			Difficulty: k.difficulty,
			Clicks: k.clicks,
			Impressions: k.impressions,
			CTR: k.ctr,
			Position: k.position,
			Trend: k.trend,
		})),
		'keywords'
	);
}

export function exportMetrics(metrics: DailyMetric[]) {
	exportToCSV(
		metrics.map(m => ({
			Date: m.date,
			Clicks: m.clicks,
			Impressions: m.impressions,
			CTR: m.ctr,
			Position: m.position,
		})),
		'metrics'
	);
}

export function exportURLs(urls: PageUrl[]) {
	exportToCSV(
		urls.map(u => ({
			URL: u.url,
			Clicks: u.clicks,
			Impressions: u.impressions,
			CTR: u.ctr,
			Position: u.position,
		})),
		'urls'
	);
}