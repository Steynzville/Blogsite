/**
 * Component for rendering JSON-LD schema tags
 */

import React from 'react';

interface SchemaTagProps {
  schema: Record<string, any>;
}

export function SchemaTag({ schema }: SchemaTagProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Hook to add schema to document head
 */
export function useSchema(schema: Record<string, any>) {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);
}
