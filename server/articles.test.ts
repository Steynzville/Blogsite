import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

// Mock context for public procedures (no authentication required)
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {} as TrpcContext['res'],
  };
}

describe('articles router', () => {
  const caller = appRouter.createCaller(createPublicContext());

  describe('articles.list', () => {
    it('should return an array of articles', async () => {
      const result = await caller.articles.list();
      expect(Array.isArray(result)).toBe(true);
    }, { timeout: 15000 });

    it('should return articles with required fields', async () => {
      const result = await caller.articles.list();
      if (result.length > 0) {
        const article = result[0];
        expect(article).toHaveProperty('id');
        expect(article).toHaveProperty('slug');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('category');
        expect(article).toHaveProperty('excerpt');
        expect(article).toHaveProperty('content');
      }
    }, { timeout: 15000 });

    it('should handle empty results gracefully', async () => {
      const result = await caller.articles.list();
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('articles.bySlug', () => {
    it('should return an article when slug exists', async () => {
      // First get a list to find a valid slug
      const articles = await caller.articles.list();
      if (articles.length > 0) {
        const slug = articles[0].slug;
        const result = await caller.articles.bySlug({ slug });
        expect(result).toBeDefined();
        expect(result?.slug).toBe(slug);
        expect(result?.title).toBeDefined();
      }
    });

    it('should return undefined for non-existent slug', async () => {
      const result = await caller.articles.bySlug({ slug: 'non-existent-article-slug' });
      expect(result).toBeUndefined();
    });

    it('should return article with all required fields', async () => {
      const articles = await caller.articles.list();
      if (articles.length > 0) {
        const slug = articles[0].slug;
        const result = await caller.articles.bySlug({ slug });
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('slug');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('category');
        expect(result).toHaveProperty('excerpt');
        expect(result).toHaveProperty('content');
      }
    });
  });

  describe('articles.byCategory', () => {
    it('should return articles for a valid category', async () => {
      const articles = await caller.articles.list();
      if (articles.length > 0) {
        const category = articles[0].category;
        const result = await caller.articles.byCategory({ category });
        expect(Array.isArray(result)).toBe(true);
        // All returned articles should be from the requested category
        result.forEach((article) => {
          expect(article.category).toBe(category);
        });
      }
    });

    it('should return empty array for non-existent category', async () => {
      const result = await caller.articles.byCategory({ category: 'Non-Existent Category' });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should return articles with required fields', async () => {
      const articles = await caller.articles.list();
      if (articles.length > 0) {
        const category = articles[0].category;
        const result = await caller.articles.byCategory({ category });
        if (result.length > 0) {
          const article = result[0];
          expect(article).toHaveProperty('id');
          expect(article).toHaveProperty('slug');
          expect(article).toHaveProperty('title');
          expect(article).toHaveProperty('category');
          expect(article).toHaveProperty('excerpt');
          expect(article).toHaveProperty('content');
        }
      }
    });

    it('should filter by category correctly', async () => {
      const allArticles = await caller.articles.list();
      if (allArticles.length > 0) {
        const testCategory = allArticles[0].category;
        const categoryArticles = await caller.articles.byCategory({ category: testCategory });
        
        // Verify all articles in result match the category
        categoryArticles.forEach((article) => {
          expect(article.category).toBe(testCategory);
        });
      }
    });
  });
});
