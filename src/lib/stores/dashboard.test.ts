import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('$app/stores', () => ({
	page: {
		subscribe: vi.fn(),
		url: { pathname: '/' },
	},
}));

vi.mock('$lib/i18n', () => ({
	getTranslations: () => ({
		nav: { overview: 'Overview', keywords: 'Keywords', backlinks: 'Backlinks', trends: 'Trends', settings: 'Settings', version: 'v0.0.1', online: 'Online' },
		alerts: { title: 'Alerts', noAlerts: 'No alerts', noAlertsDesc: 'No alerts', rankUp: 'Up', rankDown: 'Down', viewAll: 'View all', markAllRead: 'Mark all read', markViewed: 'Mark viewed', clearAll: 'Clear all', viewed: 'Viewed', unviewed: 'Unread', filterAll: 'All', filterUnviewed: 'Unread', filterViewed: 'Read', alertCount: 'alerts', export: 'Export', keyword: 'Keyword', previousPosition: 'Previous', currentPosition: 'Current', change: 'Change', date: 'Date' },
	}),
	getLocale: () => 'pt-BR',
}));

import { dashboardStore } from './dashboard.svelte';

describe('DashboardStore', () => {
	beforeEach(() => {
		dashboardStore.regenerate();
	});

	it('should initialize with default period', () => {
		expect(dashboardStore.period).toBe('30d');
	});

	it('should have overviewStats after init', () => {
		expect(dashboardStore.overviewStats).not.toBeNull();
		expect(dashboardStore.overviewStats?.totalClicks).toBeGreaterThan(0);
	});

	it('should have dailyMetrics after init', () => {
		expect(dashboardStore.dailyMetrics.length).toBeGreaterThan(0);
	});

	it('should have keywords after init', () => {
		expect(dashboardStore.keywords.length).toBe(20);
	});

	it('should have backlinks after init', () => {
		expect(dashboardStore.backlinks.length).toBe(25);
	});

	it('should regenerate data', () => {
		const prevClicks = dashboardStore.overviewStats?.totalClicks;
		dashboardStore.regenerate();
		expect(dashboardStore.overviewStats).not.toBeNull();
		expect(dashboardStore.keywords.length).toBeGreaterThan(0);
	});

	it('should change period', () => {
		dashboardStore.setPeriod('7d');
		expect(dashboardStore.period).toBe('7d');
		expect(dashboardStore.dailyMetrics.length).toBe(7);
	});

	it('should toggle real-time mode', () => {
		const initial = dashboardStore.isRealTime;
		dashboardStore.toggleRealTime();
		expect(dashboardStore.isRealTime).toBe(!initial);
		dashboardStore.toggleRealTime();
		expect(dashboardStore.isRealTime).toBe(initial);
	});
});
