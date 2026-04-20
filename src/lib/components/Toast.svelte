<script lang="ts">
	import { toastStore } from '$lib/stores/toast.svelte';
	import { fly, fade } from 'svelte/transition';
	import { CheckCircle, AlertCircle, Info, X } from 'lucide-svelte';

	const icons = {
		success: CheckCircle,
		error: AlertCircle,
		info: Info,
		warning: AlertCircle,
	};

	const colorClasses = {
		success: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950',
		error: 'border-rose-500 bg-rose-50 dark:bg-rose-950',
		info: 'border-sky-500 bg-sky-50 dark:bg-sky-950',
		warning: 'border-amber-500 bg-amber-50 dark:bg-amber-950',
	};

	const iconColors = {
		success: 'text-emerald-500',
		error: 'text-rose-500',
		info: 'text-sky-500',
		warning: 'text-amber-500',
	};
</script>

<div class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
	{#each toastStore.toasts as toast (toast.id)}
		{@const Icon = icons[toast.type]}
		<div
			in:fly={{ x: 300, duration: 300 }}
			out:fade={{ duration: 200 }}
			class="flex items-center gap-3 px-4 py-3 rounded-xl border-l-4 bg-white dark:bg-slate-800 shadow-xl {colorClasses[toast.type]}"
		>
			<Icon class="w-5 h-5 {iconColors[toast.type]}" />
			<span class="text-sm font-medium text-slate-700 dark:text-slate-200">{toast.message}</span>
			<button
				onclick={() => toastStore.dismiss(toast.id)}
				class="ml-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
			>
				<X class="w-4 h-4 text-slate-400" />
			</button>
		</div>
	{/each}
</div>