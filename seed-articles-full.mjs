import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seedArticles() {
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  });

  try {
    // Read the articles library
    const articlesPath = path.join(__dirname, 'articles-library.json');
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));

    console.log(`Found ${articlesData.length} articles to seed...`);

    for (const article of articlesData) {
      const query = `
        INSERT INTO articles (slug, title, category, excerpt, content, heroImage, featured, publishedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          category = VALUES(category),
          excerpt = VALUES(excerpt),
          content = VALUES(content),
          heroImage = VALUES(heroImage),
          featured = VALUES(featured),
          updatedAt = NOW()
      `;

      const values = [
        article.slug,
        article.title,
        article.category,
        article.excerpt,
        article.content,
        article.heroImage,
        article.featured ? 1 : 0,
      ];

      await connection.execute(query, values);
      console.log(`✓ Seeded: ${article.title}`);
    }

    console.log('\n✅ All articles seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding articles:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedArticles();
