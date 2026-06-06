import { getAllArticles, getDb } from './db';

export async function generateSitemap(baseUrl: string): Promise<string> {
  const articles = await getAllArticles();

  const urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'yearly',
      priority: '0.5',
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'yearly',
      priority: '0.5',
    },
    {
      loc: `${baseUrl}/affiliate`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];

  // Add category pages
  const categories = [
    'Outdoor Lighting',
    'Garden Lighting',
    'Patio Decor',
    'Smart Home',
    'Home Security',
    'Luxury Interiors',
    'Kitchen Essentials',
  ];

  categories.forEach((category) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    urls.push({
      loc: `${baseUrl}/category/${slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.9',
    });
  });

  // Add article pages
  articles.forEach((article) => {
    urls.push({
      loc: `${baseUrl}/article/${article.slug}`,
      lastmod: article.updatedAt ? new Date(article.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8',
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return xml;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
