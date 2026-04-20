import { translations, type Locale, type Translations } from './translations';

const STORAGE_KEY = 'koda_locale';

let currentLocale: Locale = 'pt-BR';
let translationsUpdateCallback: (() => void) | null = null;

export function initI18n() {
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'pt-BR' || stored === 'en-US' || stored === 'es') {
			currentLocale = stored;
		}
	}
}

export function getLocale(): Locale {
	const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
	return (stored === 'pt-BR' || stored === 'en-US' || stored === 'es') ? stored : currentLocale;
}

export function setLocale(newLocale: Locale) {
	currentLocale = newLocale;
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, newLocale);
		window.location.reload();
	}
}

export function getTranslations(): Translations {
	const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
	const locale: Locale = (stored === 'pt-BR' || stored === 'en-US' || stored === 'es') ? stored : currentLocale;
	return translations[locale] || translations['pt-BR'];
}

export function onTranslationsChange(callback: () => void) {
	translationsUpdateCallback = callback;
}

export function getLocales() {
	return [
		{ value: 'pt-BR' as Locale, label: 'Português (Brasil)' },
		{ value: 'en-US' as Locale, label: 'English (US)' },
		{ value: 'es' as Locale, label: 'Español' },
	];
}
