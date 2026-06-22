import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toastStore } from './toast.svelte';

describe('ToastStore', () => {
	beforeEach(() => {
		toastStore.toasts = [];
	});

	it('should show a toast', () => {
		toastStore.show('success', 'Test message');
		expect(toastStore.toasts.length).toBe(1);
		expect(toastStore.toasts[0].type).toBe('success');
		expect(toastStore.toasts[0].message).toBe('Test message');
	});

	it('should show success toast', () => {
		toastStore.success('Success!');
		expect(toastStore.toasts.length).toBe(1);
		expect(toastStore.toasts[0].type).toBe('success');
	});

	it('should show error toast', () => {
		toastStore.error('Error!');
		expect(toastStore.toasts.length).toBe(1);
		expect(toastStore.toasts[0].type).toBe('error');
	});

	it('should show info toast', () => {
		toastStore.info('Info!');
		expect(toastStore.toasts.length).toBe(1);
		expect(toastStore.toasts[0].type).toBe('info');
	});

	it('should show warning toast', () => {
		toastStore.warning('Warning!');
		expect(toastStore.toasts.length).toBe(1);
		expect(toastStore.toasts[0].type).toBe('warning');
	});

	it('should dismiss a toast', () => {
		toastStore.show('info', 'Test');
		const id = toastStore.toasts[0]?.id;
		expect(id).toBeDefined();
		if (id) {
			toastStore.dismiss(id);
			expect(toastStore.toasts.find(t => t.id === id)).toBeUndefined();
		}
	});

	it('should add multiple toasts', () => {
		for (let i = 0; i < 5; i++) {
			toastStore.show('info', `Message ${i}`);
		}
		expect(toastStore.toasts.length).toBe(5);
	});
});
