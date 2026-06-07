import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'wouter';
import Fuse from 'fuse.js';

interface SearchableArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

interface SearchBarProps {
  articles: SearchableArticle[];
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  articles, 
  placeholder = 'Search articles...' 
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchableArticle[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse.js with articles
  const fuse = new Fuse(articles, {
    keys: ['title', 'excerpt', 'category'],
    threshold: 0.3,
    includeScore: true,
  });

  // Handle search
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`}>
              <a
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer transition-colors"
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {article.excerpt}
                    </p>
                    <span className="inline-block mt-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">No articles found matching "{query}"</p>
        </div>
      )}
    </div>
  );
};
