import { useEffect, useState } from 'react';

export interface ArticleMetadata {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  heroImage: string;
  imagePosition?: string;
  featured: boolean;
  seoTitle: string;
  metaDescription: string;
  wordCount: number;
  publishedAt: string;
  updatedAt: string;
  faq?: Array<{ question: string; answer: string }>;
  relatedArticles?: string[];
  internalLinks?: Array<{ text: string; slug: string }>;
}

export interface Article extends ArticleMetadata {
  content: string;
}

export interface Category {
  name: string;
  slug: string;
}

// Get the base path for GitHub Pages
const getBasePath = (): string => {
  if (typeof window === 'undefined') return '/Blogsite';
  return import.meta.env.BASE_URL || '/Blogsite/';
};

// Function to fetch all articles
export async function fetchAllArticles(): Promise<ArticleMetadata[]> {
  const basePath = getBasePath();
  const response = await fetch(`${basePath}articles.json`);
  if (!response.ok) {
    console.error("Failed to fetch articles.json");
    return [];
  }
  const allArticles: Article[] = await response.json();
  // Return only metadata for list views
  return allArticles.map(({ content, ...metadata }) => metadata);
}

// Function to fetch a single article by slug
export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  const basePath = getBasePath();
  const response = await fetch(`${basePath}articles/${slug}.json`);
  if (!response.ok) {
    console.error(`Failed to fetch article ${slug}.json`);
    return undefined;
  }
  return response.json();
}

// Function to fetch articles by category
export async function fetchArticlesByCategory(categorySlug: string): Promise<ArticleMetadata[]> {
  const basePath = getBasePath();
  const response = await fetch(`${basePath}categories/${categorySlug}.json`);
  if (!response.ok) {
    console.error(`Failed to fetch category ${categorySlug}.json`);
    return [];
  }
  const categoryArticles: Article[] = await response.json();
  // Return only metadata for list views
  return categoryArticles.map(({ content, ...metadata }) => metadata);
}

// Function to fetch all categories
export async function fetchAllCategories(): Promise<Category[]> {
  const basePath = getBasePath();
  const response = await fetch(`${basePath}categories.json`);
  if (!response.ok) {
    console.error("Failed to fetch categories.json");
    return [];
  }
  return response.json();
}

// React hook for fetching all articles
export function useAllArticles() {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllArticles().then(data => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  return { articles, isLoading };
}

// React hook for fetching a single article
export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticleBySlug(slug).then(data => {
        setArticle(data);
        setIsLoading(false);
      });
    }
  }, [slug]);

  return { article, isLoading };
}

// React hook for fetching articles by category
export function useArticlesByCategory(categorySlug: string) {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categorySlug) {
      fetchArticlesByCategory(categorySlug).then(data => {
        setArticles(data);
        setIsLoading(false);
      });
    }
  }, [categorySlug]);

  return { articles, isLoading };
}

// React hook for fetching all categories
export function useAllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllCategories().then(data => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  return { categories, isLoading };
}
