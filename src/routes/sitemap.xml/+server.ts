import type { RequestHandler } from '@sveltejs/kit';

const routes = [
  { loc: '/', changefreq: 'daily', priority: 1.0 },
  { loc: '/keywords', changefreq: 'daily', priority: 0.8 },
  { loc: '/backlinks', changefreq: 'daily', priority: 0.8 },
  { loc: '/trends', changefreq: 'daily', priority: 0.8 },
  { loc: '/settings', changefreq: 'monthly', priority: 0.5 },
];

export const GET: RequestHandler = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://capybaraholding.com.br${route.loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};