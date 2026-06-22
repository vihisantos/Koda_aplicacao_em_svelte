import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import StatCard from './StatCard.svelte';

vi.mock('$lib/i18n', () => ({
	getTranslations: () => ({
		overview: { vsPrevious: 'vs período anterior' },
	}),
}));

describe('StatCard', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('renders title and formatted value', () => {
		const component = mount(StatCard, {
			target: document.body,
			props: { title: 'Total Clicks', value: 12345, change: 5.2 },
		});
		expect(document.body.textContent).toContain('Total Clicks');
		expect(document.body.textContent).toContain('12');
		unmount(component);
	});

	it('renders percent format', () => {
		const component = mount(StatCard, {
			target: document.body,
			props: { title: 'CTR', value: 3.5, change: 1.2, format: 'percent' },
		});
		expect(document.body.textContent).toContain('3.5%');
		unmount(component);
	});

	it('renders position format', () => {
		const component = mount(StatCard, {
			target: document.body,
			props: { title: 'Position', value: 5.3, change: -0.5, format: 'position' },
		});
		expect(document.body.textContent).toContain('#5.3');
		unmount(component);
	});

	it('shows positive change indicator', () => {
		const component = mount(StatCard, {
			target: document.body,
			props: { title: 'Test', value: 100, change: 5.2 },
		});
		expect(document.body.textContent).toContain('+5.2%');
		unmount(component);
	});

	it('shows negative change indicator', () => {
		const component = mount(StatCard, {
			target: document.body,
			props: { title: 'Test', value: 100, change: -3.1 },
		});
		expect(document.body.textContent).toContain('-3.1%');
		unmount(component);
	});

	it('shows neutral change indicator', () => {
		const component = mount(StatCard, {
			target: document.body,
			props: { title: 'Test', value: 100, change: 0 },
		});
		expect(document.body.textContent).toContain('0%');
		unmount(component);
	});

	it('shows sparkline when data provided', () => {
		const component = mount(StatCard, {
			target: document.body,
			props: { title: 'Test', value: 100, change: 0, sparklineData: [10, 20, 30, 25, 15] },
		});
		const svg = document.body.querySelector('svg');
		expect(svg).not.toBeNull();
		unmount(component);
	});

	it('does not show sparkline when empty', () => {
		const container = document.createElement('div');
		document.body.appendChild(container);
		mount(StatCard, {
			target: container,
			props: { title: 'Test', value: 100, change: 0, sparklineData: [] },
		});
		const svgs = container.querySelectorAll('svg');
		const hasSparkline = Array.from(svgs).some(svg => svg.getAttribute('viewBox')?.includes('120'));
		expect(hasSparkline).toBe(false);
		container.remove();
	});
});
