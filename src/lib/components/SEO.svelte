<script lang="ts">
	import { page } from '$app/stores';
	import { getTranslations } from '$lib/i18n';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
	}

	let { title, description, image }: Props = $props();

	const t = getTranslations();
	const defaultTitle = 'Koda - SEO Dashboard';
	const defaultDesc = 'Dashboard administrativo para análise de métricas de SEO e tráfego orgânico';
	const defaultImage = '/favicon.svg';
	const siteUrl = 'https://capybaraholding.com.br';

	const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
	const ogImage = image || defaultImage;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description || defaultDesc} />
	<meta name="author" content="Capybara Holding" />

	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description || defaultDesc} />
	<meta property="og:image" content="{siteUrl}{ogImage}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{siteUrl}{$page.url.pathname}" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description || defaultDesc} />
	<meta name="twitter:image" content="{siteUrl}{ogImage}" />

	<link rel="canonical" href="{siteUrl}{$page.url.pathname}" />
	<link rel="alternate" hreflang="pt-BR" href="{siteUrl}{$page.url.pathname}" />
	<link rel="alternate" hreflang="en-US" href="{siteUrl}{$page.url.pathname}" />
	<link rel="alternate" hreflang="es" href="{siteUrl}{$page.url.pathname}" />
</svelte:head>