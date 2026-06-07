# VELUCE - Luxury Living Journal

A modern, mobile-responsive editorial publication focused on luxury home design, lighting, and lifestyle. VELUCE is built as a **pure static site** for maximum performance, security, and ease of deployment.

## Overview

VELUCE is a content-first publication featuring 23 cornerstone articles across 7 categories:
- Outdoor Lighting
- Garden Lighting
- Patio Decor
- Smart Home
- Home Security
- Luxury Interiors
- Kitchen Essentials

The platform is optimized for Pinterest traffic, search engine visibility, and email growth with a complete SEO infrastructure including sitemaps, structured data, and Open Graph metadata.

## Static Architecture

VELUCE has been converted from a database-backed application to a **fully static publication**.

### Content Pipeline
1. **Markdown Content**: Articles are stored as Markdown files in `/content/articles/` with frontmatter metadata.
2. **Build-time Processing**: A custom script (`scripts/generate-static.mjs`) processes these Markdown files at build time.
3. **Static JSON Generation**: The script generates static JSON files in the `public/` directory:
   - Individual article data: `/public/articles/[slug].json`
   - Article listings: `/public/articles.json`
   - Category-specific listings: `/public/categories/[slug].json`
   - Main category list: `/public/categories.json`
4. **Sitemap Generation**: An XML sitemap is automatically generated at `/public/sitemap.xml` based on the available articles.
5. **Frontend Rendering**: The React frontend fetches these static JSON files at runtime to display content, ensuring lightning-fast loads and zero database dependencies.

## Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling and responsive design
- **Wouter** - Client-side routing
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Content Management
- **Markdown** - Content format
- **gray-matter** - Frontmatter parsing
- **marked** - Markdown to HTML conversion

### Infrastructure
- **Netlify** - Hosting and automated deployments
- **Netlify Forms** - Serverless contact form handling
- **GitHub** - Source control and CI/CD trigger

## Getting Started

### Prerequisites
- Node.js 22 or higher
- pnpm 10 or higher

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Steynzville/Blogsite.git
   cd Blogsite
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the dev server**
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:5173`.

## Content Management

### Adding New Articles
To add a new article, simply:
1. Create a new `.md` file in `/content/articles/`.
2. Add the required frontmatter (title, category, excerpt, heroImage, etc.).
3. Write your content in Markdown.
4. Commit and push to GitHub.

Refer to `CONTENT_GUIDE.md` for detailed instructions on metadata fields and formatting.

## Build & Deployment

### Production Build
```bash
pnpm build
```
This command runs the static generation script followed by the Vite build. The final output is in the `dist/` directory.

### Deployment
The site is configured for **Netlify**. Every push to the `main` branch triggers an automatic build and deployment.

- **No Database Required**: No MySQL or TiDB setup is needed for production.
- **No Backend Server**: The site runs entirely as static files.
- **Netlify Forms**: Contact form submissions are handled automatically by Netlify and can be forwarded to your email via the Netlify dashboard.

## SEO & Metadata

- **Sitemap**: Automatically updated at `/sitemap.xml` on every build.
- **Structured Data**: JSON-LD schema is included for all articles and categories.
- **Meta Tags**: Open Graph and Twitter metadata are dynamically set for each page.

## License

This project is proprietary and confidential.

## Support

For issues or questions:
- Email: steyn.enslin@heatrecovery.co.za
- GitHub Issues: https://github.com/Steynzville/Blogsite/issues
