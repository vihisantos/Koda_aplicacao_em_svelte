<script lang="ts">
	import { page } from '$app/stores';
	import { getTranslations } from '$lib/i18n';
	import {
		LayoutDashboard,
		Search,
		Link2,
		Settings,
		TrendingUp,
	} from 'lucide-svelte';

	const t = getTranslations();

	const navItems = [
		{ href: '/', label: () => t.nav.overview, icon: LayoutDashboard },
		{ href: '/keywords', label: () => t.nav.keywords, icon: Search },
		{ href: '/backlinks', label: () => t.nav.backlinks, icon: Link2 },
		{ href: '/trends', label: () => t.nav.trends, icon: TrendingUp },
		{ href: '/settings', label: () => t.nav.settings, icon: Settings },
	];
</script>

<aside class="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed left-0 top-0 flex flex-col z-50">
	<div class="p-6 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-violet-500/5"></div>
		<div class="relative">
			<h1 class="text-xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
				Koda
			</h1>
			<p class="text-xs text-slate-500 dark:text-slate-400 font-medium">SEO Dashboard</p>
		</div>
	</div>

	<nav class="flex-1 p-4">
		<ul class="space-y-2">
			{#each navItems as item}
				{@const isActive = $page.url.pathname === item.href}
				<li>
					<a
						href={item.href}
						class="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative
							{isActive
								? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/25'
								: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-[1.02]'}"
					>
						{#if !isActive}
							<span class="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
						{/if}
						<item.icon class="w-5 h-5 {isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400'} transition-colors" />
						<span class="relative">{item.label()}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
		<div class="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
			<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
			{t.nav.version} • {t.nav.online}
		</div>
		<p class="text-[10px] text-slate-400 dark:text-slate-600 text-center">
			Desenvolvido por <a href="https://capybaraholding.com.br" target="_blank" rel="noopener noreferrer" class="font-medium hover:underline">Capybara Holding</a>
		</p>
	</div>
</aside>