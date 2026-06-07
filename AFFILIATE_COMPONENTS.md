# Affiliate Components - Usage Guide

This guide explains how to use the reusable affiliate block components throughout your VELUCE blog articles.

## Overview

Two components are available for product recommendations:

1. **AffiliateBlock** - Single featured product with full details
2. **AffiliateGrid** - Multiple products in a responsive grid

Both components include:
- Amazon Associates disclosure
- Dark/light mode support
- Responsive design
- Product ratings and pricing
- External link handling

---

## AffiliateBlock Component

Use this for featuring a single premium product prominently within an article.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Section title/heading |
| `description` | string | Yes | Product description |
| `image` | string | Yes | Product image URL |
| `productName` | string | Yes | Product name |
| `productBrand` | string | No | Brand name |
| `affiliateUrl` | string | Yes | Amazon affiliate link |
| `price` | string | No | Product price (e.g., "$299.99") |
| `rating` | number | No | Rating out of 5 (e.g., 4.8) |
| `badge` | string | No | Badge text (e.g., "Best Seller") |

### Example Usage

```tsx
import AffiliateBlock from '@/components/AffiliateBlock';

export default function LuxuryLightingArticle() {
  return (
    <article>
      <h1>The Art of Architectural Lighting</h1>
      <p>Introduction paragraph...</p>

      {/* Featured product in the middle of the article */}
      <AffiliateBlock
        title="Premium Outdoor Lighting System"
        description="Transform your outdoor space with this cutting-edge LED lighting system. Features smart home integration, weather-resistant design, and customizable color temperatures. Perfect for creating ambiance in luxury outdoor living spaces."
        image="https://images.unsplash.com/photo-outdoor-lighting.jpg"
        productName="Smart Outdoor LED System Pro"
        productBrand="LuxeLights"
        affiliateUrl="https://amazon.com/dp/B0ABCDEF123"
        price="$349.99"
        rating={4.9}
        badge="Best Seller"
      />

      <p>More article content...</p>
    </article>
  );
}
```

### Styling

The component uses:
- Gradient background: `from-amber-50 to-orange-50` (light) / `from-amber-900/20 to-orange-900/20` (dark)
- Amber accent colors for buttons and badges
- 3-column layout on desktop, 1-column on mobile
- Responsive image sizing

### Best Practices

1. **Placement**: Use after introducing a related topic in your article
2. **Relevance**: Ensure the product directly relates to the article content
3. **Descriptions**: Write compelling, benefit-focused descriptions
4. **Images**: Use high-quality product images (at least 400x400px)
5. **Ratings**: Only include actual product ratings from Amazon

---

## AffiliateGrid Component

Use this for showcasing multiple related products in a curated collection.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Grid section title |
| `subtitle` | string | No | Optional subtitle |
| `products` | array | Yes | Array of product objects |
| `columns` | number | No | Grid columns (2, 3, or 4; default: 3) |

### Product Object Structure

```typescript
interface AffiliateProduct {
  id: string;              // Unique identifier
  name: string;            // Product name
  brand?: string;          // Brand name
  description: string;     // Short description
  image: string;           // Product image URL
  price?: string;          // Price (e.g., "$99.99")
  rating?: number;         // Rating out of 5
  affiliateUrl: string;    // Amazon affiliate link
  badge?: string;          // Badge text (e.g., "New", "Sale")
}
```

### Example Usage

```tsx
import AffiliateGrid from '@/components/AffiliateGrid';

export default function SmartHomeArticle() {
  const recommendedProducts = [
    {
      id: '1',
      name: 'Smart Lighting Hub',
      brand: 'LuxeLights',
      description: 'Central control for all smart lights in your home',
      image: 'https://images.unsplash.com/photo-smart-hub.jpg',
      price: '$199.99',
      rating: 4.7,
      affiliateUrl: 'https://amazon.com/dp/B0ABCDEF123',
      badge: 'Best Seller',
    },
    {
      id: '2',
      name: 'Motion Sensor Lights',
      brand: 'LuxeLights',
      description: 'Automatic lighting triggered by motion detection',
      image: 'https://images.unsplash.com/photo-motion-lights.jpg',
      price: '$149.99',
      rating: 4.5,
      affiliateUrl: 'https://amazon.com/dp/B0ABCDEF456',
      badge: 'New',
    },
    {
      id: '3',
      name: 'Color-Changing Strips',
      brand: 'LuxeLights',
      description: 'Flexible LED strips with 16 million color options',
      image: 'https://images.unsplash.com/photo-led-strips.jpg',
      price: '$79.99',
      rating: 4.6,
      affiliateUrl: 'https://amazon.com/dp/B0ABCDEF789',
    },
  ];

  return (
    <article>
      <h1>Smart Home Lighting Setup Guide</h1>
      <p>Introduction...</p>

      <h2>Essential Lighting Products</h2>
      <p>Here are our top recommended products for a complete smart home lighting setup:</p>

      <AffiliateGrid
        title="Smart Lighting Essentials"
        subtitle="Build your complete smart home lighting system with these premium products"
        products={recommendedProducts}
        columns={3}
      />

      <p>More article content...</p>
    </article>
  );
}
```

### Responsive Columns

The `columns` prop controls grid layout:

- **2 columns**: Best for 4-6 products
- **3 columns** (default): Best for 6-9 products
- **4 columns**: Best for 8+ products

On mobile, all layouts default to 1 column. On tablets, they show 2 columns.

### Styling

The component uses:
- Light background: `from-gray-50 to-gray-100`
- Dark background: `from-gray-800 to-gray-900`
- Card-based layout with hover effects
- Amber accent colors
- Responsive image sizing

---

## Integration with Articles

### Step 1: Import the Component

Add to your article file:

```tsx
import AffiliateBlock from '@/components/AffiliateBlock';
// or
import AffiliateGrid from '@/components/AffiliateGrid';
```

### Step 2: Add to Article Content

Place the component within your article JSX:

```tsx
export default function ArticleTitle() {
  return (
    <article>
      <h1>Article Title</h1>
      
      {/* Article content */}
      <p>Introduction...</p>

      {/* Affiliate component */}
      <AffiliateBlock {...props} />

      {/* More article content */}
      <p>Conclusion...</p>
    </article>
  );
}
```

### Step 3: Add Amazon Affiliate Links

1. Get your Amazon Associates account ID
2. Create affiliate links for products
3. Format: `https://amazon.com/dp/ASIN?tag=YOUR_TAG`

---

## Finding Amazon Affiliate Links

### Method 1: Amazon Associates Dashboard

1. Log in to [Amazon Associates](https://associates.amazon.com)
2. Search for the product
3. Click "Get Link" → "Short Link"
4. Copy the affiliate URL

### Method 2: URL Format

```
https://amazon.com/dp/ASIN?tag=YOUR_ASSOCIATE_TAG
```

Replace:
- `ASIN`: Product ID (e.g., B0ABCDEF123)
- `YOUR_ASSOCIATE_TAG`: Your Amazon Associates tag

### Method 3: Browser Extension

Use the [Amazon Associates Link Shortener](https://chrome.google.com/webstore) extension for quick link generation.

---

## Best Practices

### Product Selection

✅ **Do:**
- Choose products directly related to article content
- Select high-quality, well-reviewed products
- Include products at various price points
- Update products regularly

❌ **Don't:**
- Recommend products you haven't researched
- Use outdated or discontinued products
- Overload articles with too many affiliate links
- Recommend products solely for commission

### Content Guidelines

✅ **Do:**
- Write honest, benefit-focused descriptions
- Include product specifications
- Mention why you recommend the product
- Disclose affiliate relationships clearly

❌ **Don't:**
- Make exaggerated claims
- Hide affiliate relationships
- Use misleading product images
- Recommend products that don't fit the article

### Disclosure

Both components include the required Amazon Associates disclosure:

> "As an Amazon Associate, we earn from qualifying purchases."

This appears at the bottom of each component and complies with FTC guidelines.

---

## Styling Customization

To customize component styling, edit:

- **AffiliateBlock**: `/client/src/components/AffiliateBlock.tsx`
- **AffiliateGrid**: `/client/src/components/AffiliateGrid.tsx`

Common customizations:

```tsx
// Change accent color from amber to another color
className="bg-amber-600" → className="bg-blue-600"

// Adjust spacing
className="p-6" → className="p-8"

// Modify grid layout
columns={3} → columns={2}
```

---

## Performance Considerations

### Image Optimization

- Use optimized image URLs (WebP format when possible)
- Lazy load images with `loading="lazy"`
- Specify image dimensions to prevent layout shift

### Link Performance

- Use `target="_blank"` and `rel="noopener noreferrer"` (already included)
- Links open in new tabs to keep users on your site
- Track clicks in Google Analytics (optional)

---

## Tracking Performance

### Google Analytics

Add event tracking to affiliate clicks:

```tsx
const handleAffiliateClick = (productName: string) => {
  gtag.event('affiliate_click', {
    product_name: productName,
    product_category: 'lighting',
  });
};
```

### MailerLite Integration

Track which subscribers click affiliate links by:
1. Adding UTM parameters to affiliate URLs
2. Monitoring click-through rates in MailerLite

---

## Examples by Category

### Lighting Articles

```tsx
<AffiliateBlock
  title="Premium Architectural Lighting"
  description="Professional-grade lighting system for luxury outdoor spaces"
  image="/images/lighting-system.jpg"
  productName="Architectural LED System"
  productBrand="LuxeLights"
  affiliateUrl="https://amazon.com/dp/B0ABCDEF123"
  price="$499.99"
  rating={4.9}
  badge="Professional Grade"
/>
```

### Smart Home Articles

```tsx
<AffiliateGrid
  title="Smart Home Automation Essentials"
  products={[
    // Hub, sensors, controllers, etc.
  ]}
  columns={3}
/>
```

### Garden Design Articles

```tsx
<AffiliateBlock
  title="Landscape Lighting Kit"
  description="Complete outdoor lighting solution for garden design"
  image="/images/garden-lights.jpg"
  productName="Garden LED Kit"
  productBrand="GardenLux"
  affiliateUrl="https://amazon.com/dp/B0ABCDEF456"
  price="$299.99"
  rating={4.7}
/>
```

---

## Support & Updates

For updates to affiliate components:

1. Check the GitHub repository for latest versions
2. Update components by running `git pull`
3. Test components locally before deploying
4. Monitor performance metrics regularly

---

**Last Updated**: June 2026  
**Component Version**: 1.0  
**Status**: Production Ready
