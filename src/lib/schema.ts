/**
 * JSON-LD Schema utilities for SEO
 */

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  heroImage?: string;
  featured?: boolean;
  publishedAt?: string;
  updatedAt?: string;
}

export function getArticleSchema(baseUrl: string, article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.heroImage ? new URL(article.heroImage, baseUrl).href : `${baseUrl}/images/hero-luxury.jpg`,
    datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    dateModified: (article.updatedAt || article.publishedAt) ? new Date(article.updatedAt || article.publishedAt!).toISOString() : undefined,
    author: {
      '@type': 'Organization',
      name: 'VELUCE',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VELUCE',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`,
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/article/${article.slug}`,
    },
  };
}

export function getCategorySchema(category: string, articles: Article[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category,
    description: `Explore our collection of luxury home design articles about ${category}`,
    url: `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/article/${article.slug}`,
        name: article.title,
        description: article.excerpt,
      })),
    },
  };
}

export function getOrganizationSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VELUCE',
    alternateName: 'VELUCE Luxury Living Journal',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    description: 'Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.',
    sameAs: [
      'https://www.pinterest.com/steynenslin/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'steyn.enslin@heatrecovery.co.za',
    },
  };
}

export function getHomepageSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VELUCE - Luxury Living Journal',
    url: baseUrl,
    description: 'Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.',

  };
}
