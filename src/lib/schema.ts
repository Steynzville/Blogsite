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
    image: article.heroImage ? `${baseUrl}${article.heroImage}` : `${baseUrl}/og-image.png`,
    datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date().toISOString(),
    dateModified: article.updatedAt ? new Date(article.updatedAt).toISOString() : new Date().toISOString(),
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
        url: `${baseUrl}/logo.png`,
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
    logo: `${baseUrl}/logo.png`,
    description: 'Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.',
    sameAs: [
      'https://www.pinterest.com/veluce',
      'https://www.instagram.com/veluce',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-XXX-XXX-XXXX',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
