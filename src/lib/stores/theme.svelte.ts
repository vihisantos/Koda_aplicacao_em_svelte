const STORAGE_KEY = 'koda_theme';

class ThemeStore {
	darkMode = $state(true);

	constructor() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored !== null) {
				this.darkMode = stored === 'dark';
			} else {
				this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
			this.applyTheme();
		}
	}

	applyTheme() {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', this.darkMode);
			localStorage.setItem(STORAGE_KEY, this.darkMode ? 'dark' : 'light');
		}
	}

	toggle() {
		this.darkMode = !this.darkMode;
		this.applyTheme();
	}

	set(value: boolean) {
		this.darkMode = value;
		this.applyTheme();
	}
}

export const themeStore = new ThemeStore();