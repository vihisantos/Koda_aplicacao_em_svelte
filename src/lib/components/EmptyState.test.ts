import { describe, it, expect, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import EmptyState from './EmptyState.svelte';

describe('EmptyState', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('renders with default props', () => {
		const component = mount(EmptyState, { target: document.body });
		expect(document.body.textContent).toContain('Sem dados');
		expect(document.body.textContent).toContain('Não há dados para exibir no momento.');
		unmount(component);
	});

	it('renders with custom title and description', () => {
		const component = mount(EmptyState, {
			target: document.body,
			props: { title: 'No results', description: 'Try a different search' },
		});
		expect(document.body.textContent).toContain('No results');
		expect(document.body.textContent).toContain('Try a different search');
		unmount(component);
	});

	it('renders with empty type', () => {
		const component = mount(EmptyState, { target: document.body, props: { type: 'empty' } });
		expect(document.body.querySelector('[class*="flex flex-col"]')).not.toBeNull();
		unmount(component);
	});

	it('renders with no-results type', () => {
		const component = mount(EmptyState, { target: document.body, props: { type: 'no-results' } });
		expect(document.body.querySelector('[class*="flex flex-col"]')).not.toBeNull();
		unmount(component);
	});

	it('renders with error type', () => {
		const component = mount(EmptyState, { target: document.body, props: { type: 'error' } });
		expect(document.body.querySelector('[class*="flex flex-col"]')).not.toBeNull();
		unmount(component);
	});
});
