export type Locale = 'pt-BR' | 'en-US' | 'es';

export interface Translations {
	nav: {
		overview: string;
		keywords: string;
		backlinks: string;
		trends: string;
		settings: string;
		version: string;
		online: string;
	};
	overview: {
		title: string;
		subtitle: string;
		totalClicks: string;
		impressions: string;
		avgCtr: string;
		avgPosition: string;
		performance: string;
		trend: string;
		vsPrevious: string;
		realtime: string;
		live: string;
		export: string;
		loading: string;
	};
	keywords: {
		title: string;
		subtitle: string;
		keyword: string;
		volume: string;
		difficulty: string;
		clicks: string;
		ctr: string;
		position: string;
		trend: string;
		export: string;
		search: string;
		filter: string;
		allDifficulties: string;
		easy: string;
		medium: string;
		hard: string;
		of: string;
	};
	backlinks: {
		title: string;
		subtitle: string;
		totalBacklinks: string;
		refDomains: string;
		brokenLinks: string;
		recentBacklinks: string;
		domain: string;
		pages: string;
		authority: string;
		status: string;
		active: string;
		broken: string;
		anchorText: string;
		firstSeen: string;
		searchPlaceholder: string;
		allStatuses: string;
	};
	trends: {
		title: string;
		subtitle: string;
		clicksPerDay: string;
		impressionsPerDay: string;
	};
	settings: {
		title: string;
		subtitle: string;
		appearance: string;
		darkMode: string;
		language: string;
		notifications: string;
		alertNotifications: string;
		alertNotificationsDesc: string;
		data: string;
		refreshData: string;
		lastUpdate: string;
		now: string;
	};
	common: {
		save: string;
		cancel: string;
		confirm: string;
		delete: string;
		edit: string;
		add: string;
		search: string;
		filter: string;
		export: string;
		loading: string;
		noData: string;
	};
	toast: {
		dataUpdated: string;
		exportSuccess: string;
		realtimeEnabled: string;
		realtimeDisabled: string;
	};
	period: {
		last7days: string;
		last30days: string;
		last3months: string;
	};
	alerts: {
		title: string;
		subtitle: string;
		noAlerts: string;
		noAlertsDesc: string;
		rankUp: string;
		rankDown: string;
		viewAll: string;
		markAllRead: string;
		markViewed: string;
		clearAll: string;
		viewed: string;
		unviewed: string;
		filterAll: string;
		filterUnviewed: string;
		filterViewed: string;
		alertCount: string;
		export: string;
		keyword: string;
		previousPosition: string;
		currentPosition: string;
		change: string;
		date: string;
	};
}

export const translations: Record<Locale, Translations> = {
	'pt-BR': {
			nav: { overview: 'Visão Geral', keywords: 'Palavras-chave', backlinks: 'Backlinks', trends: 'Tendências', settings: 'Configurações', version: 'v0.0.1', online: 'Online' },
		overview: { title: 'Overview', subtitle: 'Métricas de desempenho do seu site', totalClicks: 'Total de Cliques', impressions: 'Impressões', avgCtr: 'CTR Médio', avgPosition: 'Posição Média', performance: 'Desempenho ao Longo do Tempo', trend: 'Cliques', vsPrevious: 'vs período anterior', realtime: 'Tempo Real', live: 'Ao Vivo', export: 'Exportar', loading: 'Carregando métricas...' },
		keywords: { title: 'Keywords', subtitle: 'Palavras-chave com melhor desempenho', keyword: 'Keyword', volume: 'Volume', difficulty: 'Dificuldade', clicks: 'Cliques', ctr: 'CTR', position: 'Posição', trend: 'Tendência', export: 'Exportar', search: 'Buscar keywords...', filter: 'Filtrar', allDifficulties: 'Todas as dificuldades', easy: 'Fácil', medium: 'Média', hard: 'Difícil', of: 'de' },
		backlinks: { title: 'Backlinks', subtitle: 'Links externos apontando para seu site', totalBacklinks: 'Total de Backlinks', refDomains: 'Domínios Referenciadores', brokenLinks: 'Links Quebrados', recentBacklinks: 'Backlinks Recentes', domain: 'Domínio', pages: 'Páginas', authority: 'Autoridade', status: 'Status', active: 'Ativo', broken: 'Quebrado', anchorText: 'Texto Âncora', firstSeen: 'Primeira Detecção', searchPlaceholder: 'Buscar por domínio...', allStatuses: 'Todos os status' },
		trends: { title: 'Trends', subtitle: 'Análise de tendências ao longo do tempo', clicksPerDay: 'Cliques por Dia', impressionsPerDay: 'Impressões por Dia' },
		settings: { title: 'Configurações', subtitle: 'Gerencie as preferências do dashboard', appearance: 'Aparência', darkMode: 'Modo Escuro', language: 'Idioma e Região', notifications: 'Notificações', alertNotifications: 'Notificações de alertas', alertNotificationsDesc: 'Receba alertas sobre mudanças nas métricas', data: 'Dados', refreshData: 'Atualizar Dados', lastUpdate: 'Última atualização', now: 'agora mesmo' },
		common: { save: 'Salvar', cancel: 'Cancelar', confirm: 'Confirmar', delete: 'Excluir', edit: 'Editar', add: 'Adicionar', search: 'Buscar', filter: 'Filtrar', export: 'Exportar', loading: 'Carregando...', noData: 'Sem dados' },
		toast: { dataUpdated: 'Dados atualizados com sucesso!', exportSuccess: 'registros exportados', realtimeEnabled: 'Modo tempo real ativado', realtimeDisabled: 'Modo tempo real desativado' },
		period: { last7days: 'Últimos 7 dias', last30days: 'Últimos 30 dias', last3months: 'Últimos 3 meses' },
		alerts: { title: 'Alertas', subtitle: 'Monitoramento de mudanças de posicionamento', noAlerts: 'Nenhum alerta', noAlertsDesc: 'Não há alertas de mudanças de ranking no momento.', rankUp: 'Subiu', rankDown: 'Caiu', viewAll: 'Ver todos', markAllRead: 'Marcar todos como lidos', markViewed: 'Marcar como lido', clearAll: 'Limpar todos', viewed: 'Lido', unviewed: 'Não lido', filterAll: 'Todos', filterUnviewed: 'Não lidos', filterViewed: 'Lidos', alertCount: 'alertas', export: 'Exportar', keyword: 'Palavra-chave', previousPosition: 'Posição Anterior', currentPosition: 'Posição Atual', change: 'Mudança', date: 'Data' },
	},
	'en-US': {
		nav: { overview: 'Overview', keywords: 'Keywords', backlinks: 'Backlinks', trends: 'Trends', settings: 'Settings', version: 'v0.0.1', online: 'Online' },
		overview: { title: 'Overview', subtitle: 'Website performance metrics', totalClicks: 'Total Clicks', impressions: 'Impressions', avgCtr: 'Average CTR', avgPosition: 'Average Position', performance: 'Performance Over Time', trend: 'Clicks', vsPrevious: 'vs previous period', realtime: 'Real-time', live: 'Live', export: 'Export', loading: 'Loading metrics...' },
		keywords: { title: 'Keywords', subtitle: 'Best performing keywords', keyword: 'Keyword', volume: 'Volume', difficulty: 'Difficulty', clicks: 'Clicks', ctr: 'CTR', position: 'Position', trend: 'Trend', export: 'Export', search: 'Search keywords...', filter: 'Filter', allDifficulties: 'All difficulties', easy: 'Easy', medium: 'Medium', hard: 'Hard', of: 'of' },
		backlinks: { title: 'Backlinks', subtitle: 'External links pointing to your site', totalBacklinks: 'Total Backlinks', refDomains: 'Referring Domains', brokenLinks: 'Broken Links', recentBacklinks: 'Recent Backlinks', domain: 'Domain', pages: 'Pages', authority: 'Authority', status: 'Status', active: 'Active', broken: 'Broken', anchorText: 'Anchor Text', firstSeen: 'First Seen', searchPlaceholder: 'Search by domain...', allStatuses: 'All statuses' },
		trends: { title: 'Trends', subtitle: 'Trend analysis over time', clicksPerDay: 'Clicks per Day', impressionsPerDay: 'Impressions per Day' },
		settings: { title: 'Settings', subtitle: 'Manage dashboard preferences', appearance: 'Appearance', darkMode: 'Dark Mode', language: 'Language & Region', notifications: 'Notifications', alertNotifications: 'Alert notifications', alertNotificationsDesc: 'Receive alerts on metric changes', data: 'Data', refreshData: 'Refresh Data', lastUpdate: 'Last update', now: 'just now' },
		common: { save: 'Save', cancel: 'Cancel', confirm: 'Confirm', delete: 'Delete', edit: 'Edit', add: 'Add', search: 'Search', filter: 'Filter', export: 'Export', loading: 'Loading...', noData: 'No data' },
		toast: { dataUpdated: 'Data updated successfully!', exportSuccess: 'records exported', realtimeEnabled: 'Real-time mode enabled', realtimeDisabled: 'Real-time mode disabled' },
		period: { last7days: 'Last 7 days', last30days: 'Last 30 days', last3months: 'Last 3 months' },
		alerts: { title: 'Alerts', subtitle: 'Ranking change monitoring', noAlerts: 'No alerts', noAlertsDesc: 'There are no ranking change alerts at the moment.', rankUp: 'Moved up', rankDown: 'Moved down', viewAll: 'View all', markAllRead: 'Mark all as read', markViewed: 'Mark as read', clearAll: 'Clear all', viewed: 'Read', unviewed: 'Unread', filterAll: 'All', filterUnviewed: 'Unread', filterViewed: 'Read', alertCount: 'alerts', export: 'Export', keyword: 'Keyword', previousPosition: 'Previous Position', currentPosition: 'Current Position', change: 'Change', date: 'Date' },
	},
	'es': {
		nav: { overview: 'Resumen', keywords: 'Palabras Clave', backlinks: 'Enlaces Externos', trends: 'Tendencias', settings: 'Ajustes', version: 'v0.0.1', online: 'En línea' },
		overview: { title: 'Overview', subtitle: 'Métricas de rendimiento de tu sitio', totalClicks: 'Clics Totales', impressions: 'Impresiones', avgCtr: 'CTR Promedio', avgPosition: 'Posición Promedio', performance: 'Rendimiento a lo Largo del Tiempo', trend: 'Clics', vsPrevious: 'vs período anterior', realtime: 'Tiempo Real', live: 'En Vivo', export: 'Exportar', loading: 'Cargando métricas...' },
		keywords: { title: 'Keywords', subtitle: 'Palabras clave con mejor rendimiento', keyword: 'Keyword', volume: 'Volumen', difficulty: 'Dificultad', clicks: 'Clics', ctr: 'CTR', position: 'Posición', trend: 'Tendencia', export: 'Exportar', search: 'Buscar keywords...', filter: 'Filtrar', allDifficulties: 'Todas las dificultades', easy: 'Fácil', medium: 'Media', hard: 'Difícil', of: 'de' },
		backlinks: { title: 'Backlinks', subtitle: 'Enlaces externos que apuntan a tu sitio', totalBacklinks: 'Total de Backlinks', refDomains: 'Dominios de Referencia', brokenLinks: 'Enlaces Rotos', recentBacklinks: 'Backlinks Recientes', domain: 'Dominio', pages: 'Páginas', authority: 'Autoridad', status: 'Estado', active: 'Activo', broken: 'Roto', anchorText: 'Texto Ancla', firstSeen: 'Primera Detección', searchPlaceholder: 'Buscar por dominio...', allStatuses: 'Todos los estados' },
		trends: { title: 'Tendencias', subtitle: 'Análisis de tendencias a lo largo del tiempo', clicksPerDay: 'Clics por Día', impressionsPerDay: 'Impresiones por Día' },
		settings: { title: 'Ajustes', subtitle: 'Gestiona las preferencias del dashboard', appearance: 'Apariencia', darkMode: 'Modo Oscuro', language: 'Idioma y Región', notifications: 'Notificaciones', alertNotifications: 'Notificaciones de alertas', alertNotificationsDesc: 'Recibe alertas sobre cambios en las métricas', data: 'Datos', refreshData: 'Actualizar Datos', lastUpdate: 'Última actualización', now: 'ahora mismo' },
		common: { save: 'Guardar', cancel: 'Cancelar', confirm: 'Confirmar', delete: 'Eliminar', edit: 'Editar', add: 'Añadir', search: 'Buscar', filter: 'Filtrar', export: 'Exportar', loading: 'Cargando...', noData: 'Sin datos' },
		toast: { dataUpdated: '¡Datos actualizados con éxito!', exportSuccess: 'registros exportados', realtimeEnabled: 'Modo tiempo real activado', realtimeDisabled: 'Modo tiempo real desactivado' },
		period: { last7days: 'Últimos 7 días', last30days: 'Últimos 30 días', last3months: 'Últimos 3 meses' },
		alerts: { title: 'Alertas', subtitle: 'Monitoreo de cambios de posicionamiento', noAlerts: 'Sin alertas', noAlertsDesc: 'No hay alertas de cambios de posicionamiento en este momento.', rankUp: 'Subió', rankDown: 'Bajó', viewAll: 'Ver todas', markAllRead: 'Marcar todas como leídas', markViewed: 'Marcar como leído', clearAll: 'Limpiar todas', viewed: 'Leído', unviewed: 'No leído', filterAll: 'Todas', filterUnviewed: 'No leídas', filterViewed: 'Leídas', alertCount: 'alertas', export: 'Exportar', keyword: 'Palabra clave', previousPosition: 'Posición Anterior', currentPosition: 'Posición Actual', change: 'Cambio', date: 'Fecha' },
	},
};
