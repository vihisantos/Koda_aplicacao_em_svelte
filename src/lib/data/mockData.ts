import { faker } from '@faker-js/faker';

export type TimePeriod = '7d' | '30d' | '3m';

export interface DailyMetric {
	date: string;
	clicks: number;
	impressions: number;
	ctr: number;
	position: number;
}

export interface Keyword {
	keyword: string;
	volume: number;
	difficulty: number;
	clicks: number;
	impressions: number;
	ctr: number;
	position: number;
	trend: 'up' | 'down' | 'stable';
}

export interface PageUrl {
	url: string;
	clicks: number;
	impressions: number;
	ctr: number;
	position: number;
}

export interface OverviewStats {
	totalClicks: number;
	totalImpressions: number;
	avgCtr: number;
	avgPosition: number;
	clicksChange: number;
	impressionsChange: number;
	ctrChange: number;
	positionChange: number;
}

function generateDailyMetrics(days: number): DailyMetric[] {
	const metrics: DailyMetric[] = [];
	const now = new Date();

	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(now);
		date.setDate(date.getDate() - i);

		metrics.push({
			date: date.toISOString().split('T')[0],
			clicks: faker.number.int({ min: 100, max: 5000 }),
			impressions: faker.number.int({ min: 10000, max: 100000 }),
			ctr: parseFloat(faker.number.float({ min: 1, max: 15 }).toFixed(2)),
			position: parseFloat(faker.number.float({ min: 1, max: 20 }).toFixed(1)),
		});
	}

	return metrics;
}

function generateKeywords(count: number): Keyword[] {
	const keywords: Keyword[] = [];
	const templates = [
		'como fazer',
		'o que é',
		'best',
		'tutorial',
		'preço',
		'barato',
		'online',
		'grátis',
		'definición',
		'cómo usar',
		'differences between',
		'review',
		'alternatives',
		'examples',
		'guide',
	];

	for (let i = 0; i < count; i++) {
		const topic = faker.helpers.arrayElement([
			'marketing digital',
			'seo',
			'desarrollo web',
			'programación',
			'negocios',
			'finanzas',
			'salud',
			'tecnología',
			'edición de video',
			'diseño gráfico',
		]);

		const template = faker.helpers.arrayElement(templates);
		const difficulty = faker.number.int({ min: 10, max: 100 });

		keywords.push({
			keyword: `${template} ${topic}`,
			volume: faker.number.int({ min: 100, max: 50000 }),
			difficulty,
			clicks: faker.number.int({ min: 10, max: 1000 }),
			impressions: faker.number.int({ min: 1000, max: 50000 }),
			ctr: parseFloat(faker.number.float({ min: 0.5, max: 20 }).toFixed(2)),
			position: parseFloat(faker.number.float({ min: 1, max: 20 }).toFixed(1)),
			trend: faker.helpers.arrayElement(['up', 'down', 'stable']),
		});
	}

	return keywords.sort((a, b) => b.volume - a.volume);
}

function generatePageUrls(count: number): PageUrl[] {
	const urls: PageUrl[] = [];
	const paths = [
		'/',
		'/blog',
		'/sobre-nosotros',
		'/contacto',
		'/servicios',
		'/productos',
		'/precios',
		'/faq',
		'/tutoriales',
		'/recursos',
		'/guías',
		'/blog/marketing-digital',
		'/blog/seo-basico',
		'/blog/como-crear-una-web',
		'/blog/desarrollo-web',
	];

	for (let i = 0; i < count; i++) {
		const path = i < paths.length
			? paths[i]
			: `/blog/${faker.lorem.slug()}`;

		urls.push({
			url: `https://ejemplo.com${path}`,
			clicks: faker.number.int({ min: 50, max: 5000 }),
			impressions: faker.number.int({ min: 1000, max: 50000 }),
			ctr: parseFloat(faker.number.float({ min: 0.5, max: 15 }).toFixed(2)),
			position: parseFloat(faker.number.float({ min: 1, max: 15 }).toFixed(1)),
		});
	}

	return urls.sort((a, b) => b.clicks - a.clicks);
}

function calculateOverviewStats(metrics: DailyMetric[]): OverviewStats {
	const totalClicks = metrics.reduce((sum, m) => sum + m.clicks, 0);
	const totalImpressions = metrics.reduce((sum, m) => sum + m.impressions, 0);
	const avgCtr = parseFloat((metrics.reduce((sum, m) => sum + m.ctr, 0) / metrics.length).toFixed(2));
	const avgPosition = parseFloat((metrics.reduce((sum, m) => sum + m.position, 0) / metrics.length).toFixed(1));

	const midpoint = Math.floor(metrics.length / 2);
	const firstHalfClicks = metrics.slice(0, midpoint).reduce((sum, m) => sum + m.clicks, 0);
	const secondHalfClicks = metrics.slice(midpoint).reduce((sum, m) => sum + m.clicks, 0);
	const firstHalfImpr = metrics.slice(0, midpoint).reduce((sum, m) => sum + m.impressions, 0);
	const secondHalfImpr = metrics.slice(midpoint).reduce((sum, m) => sum + m.impressions, 0);
	const firstHalfCtr = metrics.slice(0, midpoint).reduce((sum, m) => sum + m.ctr, 0) / midpoint;
	const secondHalfCtr = metrics.slice(midpoint).reduce((sum, m) => sum + m.ctr, 0) / midpoint;
	const firstHalfPos = metrics.slice(0, midpoint).reduce((sum, m) => sum + m.position, 0) / midpoint;
	const secondHalfPos = metrics.slice(midpoint).reduce((sum, m) => sum + m.position, 0) / midpoint;

	const calcChange = (first: number, second: number) => first === 0 ? 0 : parseFloat(((second - first) / first * 100).toFixed(1));

	return {
		totalClicks,
		totalImpressions,
		avgCtr,
		avgPosition,
		clicksChange: calcChange(firstHalfClicks, secondHalfClicks),
		impressionsChange: calcChange(firstHalfImpr, secondHalfImpr),
		ctrChange: calcChange(firstHalfCtr, secondHalfCtr),
		positionChange: parseFloat((secondHalfPos - firstHalfPos).toFixed(1)),
	};
}

export function generateData(period: TimePeriod) {
	const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
	const dailyMetrics = generateDailyMetrics(days);
	const keywords = generateKeywords(20);
	const pageUrls = generatePageUrls(15);
	const overviewStats = calculateOverviewStats(dailyMetrics);

	return {
		period,
		dailyMetrics,
		keywords,
		pageUrls,
		overviewStats,
	};
}