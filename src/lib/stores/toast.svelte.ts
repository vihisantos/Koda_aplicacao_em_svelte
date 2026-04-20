import { fly, fade } from 'svelte/transition';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-svelte';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
	id: number;
	type: ToastType;
	message: string;
	duration?: number;
}

class ToastStore {
	toasts = $state<Toast[]>([]);
	private id = 0;

	private icons = {
		success: CheckCircle,
		error: AlertCircle,
		info: Info,
		warning: AlertCircle,
	};

	private colors = {
		success: 'text-emerald-500 bg-emerald-500',
		error: 'text-rose-500 bg-rose-500',
		info: 'text-sky-500 bg-sky-500',
		warning: 'text-amber-500 bg-amber-500',
	};

	show(type: ToastType, message: string, duration = 4000) {
		const toast: Toast = { id: ++this.id, type, message, duration };
		this.toasts = [...this.toasts, toast];

		if (duration > 0) {
			setTimeout(() => this.dismiss(toast.id), duration);
		}
	}

	success(message: string, duration = 4000) {
		this.show('success', message, duration);
	}

	error(message: string, duration = 4000) {
		this.show('error', message, duration);
	}

	info(message: string, duration = 4000) {
		this.show('info', message, duration);
	}

	warning(message: string, duration = 4000) {
		this.show('warning', message, duration);
	}

	dismiss(id: number) {
		this.toasts = this.toasts.filter(t => t.id !== id);
	}

	getIcon(type: ToastType) {
		return this.icons[type];
	}

	getColor(type: ToastType) {
		return this.colors[type];
	}
}

export const toastStore = new ToastStore();