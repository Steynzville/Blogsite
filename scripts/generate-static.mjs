import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import attrs from 'markdown-it-attrs';
import container from 'markdown-it-container';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.resolve(__dirname, '../content/articles');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const SITE_URL = 'https://velucedesign.com';

// Configure markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
})
  .use(anchor, {
    permalink: false
  })
  .use(attrs)
  .use(container, 'tip')
  .use(container, 'warning');

// Add target="_blank" to external links
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('href');
  if (aIndex >= 0) {
    const href = tokens[idx].attrs[aIndex][1];
    if (href.startsWith('http') && !href.includes('velucedesign.com') && !href.includes('steynzville.github.io')) {
      const targetIndex = tokens[idx].attrIndex('target');
      if (targetIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']);
      } else {
        tokens[idx].attrs[targetIndex][1] = '_blank';
      }
      const relIndex = tokens[idx].attrIndex('rel');
      if (relIndex < 0) {
        tokens[idx].attrPush(['rel', 'noopener noreferrer']);
      } else {
        tokens[idx].attrs[relIndex][1] = 'noopener noreferrer';
      }
    }
  }
  return defaultRender(tokens, idx, options, env, self);
};

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
        content: md.render(processedContent),
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
  
  // Try to read index.html from dist
  let indexHtml;
  try {
    indexHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');
  } catch (e) {
    console.log('index.html not found in dist/. Skipping prerendering.');
    return;
  }
  
  const categories = Array.from(new Set(articles.map(a => a.category))).map(c => ({
    name: c,
    slug: c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')
  }));

  const routes = [
    { path: '/articles', title: 'All Articles — VELUCE Luxury Living Journal', description: 'Browse all articles from VELUCE. Expert insights on architectural lighting, luxury interiors, and smart home design.' },
    ...articles.map(a => ({
      path: `/article/${a.slug}`,
      title: `${a.title} — VELUCE`,
      description: a.excerpt || a.description || `Read about ${a.title} on VELUCE Luxury Living Journal.`
    })),
    ...categories.map(c => ({
      path: `/category/${c.slug}`,
      title: `${c.name} — VELUCE`,
      description: `Discover articles and insights about ${c.name} in our luxury living journal.`
    })),
    { path: '/about', title: 'About — VELUCE', description: 'Learn about VELUCE, the premier luxury living journal dedicated to the art and science of home design.' },
    { path: '/contact', title: 'Contact — VELUCE', description: 'Get in touch with the VELUCE team for inquiries, collaborations, or feedback.' },
    { path: '/privacy', title: 'Privacy Policy — VELUCE', description: 'Read the VELUCE privacy policy to understand how we handle your data.' },
    { path: '/terms', title: 'Terms of Use — VELUCE', description: 'Review the terms and conditions for using the VELUCE website.' },
    { path: '/affiliate', title: 'Affiliate Disclosure — VELUCE', description: 'Information regarding our affiliate partnerships and how they support our content.' }
  ];

  for (const route of routes) {
    const routeDir = path.join(distDir, route.path);
    await fs.mkdir(routeDir, { recursive: true });
    
    // Inject specific meta tags into the template
    let customizedHtml = indexHtml;
    
    // Update title
    if (customizedHtml.includes('<title>')) {
      customizedHtml = customizedHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    } else {
      customizedHtml = customizedHtml.replace('</head>', `  <title>${route.title}</title>\n  </head>`);
    }
    
    // Update or add description
    if (customizedHtml.includes('name="description"')) {
      customizedHtml = customizedHtml.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`);
    } else {
      customizedHtml = customizedHtml.replace('</head>', `  <meta name="description" content="${route.description}" />\n  </head>`);
    }
    
    // Handle canonical tag: replace existing or add new
    const canonicalUrl = `${SITE_URL}${route.path}/`;
    if (customizedHtml.includes('<link rel="canonical"')) {
      customizedHtml = customizedHtml.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    } else {
      customizedHtml = customizedHtml.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
    }
    
    await fs.writeFile(path.join(routeDir, 'index.html'), customizedHtml);
  }
  console.log(`Generated customized static HTML for ${routes.length} routes.`);
}

async function main() {
  const isPrerender = process.argv.includes('--prerender');
  
  if (!isPrerender) {
    console.log('Starting static content generation...');
    const articles = await loadArticles();
    await generateArticlePages(articles);
    await generateCategoryPages(articles);
    await generateSitemap(articles);
    console.log('Static content generation complete.');
  } else {
    console.log('Starting static HTML prerendering...');
    const articles = await loadArticles();
    await generateStaticHtml(articles);
    console.log('Static HTML prerendering complete.');
  }
}

main().catch(console.error);
