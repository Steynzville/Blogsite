import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.resolve(__dirname, '../content/articles');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const SITE_URL = 'https://velucedesign.com';

// Configure marked for proper paragraph handling
marked.setOptions({
  breaks: false,
  gfm: true,
});

async function loadArticles() {
  const articleFiles = await fs.readdir(ARTICLES_DIR);
  const articles = [];

  for (const file of articleFiles) {
    if (file.endsWith('.md')) {
      const filePath = path.join(ARTICLES_DIR, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      // Ensure proper paragraph formatting with double line breaks
      let processedContent = content.trim();
      // Replace multiple line breaks with exactly two
      processedContent = processedContent.replace(/\n\n+/g, '\n\n');

      articles.push({
        ...data,
        content: await marked.parse(processedContent),
        slug: file.replace('.md', ''),
      });
    }
  }
  
  // Sort by publishedAt date, newest first
  articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  return articles;
}

async function generateArticlePages(articles) {
  const articlesOutput = path.join(PUBLIC_DIR, 'articles');
  await fs.mkdir(articlesOutput, { recursive: true });

  // Generate individual article JSON files
  for (const article of articles) {
    const articlePath = path.join(articlesOutput, `${article.slug}.json`);
    await fs.writeFile(articlePath, JSON.stringify(article, null, 2));
  }
  
  // Generate articles.json with all articles for list views
  const articlesListPath = path.join(PUBLIC_DIR, 'articles.json');
  await fs.writeFile(articlesListPath, JSON.stringify(articles, null, 2));
  
  console.log(`Generated ${articles.length} article JSON files.`);
}

async function generateCategoryPages(articles) {
  const categoriesOutput = path.join(PUBLIC_DIR, 'categories');
  await fs.mkdir(categoriesOutput, { recursive: true });

  const categoriesMap = new Map();
  for (const article of articles) {
    if (!categoriesMap.has(article.category)) {
      categoriesMap.set(article.category, []);
    }
    categoriesMap.get(article.category).push(article);
  }

  const categoryEntries = Array.from(categoriesMap.entries());
  for (const [categoryName, categoryArticles] of categoryEntries) {
    const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
    const categoryPath = path.join(categoriesOutput, `${categorySlug}.json`);
    await fs.writeFile(categoryPath, JSON.stringify(categoryArticles, null, 2));
  }
  console.log(`Generated ${categoriesMap.size} category JSON files.`);

  // Also generate a main categories.json file
  const allCategories = Array.from(categoriesMap.keys()).map(name => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, ''),
  }));
  await fs.writeFile(path.join(PUBLIC_DIR, 'categories.json'), JSON.stringify(allCategories, null, 2));
  console.log('Generated main categories.json file.');
}

async function generateSitemap(articles) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add home page
  sitemap += `  <url>\n    <loc>${SITE_URL}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // Add All Articles page
  sitemap += `  <url>\n    <loc>${SITE_URL}/articles/</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  // Add articles
  for (const article of articles) {
    const lastMod = article.updatedAt ? new Date(article.updatedAt).toISOString() : new Date().toISOString();
    sitemap += `  <url>\n    <loc>${SITE_URL}/article/${article.slug}/</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  // Add categories
  const categoriesSet = new Set(articles.map(a => a.category));
  const categoriesArray = Array.from(categoriesSet);
  for (let i = 0; i < categoriesArray.length; i++) {
    const categoryName = categoriesArray[i];
    const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
    sitemap += `  <url>\n    <loc>${SITE_URL}/category/${categorySlug}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  // Add static pages
  const staticPages = ['/about', '/contact', '/privacy', '/terms', '/affiliate'];
  for (const page of staticPages) {
    sitemap += `  <url>\n    <loc>${SITE_URL}${page}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  }

  sitemap += `</urlset>`;

  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log('Generated sitemap.xml');
}

async function generateStaticHtml(articles) {
  const distDir = path.resolve(__dirname, '../dist');
  const indexHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');
  
  const routes = [
    '/articles',
    ...articles.map(a => `/article/${a.slug}`),
    ...Array.from(new Set(articles.map(a => a.category))).map(c => `/category/${c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`),
    '/about', '/contact', '/privacy', '/terms', '/affiliate'
  ];

  for (const route of routes) {
    const routeDir = path.join(distDir, route);
    await fs.mkdir(routeDir, { recursive: true });
    await fs.writeFile(path.join(routeDir, 'index.html'), indexHtml);
  }
  console.log(`Generated static HTML for ${routes.length} routes.`);
}

async function main() {
  console.log('Starting static content generation...');
  const articles = await loadArticles();
  await generateArticlePages(articles);
  await generateCategoryPages(articles);
  await generateSitemap(articles);
  
  // Only generate static HTML if dist exists (during build)
  try {
    await fs.access(path.resolve(__dirname, '../dist'));
    await generateStaticHtml(articles);
  } catch (e) {
    console.log('Skipping static HTML generation as dist/ does not exist.');
  }
  
  console.log('Static content generation complete.');
}

main().catch(console.error);
