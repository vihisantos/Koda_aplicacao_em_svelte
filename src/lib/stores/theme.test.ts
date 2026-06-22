import { describe, it, expect, beforeEach } from 'vitest';
import { themeStore } from './theme.svelte';

describe('ThemeStore', () => {
	beforeEach(() => {
		document.documentElement.classList.remove('dark');
	});

	it('should have a darkMode property', () => {
		expect(typeof themeStore.darkMode).toBe('boolean');
	});

	it('should toggle dark mode', () => {
		const initial = themeStore.darkMode;
		themeStore.toggle();
		expect(themeStore.darkMode).toBe(!initial);
		themeStore.toggle();
		expect(themeStore.darkMode).toBe(initial);
	});

	it('should set specific value', () => {
		themeStore.set(true);
		expect(themeStore.darkMode).toBe(true);
		themeStore.set(false);
		expect(themeStore.darkMode).toBe(false);
	});
});
