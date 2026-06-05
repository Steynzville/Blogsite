import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seedArticles() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    const articlesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'articles-content.json'), 'utf8')
    );

    for (const article of articlesData) {
      await connection.execute(
        `INSERT INTO articles (slug, title, category, excerpt, content, heroImage, featured, publishedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         content = VALUES(content), 
         excerpt = VALUES(excerpt)`,
        [
          article.slug,
          article.title,
          article.category,
          article.excerpt,
          article.content,
          article.heroImage,
          article.featured ? 1 : 0,
        ]
      );
      console.log(`✓ Seeded article: ${article.title}`);
    }

    console.log('\n✓ All articles seeded successfully!');
  } catch (error) {
    console.error('Error seeding articles:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedArticles();
