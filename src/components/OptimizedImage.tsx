import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  width,
  height,
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
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        width={width}
        height={height}
        {...props}
      />
    );
  }

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  
  // Extract file name and extension
  const pathParts = src.split('/');
  const fileNameWithExt = pathParts.pop() || '';
  const fileName = fileNameWithExt.split('.').shift() || '';
  
  // Construct optimized paths
  // All optimized images are stored in /images/optimized regardless of their source folder
  const optimizedDir = `${baseUrl}/images/optimized`;
  
  // WebP srcset with 5 breakpoints
  const webpSrcSet = [
    `${optimizedDir}/${fileName}-xs.webp 480w`,
    `${optimizedDir}/${fileName}-sm.webp 768w`,
    `${optimizedDir}/${fileName}-md.webp 1024w`,
    `${optimizedDir}/${fileName}-lg.webp 1536w`,
    `${optimizedDir}/${fileName}-xl.webp 1920w`,
  ].join(', ');

  // JPEG srcset for fallback
  const jpegSrcSet = [
    `${optimizedDir}/${fileName}-xs.jpg 480w`,
    `${optimizedDir}/${fileName}-sm.jpg 768w`,
    `${optimizedDir}/${fileName}-md.jpg 1024w`,
    `${optimizedDir}/${fileName}-lg.jpg 1536w`,
    `${optimizedDir}/${fileName}-xl.jpg 1920w`,
  ].join(', ');

  const fallbackSrc = `${optimizedDir}/${fileName}.jpg`;
  
  // Determine sizes based on image context (hero vs article card)
  const isHero = src.includes('hero');
  const sizes = isHero 
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px' 
    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <picture>
      {/* WebP format (best compression) */}
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizes}
      />
      {/* JPEG format (fallback for older browsers) */}
      <source
        type="image/jpeg"
        srcSet={jpegSrcSet}
        sizes={sizes}
      />
      {/* Fallback img element */}
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        width={width}
        height={height}
        {...props}
      />
    </picture>
  );
};
