<script lang="ts">
	let { text = 'Carregando...' } = $props();
</script>

<div class="flex flex-col items-center justify-center py-20">
	<div class="relative">
		<div class="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
		<div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-sky-500 rounded-full animate-spin"></div>
		<div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-r-violet-500 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 0.8s;"></div>
	</div>
	<p class="mt-4 text-sm text-slate-500 dark:text-slate-400 font-medium animate-pulse">{text}</p>
</div>