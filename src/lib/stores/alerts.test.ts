import { describe, it, expect, beforeEach } from 'vitest';
import { alertsStore } from './alerts.svelte';

describe('AlertsStore', () => {
	beforeEach(() => {
		alertsStore.clearAlerts();
	});

	it('should detect alerts when position changes exceed threshold', () => {
		const prev = new Map([['seo tools', 10]]);
		alertsStore.checkForAlerts([{ keyword: 'seo tools', position: 2 }], prev);
		expect(alertsStore.alerts.length).toBe(1);
		expect(alertsStore.alerts[0].change).toBe('up');
	});

	it('should detect downward alerts', () => {
		const prev = new Map([['marketing', 3]]);
		alertsStore.checkForAlerts([{ keyword: 'marketing', position: 10 }], prev);
		expect(alertsStore.alerts.length).toBe(1);
		expect(alertsStore.alerts[0].change).toBe('down');
	});

	it('should not create alert for small changes', () => {
		const prev = new Map([['seo tools', 10]]);
		alertsStore.checkForAlerts([{ keyword: 'seo tools', position: 8 }], prev);
		expect(alertsStore.alerts.length).toBe(0);
	});

	it('should not create alert for unknown keywords', () => {
		const prev = new Map([['known keyword', 10]]);
		alertsStore.checkForAlerts([{ keyword: 'unknown keyword', position: 2 }], prev);
		expect(alertsStore.alerts.length).toBe(0);
	});

	it('should mark as viewed', () => {
		const prev = new Map([['test', 10]]);
		alertsStore.checkForAlerts([{ keyword: 'test', position: 1 }], prev);
		expect(alertsStore.alerts.length).toBe(1);
		alertsStore.markAsViewed(alertsStore.alerts[0].id);
		expect(alertsStore.alerts[0].viewed).toBe(true);
	});

	it('should mark all as viewed', () => {
		const prev = new Map([['a', 10], ['b', 20]]);
		alertsStore.checkForAlerts([
			{ keyword: 'a', position: 1 },
			{ keyword: 'b', position: 1 },
		], prev);
		alertsStore.markAllAsViewed();
		expect(alertsStore.unreadCount).toBe(0);
	});

	it('should clear all alerts', () => {
		const prev = new Map([['test', 10]]);
		alertsStore.checkForAlerts([{ keyword: 'test', position: 1 }], prev);
		expect(alertsStore.alerts.length).toBe(1);
		alertsStore.clearAlerts();
		expect(alertsStore.alerts.length).toBe(0);
	});

	it('should track unread count', () => {
		expect(alertsStore.unreadCount).toBe(0);
		const prev = new Map([['test', 10]]);
		alertsStore.checkForAlerts([{ keyword: 'test', position: 1 }], prev);
		expect(alertsStore.unreadCount).toBe(1);
	});

	it('should cap alerts at 50', () => {
		const keywords = Array.from({ length: 60 }, (_, i) => ({
			keyword: `keyword-${i}`,
			position: 1,
		}));
		const prev = new Map(Array.from({ length: 60 }, (_, i) => [`keyword-${i}`, 20]));
		alertsStore.checkForAlerts(keywords, prev);
		expect(alertsStore.alerts.length).toBeLessThanOrEqual(50);
	});
});
