<script lang="ts">
	let {
		width = 'w-full',
		height = 'h-4',
		rounded = 'md',
		animate = true,
	}: {
		width?: string;
		height?: string;
		rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
		animate?: boolean;
	} = $props();

	const roundedClasses = {
		none: 'rounded-none',
		sm: 'rounded',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		full: 'rounded-full',
	};
</script>

<div class="{width} {height} {roundedClasses[rounded]} bg-slate-200 dark:bg-slate-700 {animate ? 'animate-pulse' : ''}"></div>

<style>
	@keyframes shimmer {
		0% { opacity: 1; }
		50% { opacity: 0.5; }
		100% { opacity: 1; }
	}
	.animate-pulse {
		animation: shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>