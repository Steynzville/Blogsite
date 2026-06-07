import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  ...props 
}) => {
  if (!src) return null;

  // If it's an external URL, just return a normal img
  if (src.startsWith('http')) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    );
  }

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  
  // Extract file name and extension
  const pathParts = src.split('/');
  const fileNameWithExt = pathParts.pop() || '';
  const fileName = fileNameWithExt.split('.').shift() || '';
  const dirPath = pathParts.join('/');
  
  // Construct optimized paths
  // All optimized images are stored in /images/optimized regardless of their source folder
  const optimizedDir = `${baseUrl}/images/optimized`;
  
  const srcSet = [
    `${optimizedDir}/${fileName}-sm.webp 800w`,
    `${optimizedDir}/${fileName}-md.webp 1200w`,
    `${optimizedDir}/${fileName}-lg.webp 1920w`,
  ].join(', ');

  const fallbackSrc = `${baseUrl}${src}`;
  
  // Determine sizes based on image context (hero vs article card)
  const isHero = src.includes('hero');
  const sizes = isHero 
    ? '100vw' 
    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={srcSet}
        sizes={sizes}
      />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        {...props}
      />
    </picture>
  );
};
