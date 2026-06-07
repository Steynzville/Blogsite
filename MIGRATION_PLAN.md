# VELUCE Static Migration Plan

## Overview
Convert from database-backed React/Express/tRPC/MySQL to fully static Vite+React with Markdown content.

## Key Changes

### 1. Remove Backend Infrastructure
- **Delete**: `server/` directory (Express, tRPC, database code)
- **Delete**: `drizzle/` directory (ORM migrations)
- **Delete**: `shared/_core/` (shared error types)
- **Delete**: `client/src/_core/hooks/useAuth.ts` (auth logic)
- **Delete**: All Manus infrastructure files:
  - `server/_core/oauth.ts`
  - `server/_core/llm.ts`
  - `server/_core/voiceTranscription.ts`
  - `server/_core/map.ts`
  - `server/_core/storageProxy.ts`
  - `server/_core/notification.ts`
  - `server/_core/imageGeneration.ts`

### 2. Content Structure
```
content/
├── articles/
│   ├── upward-lighting-architectural-grazing.md
│   ├── copper-lanterns-age-with-grace.md
│   └── ... (23 total)
├── categories.json
└── metadata.json
```

### 3. Update Dependencies
- Remove: `@trpc/*`, `express`, `drizzle-orm`, `mysql2`, `@aws-sdk/*`, `jose`
- Keep: React, Vite, TailwindCSS, UI components, routing (wouter)
- Add: `gray-matter` (for frontmatter parsing), `marked` (for markdown rendering)

### 4. Static Generation
- Create `scripts/generate-static.ts` to:
  - Read all markdown files
  - Generate article pages
  - Generate category pages
  - Generate sitemap.xml
  - Generate RSS feed (optional)

### 5. Update Client Code
- Replace tRPC calls with direct JSON imports
- Create `lib/articles.ts` for article data loading
- Update `pages/ArticleDetail.tsx` to load from JSON
- Update `pages/Category.tsx` to load from JSON
- Update `pages/Home.tsx` to load from JSON

### 6. Build Configuration
- Update `package.json` scripts:
  - `build`: Generate static content, then build with Vite
  - `dev`: Run dev server with hot reload
- Update `vite.config.ts` to remove server-side code

### 7. Deployment
- Configure `netlify.toml` for static hosting
- Set up build command: `npm run build`
- Set publish directory: `dist/public`

## Files to Create
1. `content/articles/*.md` - 23 markdown files with frontmatter
2. `content/categories.json` - Category metadata
3. `scripts/generate-static.ts` - Static generation script
4. `lib/articles.ts` - Article data loading
5. `CONTENT_GUIDE.md` - How to add new articles
6. `netlify.toml` - Netlify configuration
7. `.github/workflows/deploy.yml` - GitHub Actions (optional)

## Files to Delete
- `server/` (entire directory)
- `drizzle/` (entire directory)
- `shared/_core/` (entire directory)
- `seed-articles*.mjs` (database seeders)
- `drizzle.config.ts`
- `vitest.config.ts` (if no longer needed)

## Files to Modify
- `package.json` - Remove backend deps, update scripts
- `vite.config.ts` - Remove server config, simplify
- `tsconfig.json` - Remove server paths
- `client/src/pages/*.tsx` - Replace tRPC with direct data loading
- `client/src/lib/trpc.ts` - Replace with articles.ts
- `client/src/App.tsx` - Update routing if needed

## Migration Steps
1. Extract articles to JSON (DONE)
2. Create markdown files with frontmatter
3. Create static generation script
4. Update client code to use static data
5. Remove backend code and dependencies
6. Test locally
7. Deploy to Netlify
8. Create documentation
