<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { dashboardStore } from '$lib/stores/dashboard.svelte';
	import { toastStore } from '$lib/stores/toast.svelte';
	import { setLocale, getLocale, getTranslations } from '$lib/i18n';
	import Toggle from '$lib/components/Toggle.svelte';
	import { Settings, Moon, Sun, Globe, Bell, Database, RefreshCw } from 'lucide-svelte';

	const t = getTranslations();
	let notifications = $state(true);
	let language = $state(getLocale());
	let isUpdating = $state(false);

	async function handleRefreshData() {
		isUpdating = true;
		await new Promise(r => setTimeout(r, 1500));
		dashboardStore.regenerate();
		isUpdating = false;
		toastStore.success(t.toast.dataUpdated);
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<Sidebar />

	<main class="ml-64 p-8">
		<header class="mb-8">
			<h1 class="text-2xl font-bold text-slate-900 dark:text-white">{t.settings.title}</h1>
			<p class="text-sm text-slate-500 dark:text-slate-400">{t.settings.subtitle}</p>
		</header>

		<div class="max-w-2xl space-y-6">
			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
				<div class="flex items-center gap-3 mb-6">
					<div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
						<Settings class="w-5 h-5 text-slate-600 dark:text-slate-300" />
					</div>
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">{t.settings.appearance}</h2>
				</div>

				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							{#if themeStore.darkMode}
								<Moon class="w-5 h-5 text-slate-400" />
							{:else}
								<Sun class="w-5 h-5 text-slate-400" />
							{/if}
							<span class="text-slate-700 dark:text-slate-200">{t.settings.darkMode}</span>
						</div>
						<button
							onclick={() => themeStore.toggle()}
							aria-label={t.settings.darkMode}
							class="relative w-12 h-6 rounded-full transition-colors {themeStore.darkMode ? 'bg-gradient-to-r from-sky-500 to-violet-500' : 'bg-slate-300'}"
						>
							<span class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform {themeStore.darkMode ? 'translate-x-7' : 'translate-x-1'}"></span>
						</button>
					</div>
				</div>
			</div>

			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
				<div class="flex items-center gap-3 mb-6">
					<div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
						<Globe class="w-5 h-5 text-slate-600 dark:text-slate-300" />
					</div>
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">{t.settings.language}</h2>
				</div>

				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-slate-700 dark:text-slate-200">{t.settings.language}</span>
						<select
							id="language-select"
							name="language"
							bind:value={language}
							onchange={() => { if (language) setLocale(language as any); }}
							class="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
						>
							<option value="pt-BR">Português (Brasil)</option>
							<option value="en-US">English (US)</option>
							<option value="es">Español</option>
						</select>
					</div>
				</div>
			</div>

			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
				<div class="flex items-center gap-3 mb-6">
					<div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
						<Bell class="w-5 h-5 text-slate-600 dark:text-slate-300" />
					</div>
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">{t.settings.notifications}</h2>
				</div>

				<div class="space-y-4">
					<Toggle bind:checked={notifications} label={t.settings.alertNotifications} description={t.settings.alertNotificationsDesc} />
				</div>
			</div>

			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
				<div class="flex items-center gap-3 mb-6">
					<div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
						<Database class="w-5 h-5 text-slate-600 dark:text-slate-300" />
					</div>
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">{t.settings.data}</h2>
				</div>

				<div class="space-y-4">
					<button
						onclick={handleRefreshData}
						disabled={isUpdating}
						class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
					>
						<RefreshCw class="w-4 h-4 {isUpdating ? 'animate-spin' : ''}" />
						{isUpdating ? t.common.loading : t.settings.refreshData}
					</button>
					<p class="text-xs text-slate-500">{t.settings.lastUpdate}: {t.settings.now}</p>
				</div>
			</div>
		</div>
	</main>
</div>