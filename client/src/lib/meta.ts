/**
 * Utilities for managing Open Graph and Twitter Card metadata
 */

import React from 'react';

export interface MetaData {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'blog';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export function setMetaTags(meta: MetaData) {
  // Title
  document.title = meta.title;
  updateOrCreateMetaTag('og:title', meta.title);
  updateOrCreateMetaTag('twitter:title', meta.title);

  // Description
  updateOrCreateMetaTag('description', meta.description);
  updateOrCreateMetaTag('og:description', meta.description);
  updateOrCreateMetaTag('twitter:description', meta.description);

  // Image
  if (meta.image) {
    updateOrCreateMetaTag('og:image', meta.image);
    updateOrCreateMetaTag('twitter:image', meta.image);
  }

  // URL
  updateOrCreateMetaTag('og:url', meta.url);

  // Type
  if (meta.type) {
    updateOrCreateMetaTag('og:type', meta.type);
  }

  // Article-specific
  if (meta.author) {
    updateOrCreateMetaTag('article:author', meta.author);
  }
  if (meta.publishedDate) {
    updateOrCreateMetaTag('article:published_time', meta.publishedDate);
  }
  if (meta.modifiedDate) {
    updateOrCreateMetaTag('article:modified_time', meta.modifiedDate);
  }

  // Twitter Card
  updateOrCreateMetaTag('twitter:card', 'summary_large_image');
  updateOrCreateMetaTag('twitter:site', '@veluce');
}

function updateOrCreateMetaTag(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) ||
            document.querySelector(`meta[name="${property}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    const isProperty = property.startsWith('og:') || property.startsWith('article:');
    if (isProperty) {
      tag.setAttribute('property', property);
    } else {
      tag.setAttribute('name', property);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

export function useMetaTags(meta: MetaData) {
  React.useEffect(() => {
    setMetaTags(meta);
  }, [meta]);
}
