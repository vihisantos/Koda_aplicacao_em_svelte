<script lang="ts">
	import { FileQuestion, Inbox, AlertCircle } from 'lucide-svelte';

	let {
		type = 'empty',
		title = 'Sem dados',
		description = 'Não há dados para exibir no momento.',
	}: {
		type?: 'empty' | 'no-results' | 'error';
		title?: string;
		description?: string;
	} = $props();

	const icons = {
		empty: Inbox,
		'no-results': FileQuestion,
		error: AlertCircle,
	};

	const icon = $derived(icons[type]);
</script>

<div class="flex flex-col items-center justify-center py-20 px-4">
	<div class="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
		<icon class="w-10 h-10 text-slate-400 dark:text-slate-500" />
	</div>
	<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
	<p class="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">{description}</p>
</div>