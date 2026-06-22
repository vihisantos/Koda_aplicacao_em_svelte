<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getTranslations } from '$lib/i18n';
	import { alertsStore } from '$lib/stores/alerts.svelte';
	import { sidebarStore } from '$lib/stores/sidebar.svelte';
	import logo from '$lib/assets/logo.png';
	import {
		LayoutDashboard,
		Search,
		Link2,
		Settings,
		TrendingUp,
		Bell,
		Menu,
		X,
	} from 'lucide-svelte';

	const t = getTranslations();

	const navItems = [
		{ href: '/', label: () => t.nav.overview, icon: LayoutDashboard },
		{ href: '/keywords', label: () => t.nav.keywords, icon: Search },
		{ href: '/backlinks', label: () => t.nav.backlinks, icon: Link2 },
		{ href: '/trends', label: () => t.nav.trends, icon: TrendingUp },
		{ href: '/alerts', label: () => t.alerts.title, icon: Bell, badge: true },
		{ href: '/settings', label: () => t.nav.settings, icon: Settings },
	];

	function handleNavClick() {
		sidebarStore.closeMobileMenu();
	}

	onMount(() => {
		sidebarStore.updateWindowWidth(window.innerWidth);

		const handleResize = () => {
			sidebarStore.updateWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

{#if sidebarStore.isMobile && sidebarStore.isMobileMenuOpen}
	<div
		class="fixed inset-0 bg-black/50 z-40 transition-opacity"
		onclick={() => sidebarStore.closeMobileMenu()}
		onkeydown={(e) => { if (e.key === 'Escape') sidebarStore.closeMobileMenu(); }}
		role="button"
		tabindex="-1"
		aria-label="Close menu"
	></div>
{/if}

{#if sidebarStore.isMobile}
	<button
		onclick={() => sidebarStore.toggleMobileMenu()}
		class="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg"
		aria-label="Toggle menu"
	>
		{#if sidebarStore.isMobileMenuOpen}
			<X class="w-6 h-6 text-slate-600 dark:text-slate-300" />
		{:else}
			<Menu class="w-6 h-6 text-slate-600 dark:text-slate-300" />
		{/if}
	</button>
{/if}

<aside class="{sidebarStore.sidebarWidthClass} h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed left-0 top-0 flex flex-col z-50 transition-all duration-300
	{sidebarStore.isMobile ? (sidebarStore.isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
">
	<div class="p-6 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-violet-500/5"></div>
		<div class="relative flex items-center gap-3">
			<img src={logo} alt="Koda" class="w-9 h-9 rounded-xl flex-shrink-0" />
			{#if !sidebarStore.isTablet}
				<div>
					<h1 class="text-xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
						Koda
					</h1>
					<p class="text-xs text-slate-500 dark:text-slate-400 font-medium">SEO Dashboard</p>
				</div>
			{/if}
		</div>
	</div>

	<nav class="flex-1 p-4">
		<ul class="space-y-2">
			{#each navItems as item}
				{@const isActive = $page.url.pathname === item.href}
				<li>
					<a
						href={item.href}
						onclick={handleNavClick}
						class="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative
							{sidebarStore.isTablet ? 'justify-center' : ''}
							{isActive
								? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/25'
								: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-[1.02]'}"
					>
						{#if !isActive}
							<span class="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
						{/if}
						<item.icon class="w-5 h-5 flex-shrink-0 {isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400'} transition-colors" />
						{#if !sidebarStore.isTablet}
							<span class="relative">{item.label()}</span>
						{/if}
						{#if item.badge && alertsStore.unreadCount > 0}
							{#if sidebarStore.isTablet}
								<span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
									{alertsStore.unreadCount > 9 ? '9+' : alertsStore.unreadCount}
								</span>
							{:else}
								<span class="ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
									{alertsStore.unreadCount > 9 ? '9+' : alertsStore.unreadCount}
								</span>
							{/if}
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
		{#if !sidebarStore.isTablet}
			<div class="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
				<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
				{t.nav.version} • {t.nav.online}
			</div>
			<p class="text-[10px] text-slate-400 dark:text-slate-600 text-center">
				Desenvolvido por <a href="https://capybaraholding.com.br" target="_blank" rel="noopener noreferrer" class="font-medium hover:underline">Capybara Holding</a>
			</p>
		{:else}
			<div class="flex justify-center">
				<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
			</div>
		{/if}
	</div>
</aside>
