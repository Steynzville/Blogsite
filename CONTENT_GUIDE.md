# Content Guide for VELUCE Blogsite

This guide explains how to add new articles to the VELUCE Blogsite, which is now a static site. The process is designed to be simple and Git-centric.

## How to Add a New Article

Adding a new article involves three main steps:

1.  **Create a Markdown File**: Write your article content in a Markdown file (`.md`).
2.  **Add Metadata (Frontmatter)**: Include essential information about your article at the top of the Markdown file in YAML format.
3.  **Commit to GitHub**: Push your new Markdown file to the GitHub repository.

### Step 1: Create a Markdown File

All articles are stored as Markdown files in the `content/articles/` directory. Each file name should be the slug of your article (e.g., `my-new-article-title.md`).

Example:

```
content/articles/my-new-article-title.md
```

### Step 2: Add Metadata (Frontmatter)

At the very beginning of your Markdown file, you **must** include a YAML frontmatter block. This block contains key-value pairs that define the article's metadata, such as title, category, excerpt, and SEO information.

Here's an example of a complete frontmatter block:

```yaml
---
title: "My New Article Title"
slug: "my-new-article-title"
category: "Outdoor Lighting" # Must be one of the existing categories or a new one you define
excerpt: "A short, engaging summary of your article for listings."
heroImage: "/path/to/your/hero-image.jpg" # Path relative to the `client/public` directory
featured: false # Set to true if you want this article to be featured on the homepage
seoTitle: "SEO-Optimized Title for Search Engines | VELUCE"
metaDescription: "A concise description for search engine results."
wordCount: 1500 # Approximate word count
publishedAt: "2026-06-07T10:00:00Z" # ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
updatedAt: "2026-06-07T10:00:00Z" # ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
faq: # Optional: List of frequently asked questions
  - question: "What is the first question?"
    answer: "This is the answer to the first question."
  - question: "What is the second question?"
    answer: "This is the answer to the second question."
relatedArticles: # Optional: List of slugs of related articles
  - "another-article-slug"
  - "yet-another-article-slug"
internalLinks: # Optional: List of internal links within the article content
  - text: "Link Text 1"
    slug: "link-slug-1"
  - text: "Link Text 2"
    slug: "link-slug-2"
---

# Your Article Content Starts Here

This is the main body of your article, written in Markdown. You can use standard Markdown syntax for headings, paragraphs, lists, links, images, etc.

## Subheading

- List item 1
- List item 2

Read more about [Markdown syntax](https://www.markdownguide.org/basic-syntax/).

```javascript
// Code blocks are also supported
console.log("Hello, world!");
```

Remember to place any images referenced in `heroImage` or within the article content in the `client/public` directory or a subdirectory within it (e.g., `client/public/images/`).

### Required Frontmatter Fields:

*   `title`: The main title of your article.
*   `slug`: A unique, URL-friendly identifier for your article (e.g., `my-new-article`). This should match the filename without the `.md` extension.
*   `category`: The category the article belongs to (e.g., "Outdoor Lighting").
*   `excerpt`: A brief summary of the article.
*   `heroImage`: The path to the main image for the article.
*   `featured`: `true` or `false` to indicate if the article should be featured.
*   `seoTitle`: An SEO-optimized title for the article.
*   `metaDescription`: A meta description for SEO.
*   `wordCount`: The approximate word count of the article.
*   `publishedAt`: The publication date in ISO 8601 format.
*   `updatedAt`: The last updated date in ISO 8601 format.

### Step 3: Commit to GitHub

Once your Markdown file is created and includes the necessary frontmatter, commit it to your GitHub repository in the `content/articles/` directory. When you push your changes, Netlify will automatically detect the new file, trigger a build, and deploy the updated site with your new article.

```bash
git add content/articles/my-new-article-title.md
git commit -m "feat: Add new article: My New Article Title"
git push origin main
```

## Important Notes

*   **Image Paths**: Ensure all image paths (e.g., in `heroImage` or `![alt text](/path/to/image.jpg)`) are relative to the `client/public` directory.
*   **Category Management**: If you introduce a new category, the static site generator will automatically pick it up and create a category page for it.
*   **Build Process**: The `pnpm build` command (which Netlify runs) now includes a step to generate all static JSON files (articles, categories, sitemap) from your Markdown content before the Vite build process. This ensures your site is always up-to-date with your latest content.

By following these steps, you can easily manage and publish content on your static VELUCE Blogsite.
