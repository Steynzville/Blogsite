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
  const optimizedDir = `${baseUrl}${dirPath}/optimized`;
  
  const srcSet = [
    `${optimizedDir}/${fileName}-sm.webp 800w`,
    `${optimizedDir}/${fileName}-md.webp 1200w`,
    `${optimizedDir}/${fileName}-lg.webp 1920w`,
  ].join(', ');

  const fallbackSrc = `${optimizedDir}/${fileName}.webp`;

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={srcSet}
        sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
