<script lang="ts">
	let {
		checked = $bindable(false),
		label,
		description,
		disabled = false,
	}: {
		checked?: boolean;
		label: string;
		description?: string;
		disabled?: boolean;
	} = $props();
</script>

<div class="flex items-center justify-between {disabled ? 'opacity-50 pointer-events-none' : ''}">
	<div class="flex flex-col">
		<span class="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
		{#if description}
			<span class="text-xs text-slate-500 dark:text-slate-400">{description}</span>
		{/if}
	</div>
	<button
		type="button"
		role="switch"
		aria-checked={checked}
		aria-label={label}
		onclick={() => checked = !checked}
		{disabled}
		class="relative w-12 h-7 rounded-full transition-colors duration-200 {checked ? 'bg-gradient-to-r from-sky-500 to-violet-500' : 'bg-slate-200 dark:bg-slate-700'}"
	>
		<span
			class="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 {checked ? 'translate-x-6' : 'translate-x-1'}"
		></span>
	</button>
</div>